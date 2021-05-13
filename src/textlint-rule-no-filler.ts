import { TextlintRuleReporter } from "@textlint/types";
import { tokenize } from "kuromojin";

export type Options = {};
const report: TextlintRuleReporter<Options> = (context) => {
    const { Syntax, getSource, RuleError, report } = context;
    return {
        async [Syntax.Str](node) {
            const text = getSource(node);
            const tokens = await tokenize(text);
            tokens.forEach((token) => {
                if (token.pos === "フィラー") {
                    report(
                        node,
                        new RuleError(`フィラーである「${token.surface_form}」を検知しました`, {
                            index: token.word_position - 1
                        })
                    );
                }
            });
        }
    };
};

export default report;
