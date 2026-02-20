import {CDSAnnotation, CDSCondition, CDSName, CDSWithParameters} from ".";
import {Expression, opt, seq, star, altPrio} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";

export class CDSDefineHierarchy extends Expression {
  public getRunnable(): IStatementRunnable {
    const field = seq(star(CDSAnnotation), opt("KEY"), CDSName);
    const sortDirection = altPrio("ASCENDING", "DESCENDING");
    const siblingsOrder = seq("SIBLINGS", "ORDER", "BY", CDSName, opt(sortDirection));

    const hierarchyBody = seq(
      "SOURCE", CDSName,
      "CHILD", "TO", "PARENT", "ASSOCIATION", CDSName,
      opt(seq("START", "WHERE", CDSCondition)),
      star(siblingsOrder),
      opt(seq("MULTIPLE", "PARENTS", "ALLOWED")),
      opt(seq("CYCLES", "BREAKUP")),
    );

    return seq(
      star(CDSAnnotation),
      "DEFINE", "HIERARCHY", CDSName,
      opt(CDSWithParameters),
      "AS", "PARENT", "CHILD", "HIERARCHY", "(", hierarchyBody, ")",
      "{", star(seq(field, opt(","))), "}",
      opt(";"),
    );
  }
}
