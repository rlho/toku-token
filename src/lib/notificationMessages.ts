const messages = {
  ja: [
    "今日も小さな善を。水の一滴が、やがて瓶を満たします",
    "蓮は泥の中から咲く。今日のあなたの一歩も、きっと花になる",
    "一つの灯火を灯しましたか？小さな光でも闇を照らします",
    "今日、誰かのために何かできましたか？",
    "今日の心は穏やかでしたか？それも立派な徳です",
    "見返りを求めない行いをしましたか？それが本当の徳です",
    "善を行うのに遅すぎることはない。今日の徳を記録しよう",
    "自分を灯火としなさい。今日のあなたの善行は何でしたか？",
    "与えることは最も大きな喜び。今日の喜びを記録しよう",
    "一日の終わりに、今日の善行を振り返ろう",
    "眠る前に、今日の徳を一つ。明日の蓮の種になります",
    "千の言葉より一つの善行。今日の一歩を記録しよう",
  ],
  en: [
    "A small act of good today. Drops of water fill a vessel",
    "The lotus blooms from mud. Your step today may become a flower",
    "Did you light a candle today? Even a small light shines in the dark",
    "Did you do something for someone today?",
    "Was your heart at peace today? That too is a worthy deed",
    "An act without expectation of return — that is true virtue",
    "It is never too late to do good. Record today's deed",
    "Be a lamp unto yourself. What was your good deed today?",
    "The greatest joy is in giving. Record today's joy",
    "At the end of the day, reflect on your good deeds",
    "Before you sleep, one deed. It becomes tomorrow's lotus seed",
    "One good deed over a thousand words. Record today's step",
  ],
};

export function getDailyMessage(locale: "ja" | "en"): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % messages[locale].length;
  return messages[locale][index];
}
