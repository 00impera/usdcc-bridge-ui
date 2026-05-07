require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const http = require('http');

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const USDCC_MONAD = '0x85822c2c6F2924Bb211e0eaC24C592e7b7412036';
const USDCC_NEAR = 'usdcc-token.gemsrock-nft.near';
const BRIDGE_URL = 'https://usdcc-bridge-ui.pages.dev';
const LOGO = 'https://files.catbox.moe/ujzf30.gif';
const CLIENT_ID = '821819db832d1a313ae3b1a62fbeafb7';
const MONAD_RPC = 'https://rpc.ankr.com/monad_mainnet';
const NEAR_RPC = 'https://near.lava.build';

const PORT = process.env.PORT || 3000;
http.createServer((req, res) => { res.writeHead(200); res.end('USDCC Bot alive'); }).listen(PORT);

async function getNearBalance(account) {
  try {
    const r = await axios.post(NEAR_RPC, { jsonrpc:'2.0',id:1,method:'query',params:{request_type:'call_function',finality:'final',account_id:USDCC_NEAR,method_name:'ft_balance_of',args_base64:Buffer.from(JSON.stringify({account_id:account})).toString('base64')} });
    if (r.data.result && r.data.result.result) { const raw = JSON.parse(String.fromCharCode(...r.data.result.result)); return (parseInt(raw)/1e6).toFixed(2); }
    return '0';
  } catch { return '—'; }
}

async function getMonadBalance(address) {
  try {
    const r = await axios.post(MONAD_RPC, { jsonrpc:'2.0',id:1,method:'eth_call',params:[{to:USDCC_MONAD,data:'0x70a08231000000000000000000000000'+address.slice(2).padStart(64,'0')},'latest'] });
    if (r.data.result && r.data.result !== '0x') return (parseInt(r.data.result,16)/1e18).toFixed(4);
    return '0';
  } catch { return '—'; }
}

async function getMonadNative(address) {
  try {
    const r = await axios.post(MONAD_RPC, { jsonrpc:'2.0',id:1,method:'eth_getBalance',params:[address,'latest'] });
    if (r.data.result) return (parseInt(r.data.result,16)/1e18).toFixed(4);
    return '0';
  } catch { return '—'; }
}

bot.onText(/\/start/, (msg) => {
  const name = msg.from.first_name || 'Trader';
  bot.sendAnimation(msg.chat.id, LOGO, {
    caption: `⚡ *Welcome to USDCC Bridge Bot*, ${name}!\n\nThe first cross-chain stablecoin bridge *NEAR* ↔ *Monad*.\n\n*Commands:*\n🌐 /bridge — Bridge instructions\n💰 /balance — Check balances\n⇄ /swap — Swap tokens\n💳 /buy — Buy with card\n📊 /stats — Live stats\n🔗 /contracts — Addresses\n🔒 /timelock — TimeLock Vault\nℹ️ /info — About USDCC\n🆘 /help — All commands`,
    parse_mode: 'Markdown'
  });
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `🤖 *USDCC Bridge Bot*\n\n/bridge — Bridge NEAR ↔ Monad\n/balance \\<address\\> — Check balance\n/swap — Swap on Uniswap V4 or Ref Finance\n/buy — Buy with Visa/Mastercard\n/stats — Relayer status\n/contracts — All addresses\n/timelock — TimeLock Vault\n/liquidity — Pool info\n/info — About USDCC\n\n🌐 [usdcc-bridge-ui.pages.dev](${BRIDGE_URL})`,
    { parse_mode:'Markdown', disable_web_page_preview:true }
  );
});

bot.onText(/\/bridge/, (msg) => {
  bot.sendAnimation(msg.chat.id, LOGO, {
    caption: `🌉 *USDCC Cross-Chain Bridge*\n\n*Speed:* ~15 seconds\n*Fee:* 0 USDCC\n*Status:* 🟢 LIVE 24/7\n\nChoose direction:`,
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: [
      [{ text:'◎ NEAR → ⬡ MONAD', callback_data:'bridge_near_monad' },{ text:'⬡ MONAD → ◎ NEAR', callback_data:'bridge_monad_near' }],
      [{ text:'🌐 Open Bridge UI', url:BRIDGE_URL }]
    ]}
  });
});

