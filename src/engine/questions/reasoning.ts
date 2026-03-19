import type { ReasoningQuestion } from '@/types/questions';
import { shuffled } from '../shuffle';

export interface ReasoningPoolItem {
  statement: string;
  question: string;
  person1: string;
  person2: string;
  correctAnswer: string;
}

/**
 * Two-person comparative reasoning pool.
 * Each item: one statement, one question, two named people, one correct name.
 * Traits: heavier/lighter, taller/shorter, faster/slower, brighter/duller,
 *         stronger/weaker, older/younger, happier/sadder, louder/quieter,
 *         bigger/smaller, richer/poorer — including negation forms.
 */
export const REASONING_POOL: ReasoningPoolItem[] = [
  // heavier / lighter
  { statement: 'Tom is heavier than Fred.', question: 'Who is heavier?', person1: 'Tom', person2: 'Fred', correctAnswer: 'Tom' },
  { statement: 'Alice is lighter than Beth.', question: 'Who is lighter?', person1: 'Alice', person2: 'Beth', correctAnswer: 'Alice' },
  { statement: 'Sam is heavier than Dan.', question: 'Who is lighter?', person1: 'Sam', person2: 'Dan', correctAnswer: 'Dan' },
  { statement: 'Laura is not as heavy as Mike.', question: 'Who is heavier?', person1: 'Laura', person2: 'Mike', correctAnswer: 'Mike' },
  { statement: 'Chris is not as light as Karen.', question: 'Who is lighter?', person1: 'Chris', person2: 'Karen', correctAnswer: 'Karen' },

  // taller / shorter
  { statement: 'Emma is taller than Jack.', question: 'Who is taller?', person1: 'Emma', person2: 'Jack', correctAnswer: 'Emma' },
  { statement: 'Paul is shorter than Nina.', question: 'Who is shorter?', person1: 'Paul', person2: 'Nina', correctAnswer: 'Paul' },
  { statement: 'Liam is taller than Grace.', question: 'Who is shorter?', person1: 'Liam', person2: 'Grace', correctAnswer: 'Grace' },
  { statement: 'Mia is not as tall as Leo.', question: 'Who is taller?', person1: 'Mia', person2: 'Leo', correctAnswer: 'Leo' },
  { statement: 'Adam is not as short as Eve.', question: 'Who is shorter?', person1: 'Adam', person2: 'Eve', correctAnswer: 'Eve' },

  // faster / slower
  { statement: 'Jane is faster than Mark.', question: 'Who is faster?', person1: 'Jane', person2: 'Mark', correctAnswer: 'Jane' },
  { statement: 'Ben is slower than Sue.', question: 'Who is slower?', person1: 'Ben', person2: 'Sue', correctAnswer: 'Ben' },
  { statement: 'Clare is faster than Roy.', question: 'Who is slower?', person1: 'Clare', person2: 'Roy', correctAnswer: 'Roy' },
  { statement: 'Dan is not as fast as Amy.', question: 'Who is faster?', person1: 'Dan', person2: 'Amy', correctAnswer: 'Amy' },
  { statement: 'Fiona is not as slow as Greg.', question: 'Who is slower?', person1: 'Fiona', person2: 'Greg', correctAnswer: 'Greg' },

  // brighter / duller
  { statement: 'Holly is brighter than Ivan.', question: 'Who is brighter?', person1: 'Holly', person2: 'Ivan', correctAnswer: 'Holly' },
  { statement: 'Kim is duller than Luke.', question: 'Who is duller?', person1: 'Kim', person2: 'Luke', correctAnswer: 'Kim' },
  { statement: 'Nora is brighter than Owen.', question: 'Who is duller?', person1: 'Nora', person2: 'Owen', correctAnswer: 'Owen' },
  { statement: 'Pete is not as bright as Rita.', question: 'Who is brighter?', person1: 'Pete', person2: 'Rita', correctAnswer: 'Rita' },
  { statement: 'Sara is not as dull as Tom.', question: 'Who is duller?', person1: 'Sara', person2: 'Tom', correctAnswer: 'Tom' },

  // stronger / weaker
  { statement: 'Uma is stronger than Vic.', question: 'Who is stronger?', person1: 'Uma', person2: 'Vic', correctAnswer: 'Uma' },
  { statement: 'Will is weaker than Xena.', question: 'Who is weaker?', person1: 'Will', person2: 'Xena', correctAnswer: 'Will' },
  { statement: 'Yara is stronger than Zac.', question: 'Who is weaker?', person1: 'Yara', person2: 'Zac', correctAnswer: 'Zac' },
  { statement: 'Aaron is not as strong as Bella.', question: 'Who is stronger?', person1: 'Aaron', person2: 'Bella', correctAnswer: 'Bella' },
  { statement: 'Carl is not as weak as Diane.', question: 'Who is weaker?', person1: 'Carl', person2: 'Diane', correctAnswer: 'Diane' },

  // older / younger
  { statement: 'Ed is older than Fay.', question: 'Who is older?', person1: 'Ed', person2: 'Fay', correctAnswer: 'Ed' },
  { statement: 'Gina is younger than Hal.', question: 'Who is younger?', person1: 'Gina', person2: 'Hal', correctAnswer: 'Gina' },
  { statement: 'Ian is older than Jo.', question: 'Who is younger?', person1: 'Ian', person2: 'Jo', correctAnswer: 'Jo' },
  { statement: 'Kate is not as old as Len.', question: 'Who is older?', person1: 'Kate', person2: 'Len', correctAnswer: 'Len' },
  { statement: 'Max is not as young as Nell.', question: 'Who is younger?', person1: 'Max', person2: 'Nell', correctAnswer: 'Nell' },

  // happier / sadder
  { statement: 'Olga is happier than Pat.', question: 'Who is happier?', person1: 'Olga', person2: 'Pat', correctAnswer: 'Olga' },
  { statement: 'Quinn is sadder than Rose.', question: 'Who is sadder?', person1: 'Quinn', person2: 'Rose', correctAnswer: 'Quinn' },
  { statement: 'Steve is happier than Tara.', question: 'Who is sadder?', person1: 'Steve', person2: 'Tara', correctAnswer: 'Tara' },
  { statement: 'Una is not as happy as Val.', question: 'Who is happier?', person1: 'Una', person2: 'Val', correctAnswer: 'Val' },
  { statement: 'Wes is not as sad as Xia.', question: 'Who is sadder?', person1: 'Wes', person2: 'Xia', correctAnswer: 'Xia' },

  // louder / quieter
  { statement: 'Yan is louder than Zoe.', question: 'Who is louder?', person1: 'Yan', person2: 'Zoe', correctAnswer: 'Yan' },
  { statement: 'Alan is quieter than Bea.', question: 'Who is quieter?', person1: 'Alan', person2: 'Bea', correctAnswer: 'Alan' },
  { statement: 'Cole is louder than Dawn.', question: 'Who is quieter?', person1: 'Cole', person2: 'Dawn', correctAnswer: 'Dawn' },
  { statement: 'Elsa is not as loud as Fred.', question: 'Who is louder?', person1: 'Elsa', person2: 'Fred', correctAnswer: 'Fred' },
  { statement: 'Gary is not as quiet as Hope.', question: 'Who is quieter?', person1: 'Gary', person2: 'Hope', correctAnswer: 'Hope' },

  // bigger / smaller
  { statement: 'Iris is bigger than Jake.', question: 'Who is bigger?', person1: 'Iris', person2: 'Jake', correctAnswer: 'Iris' },
  { statement: 'Karl is smaller than Lisa.', question: 'Who is smaller?', person1: 'Karl', person2: 'Lisa', correctAnswer: 'Karl' },
  { statement: 'Matt is bigger than Nova.', question: 'Who is smaller?', person1: 'Matt', person2: 'Nova', correctAnswer: 'Nova' },
  { statement: 'Omar is not as big as Pam.', question: 'Who is bigger?', person1: 'Omar', person2: 'Pam', correctAnswer: 'Pam' },
  { statement: 'Rex is not as small as Sia.', question: 'Who is smaller?', person1: 'Rex', person2: 'Sia', correctAnswer: 'Sia' },

  // richer / poorer
  { statement: 'Troy is richer than Uma.', question: 'Who is richer?', person1: 'Troy', person2: 'Uma', correctAnswer: 'Troy' },
  { statement: 'Vera is poorer than Walt.', question: 'Who is poorer?', person1: 'Vera', person2: 'Walt', correctAnswer: 'Vera' },
  { statement: 'Xena is richer than Yves.', question: 'Who is poorer?', person1: 'Xena', person2: 'Yves', correctAnswer: 'Yves' },
  { statement: 'Zara is not as rich as Abe.', question: 'Who is richer?', person1: 'Zara', person2: 'Abe', correctAnswer: 'Abe' },
  { statement: 'Beth is not as poor as Cole.', question: 'Who is poorer?', person1: 'Beth', person2: 'Cole', correctAnswer: 'Cole' },

  // extra mixed
  { statement: 'Dana is taller than Eric.', question: 'Who is taller?', person1: 'Dana', person2: 'Eric', correctAnswer: 'Dana' },
  { statement: 'Finn is slower than Gail.', question: 'Who is faster?', person1: 'Finn', person2: 'Gail', correctAnswer: 'Gail' },
  { statement: 'Hank is weaker than Isla.', question: 'Who is stronger?', person1: 'Hank', person2: 'Isla', correctAnswer: 'Isla' },
  { statement: 'Jade is younger than Kurt.', question: 'Who is older?', person1: 'Jade', person2: 'Kurt', correctAnswer: 'Kurt' },
  { statement: 'Leah is not as happy as Mark.', question: 'Who is sadder?', person1: 'Leah', person2: 'Mark', correctAnswer: 'Leah' },
  { statement: 'Nina is quieter than Olaf.', question: 'Who is louder?', person1: 'Nina', person2: 'Olaf', correctAnswer: 'Olaf' },
  { statement: 'Prue is smaller than Rolf.', question: 'Who is bigger?', person1: 'Prue', person2: 'Rolf', correctAnswer: 'Rolf' },
  { statement: 'Seth is not as rich as Tina.', question: 'Who is poorer?', person1: 'Seth', person2: 'Tina', correctAnswer: 'Seth' },

  // --- Expanded pool: new name pairs ---

  // heavier / lighter (new names)
  { statement: 'Abby is heavier than Blake.', question: 'Who is heavier?', person1: 'Abby', person2: 'Blake', correctAnswer: 'Abby' },
  { statement: 'Caleb is lighter than Demi.', question: 'Who is lighter?', person1: 'Caleb', person2: 'Demi', correctAnswer: 'Caleb' },
  { statement: 'Evan is heavier than Freya.', question: 'Who is lighter?', person1: 'Evan', person2: 'Freya', correctAnswer: 'Freya' },
  { statement: 'Greer is not as heavy as Heath.', question: 'Who is heavier?', person1: 'Greer', person2: 'Heath', correctAnswer: 'Heath' },
  { statement: 'Ingrid is not as light as Jules.', question: 'Who is lighter?', person1: 'Ingrid', person2: 'Jules', correctAnswer: 'Jules' },

  // taller / shorter (new names)
  { statement: 'Kira is taller than Lance.', question: 'Who is taller?', person1: 'Kira', person2: 'Lance', correctAnswer: 'Kira' },
  { statement: 'Marco is shorter than Nell.', question: 'Who is shorter?', person1: 'Marco', person2: 'Nell', correctAnswer: 'Marco' },
  { statement: 'Oscar is taller than Pippa.', question: 'Who is shorter?', person1: 'Oscar', person2: 'Pippa', correctAnswer: 'Pippa' },
  { statement: 'Quinn is not as tall as Reid.', question: 'Who is taller?', person1: 'Quinn', person2: 'Reid', correctAnswer: 'Reid' },
  { statement: 'Skye is not as short as Todd.', question: 'Who is shorter?', person1: 'Skye', person2: 'Todd', correctAnswer: 'Todd' },

  // faster / slower (new names)
  { statement: 'Uma is faster than Vance.', question: 'Who is faster?', person1: 'Uma', person2: 'Vance', correctAnswer: 'Uma' },
  { statement: 'Wade is slower than Xara.', question: 'Who is slower?', person1: 'Wade', person2: 'Xara', correctAnswer: 'Wade' },
  { statement: 'Yuki is faster than Zane.', question: 'Who is slower?', person1: 'Yuki', person2: 'Zane', correctAnswer: 'Zane' },
  { statement: 'Alec is not as fast as Bryn.', question: 'Who is faster?', person1: 'Alec', person2: 'Bryn', correctAnswer: 'Bryn' },
  { statement: 'Cleo is not as slow as Dale.', question: 'Who is slower?', person1: 'Cleo', person2: 'Dale', correctAnswer: 'Dale' },

  // brighter / duller (new names)
  { statement: 'Elan is brighter than Faye.', question: 'Who is brighter?', person1: 'Elan', person2: 'Faye', correctAnswer: 'Elan' },
  { statement: 'Glen is duller than Hana.', question: 'Who is duller?', person1: 'Glen', person2: 'Hana', correctAnswer: 'Glen' },
  { statement: 'Ivor is brighter than Jess.', question: 'Who is duller?', person1: 'Ivor', person2: 'Jess', correctAnswer: 'Jess' },
  { statement: 'Kai is not as bright as Lena.', question: 'Who is brighter?', person1: 'Kai', person2: 'Lena', correctAnswer: 'Lena' },
  { statement: 'Mace is not as dull as Nadia.', question: 'Who is duller?', person1: 'Mace', person2: 'Nadia', correctAnswer: 'Nadia' },

  // stronger / weaker (new names)
  { statement: 'Orin is stronger than Petra.', question: 'Who is stronger?', person1: 'Orin', person2: 'Petra', correctAnswer: 'Orin' },
  { statement: 'Rand is weaker than Sasha.', question: 'Who is weaker?', person1: 'Rand', person2: 'Sasha', correctAnswer: 'Rand' },
  { statement: 'Thea is stronger than Uri.', question: 'Who is weaker?', person1: 'Thea', person2: 'Uri', correctAnswer: 'Uri' },
  { statement: 'Vela is not as strong as Wren.', question: 'Who is stronger?', person1: 'Vela', person2: 'Wren', correctAnswer: 'Wren' },
  { statement: 'Xen is not as weak as Yael.', question: 'Who is weaker?', person1: 'Xen', person2: 'Yael', correctAnswer: 'Yael' },

  // older / younger (new names)
  { statement: 'Zola is older than Amos.', question: 'Who is older?', person1: 'Zola', person2: 'Amos', correctAnswer: 'Zola' },
  { statement: 'Bram is younger than Cora.', question: 'Who is younger?', person1: 'Bram', person2: 'Cora', correctAnswer: 'Bram' },
  { statement: 'Drew is older than Elke.', question: 'Who is younger?', person1: 'Drew', person2: 'Elke', correctAnswer: 'Elke' },
  { statement: 'Ford is not as old as Gwen.', question: 'Who is older?', person1: 'Ford', person2: 'Gwen', correctAnswer: 'Gwen' },
  { statement: 'Hart is not as young as Ines.', question: 'Who is younger?', person1: 'Hart', person2: 'Ines', correctAnswer: 'Ines' },

  // happier / sadder (new names)
  { statement: 'Jace is happier than Kleo.', question: 'Who is happier?', person1: 'Jace', person2: 'Kleo', correctAnswer: 'Jace' },
  { statement: 'Lars is sadder than Mira.', question: 'Who is sadder?', person1: 'Lars', person2: 'Mira', correctAnswer: 'Lars' },
  { statement: 'Noel is happier than Orla.', question: 'Who is sadder?', person1: 'Noel', person2: 'Orla', correctAnswer: 'Orla' },
  { statement: 'Paz is not as happy as Ravi.', question: 'Who is happier?', person1: 'Paz', person2: 'Ravi', correctAnswer: 'Ravi' },
  { statement: 'Sven is not as sad as Tove.', question: 'Who is sadder?', person1: 'Sven', person2: 'Tove', correctAnswer: 'Tove' },

  // louder / quieter (new names)
  { statement: 'Ula is louder than Vito.', question: 'Who is louder?', person1: 'Ula', person2: 'Vito', correctAnswer: 'Ula' },
  { statement: 'Wolf is quieter than Xoe.', question: 'Who is quieter?', person1: 'Wolf', person2: 'Xoe', correctAnswer: 'Wolf' },
  { statement: 'Yvan is louder than Zita.', question: 'Who is quieter?', person1: 'Yvan', person2: 'Zita', correctAnswer: 'Zita' },
  { statement: 'Aria is not as loud as Beau.', question: 'Who is louder?', person1: 'Aria', person2: 'Beau', correctAnswer: 'Beau' },
  { statement: 'Cruz is not as quiet as Dara.', question: 'Who is quieter?', person1: 'Cruz', person2: 'Dara', correctAnswer: 'Dara' },

  // bigger / smaller (new names)
  { statement: 'Eden is bigger than Finn.', question: 'Who is bigger?', person1: 'Eden', person2: 'Finn', correctAnswer: 'Eden' },
  { statement: 'Gray is smaller than Hari.', question: 'Who is smaller?', person1: 'Gray', person2: 'Hari', correctAnswer: 'Gray' },
  { statement: 'Imre is bigger than Juno.', question: 'Who is smaller?', person1: 'Imre', person2: 'Juno', correctAnswer: 'Juno' },
  { statement: 'Knox is not as big as Lara.', question: 'Who is bigger?', person1: 'Knox', person2: 'Lara', correctAnswer: 'Lara' },
  { statement: 'Moss is not as small as Nova.', question: 'Who is smaller?', person1: 'Moss', person2: 'Nova', correctAnswer: 'Nova' },

  // richer / poorer (new names)
  { statement: 'Odie is richer than Page.', question: 'Who is richer?', person1: 'Odie', person2: 'Page', correctAnswer: 'Odie' },
  { statement: 'Remy is poorer than Stan.', question: 'Who is poorer?', person1: 'Remy', person2: 'Stan', correctAnswer: 'Remy' },
  { statement: 'Teo is richer than Ursa.', question: 'Who is poorer?', person1: 'Teo', person2: 'Ursa', correctAnswer: 'Ursa' },
  { statement: 'Vinn is not as rich as Wyla.', question: 'Who is richer?', person1: 'Vinn', person2: 'Wyla', correctAnswer: 'Wyla' },
  { statement: 'Xyla is not as poor as Yale.', question: 'Who is poorer?', person1: 'Xyla', person2: 'Yale', correctAnswer: 'Yale' },

  // mixed extra (new names for variety)
  { statement: 'Zed is taller than Ami.', question: 'Who is shorter?', person1: 'Zed', person2: 'Ami', correctAnswer: 'Ami' },
  { statement: 'Bex is faster than Cole.', question: 'Who is faster?', person1: 'Bex', person2: 'Cole', correctAnswer: 'Bex' },
  { statement: 'Dex is not as heavy as Eva.', question: 'Who is lighter?', person1: 'Dex', person2: 'Eva', correctAnswer: 'Dex' },
  { statement: 'Fern is brighter than Gil.', question: 'Who is duller?', person1: 'Fern', person2: 'Gil', correctAnswer: 'Gil' },
  { statement: 'Hiro is not as old as Idra.', question: 'Who is younger?', person1: 'Hiro', person2: 'Idra', correctAnswer: 'Hiro' },
  { statement: 'Jib is weaker than Kade.', question: 'Who is stronger?', person1: 'Jib', person2: 'Kade', correctAnswer: 'Kade' },
  { statement: 'Lyra is sadder than Mael.', question: 'Who is happier?', person1: 'Lyra', person2: 'Mael', correctAnswer: 'Mael' },
];

/**
 * Generates a ReasoningQuestion from a pool item.
 * Button order (person1, person2) is shuffled so position doesn't cue the answer.
 */
export function generateReasoningQuestion(
  item: ReasoningPoolItem,
  index: number,
  seed?: number
): ReasoningQuestion {
  const [p1, p2] = shuffled([item.person1, item.person2], seed !== undefined ? seed + index : undefined);
  return {
    type: 'reasoning',
    id: `reasoning_${index}`,
    statement: item.statement,
    question: item.question,
    person1: p1,
    person2: p2,
    correctAnswer: item.correctAnswer,
  };
}

export function validateReasoningAnswer(
  question: ReasoningQuestion,
  answer: string
): boolean {
  return question.correctAnswer === answer;
}
