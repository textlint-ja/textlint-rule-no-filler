import TextLintTester from "textlint-tester";
import rule from "../src/textlint-rule-no-filler";

const tester = new TextLintTester();
tester.run("textlint-rule-no-filler", rule, {
    valid: ["これは問題ない文章です。"],
    invalid: [
        {
            text: "えーと、フィラーについてですね。",
            errors: [
                {
                    message: "フィラーである「えーと」を検知しました",
                    index: 0
                }
            ]
        },
        {
            text: "あのー、この問題について教えれくれますか?",
            errors: [
                {
                    message: "フィラーである「あのー」を検知しました",
                    index: 0
                }
            ]
        },
        {
            text: "Vueのステート管理ライブラリでああるVuexについての文章。",
            errors: [
                {
                    message: "フィラーである「あ」を検知しました",
                    index: 16
                }
            ]
        }
    ]
});
