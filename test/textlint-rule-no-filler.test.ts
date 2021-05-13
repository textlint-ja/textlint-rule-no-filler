import TextLintTester from "textlint-tester";
import rule from "../src/textlint-rule-no-filler";

const tester = new TextLintTester();
const errorMessage = (word: string) => {
    return `フィラー（つなぎ表現）である「${word}」を検知しました。
                        
「えーと」「あの」「まあ」などのつなぎ表現は話し言葉（口語）であるため、文章を読みにくくします。`;
};
tester.run("textlint-rule-no-filler", rule, {
    valid: ["これは問題ない文章です。", "`code`と`code`"],
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
            text: "あのー、この問題について教えてくれますか?",
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
        },
        {
            text: "なんかよく自分は「なんか」ってを良く使うけどこれってフィラーなんだなーと言うことを知った。",
            errors: [
                {
                    message: errorMessage("なんか"),
                    index: 0
                }
            ]
        },
        // mutiline
        {
            text: `なんか、これは問題あるかも。
サーバとサーバーの表記揺れがある。
この雇入と雇入れの違いを見つける。
なんか、これは問題あるかも。
`,
            errors: [
                {
                    message: errorMessage("なんか"),
                    index: 0
                },
                {
                    message: errorMessage("なんか"),
                    line: 4,
                    column: 1
                }
            ]
        }
    ]
});
