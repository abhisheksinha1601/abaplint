import {altPrio, Expression, opt, seq, star} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";
import {CDSName} from "./cds_name";
import {CDSParameters} from "./cds_parameters";
import {CDSParametersSelect} from "./cds_parameters_select";
import {CDSCondition} from "./cds_condition";
import {CDSInteger} from "./cds_integer";

export class CDSPrefixedName extends Expression {
  public getRunnable(): IStatementRunnable {
    // Path filter: [integer: condition], [condition], or join-type redirect [inner]/[left outer]/[cross]
    const joinRedirect = seq("[", altPrio("LEFT OUTER", "INNER", "CROSS"), "]");
    const pathFilter = altPrio(joinRedirect, seq("[", CDSInteger, ":", CDSCondition, "]"), seq("[", CDSCondition, "]"));
    // Each dotted segment may have its own path filter: A[cond].B[cond].C
    const segment = seq(".", CDSName, opt(CDSParameters), opt(pathFilter));
    return seq(CDSName, opt(altPrio(CDSParameters, CDSParametersSelect)), opt(pathFilter), star(segment));
  }
}