import {CDSPrefixedName} from ".";
import {Expression, seq, star} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";

export class CDSGroupBy extends Expression {
  public getRunnable(): IStatementRunnable {
    return seq("GROUP BY", CDSPrefixedName, star(seq(",", CDSPrefixedName)));
  }
}