bot.onText(/\/balance(?:\s+(.+))?/, async (msg, match) => {
  const addr = match[1] ? match[1].trim() : null;
  if (!addr) return bot.sendMessage(msg.chat.id, `💰 *Check Balance*\n\nUsage:\n• \`/balance 0x1234...abcd\` — Monad\n• \`/balance account.near\` — NEAR`, { parse_mode:'Markdown' });
  const load = await bot.sendMessage(msg.chat.id, '🔍 Checking balance...');
  if (addr.startsWith('0x')) {
    const [usdcc, mon] = await Promise.all([getMonadBalance(addr), getMonadNative(addr)]);
    bot.editMessageText(`⬡ *Monad Balance*\n\nAddress: \`${addr.slice(0,8)}...${addr.slice(-6)}\`\n\n💎 USDCC: *${usdcc}*\n🔮 MON: *${mon}*\n\n[View on MonadVision ↗](https://monadvision.com/address/${addr})`,
      { chat_id:msg.chat.id, message_id:load.message_id, parse_mode:'Markdown' });
  } else {
    const usdcc = await getNearBalance(addr);
    bot.editMessageText(`◎ *NEAR Balance*\n\nAccount: \`${addr}\`\n\n💎 USDCC: *${usdcc}*\n\n[View on NEARBlocks ↗](https://nearblocks.io/address/${addr})`,
      { chat_id:msg.chat.id, message_id:load.message_id, parse_mode:'Markdown' });
  }
});

bot.onText(/\/swap/, (msg) => {
  bot.sendMessage(msg.chat.id, `⇄ *USDCC Swap*\n\n*Monad:* Uniswap V4 · WMON/USDCC · 1%\n*NEAR:* Ref Finance · USDCC/NEAR\n\nChoose DEX:`,
    { parse_mode:'Markdown', reply_markup:{ inline_keyboard:[
      [{ text:'⬡ Uniswap V4 (Monad)', callback_data:'swap_uniswap' },{ text:'◎ Ref Finance (NEAR)', callback_data:'swap_ref' }],
      [{ text:'🌐 Open Swap UI', url:BRIDGE_URL }]
    ]}}
  );
});

bot.onText(/\/buy/, (msg) => {
  const payUrl = `https://pay.thirdweb.com/buy?clientId=${CLIENT_ID}&chainId=143&tokenAddress=${USDCC_MONAD}&theme=dark`;
  bot.sendAnimation(msg.chat.id, LOGO, {
    caption: `💳 *Buy USDCC with Card*\n\nPowered by *Thirdweb Pay*\n\n✅ Visa & Mastercard\n✅ Apple Pay & Google Pay\n✅ Instant delivery to Monad wallet`,
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard:[
      [{ text:'💳 Buy USDCC with Card', url:`https://app.uniswap.org/#/swap?chain=monad&outputCurrency=${USDCC_MONAD}` }],
      [{ text:'💳 Buy MON (Thirdweb Pay)', url:`https://thirdweb.com/pay` }],
      [{ text:'🌐 Open Full UI', url:BRIDGE_URL }]
    ]}
  });
});

bot.onText(/\/stats/, async (msg) => {
  const load = await bot.sendMessage(msg.chat.id, '📊 Loading stats...');
  let fwd = '🟡 Warming...', rev = '🟡 Warming...';
  try { await axios.get('https://usdcc-near-monad-bridge.onrender.com', {timeout:5000}); fwd = '🟢 LIVE'; } catch {}
  try { await axios.get('https://usdcc-reverse-relayer.onrender.com', {timeout:5000}); rev = '🟢 LIVE'; } catch {}
  bot.editMessageText(
    `📊 *USDCC Live Stats*\n\n*Relayers:*\n◎→⬡ Forward: ${fwd}\n⬡→◎ Reverse: ${rev}\n\n*Supply:*\n💎 Total: ~1,000,010 USDCC\n⬡ Monad: ~7 USDCC\n◎ NEAR: ~100,002 USDCC\n\n*Pools:*\n⬡ Uniswap V4: 🟢 ACTIVE\n◎ Ref Finance: 🟢 ACTIVE\n\n*Speed:* ~15s | *TXs:* 13+\n\n[Live Dashboard](${BRIDGE_URL})`,
    { chat_id:msg.chat.id, message_id:load.message_id, parse_mode:'Markdown', disable_web_page_preview:true }
  );
});

