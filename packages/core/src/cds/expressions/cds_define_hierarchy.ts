import {CDSAnnotation, CDSCondition, CDSName, CDSParametersSelect, CDSWithParameters} from ".";
import {Expression, opt, seq, star, altPrio} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";

export class CDSDefineHierarchy extends Expression {
  public getRunnable(): IStatementRunnable {
    const field = seq(star(CDSAnnotation), opt("KEY"), CDSName);
    const sortDirection = altPrio("ASCENDING", "DESCENDING");
    const siblingsOrderField = seq(CDSName, opt(sortDirection));
    const siblingsOrder = seq("SIBLINGS", "ORDER", "BY", siblingsOrderField, star(seq(",", siblingsOrderField)));

    const hierarchyBody = seq(
      "SOURCE", CDSName, opt(CDSParametersSelect),
      "CHILD", "TO", "PARENT", "ASSOCIATION", CDSName,
      opt(seq("START", "WHERE", CDSCondition)),
      opt(siblingsOrder),
      opt(seq("MULTIPLE", "PARENTS", "ALLOWED")),
      opt(seq("ORPHANS", altPrio("IGNORE", "ROOT"))),
      opt(seq("CYCLES", "BREAKUP")),
    );

    return seq(
      star(CDSAnnotation),
      "DEFINE", "HIERARCHY", CDSName,
      opt(CDSWithParameters),
      "AS", "PARENT", "CHILD", "HIERARCHY", "(", hierarchyBody, ")",
      "{", seq(field, star(seq(",", field))), "}",
      opt(";"),
    );
  }
}
