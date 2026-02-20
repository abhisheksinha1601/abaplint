import {CDSAggregate, CDSAnnotation, CDSArithParen, CDSArithmetics, CDSCase, CDSFunction, CDSInteger, CDSName, CDSPrefixedName, CDSString, CDSType} from ".";
import {Expression, optPrio, opt, seq, alt, starPrio, altPrio} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";
import {CDSAs} from "./cds_as";
import {CDSCast} from "./cds_cast";

export class CDSElement extends Expression {
  public getRunnable(): IStatementRunnable {
    const redirected = seq(": REDIRECTED TO", optPrio(altPrio("PARENT", "COMPOSITION CHILD")), CDSName);
    const colonThing = seq(":", alt(CDSName, CDSType, "LOCALIZED"));

    return seq(starPrio(CDSAnnotation),
               opt(altPrio("KEY", "VIRTUAL")),
               altPrio(CDSArithmetics,
                       CDSAggregate,
                       CDSString,
                       CDSArithParen,
                       CDSFunction,
                       CDSCast,
                       CDSCase,
                       seq("(", CDSCase, ")"),
                       seq(CDSPrefixedName, optPrio(CDSAs), optPrio(altPrio(redirected, colonThing))),
                       CDSInteger),
               optPrio(CDSAs));
  }
}