import {CDSAggregate, CDSArithParen, CDSArithmetics, CDSFunction, CDSPrefixedName, CDSString} from ".";
import {altPrio, Expression, optPrio, seq, starPrio} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";
import {CDSInteger} from "./cds_integer";

export class CDSCondition extends Expression {
  public getRunnable(): IStatementRunnable {
    const left = altPrio(CDSString, CDSFunction, CDSAggregate, CDSPrefixedName);
    const operators = altPrio("=", seq("!", "="), seq("<", ">"), seq(">", "="), seq("<", "="), "<", ">", "LIKE", "NOT LIKE");
    // Right side of comparison: arithmetic expressions, parenthesized sub-expressions, or simple values
    const right = altPrio(CDSArithmetics, CDSArithParen, left, CDSInteger);
    const compare = seq(operators, right);
    const is = seq("IS", optPrio("NOT"), altPrio("INITIAL", "NULL"));
    const between = seq("BETWEEN", left, "AND", left);
    const condition = seq(optPrio("NOT"), left, altPrio(compare, is, between));
    const paren = seq("(", CDSCondition, ")");
    const notParen = seq("NOT", paren);
    return seq(altPrio(condition, notParen, paren), starPrio(seq(altPrio("AND", "OR"), altPrio(condition, notParen, paren))));
  }
}