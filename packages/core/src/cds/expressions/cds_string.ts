import {altPrio, Expression, regex, seq} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";

export class CDSString extends Expression {
  public getRunnable(): IStatementRunnable {
    const abap = seq("abap", ".", regex(/^char'\w'$/));
    // Allow any character except unescaped single quote; '' is an escaped single quote
    const reg = regex(/^'([^']|'')*'$/);
    return altPrio(reg, abap);
  }
}