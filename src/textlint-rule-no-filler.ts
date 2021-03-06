import type { TxtTextNode } from "@textlint/ast-node-types";
import type { TextlintRuleReporter } from "@textlint/types";
import { StringSource } from "textlint-util-to-string";
import { tokenize } from "kuromojin";
import { splitAST, Syntax as SentenceSyntax, SentenceNode } from "sentence-splitter";

export type Options = {};
/**
 * アルゴリズム
 *
 * - Paragraphから文を抽出する
 * - Str nodeだけを見ると`A`と`B` のようなCodeに囲まれたものが、「と」となりフィラーと誤検知される
 * - そのため、Paragraphから装飾を取り除き、Codeはマスクした文章を作成する
 */
const maskCodeNode = (codeNode: TxtTextNode) => {
    return {
        ...codeNode,
        value: codeNode.value.replace(/./g, "X")
    };
};
const sourceWithoutStyle = (node: SentenceNode) => {
    const nodeMaskedCode = {
        ...node,
        children: node.children.map((childNode) => {
            if (childNode.type === "Code") {
                return maskCodeNode(childNode as TxtTextNode);
            }
            return childNode;
        })
    };
    return new StringSource(nodeMaskedCode);
};

const report: TextlintRuleReporter<Options> = (context) => {
    const { Syntax, RuleError, report } = context;
    return {
        async [Syntax.Paragraph](node) {
            const splitNode = splitAST(node);
            const sentences = splitNode.children.filter(
                (node) => node.type === SentenceSyntax.Sentence
            ) as SentenceNode[];
            for (const sentence of sentences) {
                const source = sourceWithoutStyle(sentence);
                const tokens = await tokenize(source.toString());
                tokens.forEach((token) => {
                    if (token.pos === "フィラー") {
                        const index = token.word_position - 1;
                        const originalIndex = source.originalIndexFromIndex(index);
                        report(
                            sentence,
                            new RuleError(
                                `フィラー（つなぎ表現）である「${token.surface_form}」を検知しました。
                        
「えーと」「あの」「まあ」などのつなぎ表現は話し言葉（口語）であるため、文章を読みにくくします。`,
                                {
                                    index: originalIndex
                                }
                            )
                        );
                    }
                });
            }
        }
    };
};

export default report;
