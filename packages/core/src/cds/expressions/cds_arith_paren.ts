import {CDSAggregate, CDSArithmetics, CDSCase, CDSCast, CDSFunction, CDSPrefixedName, CDSString} from ".";
import {altPrio, Expression, seq} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";
import {CDSInteger} from "./cds_integer";

/**
 * Parenthesized arithmetic sub-expression.
 *
 * Matches either:
 *   "(" CDSArithmetics ")"  — parenthesized expression with operators, e.g. (A + B), (A - B * C)
 *   "(" CDSArithParen ")"   — nested grouping parens, e.g. ((A + B)), (((A + B)))
 *   "(" val ")"             — parenthesized single value used for grouping, e.g. (field), (func(...))
 *
 * Mutual recursion with CDSArithmetics enables n-level deep nesting with no fixed limit:
 *   CDSArithmetics  →  operand (op operand)+
 *   CDSArithParen   →  "(" CDSArithmetics ")" | "(" CDSArithParen ")" | "(" val ")"
 */
export class CDSArithParen extends Expression {
  public getRunnable(): IStatementRunnable {
    const val = altPrio(CDSInteger, CDSFunction, CDSCase, CDSCast, CDSString, CDSAggregate, CDSPrefixedName);
    return seq("(", altPrio(CDSArithmetics, CDSArithParen, val), ")");
  }
}
