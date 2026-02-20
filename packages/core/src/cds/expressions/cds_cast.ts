import {CDSAggregate, CDSArithParen, CDSArithmetics, CDSCase, CDSFunction, CDSInteger, CDSPrefixedName, CDSString, CDSType} from ".";
import {altPrio, Expression, optPrio, seq} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";

export class CDSCast extends Expression {
  public getRunnable(): IStatementRunnable {
    const first = altPrio(CDSFunction, CDSArithParen, CDSCase, CDSArithmetics, CDSAggregate, CDSCast, CDSString, CDSPrefixedName, CDSInteger);
    return seq("CAST", "(", first, "AS", CDSType, optPrio(seq("PRESERVING", "TYPE")), ")");
  }
}