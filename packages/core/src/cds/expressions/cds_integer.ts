import {Expression, altPrio, opt, regex, seq} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";

export class CDSInteger extends Expression {
  public getRunnable(): IStatementRunnable {
    const digits = regex(/^\d+$/);
    // Decimal numbers like 100.00 are lexed as 3 tokens: "100" "." "00"
    const decimal = seq(digits, ".", digits);
    return seq(opt("-"), altPrio(decimal, digits));
  }
}