bot.onText(/\/contracts/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `🔗 *Contract Addresses*\n\n*⬡ MONAD*\nUSDCC: \`${USDCC_MONAD}\`\n[MonadVision ↗](https://monadvision.com/token/${USDCC_MONAD})\n\nPool Manager V4:\n\`0xb362A2b87695a71A65092bd500fB05B558180048\`\n\n*◎ NEAR*\nUSDCC: \`${USDCC_NEAR}\`\n[NEARBlocks ↗](https://nearblocks.io/address/${USDCC_NEAR})\n\nRef Finance: \`v2.ref-finance.near\``,
    { parse_mode:'Markdown', disable_web_page_preview:true }
  );
});

bot.onText(/\/timelock/, (msg) => {
  bot.sendMessage(msg.chat.id, `🔒 *Safe Deposit TimeLock*\n\nPremium time-locked vault with advanced security.\n\n✅ Lock funds with time delay\n✅ Cyberlux Gold interface`,
    { parse_mode:'Markdown', reply_markup:{ inline_keyboard:[[{ text:'🔒 Access TimeLock', url:'https://safedeposittimelock.pages.dev/' }]] }}
  );
});

bot.onText(/\/liquidity/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `💧 *USDCC Liquidity Pools*\n\n*⬡ Uniswap V4 — Monad*\nPair: WMON/USDCC | Fee: 1%\nStatus: 🟢 ACTIVE\n\n*◎ Ref Finance — NEAR*\nPair: USDCC/NEAR\nDeposited: ~500M USDCC\nStatus: 🟢 ACTIVE`,
    { parse_mode:'Markdown', reply_markup:{ inline_keyboard:[
      [{ text:'⬡ Uniswap V4', url:'https://app.uniswap.org' },{ text:'◎ Ref Finance', url:'https://app.ref.finance' }]
    ]}}
  );
});

bot.onText(/\/info/, (msg) => {
  bot.sendAnimation(msg.chat.id, LOGO, {
    caption: `ℹ️ *About USDCC*\n\nCross-chain stablecoin bridging *NEAR* ↔ *Monad*.\n\n• NEAR contract (Rust/WASM)\n• Monad ERC-20 (Solidity)\n• Forward + Reverse relayers\n• Uniswap V4 pool on Monad\n• Ref Finance pool on NEAR\n\n*Built by:* @00impera\n*Web:* [usdcc-bridge-ui.pages.dev](${BRIDGE_URL})`,
    parse_mode:'Markdown', disable_web_page_preview:true
  });
});

bot.on('callback_query', (query) => {
  const chat = query.message.chat.id;
  if (query.data === 'bridge_near_monad') {
    bot.sendMessage(chat, `◎ *NEAR → ⬡ MONAD*\n\n\`\`\`\nnear contract call-function \\\n  as-transaction \\\n  usdcc-token.gemsrock-nft.near \\\n  burn_and_bridge \\\n  json-args '{"amount":"1000000","monad_recipient":"0xYOUR_ADDR"}' \\\n  prepaid-gas 100TGAS \\\n  attached-deposit 1yoctoNEAR \\\n  sign-as YOUR.near \\\n  network-config mainnet now\n\`\`\`\n\nRelayer detectează în ~15 secunde ✅`, { parse_mode:'Markdown' });
  }
  if (query.data === 'bridge_monad_near') {
    bot.sendMessage(chat, `⬡ *MONAD → ◎ NEAR*\n\nContract: \`${USDCC_MONAD}\`\n\nApelează \`burnAndBridge(amount, "YOUR.near")\`\n\nReverse relayer mintează pe NEAR în ~15s ✅`, { parse_mode:'Markdown' });
  }
  if (query.data === 'swap_uniswap') {
    bot.sendMessage(chat, `⬡ *Uniswap V4 — Monad*\n\nPair: WMON/USDCC | Fee: 1%\n\n[Open Uniswap V4 ↗](https://app.uniswap.org/#/swap?chain=monad&inputCurrency=0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A&outputCurrency=${USDCC_MONAD})`, { parse_mode:'Markdown' });
  }
  if (query.data === 'swap_ref') {
    bot.sendMessage(chat, `◎ *Ref Finance — NEAR*\n\nPair: USDCC/NEAR\nToken: \`${USDCC_NEAR}\`\n\n[Open Ref Finance ↗](https://app.ref.finance/#${USDCC_NEAR}|wrap.near)`, { parse_mode:'Markdown' });
  }
  bot.answerCallbackQuery(query.id);
});

bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;
  bot.sendMessage(msg.chat.id, `Folosește /help pentru comenzi.\n🌐 [usdcc-bridge-ui.pages.dev](${BRIDGE_URL})`, { parse_mode:'Markdown', disable_web_page_preview:true });
});

console.log('🤖 USDCC Bridge Bot running...');
