import TextLintTester from "textlint-tester";
import rule from "../src/textlint-rule-no-filler";

const tester = new TextLintTester();
const errorMessage = (word: string) => {
    return `フィラー（繋ぎ表現）である「${word}」を検知しました。
                        
「えーと」「あの」「まあ」などの繋ぎ表現は話し言葉（口語）であるため、文章を読みにくくします。`;
};
tester.run("textlint-rule-no-filler", rule, {
    valid: ["これは問題ない文章です。"],
    invalid: [
        {
            text: "えーと、フィラーについてですね。",
            errors: [
                {
                    message: errorMessage("えーと"),
                    index: 0
                }
            ]
        },
        {
            text: "あのー、この問題について教えれくれますか?",
            errors: [
                {
                    message: errorMessage("あのー"),
                    index: 0
                }
            ]
        },
        {
            text: "Vueのステート管理ライブラリでああるVuexについての文章。",
            errors: [
                {
                    message: errorMessage("あ"),
                    index: 16
                }
            ]
        },
        {
            text: "なんか出た…。",
            errors: [
                {
                    message: errorMessage("なんか"),
                    index: 0
                }
            ]
        }
    ]
});
