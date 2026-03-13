export const buddhaQuotes = {
  ja: [
    "小さな善行を軽んじてはならない。水の滴りも、やがて水瓶を満たす",
    "一つの灯火から何千もの灯火に火を移しても、元の灯火は暗くならない",
    "善いことをするのを急ぎなさい。善を怠る者の心には悪が忍び込む",
    "千の言葉よりも、心に平和をもたらす一つの言葉に価値がある",
    "憎しみは憎しみによって止まず、愛によってのみ止む",
    "過去を追うな。未来を願うな。今、この瞬間を生きなさい",
    "怒りにしがみつくのは、熱い炭を握るようなもの。火傷するのは自分自身である",
    "あなた自身を灯火とし、あなた自身を拠り所としなさい",
    "与えることは最も大きな喜びである",
    "すべてのものは心から生まれ、心によって作られる",
    "毎朝生まれ変わる。今日何をするかが最も大切である",
    "蓮は泥の中から咲く。美しいものは苦しみの中から生まれる",
  ],
  en: [
    "Do not overlook tiny good actions. Drops of water fill a vessel",
    "Thousands of candles can be lit from one candle, and its life will not be shortened",
    "Be quick to do good. If you are slow, the mind delights in mischief",
    "Better than a thousand hollow words is one word that brings peace",
    "Hatred does not cease by hatred, but only by love",
    "Do not dwell in the past, do not dream of the future. Concentrate on the present moment",
    "Holding on to anger is like grasping a hot coal. You are the one who gets burned",
    "Be a lamp unto yourself. Be your own refuge",
    "The greatest gift is the act of giving itself",
    "All that we are is the result of what we have thought",
    "Each morning we are born again. What we do today matters most",
    "The lotus blooms from the mud. Beauty is born from suffering",
  ],
};

export function getRandomQuote(locale: "ja" | "en"): string {
  const quotes = buddhaQuotes[locale];
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
