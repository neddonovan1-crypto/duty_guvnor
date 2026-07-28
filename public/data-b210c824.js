(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DATA = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
    "cards": [
      {
        "id": "station_detector_van",
        "tone": "weary",
        "title": "DETECTOR VAN — AND THE NICK ITSELF",
        "window": [
          2,
          10
        ],
        "text": "The Post Office detector van has been prowling the manor all evening, aerial revolving on the roof like a slow accusation, hunting the unlicensed. At half past the hour it stops dead outside the nick, reverses, and lines its aerial up on your own front windows. Two men in Post Office macs present themselves at the desk with the quiet joy of professionals who have caught the last people on earth they expected: the canteen set — the one the relief watch the racing on, that has been there since Bream was a probationer — holds no television licence, has never held one, and is, at this moment, showing the news to an empty room. 'Well now,' says the senior detector man, opening his book. 'This is a first.'",
        "choices": [
          {
            "label": "Sign his form, promise a licence Monday, and put the kettle on",
            "result": "You take it on the chin, sign where the finger points, and undertake in writing that Thorne Street will be a licence-fee payer by close of business Monday. The detector men, mollified by tea and the sheer novelty, decline to press it further. Bream is mortified into a silence that lasts until dawn; the racing, at least, survives.",
            "effects": {
              "brass": -2,
              "relief": 1
            }
          },
          {
            "label": "Pull rank — a police station is surely Crown premises, exempt",
            "result": "You inform the senior detector man, with all the confidence of a {man} inventing law at speed, that Her Majesty's constabulary does not require Her Majesty's licence to watch Her Majesty's broadcasts on Her Majesty's premises.",
            "effects": {
              "brass": 1
            },
            "risk": {
              "odds": 45,
              "failResult": "He has heard better, from worse, and writes down every word for the report that will land on the Commander's desk with 'the duty inspector asserted' underlined twice. There is no such exemption, there never was, and now it is on paper that Thorne Street tried it on.",
              "failEffects": {
                "brass": -5
              }
            }
          },
          {
            "label": "Have the offending set removed to the property store forthwith",
            "result": "You order the canteen telly unplugged, labelled, and carried down to the property store as if it were evidence in the crime of its own existence, thereby technically resolving the matter and actually ending the racing, the news, and the Test highlights at a stroke. The relief take it about as well as you would expect. The detector men leave impressed and the manor is down one television and up considerable ill-feeling.",
            "effects": {
              "brass": 1,
              "relief": -4
            }
          }
        ]
      },
      {
        "id": "ordinary_arsenal_surrender",
        "tone": "grief",
        "title": "SURRENDER OF FIREARMS — THE LATE MR TREVELYAN'S EFFECTS",
        "window": [
          1,
          9
        ],
        "text": "A pale man of fifty sets a suitcase on the front desk, opens it, and steps back as if it might go off — which, Bream notes, it very well might. Inside, wrapped in oilcloth and his late father's regimental honour, is an arsenal: a Luger and a Webley with the numbers filed, a sten with no business existing, a cigar box of loose rounds gone green, and a grenade that everyone in the front office is now discussing in the low voices of the recently religious. 'I found them clearing the loft,' says Mr Trevelyan the younger. 'I didn't want them in the house with the children. I'm doing the right thing.' He is, and it is a nightmare, and it is now yours.",
        "choices": [
          {
            "label": "Box it, seal it, leave it for the Early Turn's armourer",
            "result": "You make it safe as far as anyone dares, sign it into the property store under two locks and a prayer, and leave the proper booking-in to the day relief's firearms man, who is trained for exactly this and asleep for another five hours. An arsenal spends the night in your building. You do not sleep either.",
            "effects": {
              "brass": -2
            }
          },
          {
            "label": "Two PCs to catalogue and make each one safe now",
            "result": "Doyle and whoever's steadiest spend two hours with a manual, a lump of plasticine for the grenade, and the sweat of men handling other men's wars. Every weapon is stripped, logged, numbered and rendered inert by dawn; the grenade goes to a bucket of sand and a very careful telephone call. Textbook. The Yard's returns will glow. It costs you two bodies for the duration and a decade off Bream's life.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 3,
              "brass": 5
            }
          },
          {
            "label": "Do it yourself at the desk, by the book, all night",
            "result": "You take it on personally — rank has to be good for something — and spend the small hours cataloguing a dead soldier's secrets while the manor runs itself in the next room. The book is perfect. You were, however, cataloguing a Luger when you should have been running a shift, and it shows on the streets by morning.",
            "effects": {
              "brass": 3,
              "streets": -3
            }
          },
          {
            "label": "Nick him for the lot — unlicensed is unlicensed",
            "result": "You charge Mr Trevelyan with possession of the arsenal he walked in to surrender, because the law, read narrowly by a tired {man} at three in the morning, permits it. He goes into a cell too stunned to speak, a decent man who did the right thing and got a charge sheet for it. Bream types it in a silence you can hear. It will not look good in daylight, and it does not look good now.",
            "effects": {
              "arrests": 1,
              "brass": -4,
              "relief": -3,
              "streets": 1
            }
          }
        ]
      },
      {
        "id": "club_pemberton_ruined",
        "venue": "pemberton",
        "tone": "grief",
        "title": "THE PEMBERTON CLUB — A MEMBER RUINED AT THE SHOE",
        "window": [
          3,
          11
        ],
        "text": "The Pemberton, on Berkeley Row, is the sort of gambling club where the carpet costs more than the manor earns and the losses are settled in silence and land. Tonight the silence has broken: Sir Hugo Cass, baronet, has lost the house, the farm and the horses at chemin-de-fer across four hours and one catastrophic shoe, and is now at an upstairs window declining to come in from the ledge. The club's night secretary, a smooth man named Lisle, wants it handled 'with the discretion the Pemberton is accustomed to' — meaning quietly, meaning off the premises, meaning not their problem. Sir Hugo, on the ledge, is of a different and higher view.",
        "choices": [
          {
            "label": "Send a PC up to talk him in — gently, all night if it takes it",
            "result": "Whittle goes up and does the thing they never train and always need: sits on a windowsill in the cold with a ruined man and talks about nothing until the nothing is enough. Sir Hugo comes in at half past four, bankrupt and breathing, and is walked down past the tables he has fed to a hot sweet tea and a lift home. The Pemberton would have preferred he fell somewhere else. You would not.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 3,
              "relief": 2,
              "streets": 2
            }
          },
          {
            "label": "Take him into safe keeping for the night — a cell beats a pavement",
            "result": "Sir Hugo is brought down and lodged, for his own safety and against his considerable objection, in the cleanest cell you have, where a man who owned three counties this morning spends the night under a grey blanket contemplating the arithmetic. He is alive at six, which was the entire object. The cell is spoken for until the morning either way.",
            "effects": {
              "arrests": 1,
              "brass": 1,
              "relief": -1
            }
          },
          {
            "label": "Let Lisle and the club's own men handle it their way",
            "result": "You take the Pemberton at its word and leave discretion to the discreet. What the club's men do with a ruined baronet on a ledge is not written down anywhere, and the fact that Sir Hugo is quietly gone by four and nobody will say where is precisely the kind of tidiness Berkeley Row pays for. It sits badly with the relief, and worse with you.",
            "effects": {
              "brass": -2,
              "relief": -3,
              "streets": -2
            }
          },
          {
            "label": "Ask how a man loses three counties in one shoe",
            "result": "You take Sir Hugo in, safe and shivering, and you begin — quietly, on your own account — to wonder aloud about a house where the losses only ever run one way. Lisle's smile does not survive the question, and by morning a lawyer with a knighthood of his own has rung the Yard to complain about a night inspector 'exceeding {his} remit.' You have made a powerful enemy and possibly a point.",
            "effects": {
              "arrests": 1,
              "brass": -4,
              "streets": 1
            }
          }
        ]
      },
      {
        "id": "club_pemberton_cheat",
        "venue": "pemberton",
        "tone": "grief",
        "title": "THE PEMBERTON CLUB — 'THE SHOE IS BENT'",
        "window": [
          4,
          12
        ],
        "text": "A sacked croupier named Kettle presents himself at the front desk with a grievance and a conscience, in that order: the chemin-de-fer shoe at the Pemberton, he says, is rigged — a second dealing box, a marked deck they call 'the reader,' and a house edge that isn't an edge but a robbery in evening dress. He has watched dukes and doctors fed to it for a year. He will swear to all of it. He is also, he concedes, a disgruntled man who was let go on Tuesday, which a good lawyer will make the entire story. And the Pemberton keeps very good lawyers.",
        "choices": [
          {
            "label": "Take the full statement and pass it up to the Yard's gaming squad",
            "result": "You take Kettle's account in careful detail — the box, the reader, the names of the fleeced — and route it to C11's gaming men, who have wanted a way into the Pemberton for years and now have a door. It is the correct channel and the slow one; nothing happens tonight, but a file with a heartbeat now exists, with Thorne Street's care all over it.",
            "effects": {
              "brass": 3,
              "relief": 1
            }
          },
          {
            "label": "Raid it now and seize the shoe before it's cleaned",
            "result": "You move on the Pemberton while Kettle's account is warm and the evidence is still on the table, going in for the dealing box and the reader before Berkeley Row can make them disappear.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 3,
              "streets": 2,
              "brass": -4
            },
            "risk": {
              "odds": 45,
              "failResult": "You are eleven minutes too late and one tipped-off doorman short: the second box is gone, the reader is an ordinary deck, and the club's lawyer is already drafting the letter about a warrantless raid on a respectable establishment. Kettle's word now stands alone against Berkeley Row, which is to say it stands not at all.",
              "failEffects": {
                "brass": -5
              }
            }
          },
          {
            "label": "A quiet word with the management — mind how you go",
            "result": "You put it to Lisle, {man} to {man}, that a croupier is telling tales and it might be a night for the Pemberton to be seen to be clean. He thanks you with his eyes and cleans nothing except the evidence. The club owes you a marker now, which is worth having and shames you slightly to hold.",
            "effects": {
              "brass": 2,
              "streets": -2
            },
            "sets": "flag_pemberton_marker"
          },
          {
            "label": "Bin it — a sacked man's word against Berkeley Row",
            "result": "You thank Kettle for his public spirit, note his obvious grudge, and let the matter die of the practical difficulties. He leaves knowing exactly what he watched and exactly why nobody will touch it, which is its own kind of education. The dukes and the doctors go on being fed to the shoe.",
            "effects": {
              "relief": -1,
              "brass": 1
            }
          }
        ]
      },
      {
        "id": "vice_drag_revue",
        "tone": "grief",
        "title": "AFTER HOURS — THE MIDNIGHT REVUE, VESTRY LANE",
        "window": [
          3,
          10
        ],
        "text": "A complaint of 'a disturbance of an indecent character' at a basement club off Vestry Lane turns out, on the beat man's inspection, to be the Midnight Revue in full sequined flight: a drag cabaret of considerable polish, a compère called Miss Vita Vavavoom who was, by day and by call-up, a Desert Rat — Eighth Army, North Africa, chased Rommel across a desert thirty years before the frock — and an audience of dockers, debutantes and one off-duty magistrate all having the time of their lives. The complaint came from a new neighbour. The club has been there, quietly, since 1953. Nobody inside is doing anything but singing.",
        "choices": [
          {
            "label": "Have a quiet word about the noise and leave them to it",
            "result": "PC Whittle goes down, is called 'darling' fourteen times and 'officer' with enormous respect, and comes back up having promised to mention the fire doors and nothing else. The Revue turns the volume down a courteous notch and Miss Vavavoom dedicates the next number to 'the Metropolitan Police, God love every button.' The new neighbour is unmollified; everyone else on Vestry Lane is delighted.",
            "effects": {
              "brass": -1,
              "relief": 3,
              "streets": 1
            }
          },
          {
            "label": "Raid it — licensing, decency, the book thrown flat",
            "result": "You go in mob-handed on a Saturday of complaints and turn a twenty-two-year-old institution into a scene: names taken, a magistrate under a feather boa pretending to be a plumber, and a compère who served at Alamein asking, without heat, which of your officers would like to explain this to their sergeant. It makes the licensing return and nobody's night better. The Gazette, tipped by someone, sends a man.",
            "effects": {
              "arrests": 1,
              "streets": -2,
              "brass": -3,
              "relief": -2
            }
          },
          {
            "label": "Note the fire doors for the council and go",
            "result": "You log a genuine concern about the exits, hand it to the council's Thursday, and let the Revue revue. It is not, whatever the new neighbour feels, a matter for the criminal law, and the beat man leaves to a round of applause and a wink from a Desert Rat in eyelashes.",
            "effects": {
              "brass": -1,
              "streets": -1
            }
          }
        ]
      },
      {
        "id": "vice_peer_convenience",
        "tone": "grief",
        "title": "IMPORTUNING — A LORD, AND ONE OF OUR OWN, GENTS' MARSH LANE",
        "window": [
          2,
          9
        ],
        "text": "The Vice Squad have made a collar in the public conveniences off Marsh Lane, and brought you the paperwork with a smirk you already dislike: a peer of the realm — Lord Aldous Frane, a name from the crossbenches and the better sort of charity committee — arrested for importuning, the arresting officer being one of the Squad's plain-clothes decoys, a good-looking young DC who spends his nights being propositioned by lonely men and calling it a career. Frane is in the cell saying nothing at all, with the particular stillness of a man watching his whole life leave the building. The Squad want the charge on the sheet before the solicitors wake.",
        "choices": [
          {
            "label": "Charge him — the law is the law, and it's on the book",
            "result": "The charge is typed and the Squad go home pleased with a night's honest entrapment. By nine a solicitor with a good coat is at the desk and by Thursday a life of committees and crossbenches is a paragraph and a resignation. The law was observed to the letter. You find you cannot look the decoy in the eye, and he, to his credit, cannot look at you.",
            "effects": {
              "streets": 2,
              "brass": 4,
              "relief": -3
            }
          },
          {
            "label": "No caution, no charge — a grubby bit of policing, and you'll own that",
            "result": "You strike it out. You tell the Squad, in words they will repeat upstairs, that Thorne Street does not build careers on lonely men and pretty constables, and you send a peer of the realm home to Eaton Square shaking, unbooked, and owing you a debt he will never be able to name. The Squad log it as your decision, in ink, with your number.",
            "effects": {
              "brass": -6,
              "relief": 4,
              "streets": 1
            }
          },
          {
            "label": "Bail him to a date that will quietly never come",
            "result": "You bail Lord Frane to appear on a morning you both understand will keep being adjourned until the file dies of old age. It is the coward's mercy and the survivor's compromise: the Squad get their arrest on paper, the peer gets his life on a thread, and the whole squalid business is filed under 'pending' where such things go to be forgotten.",
            "effects": {
              "brass": -1
            }
          }
        ]
      },
      {
        "id": "grime_lost_manuscript",
        "tone": "weary",
        "title": "LOST PROPERTY — A NOVELIST'S ONLY COPY",
        "window": [
          4,
          13
        ],
        "text": "At the front desk, in a state, stands Aubrey Pinch — 'the Aubrey Pinch,' he says, and Bream, a reader, goes slightly pale — reporting the loss of the sole manuscript of his new novel, eleven years' work, left in its cardboard box on the last bus from the Strand. No carbon. No second copy. 'I don't believe in them,' he says, in the voice of a man who is beginning, catastrophically, to. The bus is now in the depot at Meakin's yard; the conductor is a man named Docherty who is either an honest soul or, if the box looked worth anything, not.",
        "choices": [
          {
            "label": "Send a PC to the depot to catch Docherty and the bus tonight",
            "result": "Whittle reaches the depot as Docherty is clocking off and finds the box exactly where a tired man leaves cardboard: under the stairs, unregarded, eleven years of English literature keeping company with a lost umbrella and a child's welly. Pinch weeps on the front counter. Bream asks him to sign the property book and, very quietly, a flyleaf.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 2,
              "brass": 2,
              "relief": 1
            }
          },
          {
            "label": "Book it as lost property and let the depot ring in the morning",
            "result": "You take the report in full, log the box, and tell Pinch the depot will turn it up on the Early Turn if it's there to turn up. He goes into the night composing, aloud, the letter to The Times he will write if it isn't. The manuscript spends the small hours under a stairwell, its fate in the hands of a conductor and the god of cardboard.",
            "effects": {
              "relief": -1
            }
          },
          {
            "label": "Tell him it's a civil matter and offer the lost-property form",
            "result": "You hand a genius a form and the information that London Transport has its own procedures, and you watch eleven years of work become a reference number. He is too stunned to be angry. Bream, behind you, is angry enough for the building, and does not trouble to hide it.",
            "effects": {
              "relief": -3,
              "brass": -1
            }
          }
        ]
      },
      {
        "id": "grime_student_hunt",
        "tone": "weary",
        "title": "RAG WEEK — A SCAVENGER HUNT AT LARGE",
        "window": [
          1,
          7
        ],
        "text": "It is Rag Week at the college of the University across the water, and its finest minds are loose on your manor with a list. The desk has already received: a policeman's helmet (missing, Gosling's, again), a Belisha beacon (uprooted, Chandlers Walk), 'a chamber pot, in use' (unexplained), and one live undergraduate, chained to the market railings as a forfeit, who would like to report himself found and, if it's not too much trouble, unchained. A young woman in a college scarf is at the counter explaining that it is 'all for charity,' which it demonstrably is, and 'all in fun,' which the Belisha beacon disputes.",
        "choices": [
          {
            "label": "Round up the ringleaders and put the fear of the sergeant into them",
            "result": "Duffin gathers a herd of the brilliant and bewildered into the front office, where Bream delivers the speech he keeps for exactly this — dignity, damage, and the criminal law of theft as it applies to beacons — and has the lot of it returned, apologised for, and a fiver put in the charity tin out of sheer relief. The chained undergraduate is freed last, on principle.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "streets": 3,
              "relief": 1
            }
          },
          {
            "label": "Take the helmet and the beacon back, caution the rest, move them on",
            "result": "You reclaim the Queen's property, decline to make criminals of chemists and historians three weeks from their finals, and shoo the whole giggling expedition back over the bridge to bother their own division. The chamber pot is not pursued. Some questions are better left in Rag Week.",
            "effects": {
              "streets": 1
            }
          },
          {
            "label": "Leave it — students and railings are a Rag Week tradition older than you",
            "result": "You unchain the forfeit, point him at the bridge, and let the tide of learning recede on its own. It mostly does, minus one beacon that is never recovered and turns up, years later, in a common-room, painted gold. The manor is marginally the worse for scholarship tonight.",
            "effects": {
              "streets": -2
            }
          }
        ]
      },
      {
        "id": "church_bells_stchads",
        "title": "FULL PEAL AT THREE — ST CHAD'S TOWER",
        "tone": "grief",
        "window": [
          9,
          14
        ],
        "text": "At ten to the hour the bells of St Chad's break into a full peal, all eight, and settle in for the long haul. The tower captain, Mr Selwyn Prout — forty-one years on the ropes — has locked the tower door from the inside with his whole band and a primus stove. His grievance, shouted down the stairwell in rounds: the vicar means to retire the bells in favour of 'a tape recording and a young man with a guitar'. A full peal, Mr Prout wishes it known, takes upwards of three hours, and he has provisions. Maitland Court is on the phone in relays. The vicar is on the pavement in his dressing gown, praying, he says, for guidance, though not audibly over the bells.",
        "choices": [
          {
            "label": "Send a PC up the stairs to negotiate between rounds.",
            "result": "Whittle goes up eight flights and comes down forty minutes later, changed. Terms: the peal concludes at four o'clock as a 'quarter peal of thanksgiving', the tape recorder is never spoken of again, and the vicar will consult the band 'on all matters campanological'. Maitland Court gets its silence; Mr Prout gets it in writing; Whittle gets his hearing back by Tuesday.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 2,
              "streets": 4,
              "brass": 2,
              "relief": -2
            }
          },
          {
            "label": "Church land, church law — let them ring it out.",
            "result": "The peal runs its full and terrible course, concluding at twenty to five with something triumphant in Grandsire Triples. The manor has been awake since three and knows whose pavement the vicar prayed on. Mr Prout descends to a hero's breakfast; the letters to the Gazette, the diocese and the Commissioner are all in the first post, and every one of them names the nick.",
            "effects": {
              "streets": -5,
              "brass": -3,
              "relief": 1
            }
          },
          {
            "label": "Nick Prout for nuisance the moment he comes down.",
            "result": "Mr Prout descends at four to a small crowd and is arrested to scattered applause, which he acknowledges. He is charming in the charge room, requests his statement be taken 'in full', and is bailed by a chorister magistrate before six. By nine the Bishop's chaplain has telephoned twice, in sorrow, and the Campanological Society has adopted him as a martyr. The bells, at least, are silent.",
            "effects": {
              "arrests": 1,
              "streets": 3,
              "brass": -5
            }
          }
        ]
      },
      {
        "id": "embassy_ishmaelia",
        "title": "LIGHTS AT THE ISHMAELIAN EMBASSY — HALKIN GARDENS",
        "tone": "grief",
        "text": "The Embassy of the Republic of Ishmaelia occupies the corner house on Halkin Gardens, and at this hour every window is lit. The beat man reports smoke from the garden — papers being burned in a dustbin by men in good coats — a Daimler with CD plates idling at the kerb with its boot open, and the night porter sitting on the front steps holding a framed photograph of somebody he says was President until roughly eleven o'clock. Inside, two factions appear to be holding one embassy. The Foreign Office duty clerk, rung for guidance, says 'gosh' and asks to be kept informed.",
        "window": [4, 11],
        "choices": [
          {
            "label": "Put a PC on the gate — His Excellency's door stays British outside.",
            "result": "Doyle stands at the railings radiating neutrality while the revolution completes itself indoors at the level of raised voices and one thrown inkwell. By four the Daimler departs with the losing faction and most of the silver, and the new First Secretary comes out to thank you in beautiful English for 'facilitating an orderly transition'. The pavement, which is yours, stayed orderly. The building, which is not, redecorated itself.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 2,
              "brass": 5,
              "streets": 2
            }
          },
          {
            "label": "Take the porter's statement — he's on your pavement, and he saw the lot.",
            "result": "The porter, restored by charge-room tea, gives a statement of tremendous quality: names, dates, the location of a ledger, and the precise moment the Ambassador's brother-in-law changed sides. None of it is actionable on British soil and all of it goes into the book, where the men from the Foreign Office who arrive at six read it standing up, twice, and ask with studied casualness for a copy.",
            "effects": {
              "brass": 3,
              "relief": 2
            }
          },
          {
            "label": "Diplomatic premises — note it, and let Ishmaelia happen to Ishmaelia.",
            "result": "The occurrence book records 'disturbance, extraterritorial'. At five the bin fire spreads to a magnolia, the Brigade attend a fire they are diplomatically unable to fight for eleven minutes, and the Gazette's stringer photographs all of it from your pavement. The FO rings at nine to ask, silkily, what the watch on the building had seen. There wasn't one.",
            "effects": {
              "streets": -4,
              "brass": -5
            }
          }
        ]
      },
      {
        "id": "americans_navy_shore",
        "title": "ALLIED RELATIONS — U.S. NAVY, THE FEATHERS",
        "tone": "grief",
        "text": "A visiting American warship is on a goodwill call in the Pool, and eleven of her crew have found the Feathers, where the goodwill has run to arm-wrestling for rounds. Now a Petty Officer named Dubcek is on the roof of the gents wearing the darts trophy like a crown, two of his shipmates are attempting to buy the pub's dog, and the landlord — torn between his till and his fixtures — wants 'something done with tact'. A large man by the door introduces himself as the Shore Patrol and says, with feeling, that he has been looking for these men since Rotherhithe.",
        "window": [
          2,
          8
        ],
        "choices": [
          {
            "label": "Hand the lot to the Shore Patrol — allied problems, allied solutions.",
            "result": "The Shore Patrol man produces a nightstick he refers to, affectionately, as the diplomat, and the United States Navy comes down off the roof of the gents in reverse order of rank. They leave singing something naval, arm in arm, escorted to the river the way a storm is escorted out to sea. The landlord finds the till untouched and the darts trophy on the pump, polished.",
            "effects": {
              "streets": 4,
              "relief": 3
            }
          },
          {
            "label": "Nick Dubcek for the roof — the law of the land is the law of the land.",
            "result": "Dubcek comes quietly, delighted — 'a genuine English jail' — and signs autographs at the desk as if arrested by appointment. By three, a lieutenant-commander in dress uniform is at the front counter being magnificent about jurisdiction, and by nine the Yard, the FO and something calling itself CINCUSNAVEUR are all on the telephone. He was, everyone concedes, very cheerful about it.",
            "effects": {
              "arrests": 1,
              "streets": 3,
              "brass": -6,
              "relief": 2
            }
          },
          {
            "label": "Let the landlord's tact budget handle it — note for the book.",
            "result": "The landlord settles it the publican's way: a round on the house, the dog formally declined 'with thanks to the United States Navy', and the trophy converted to a perpetual challenge cup. At closing the Americans drift riverward mostly upright. Two sets of railings and one hanging basket do not survive the voyage, and the council's letter names the nick that watched.",
            "effects": {
              "streets": -4,
              "brass": -2
            }
          }
        ]
      },
      {
        "id": "hotel_sheikh_floor",
        "tone": "grief",
        "title": "THE GRESHAM HOTEL — TROUBLE ON THE SHEIKH'S FLOOR",
        "text": "The night manager of the Gresham — a man trained to describe fire as 'a warmth' — telephones to report 'a liveliness' on the fourth floor, which a Gulf sheikh has taken in its entirety for the month. The liveliness, unpacked: a falcon loose in the service stairwell, a roulette wheel audible through the royal suite door, and a photographer from the Sunday Chronicle dangling his Leica over the light-well, currently being dangled in turn by two of the sheikh's bodyguards. The manager wants discretion. The photographer, upside down, wants Weybridge.",
        "window": [
          4,
          11
        ],
        "choices": [
          {
            "label": "Send a PC up quietly — hats off in the lift, nobody's nicked.",
            "result": "The photographer is set the right way up, the falcon is retrieved by a footman with a glove the size of a bin lid, and the wheel falls silent at the sound of one police knock. The sheikh's private secretary presses a card into the PC's hand: 'His Excellency admires calm.' So does the night manager, who will remember Thorne Street at Christmas.",
            "effects": {
              "dispatchUnits": 1,
          "dispatchTurns": 2,
              "brass": 5,
              "streets": 2
            }
          },
          {
            "label": "Nick the bodyguard who hung the photographer over the drop.",
            "result": "The bodyguard comes quietly, to everyone's surprise including his own, and the Foreign Office is on the phone before the cell door shuts. The Chronicle man, ungrateful in the way of his trade, photographs the arrest.",
            "effects": {
              "arrests": 1,
              "streets": 4,
              "brass": -8,
              "relief": 3
            }
          },
          {
            "label": "Advise 'a warmth of feeling' be settled in-house. Note the book.",
            "result": "The Gresham settles it the Gresham way: the photographer leaves by the kitchen with a bottle of something older than him, and the falcon is listed in the log as 'guest property, recovered'. What the roulette wheel becomes is between the manager and his maker.",
            "effects": {
              "brass": -2,
              "streets": -2
            }
          }
        ]
      },
      {
        "id": "store_celebrity_lift",
        "title": "BARKERS & DUNN — A NAME DETAINED IN THE FOOD HALL",
        "text": "Barkers & Dunn's store detective rings, delicately, at closing: detained at the caviar counter with two jars in a coat pocket built for exactly that purpose — Dinah Vane. THE Dinah Vane, of the television. The manager is wringing his hands in both directions at once: prosecute and lose every customer who loves her, or release her and lose every floorwalker who doesn't. Miss Vane, in the back office, is signing an autograph for the man who caught her.",
        "window": [
          1,
          5
        ],
        "tone": "weary",
        "choices": [
          {
            "label": "Book her like anyone else — the law doesn't watch television.",
            "result": "Dinah Vane is charged at Thorne Street at half past ten, delightful throughout, and the desk queue applauds as she leaves on bail. Monday's papers will run her at the top of the bill and the store's name underneath, which is not what Barkers & Dunn's solicitor calls a result.",
            "effects": {
              "arrests": 1,
              "streets": 3,
              "brass": -5,
              "relief": 4
            }
          },
          {
            "label": "Caution her, quietly, out the goods entrance.",
            "result": "She takes the caution like a good review and departs through the loading bay in dark glasses, pausing to sign the store detective's notebook under his notes on her. The manager exhales for the first time in an hour. Somewhere, a precedent files itself where precedents are filed.",
            "effects": {
              "brass": 3,
              "streets": -3
            }
          },
          {
            "label": "Leave it as store business — their counter, their caviar.",
            "result": "Barkers & Dunn settle it with an account card quietly cancelled and a bill quietly paid twice over. The store detective resigns on principle on Monday, and writes to the Commissioner about it, naming the nick that never came.",
            "effects": {
              "brass": -4,
              "relief": -3
            }
          }
        ]
      },
      {
        "id": "hosp_stmarks_casualty",
        "tone": "grief",
        "title": "ST MARK'S CASUALTY — FRIDAY NIGHT, FULL HOUSE",
        "text": "The sister at St Mark's rings with the voice of a woman who has already solved everything except manpower: casualty is at capacity, two of the capacity are fighting over one trolley, and a remand patient — in for a scald, guarded by paperwork alone — has been seen practising walking with his drip stand like a man about to take it dancing. She requires a constable. She is not asking. She has been on since two and the tea trolley is down to Bovril.",
        "window": [
          6,
          13
        ],
        "choices": [
          {
            "label": "Post a PC to casualty till it thins out.",
            "result": "The uniform in the doorway works like a dose of something: the trolley dispute settles itself, the drip-stand dancer sits back down with the air of a man who was only stretching, and the sister allocates your PC one Bovril, which at St Mark's tonight is a medal.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 3,
              "streets": 4,
              "brass": 2
            }
          },
          {
            "label": "Take the remand man back to a cell where the doors lock.",
            "result": "He comes along with his scald dressed and his dignity mostly intact, complaining only about the standard of the custard. The sister signs him out with relief and the bed is filled before the porter's finished the corner.",
            "effects": {
              "arrests": 1,
              "streets": 2,
              "relief": -2
            }
          },
          {
            "label": "Tell the sister it's a hospital matter until it's a crime.",
            "result": "She takes it the way she takes everything, which is on the chin and into the notebook. At ten past four the remand man goes through casualty's doors sideways in a porter's coat, and by morning it is very much a crime, with your name in the timeline.",
            "effects": {
              "streets": -5,
              "brass": -4
            }
          }
        ]
      },
      {
        "id": "vice_judges_rover",
        "title": "UNATTENDED VEHICLE — ROPEMAKERS ROW",
        "text": "PC Whittle radios in from Ropemakers Row: a maroon Rover P6 parked across the loading bay of Feldman's fruit depot, blocking the night lorries. The registration comes back to His Honour Mr Justice Marchbanks — no form, naturally, though tonight hints at a little previous. Ropemakers Row has exactly one establishment open at this hour, and it isn't a legal bookshop — it's Renée's, second floor, red lampshade. The depot foreman wants the motor shifted, the drivers are leaning on their horns, and Whittle asks, with unbearable innocence, whether he should knock.",
        "choices": [
          {
            "label": "Tow it and let the summons land where it lands",
            "result": "The Rover goes on the lift at one a.m. and Mr Justice Marchbanks goes on the warpath by nine. Somewhere in the Strand a clerk is already drafting a letter beginning 'The Commissioner will wish to be aware.'",
            "effects": {
              "streets": 4,
              "brass": -9,
              "relief": 4
            }
          },
          {
            "label": "Have Whittle push it round the corner, say nothing",
            "result": "The lorries roll, the red lampshade glows on, and a High Court judge now owes Thorne Street a kindness he'll pretend not to remember. Justice is blind, but she knows exactly where her motor went.",
            "effects": {
              "streets": -3,
              "brass": 3,
              "favours": 1
            }
          },
          {
            "label": "Send PC Doyle to wait and escort His Honour home",
            "result": "PC Doyle stands in the drizzle for ninety minutes practising his salute. His Honour finally emerges, says 'officer' like it's a species of insect, and departs without one word of thanks.",
            "effects": {
              "streets": -2,
              "brass": 5,
              "relief": -4,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          }
        ],
        "tone": "grief",
        "window": [
          4,
          7
        ]
      },
      {
        "id": "vice_valhalla_clip",
        "venue": "greek_court",
        "title": "COMPLAINT — THE VALHALLA CLUB, GREEK COURT",
        "text": "A Norwegian ship's engineer named Olav presents himself at the front desk, damp and furious. The Valhalla Club in Greek Court — a clip joint of the old school — has relieved him of forty-two pounds for two glasses of warm lemonade and twenty minutes of conversation with a lady called Miss Tania, who vanished the moment the bill arrived, along with the door. The Valhalla is run by Maltese Freddie, a villain who considers himself a friend of the nick. Olav's ship sails at six and he wants his money or, he says, 'the Viking solution.'",
        "choices": [
          {
            "label": "Spin the Valhalla, nick the doorman and the till",
            "result": "Two collars, a till full of funny money, and Miss Tania away on her toes down the fire escape in stockinged feet. Maltese Freddie sends word he is 'disappointed,' which from Freddie is practically a summons.",
            "effects": {
              "streets": 7,
              "brass": -4,
              "relief": -3,
              "arrests": 2,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Ring Maltese Freddie and suggest a refund",
            "result": "Freddie coughs up forty-two quid in an envelope smelling of cigars, 'as a gesture between neighbours.' Olav sails at six singing something Norse; you've spent goodwill you may badly want back.",
            "effects": {
              "streets": 3,
              "brass": 2,
              "favours": -1
            },
            "sets": "flag_freddie_gesture"
          },
          {
            "label": "Explain it's a civil matter, offer him tea",
            "result": "Olav drinks the tea, calls you something unrepeatable in two languages, and heads back towards Greek Court with a docker's hook in his belt. Whatever the Viking solution is, it'll be in the book by six.",
            "effects": {
              "streets": -6,
              "relief": 2
            }
          }
        ],
        "tone": "grief",
        "window": [2, 8]
      },
      {
        "id": "vice_actor_railings",
        "title": "MALE IN COSTUME — VICTORY THEATRE REAR",
        "text": "The panda calls in a delicate one from behind the Victory Theatre: Sir Gervase Holt, the knighted classical actor, handcuffed to the railings in full Marie Antoinette costume, wig listing badly to port. He explains with tremendous diction that it is research for an experimental piece and that the cast party 'rather got away from him.' The handcuff keys have gone home with somebody called Bunny. A photographer from the Sunday Mercury is asleep in a doorway thirty yards off — for now.",
        "choices": [
          {
            "label": "Bolt-croppers, blanket, and drive Sir Gervase home",
            "result": "Sir Gervase is freed, wrapped, and delivered to Kensington reciting Lear at the dashboard. The relief note in the night's log, sourly, that they are now a taxi service for the aristocracy of pretending.",
            "effects": {
              "brass": 4,
              "relief": -3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Book him D and D, wig and all",
            "result": "The charge book reads 'occupation: knight of the realm; attire: French queen (deceased).' The relief will dine out on it for a decade; the Yard will dine on you by Tuesday.",
            "effects": {
              "streets": 3,
              "brass": -8,
              "relief": 6,
              "arrests": 1
            }
          },
          {
            "label": "Free him with the spare key and a caution",
            "result": "You leave him adjusting his wig with what dignity survives, which is some — he is a professional. The Mercury man wakes just in time to photograph the back of a departing queen, and the caption writers will manage the rest.",
            "effects": {
              "streets": -4,
              "brass": -2
            }
          }
        ],
        "tone": "weary",
        "window": [4, 11]
      },
      {
        "id": "vice_launderette_vicar",
        "window": [4, 10],
        "title": "BREAK-IN (RETRACTED) — SUDSY'S LAUNDERETTE",
        "text": "The keyholder of Sudsy's launderette on Chandos Walk reports intruders, rings back to retract, then rings a third time in tears. The tea-leaves in question are the Reverend Clifford Prebble of St Aldhelm's and Mrs Dorothy Feaver, chair of the flower rota, discovered among the service washes with a bottle of communion wine and every machine running for warmth. The keyholder wants the broken lock paid for. Mrs Feaver's husband drives the borough's only tow truck. The Reverend keeps saying it is not what it resembles.",
        "choices": [
          {
            "label": "Take lock money off the Reverend, send everyone home",
            "result": "The Reverend pays for the lock out of the poor-box float, promising to square it with God and the treasurer in that order. St Aldhelm's now owes Thorne Street, which is the nearest you will ever get to grace.",
            "effects": {
              "streets": -2,
              "brass": 2,
              "favours": 1
            }
          },
          {
            "label": "Nick the pair for breaking and entering",
            "result": "Two cells, one clergyman banged up, and a flower-rota chairwoman demanding her telephone call. By Sunday the pulpit stands empty and the borough's only tow truck attends your pandas dead last.",
            "effects": {
              "streets": 4,
              "brass": -6,
              "relief": -3,
              "arrests": 2
            }
          },
          {
            "label": "Ring Mr Feaver to come and collect his wife",
            "result": "Mr Feaver arrives with the tow truck and, showing great economy of feeling, hooks it to the Reverend's Morris Traveller while his wife watches from the cab. Further proceedings will be domestic and require no police.",
            "effects": {
              "streets": -3,
              "relief": 4
            }
          }
        ],
        "tone": "weary"
      },
      {
        "id": "vice_clutterbuck_blackmail",
        "title": "BLACKMAIL — SIR DENIS CLUTTERBUCK, AT THE DESK",
        "text": "Sir Denis Clutterbuck, of Clutterbuck & Sons department store ('Everything For The Home Since 1888'), arrives at the desk at midnight holding a note demanding five hundred pounds by Sunday or 'the photographs go to your wife, your board and the Drapers' Gazette.' He will not say what the photographs show, only that they were taken at 'a private evening of a theatrical nature.' He wants police protection, total discretion, and no paperwork whatsoever — in that order. Somewhere out on the manor, a blackmailer is feeling extremely clever.",
        "choices": [
          {
            "label": "Insist on a proper file or no protection",
            "result": "Sir Denis goes white, retrieves the note, and leaves vowing to handle it privately, which men who say that never do. The file stays open with one sheet in it, which is one more than the Yard usually manages.",
            "effects": {
              "streets": -3,
              "brass": 4
            }
          },
          {
            "label": "Put an obbo on Sunday's drop",
            "result": "Sunday's watching brief yields one blackmailer: the doorman of the private evening in question, captured still wearing his epaulettes. The photographs, seized as evidence, confirm that 'theatrical' was doing heroic work in that sentence.",
            "effects": {
              "streets": 6,
              "brass": 3,
              "relief": -4,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 3
            },
            "risk": {
              "odds": 60,
              "failResult": "Sunday's watching brief watches a man in epaulettes clock the obbo van from fifty yards — doors and who loiters near them being his entire profession — and stroll off whistling. Monday, the Drapers' Gazette receives its photographs, and Sir Denis's solicitor writes to the Commissioner naming the officer who promised discretion.",
              "failEffects": {
                "streets": -4,
                "brass": -7
              }
            }
          },
          {
            "label": "Advise him quietly to pay up",
            "result": "Sir Denis pays, the photographs stay theoretical, and the blackmailer learns that Clutterbuck's delivers. Expect him back at Christmas with a new note and firmer prices.",
            "effects": {
              "streets": -5,
              "brass": -3,
              "relief": 2
            }
          }
        ],
        "tone": "grief",
        "window": [
          4,
          7
        ]
      },
      {
        "id": "vice_achilles_club",
        "title": "AFFRAY — THE ACHILLES CLUB, CADOGAN ROW",
        "text": "The night porter of the Achilles Club telephones in a whisper. General Sir Redvers Coote (retired) and Mr Hector Prowse, proprietor of the Daily Meteor, have come to blows over a baccarat debt in the smoking room — where, the porter admits before he can stop himself, there is a baccarat table, a croupier and a cash box. The club secretary comes on the line offering 'the committee's fullest cooperation' in a voice that means precisely the opposite. Illegal gaming is a collar anywhere else on the ground; in Cadogan Row it is a career decision.",
        "choices": [
          {
            "label": "Go in mob-handed, seize table and cash box",
            "result": "One croupier collared and a cash box holding more than the relief earns in a year. By breakfast four club members have telephoned the Deputy Assistant Commissioner, who is a fifth.",
            "effects": {
              "streets": 5,
              "brass": -11,
              "relief": 3,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Accept the committee's cooperation and Widows' Fund donation",
            "result": "The Widows' and Orphans' Fund is a hundred pounds richer and the smoking room is back to whist by two o'clock, allegedly. The General and Mr Prowse settle their differences the traditional way: in print.",
            "effects": {
              "streets": -4,
              "brass": 5,
              "relief": 2
            }
          },
          {
            "label": "Send PC Duffin to take statements very slowly",
            "result": "PC Duffin takes statements in longhand for two hours, during which the table folds itself away and every witness develops amnesia and gout. He returns with nothing for the charge sheet and a very good cigar.",
            "effects": {
              "streets": 1,
              "brass": -3,
              "relief": 4,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          }
        ],
        "tone": "grief",
        "window": [
          1,
          8
        ]
      },
      {
        "id": "vice_estelle_suite14",
        "window": [5, 11],
        "title": "TELEPHONE — MADAME ESTELLE, RE: A LOCKED DOOR",
        "text": "Madame Estelle of the Cavendish Escort Agency ('Companionship For The Discerning') rings the back line she isn't supposed to have. One of her ladies is in Suite 14 of the Hotel Splendide with a client who has declined to pay, locked himself in the bathroom, and begun singing hymns. Estelle mentions, delicately, that the gentleman does the birdwatching programme on the television, and that she has always been so very helpful to Thorne Street with her little pieces of information — which is true; she is the best snout on the manor, and knows it.",
        "choices": [
          {
            "label": "Send PC Whittle to resolve Suite 14 quietly",
            "result": "PC Whittle talks the birdwatcher out through the door with the promise of a taxi and total amnesia. Estelle is grateful, the Splendide is grateful, and somewhere a nightjar documentary continues unclouded.",
            "effects": {
              "streets": 2,
              "relief": -2,
              "favours": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Spin Estelle's drum while she's distracted",
            "result": "The ledgers name half the guest list of the Lord Mayor's banquet, which is exactly why the Yard takes the case off you by noon. Estelle's last piece of information, freely given: 'You've made a mistake, dear.'",
            "effects": {
              "streets": 5,
              "brass": -8,
              "relief": -2,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Tell her the Met is not her doorman",
            "result": "Estelle goes quiet in a way that cancels every whisper she was going to sell you this winter. The hymns, a passing chambermaid reports, have moved on to the entire Book of Common Praise.",
            "effects": {
              "streets": -5,
              "relief": 3
            }
          }
        ],
        "tone": "weary"
      },
      {
        "id": "vice_stage_door_chalmers",
        "title": "DISTURBANCE — STAGE DOOR, REGAL VARIETIES",
        "text": "The house manager of the Regal Varieties rings in a lather. Tommy 'Cheeky' Chalmers, the family comedian off the wireless, is barricaded in dressing room three with Miss Yvette DuBarry of the dancing DuBarrys, while Mrs Chalmers stands at the stage door with a rolling pin and a growing, appreciative crowd. The late second house — the Friday midnight special — goes up in forty minutes and Cheeky is top of the bill. The crowd has started a chant. No law has been broken yet; the Old Bill are wanted here strictly as an audience.",
        "choices": [
          {
            "label": "Send a unit to disperse the crowd",
            "result": "The crowd moves on with the reluctance of people leaving a better show than the one inside. Mrs Chalmers is helped into a taxi, from which she raps the window at the stage door like the ghost of Christmas Yet To Come.",
            "effects": {
              "streets": 4,
              "relief": -3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Go down yourself and broker terms",
            "result": "You negotiate a settlement: Cheeky does the second house, Mrs Chalmers gets the better half of the takings, and Miss DuBarry exits via the orchestra pit. Nobody thanks you, which is how you know it was fair.",
            "effects": {
              "streets": 3,
              "brass": -3,
              "relief": 2
            }
          },
          {
            "label": "Let it play out — it's a domestic",
            "result": "The rolling pin meets the dressing-room door at half past nine and the second house gets a better act than the one advertised. The Mercury's headline writes itself: CHEEKY BROUGHT DOWN BY THE MISSUS.",
            "effects": {
              "streets": -6,
              "brass": -2,
              "relief": 2
            }
          }
        ],
        "tone": "weary",
        "window": [
          3,
          6
        ]
      },
      {
        "id": "vice_turkish_baths",
        "window": [6, 12],
        "title": "AFTER HOURS — IMPERIAL TURKISH BATHS, VESTRY ST",
        "text": "The night attendant at the Imperial Turkish Baths rings in, hopeful of overtime. Locked in the steam room after hours: a rear admiral, the borough's chief fire officer, an alderman, and two hostesses from the Pink Flamingo, together with a crate of champagne and a gramophone. All five are wearing towels and expressions of civic innocence. The rear admiral has twice said the words 'do you know who I am,' which the attendant wrote down, in case. No claret, no tea-leaves, nothing taken but the waters — which is why it will take all night.",
        "choices": [
          {
            "label": "Every name in the occurrence book",
            "result": "Five names, two occupations entered as 'dance instructress,' and an alderman asking if this could possibly wait until after the by-election. The attendant gets his overtime; you get a memo headed PRIVATE AND CONFIDENTIAL by Monday.",
            "effects": {
              "streets": 4,
              "brass": -9,
              "relief": 3
            }
          },
          {
            "label": "Escort the dignitaries home, towels and all",
            "result": "Three pillars of the establishment go home in a panda wearing towels and one fire-brigade greatcoat between them. The relief drive in total silence, which will cost you more than words would.",
            "effects": {
              "streets": -3,
              "brass": 5,
              "relief": -4,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Let them steam till dawn",
            "result": "You rule it a private function on private premises and go back to your tea. At six the attendant unlocks the door on three boiled dignitaries and two hostesses who have won every hand of gin rummy played since two.",
            "effects": {
              "streets": -4,
              "brass": -2,
              "relief": 3
            }
          }
        ],
        "tone": "weary"
      },
      {
        "id": "vice_film_evening",
        "title": "PRIVATE FILM EVENING — CROWN & SCEPTRE",
        "text": "PC Dodds, off duty and unfortunate, reports that the Chamber of Trade's 'Gentlemen's Film Evening' upstairs at the Crown & Sceptre is not, as billed on the door, highlights of the Ideal Home Exhibition. The projectionist is Mr Purley the undertaker; the films are Danish, blue as a gas flame, and came over in a lorry belonging to the landlord's brother; and the front row contains both magistrates who sign Thorne Street's warrants. Dodds would like guidance on whether, officially, he saw anything.",
        "choices": [
          {
            "label": "Raid it: seize films, projector and Mr Purley",
            "result": "Mr Purley comes quietly, as befits his trade. Both magistrates have it away on their toes through the gents' window, and every warrant you send up the road for the next year will be read very, very slowly.",
            "effects": {
              "streets": 5,
              "brass": -12,
              "relief": 2,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Send word: lights up, films gone by midnight",
            "result": "The evening concludes abruptly with an actual slide of the Ideal Home Exhibition, and the Danish reels leave in the undertaker's hearse, which everyone agrees is fitting. The bench remains friendly and officially uninformed.",
            "effects": {
              "streets": -2,
              "brass": 4
            }
          },
          {
            "label": "Confiscate the films as evidence, no collars",
            "result": "The reels are booked in as evidence and, by an administrative miracle, screened for continuity purposes at the section house on Tuesday. Morale has not stood higher since the 1966 World Cup.",
            "effects": {
              "streets": 2,
              "brass": -4,
              "relief": 8,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          }
        ],
        "tone": "grief",
        "window": [
          1,
          4
        ]
      },
      {
        "id": "gang_market",
        "title": "PROTECTION — CHAPEL YARD MARKET",
        "text": "Sgt Bream puts his head round the door with a deputation from Chapel Yard Market: three stallholders and Cyril Pocock of the Amalgamated Street Traders' Federation. Somebody is collecting 'insurance' — two large gentlemen in a Ford Zodiac, a pound a pitch — and this month's third accidental brazier fire has just claimed Nobby Hale's chestnut stall. Pocock wants action tonight. The gentlemen in the Zodiac, word on the manor goes, drink with Tommy Rice's firm.",
        "choices": [
          {
            "label": "Sit on the market from the tea stall",
            "result": "Two PCs spend half the night got up as porters, developing a taste for whelks. The Zodiac clocks them inside the hour and takes its collecting to somebody else's ground — which is, technically, a result.",
            "effects": {
              "streets": 6,
              "dispatchUnits": 2,
              "dispatchTurns": 3
            }
          },
          {
            "label": "Have a quiet word with Tommy Rice",
            "result": "Tommy swears blind it isn't his firm, which means it is, and the collections stop by Tuesday. Nothing in writing, nothing in the occurrence book — which is rather the point, and rather the problem.",
            "effects": {
              "streets": 4,
              "brass": -4
            },
            "risk": {
              "odds": 50,
              "failResult": "Tommy swears blind it isn't his firm, and this time it isn't — the Zodiac belongs to an outfit from across the water, who take your visit to Rice as the Met picking a side. By Friday there are two firms collecting on Chapel Yard, and Nobby Hale's new chestnut stall makes it four braziers.",
              "failEffects": {
                "streets": -7,
                "brass": -3
              }
            }
          },
          {
            "label": "Take statements, pass it to CID's morning men",
            "result": "CID will look at it Monday, by which time the brazier count will be four. Pocock departs calling you 'as much use as a chocolate fireguard', which stings, because it's apt.",
            "effects": {
              "streets": -6,
              "brass": 3
            }
          }
        ],
        "tone": "grief",
        "window": [
          1,
          8
        ]
      },
      {
        "id": "gang_wages_van",
        "title": "ARMED BLAG — WAGES VAN, IRONMONGER LANE",
        "text": "The teleprinter chatters: Security Express van done over outside Pargeter's Tool Works, Ironmonger Lane — Friday wages gone, shooters shown, one guard's helmet dented with his own clipboard. Three villains have it away in a Mark 2 Jaguar towards the Westway. It's the third wages blag this month across three divisions, and the Yard's morning conference will want to know what Thorne Street did about it while the tyres were still warm.",
        "choices": [
          {
            "label": "Flood the ground — roadblocks on every arterial",
            "result": "You net two minicabs, a milk float and an actuary with no explanation for his evening. The Jag turns up burnt out in Perivale — someone else's manor, which is the main thing.",
            "effects": {
              "streets": 7,
              "relief": -5,
              "dispatchUnits": 3,
              "dispatchTurns": 2
            },
            "risk": {
              "odds": 55,
              "failResult": "The Mark 2 meets your Westway block doing eighty and doesn't stop — a panda loses a wing, one of the block crew loses his footing into the ditch, and the shooters wave on the way past. The Yard's morning conference hears that Thorne Street had them and let them through, which is truer than you'd like.",
              "failEffects": {
                "streets": -6,
                "relief": -6
              }
            }
          },
          {
            "label": "Circulate the description and leave it to the Squad",
            "result": "The Flying Squad acknowledge your telex the way a lion acknowledges an antelope, and your relief stay warm and grateful. By ten the blaggers are buying doubles in a Fulham saloon bar and your name is mud at morning prayers.",
            "effects": {
              "streets": -6,
              "brass": -3,
              "relief": 3
            }
          },
          {
            "label": "One unit to the scene — guard, witnesses, forensics",
            "result": "The guard's statement runs to two men, 'biggish', 'in balaclavas'. Forensics lift a beautiful palm print off the cash tray, which turns out to be the guard's.",
            "effects": {
              "streets": 3,
              "brass": 5,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          }
        ],
        "tone": "grief",
        "window": [
          1,
          6
        ]
      },
      {
        "id": "gang_scrapyard",
        "title": "AFFRAY — BAGLEY'S WHARF SCRAPYARD",
        "text": "The front desk rings up: the Meakin brothers and the Sturrock boys are settling ownership of three tons of ecclesiastical lead at Bagley's Wharf scrapyard, using shovels. Old man Meakin is up in a crane bucket shouting genealogy; a Sturrock has set fire to something ceremonial. A crowd is gathering along the wharf fence and an enterprising soul is selling toffee apples. The lead, incidentally, matches the roof St Aidan's lost on Wednesday.",
        "choices": [
          {
            "label": "Send the van, nick the ringleaders of both clans",
            "result": "Three bodies banged up by midnight, each giving his name as 'Meakin'. The Sturrocks send round a crate of brown ale for the relief, which you confiscate as far as your office.",
            "effects": {
              "streets": 8,
              "relief": -3,
              "arrests": 3,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Let honour run its course — log an industrial dispute",
            "result": "By two a.m. both families retire to Casualty in convoy, satisfied. The lead has had it away during the proceedings, along with, mysteriously, the weighbridge.",
            "effects": {
              "streets": -7,
              "relief": 3
            }
          },
          {
            "label": "Talk old Meakin down and broker a truce yourself",
            "result": "You divide the lead like Solomon and old Meakin pronounces you 'a fair {man}, for filth'. He owes you one now, which is worth considerably more than the lead.",
            "effects": {
              "streets": 5,
              "brass": -3,
              "favours": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          }
        ],
        "tone": "grief",
        "window": [
          1,
          4
        ]
      },
      {
        "id": "gang_longfirm",
        "title": "SUSPECT VEHICLES — WINGATE & DAUGHTERS (WHOLESALE)",
        "text": "A night watchman rings up: lorries loading out of Wingate & Daughters, Wholesale Fancy Goods, Corn Exchange Road — at two in the morning. The firm has traded eight months on immaculate credit: cuckoo clocks, electric blankets, four hundred gross of Christmas crackers, all ordered, all paid for promptly. Until this week. Now the warehouse is emptying into unmarked Bedfords, which is exactly what a long firm looks like on its very last night.",
        "choices": [
          {
            "label": "Spin the lorries now and nick the drivers",
            "result": "Two drivers, one lorry-load of electric blankets, and the incandescent fury of the Fraud Squad, who had six months' work on the principals — now, as of tonight, in Alicante.",
            "effects": {
              "streets": 5,
              "brass": -6,
              "arrests": 2,
              "dispatchUnits": 2,
              "dispatchTurns": 3
            }
          },
          {
            "label": "Ring the Fraud Squad duty officer and hold off",
            "result": "The Fraud Squad man notes your call, thanks you warmly, and goes back to bed. By dawn Wingate & Daughters is an empty shed with a sign saying UNDER NEW MANAGEMENT.",
            "effects": {
              "streets": -5,
              "brass": 4
            }
          },
          {
            "label": "Put one PC on index numbers, discreetly",
            "result": "Fourteen registrations, twelve on false plates. The Fraud Squad call it the first useful thing the wooden-tops have given them since the war, which they intend as a compliment.",
            "effects": {
              "streets": 2,
              "brass": 3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          }
        ],
        "tone": "grief",
        "window": [
          8,
          11
        ]
      },
      {
        "id": "gang_snout",
        "title": "SNOUT — 'CHALKY' VESTA, PRICE ON REQUEST",
        "text": "Chalky Vesta materialises in the back yard, smelling of rum and pickled eggs, with the air of a man holding aces. He knows who's setting up the Post Office job in Delamere Street — names, dates, the inside man. His price: twenty quid from the informants' fund, which is empty until Monday, or alternatively you could see your way to losing his brother's careless-driving summons. Chalky is prepared to wait. The Post Office job isn't.",
        "choices": [
          {
            "label": "Pay him from your own pocket",
            "result": "Twenty quid lighter, you get names that check out beautifully. If A10 — anti-corruption — ever ask, it was a win on the dogs at Harringay.",
            "effects": {
              "streets": 7,
              "brass": -3
            },
            "risk": {
              "odds": 55,
              "failResult": "Twenty quid lighter, you get names that check out beautifully right up until the Delamere Street Post Office goes over on Thursday — a different firm entirely, Chalky's aces being last year's deck. He is heard in the Feathers standing rum all round, toasting 'the fund.'",
              "failEffects": {
                "streets": -7
              }
            }
          },
          {
            "label": "Call in a favour — get the fund opened early",
            "result": "The chief clerk opens the fund at midnight for the first time in Met history. Chalky delivers, the Delamere Street firm gets turned over at the planning stage, and nobody's conscience is troubled — a rarity all round.",
            "effects": {
              "streets": 8,
              "favours": -1
            }
          },
          {
            "label": "Lose the brother's summons",
            "result": "The summons goes the way of all flesh and the information is gold. Somewhere in Central Ticket Office a clerk notices a gap in the sequence and starts a memo that will find you eventually.",
            "effects": {
              "streets": 7,
              "brass": -8
            }
          },
          {
            "label": "Send him packing — the fund's shut",
            "result": "Chalky shrugs and flogs it to a crime reporter instead. Tuesday's front page covers the Delamere Street job at length, with quotes from 'police sources' who were plainly not you.",
            "effects": {
              "streets": -6
            }
          }
        ],
        "tone": "grief",
        "window": [
          2,
          5
        ]
      },
      {
        "id": "gang_salmon",
        "title": "HIJACK — 2,000 TINS OF RED SALMON",
        "text": "A Pelham's Provisions lorry is hijacked at the lights on Garrick Way, the driver overpowered by a man he can only describe as 'enormous'. The cargo: two thousand tins of Ocean Monarch Finest Red Salmon, bound for the Co-op. By one a.m. half the pubs on the patch have salmon sandwiches on, the Feathers is advertising 'Salmon Suppers', and Sgt Bream has gone strangely evasive on the subject of the canteen.",
        "choices": [
          {
            "label": "Spin the cellar of the Bricklayer's Arms",
            "result": "Four hundred tins recovered and the landlord nicked, protesting he bought them off 'a bloke'. The canteen goes into mourning.",
            "effects": {
              "streets": 6,
              "relief": -4,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Re-interview the driver about his enormous assailant",
            "result": "Under gentle questioning the giant shrinks steadily until he is the driver's brother-in-law Keith. One body in the cells; one thousand nine hundred tins still at large in the borough's sandwiches.",
            "effects": {
              "streets": 4,
              "brass": 2,
              "arrests": 1
            }
          },
          {
            "label": "Mark it 'enquiries continuing', let the insurers grieve",
            "result": "The relief eats well. Sgt Bream brings you a salmon sandwich on a doily, and you decide, on balance, not to ask.",
            "effects": {
              "streets": -5,
              "relief": 3
            }
          }
        ],
        "tone": "weary",
        "window": [
          7,
          10
        ]
      },
      {
        "id": "gang_wigs",
        "title": "HIJACK — CONSIGNMENT OF NOVELTY WIGS",
        "text": "The teleprinter again: three thousand novelty wigs — Vikings, judicial perukes, a gross of 'Lady Godivas' — had away from a lay-by on the North Circular, en route to Bagshawe's Christmas grotto. By midnight the borough's nightlife has gone fancy-dress. Two drunks in perukes are fighting outside the Mecca ballroom, and the only witness to a handbag snatch on Verity Street can describe the tea-leaf solely as 'a Viking'.",
        "choices": [
          {
            "label": "Squeeze the Mecca doorman about his new peruke",
            "result": "The doorman, magnificent in horsehair, gives up a lock-up in Ferrier Street inside ten minutes. Two thousand wigs recovered; the missing thousand are now a problem for social historians.",
            "effects": {
              "streets": 5,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Confiscate every wig on sight — breach of the peace",
            "result": "The property store fills with horsehair and three formal complaints arrive by dawn, one from a genuine circuit judge on his way home from a lodge dinner.",
            "effects": {
              "streets": 3,
              "brass": -4,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            }
          },
          {
            "label": "They're only wigs — let it wash through",
            "result": "Identification parades are off for a fortnight: every line-up is a Viking. Sgt Bream books out a Lady Godiva 'for evidential purposes' and declines to be drawn further.",
            "effects": {
              "streets": -4,
              "relief": 3
            }
          }
        ],
        "tone": "weary",
        "window": [
          5,
          8
        ]
      },
      {
        "id": "gang_homecoming",
        "title": "GATHERING OF FACES — WATERMAN'S REST PH",
        "text": "Word from the collator: Albie Sorrell, out of Parkhurst on Tuesday after a nine-stretch, is holding court in the saloon of the Waterman's Rest. Pints lined up along the piano, envelopes travelling one way, and every face on the manor queueing to pay respects like it's a coronation. It is either the richest gathering of criminal intelligence since the Yard's Christmas do, or the planning meeting for something you'll be reading about in the evening paper.",
        "choices": [
          {
            "label": "Walk in alone and pay your respects",
            "result": "Albie stands you a light ale and pronounces you 'a {gentleman} copper of the old school'. You learn three useful things and one thing about a Commander you'd have paid not to.",
            "effects": {
              "streets": 3,
              "brass": -4,
              "relief": 2
            },
            "risk": {
              "odds": 45,
              "failResult": "Albie stands you the light ale, then raises it to 'my old mate the Inspector' at a volume the whole saloon is meant to hear, and forty faces file it away. You learn nothing, and by morning half the manor has you on Albie's payroll and the other half is wondering what he paid.",
              "failEffects": {
                "streets": -4,
                "brass": -6,
                "relief": -3
              }
            }
          },
          {
            "label": "Plant PC Duffin, plain clothes, at the corner table",
            "result": "PC Duffin nurses one half of mild for four hours and fills a notebook with who paid, who bowed and who didn't. The collator declares it the finest night's work since 1971.",
            "effects": {
              "streets": 2,
              "brass": 5,
              "dispatchUnits": 1,
              "dispatchTurns": 3
            }
          },
          {
            "label": "Raid it for after-hours drinking, take every name",
            "result": "Two minor faces nicked for obstruction, and Albie thanks you — sincerely — for making his homecoming legendary. His brief has the Commander's home number and uses it before closing time.",
            "effects": {
              "streets": 4,
              "brass": -6,
              "arrests": 2,
              "dispatchUnits": 3,
              "dispatchTurns": 1
            }
          },
          {
            "label": "A man may drink with friends. Leave it",
            "result": "By last orders the envelopes have funded something. You'll find out what in about three weeks, most likely by teleprinter.",
            "effects": {
              "streets": -5,
              "relief": 2
            }
          }
        ],
        "tone": "grief",
        "window": [
          3,
          6
        ]
      },
      {
        "id": "gang_sweeney",
        "title": "FLYING SQUAD — REQUEST TO BORROW PRISONER",
        "text": "Two Flying Squad officers arrive at three a.m. in camel coats and a bronze Granada, radiating aftershave and entitlement. They would like to 'borrow' Georgie Platt from your cells — just for a drive, so he can point out a slaughter where certain proceeds are resting. No paperwork, obviously; paperwork frightens the horses. Georgie is your prisoner, entered in your charge book, and whatever happens on that drive will be wearing your signature.",
        "choices": [
          {
            "label": "Hand him over and sign nothing",
            "result": "Georgie returns at six with mud on his shoes and a sudden enthusiasm for cooperation. Should the book ever come up in court, it will come up holding your hand.",
            "effects": {
              "streets": 5,
              "brass": -7
            }
          },
          {
            "label": "Production order or nothing — by the book",
            "result": "The Squad men leave calling you a wooden-top and a uniform-carrier, which from them is nearly an honour. Whatever's in the slaughter will be in Marbella by Monday, but the charge sheet stays immaculate.",
            "effects": {
              "streets": -4,
              "brass": 4,
              "relief": 2
            }
          },
          {
            "label": "Send Sgt Bream along as official escort",
            "result": "Bream rides in the back between two camel coats, memorising everything. Two shooters recovered, and everyone's paperwork agrees — the night's one authentic miracle.",
            "effects": {
              "streets": 6,
              "brass": -3,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            },
            "risk": {
              "odds": 55,
              "failResult": "The slaughter is an empty lock-up, and Georgie, sensing the mood, steps out at the second set of lights and is gone between the camel coats like a whippet through a gate. The Squad drive off arguing whose fault it is, leaving Bream on the kerb holding the paperwork — which, as they point out on departure, is wearing your signature.",
              "failEffects": {
                "streets": -5,
                "brass": -8
              }
            }
          }
        ],
        "tone": "grief",
        "window": [
          10,
          16
        ]
      },
      {
        "id": "gang_alibi",
        "title": "VOLUNTARY SURRENDER — D. MARSH, SOBER",
        "text": "Dennis 'the Deacon' Marsh presents himself at the front counter at 11.40, breathes gin at Sgt Corcoran with theatrical effort, and formally demands to be nicked for D and D. He is sober as a churchwarden and twice as smug. Somewhere across London tonight, something is being blagged, and Dennis would very much like a line in the charge book proving he was nowhere near it.",
        "choices": [
          {
            "label": "Refuse him — he's stone-cold sober",
            "result": "Corcoran turfs him out with a ceremony the relief will re-enact for weeks. When the Garrard Row telex lands at four, Dennis's brief subpoenas Corcoran to swear his client was refused a cell while sober — which, infuriatingly, he was.",
            "effects": {
              "streets": -5,
              "relief": 2
            }
          },
          {
            "label": "Oblige him — nick him and sweat him all night",
            "result": "Dennis sings hymns in cell three and answers nothing. You've gift-wrapped his alibi, but at least you know precisely where one villain in London isn't.",
            "effects": {
              "streets": 3,
              "brass": -3,
              "arrests": 1
            }
          },
          {
            "label": "Get on the blower round the divisions — something's on tonight",
            "result": "Four duty officers thank you; a fifth says 'we know, it's ours' and hangs up. When the flag goes up in D Division, Thorne Street at least smells of roses.",
            "effects": {
              "streets": -2,
              "brass": 4
            }
          }
        ],
        "tone": "grief",
        "window": [
          4,
          7
        ]
      },
      {
        "id": "grime_clarence_chuckout",
        "title": "DISTURBANCE — DUKE OF CLARENCE PH",
        "text": "Closing time, and the landlord of the Duke of Clarence is on the line in a whisper. A retirement do for Mick the Brick — twenty years an honest villain of the wrestling ring — has declined to acknowledge the bell. Forty guests, a turn booked for midnight that the landlord won't name over the phone, and the guest of honour has the cellarman in what witnesses describe as an affectionate headlock. The brewery's area manager, unfortunately, is among the guests.",
        "choices": [
          {
            "label": "Send PC Whittle and a mate to call time properly",
            "result": "The pub empties in twenty minutes, though PC Whittle's helmet comes off Mick's head only after a signed photograph has been negotiated.",
            "effects": {
              "streets": 5,
              "relief": -4,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Suggest the landlord declare a private function",
            "result": "Peace on the street and forty happy drinkers behind drawn curtains — until the licensing skipper's snout, refused entry on the door, writes the whole evening down.",
            "effects": {
              "streets": -3,
              "brass": -4
            }
          },
          {
            "label": "Call in your favour with Mick's promoter",
            "result": "One phone call and the promoter arrives to remind Mick about next Saturday at the Fairfield Halls; the do ends in autographs all round and the cellarman is released with full honours.",
            "effects": {
              "streets": 4,
              "relief": 2,
              "favours": -1
            }
          }
        ],
        "tone": "weary",
        "window": [
          1,
          4
        ]
      },
      {
        "id": "grime_callow_domestic",
        "title": "DOMESTIC — CALLOW COURT, FLAT 9",
        "text": "Mrs Prewitt of Callow Court reports the Ellams at it again in Flat 9 — crockery airborne, language 'unchristian', third Friday running. A weary one of long standing: last time you sent men up, both Ellams turned on them as one, and PC Doyle still carries the mark of a Coronation mug. Mrs Prewitt mainly wants the shouting stopped before the epilogue comes on, though she is threatening to ring the Commissioner personally, whose home number she claims to have.",
        "choices": [
          {
            "label": "Send a pair round mob-handed",
            "result": "The Ellams unite instantly against the common enemy, as is tradition; the shouting stops, having merely been redirected.",
            "effects": {
              "streets": 4,
              "relief": -5,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Send PC Duffin up alone — he has a way with couples",
            "result": "Duffin makes tea, admires the surviving crockery, and has them reminiscing about their wedding by half past. He does this every month and it never takes.",
            "effects": {
              "streets": 3,
              "relief": -2,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Advise Mrs Prewitt to turn the telly up",
            "result": "Peace descends at 11.40 when the Ellams run out of crockery; Mrs Prewitt begins her letter to the Commissioner in longhand.",
            "effects": {
              "streets": -5,
              "brass": -2
            }
          },
          {
            "label": "Nick the pair of them",
            "result": "Locked up in adjoining cells, they carry on the argument through the wall in a sort of Morse; the station sergeant applies for a transfer.",
            "effects": {
              "streets": 5,
              "brass": -3,
              "relief": -2,
              "arrests": 2,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            }
          }
        ],
        "tone": "weary",
        "window": [
          1,
          4
        ]
      },
      {
        "id": "grime_sleepwalking_pensioner",
        "window": [9, 15],
        "title": "MALE DIRECTING TRAFFIC — HORSEFERRY LANE JCT",
        "text": "The beat man calls in a gentleman in pyjamas, dressing gown and one slipper directing traffic at the Horseferry Lane junction. He is, on inspection, fast asleep. He is also, on inspection, doing it better than the lights, which have been stuck on amber since Tuesday. A bus inspector has lodged a complaint; three minicab drivers have lodged compliments. Neighbours name him as Mr Albert Munce, 78, formerly of the Royal Corps of Military Police.",
        "choices": [
          {
            "label": "Have PC Duffin steer him gently home",
            "result": "PC Duffin guides him home by the elbow; Mr Munce salutes the wardrobe, disciplines the coat stand for slovenliness, and returns to bed still asleep.",
            "effects": {
              "streets": 3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Leave him — traffic's never flowed better",
            "result": "Horseferry Lane enjoys its finest hour until the Borough Chronicle's night man gets a photograph; Saturday's caption reads MET RECRUITS SLEEPING PENSIONER, FINDS HIM SUPERIOR.",
            "effects": {
              "streets": 2,
              "brass": -6
            }
          },
          {
            "label": "Wake him and nick him for obstruction",
            "result": "He wakes in Cell 3 convinced he has died and been posted somewhere warm; the station sergeant does not correct him as quickly as he might.",
            "effects": {
              "streets": 1,
              "brass": -5,
              "relief": -3,
              "arrests": 1
            }
          }
        ],
        "tone": "weary"
      },
      {
        "id": "grime_lost_coach",
        "title": "COACH PARTY, LOST — FRONT OFFICE",
        "text": "Fog thickening off the river, and a 42-seater from the Pontardulais Ladies' Chapel Guild has been circling the borough since ten in search of a Bayswater hotel. The driver has given up and parked outside the nick. The Guild are now in your front office singing 'Bread of Heaven' in four-part harmony, and the skipper on the desk reports his ears going and his resolve with them. The driver is asking, {man} to {man}, for a miracle.",
        "choices": [
          {
            "label": "Send PC Whittle to escort the coach to Bayswater",
            "result": "PC Whittle leads the coach through the fog at walking pace and is presented on arrival with a commemorative tea towel and three verses of blessing.",
            "effects": {
              "relief": 3,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Park them in the canteen till the fog lifts",
            "result": "They drink the urn dry, reorganise the cutlery, and convert Sgt Bream to Methodism by 3 am; the Chief Superintendent later receives a letter of thanks, in Welsh.",
            "effects": {
              "brass": 2,
              "relief": -5
            }
          },
          {
            "label": "Draw the driver a map and wave them off",
            "result": "The coach is next reported at 4 am on the wrong side of the river, hymns still audible through the fog.",
            "effects": {
              "streets": -4
            }
          }
        ],
        "tone": "weary",
        "window": [
          2,
          8
        ]
      },
      {
        "id": "grime_greyhound_loose",
        "title": "GREYHOUND LOOSE — HIGH STREET",
        "text": "Wandle Park dog track on the blower: Marvellous Boy, second favourite for tomorrow's November Guineas, has cleared the rails mid-race and is proceeding along the High Street at a steady forty. A butcher reports the loss of a tray of chops; a gentleman outside the Feathers reports being overtaken by 'a ghost'. The track manager mentions, delicately, that the syndicate who own the dog are men who remember a kindness.",
        "choices": [
          {
            "label": "Turn out two units with the dog van",
            "result": "Marvellous Boy is cornered in the bus depot at half one and surrenders in exchange for the remaining chops, dignity intact on both sides. The dog van is thoroughly greyhounded and off the road for the night — Division are informed the Section is spoken for.",
            "effects": {
              "spendDogs": 1,
              "streets": 4,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Recover him quietly — one man, no paperwork",
            "result": "The dog is back in his kennel by two and nothing troubles the occurrence book; a man rings shortly after to say the guvnor of Thorne Street has friends at the track now.",
            "effects": {
              "streets": 2,
              "brass": -3,
              "favours": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 3
            }
          },
          {
            "label": "Tell the track to send their own kennel lads",
            "result": "By 2 am Marvellous Boy has been sighted in three boroughs and beaten a number 37 bus over a measured quarter mile; the butcher writes to the Chronicle.",
            "effects": {
              "streets": -5
            }
          }
        ],
        "tone": "weary",
        "window": [
          1,
          4
        ]
      },
      {
        "id": "grime_washerama_affray",
        "venue": "washerama",
        "title": "AFFRAY — WASHERAMA LAUNDERETTE, BIDDER ST",
        "text": "The Washerama on Bidder Street. A service-wash mix-up has delivered Mr Kosky's shirts to Mrs Dunkley and Mrs Dunkley's unmentionables to Mr Kosky, and neither will surrender the other's washing until their own is produced. The attendant has locked herself in the back with the soap. Somebody has now put a boot through a tumble dryer, and a crowd is gathering — the Washerama being, in November, the warmest room on the street.",
        "choices": [
          {
            "label": "Send PC Whittle to arbitrate the exchange",
            "result": "PC Whittle conducts the handover across the folding table like a border prisoner swap; both parties leave dissatisfied, which in laundry matters counts as justice.",
            "effects": {
              "streets": 4,
              "relief": -2,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Nick whoever booted the dryer",
            "result": "The dryer-kicker proves to be the attendant's husband; she asks, through the door, whether you could possibly keep him under lock and key until Tuesday.",
            "effects": {
              "streets": 3,
              "brass": 2,
              "relief": -2,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Let it spin itself out",
            "result": "It escalates to thrown Daz and a brief hostage situation involving a bag of pegs; by midnight the crowd has picked sides and someone is selling tea.",
            "effects": {
              "streets": -5
            }
          }
        ],
        "tone": "weary",
        "window": [
          1,
          4
        ]
      },
      {
        "id": "grime_crane_protest",
        "window": [3, 9],
        "title": "MALE ALOFT — MELDON STREET CRANE",
        "text": "A man is sixty feet up the crane on the Meldon Street redevelopment and declines to come down. Not a jumper — he has taken up sandwiches, a flask, and a placard reading NOT TILL DORIS APOLOGISES. He is Ronnie Futtock, pigeon fancier; Doris is his partner in the loft, who sold his champion bird, Emperor of Peckham, to a man from Luton. The site watchman wants him down before the Early Turn clocks on, and the crane driver wants his cab back.",
        "choices": [
          {
            "label": "Send PC Doyle up to talk him down",
            "result": "PC Doyle climbs sixty feet in a November wind, shares the flask, and comes down two hours later with Ronnie and some strongly held views on pigeon ethics.",
            "effects": {
              "streets": 3,
              "relief": -4,
              "dispatchUnits": 1,
              "dispatchTurns": 3
            },
            "risk": {
              "odds": 60,
              "failResult": "PC Doyle gets forty feet up before the November wind takes his helmet, his nerve and most of his vocabulary, and now there are two men up the crane, neither coming down. The brigade's turntable ladder collects them both at dawn in front of the Early Turn, the Chronicle's photographer, and an invoice addressed 'Dear Constabulary, again.'",
              "failEffects": {
                "streets": -4,
                "relief": -7
              }
            }
          },
          {
            "label": "Get Doris out of bed and up to the site",
            "result": "Doris arrives in curlers and apologises at parade-ground volume; Ronnie descends to scattered applause, whereupon each demands the other be nicked.",
            "effects": {
              "streets": 3,
              "brass": -3
            }
          },
          {
            "label": "Leave him — the flask won't last forever",
            "result": "He is still there at dawn, waving to the Early Turn; the Chronicle runs the picture under LOCAL MAN TAKES STAND, MANAGEMENT BAFFLED.",
            "effects": {
              "streets": -4,
              "brass": -3
            }
          },
          {
            "label": "Ask the fire brigade to fetch him down",
            "result": "The brigade obliges with a turntable ladder and a certain amount of theatre; their Station Officer's invoice arrives Monday, addressed 'Dear Constabulary, again'.",
            "effects": {
              "streets": 4,
              "brass": -5
            }
          }
        ],
        "tone": "weary"
      },
      {
        "id": "grime_power_cut",
        "title": "POWER CUT — TRENCH STREET GRID",
        "text": "Half the ground drops dark at 11.20 — the Trench Street substation has 'had a wobble', per an Electricity Board man who is in Croydon and not hurrying. The Regal Bingo Hall has three hundred patrons frozen mid-house, each convinced the numbers will be called falsely in the dark. Off-licence alarm bells are ringing across the grid, and several parties are already out with torches whose interest in the darkness is strictly professional.",
        "choices": [
          {
            "label": "Flood the dark streets with every spare man",
            "result": "Nothing gets looted, though the beat men come back frozen solid; one of the beat men swears the Regal's caller kept going from memory, in the dark, and was never once wrong.",
            "effects": {
              "streets": 7,
              "relief": -5,
              "dispatchUnits": 3,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Cover the off-licences and let the rest fend",
            "result": "The off-licences survive intact; the Regal empties itself in the dark and eleven handbags are misplaced, at least two of them on purpose.",
            "effects": {
              "streets": -2,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Sit tight — the Board says any minute now",
            "result": "The lights come back at 1.05 to reveal a lightly redistributed borough; three window grilles have been had away entirely, along with the windows.",
            "effects": {
              "streets": -8
            }
          }
        ],
        "tone": "grief",
        "window": [
          3,
          6
        ]
      },
      {
        "id": "grime_doll_infant",
        "title": "ABANDONED INFANT (QUERY) — ST CHAD'S PORCH",
        "text": "A taxi driver carries in a bundle found in the porch of St Chad's: an infant wrapped in a beer towel, unnervingly quiet. Sgt Bream, father of five, pronounces it 'too well-behaved to be real' and pokes it. He's right — it is a doll, one of the new lifelike ones, and worth a few bob. Then the front desk rings up: there is a woman outside in considerable distress, saying she has lost her baby.",
        "choices": [
          {
            "label": "Reunite the lady with her 'baby'",
            "result": "She is Purbright's window dresser and the doll is their Christmas display centrepiece, pinched from under her nose; she weeps over it like the genuine article while Sgt Bream quietly stops poking things.",
            "effects": {
              "relief": 2
            }
          },
          {
            "label": "Find the tea-leaf who lifted it from Purbright's window",
            "result": "PC Whittle finds the window gone and two apprentice glaziers responsible, on a dare; one is nicked, the other has it away on his toes into the fog, still holding the doll's bonnet.",
            "effects": {
              "streets": 4,
              "brass": 2,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Book it in as an abandoned infant — simpler paperwork",
            "result": "The Juvenile Bureau attends at 3 am to take charge of a doll; the resulting paperwork develops a life of its own, which is more than can be said for the infant.",
            "effects": {
              "brass": -7
            }
          }
        ],
        "tone": "weary",
        "window": [1, 6]
      },
      {
        "id": "grime_phone_box",
        "title": "CRIMINAL DAMAGE IN PROGRESS — GAS LANE PHONE BOX",
        "text": "The phone box on Gas Lane has been swallowing shillings all week, and tonight it bit the wrong man. Harry Trigg, docker, has fed it four bob trying to ring his wife, received nothing but the pips, and is now dismantling the instrument methodically with a wheel brace, cheered on by a queue of previous victims. The GPO engineer cannot attend before Monday. The pips, witnesses agree, had sounded sarcastic.",
        "choices": [
          {
            "label": "Nick Trigg for criminal damage",
            "result": "He comes quietly on the understanding that you will also be charging the phone box; the queue boos your PC all the way to the panda.",
            "effects": {
              "streets": 3,
              "brass": 2,
              "relief": -3,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Have PC Duffin open the coin box and refund the queue",
            "result": "PC Duffin liberates the coin drawer with Trigg's own wheel brace and refunds the queue to general applause; the GPO's Monday man reports a robbery.",
            "effects": {
              "streets": 4,
              "brass": -5,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Let him finish the job",
            "result": "By midnight the box is a neat kit of parts stacked kerbside, receiver left off the hook out of respect; the GPO writes to the Yard in triplicate.",
            "effects": {
              "streets": -4,
              "brass": -2
            }
          }
        ],
        "tone": "weary",
        "window": [
          1,
          4
        ]
      },
      {
        "id": "station_expenses_quarmby",
        "title": "EXPENSES — DS QUARMBY, CID",
        "text": "Divisional accounts have returned the CID expenses ledger with red ink right through it. DS Quarmby has claimed £14.50 for 'refreshments with informant' at the Golden Grill Steak House three nights running — one of which he spent on leave in Clacton. He fills your doorway, smelling of panatellas, and explains that his snout Manchester Freddie 'won't sing on an empty stomach.' The ledger needs a duty officer's signature by midnight. Yours.",
        "choices": [
          {
            "label": "Sign it and ask no questions",
            "result": "Quarmby winks and says you're 'in the book.' Should A10 (anti-corruption) ever read that book, you will be a chapter.",
            "effects": {
              "brass": -6,
              "relief": 2,
              "favours": 1
            }
          },
          {
            "label": "Query it, up the line to Division",
            "result": "Accounts are delighted. CID stop talking to the wooden-tops, and the borough's villains enjoy a run of luck nobody can explain.",
            "effects": {
              "brass": 7,
              "relief": -6,
              "streets": -3
            }
          },
          {
            "label": "Hand it back and tell him to amend it",
            "result": "He resubmits £3.80 for 'tea and a sausage roll, snack bar, Ockley Road.' Manchester Freddie's standards have collapsed overnight.",
            "effects": {
              "brass": 3,
              "relief": -2
            }
          }
        ],
        "tone": "grief",
        "window": [
          1,
          4
        ]
      },
      {
        "id": "station_tea_fund",
        "title": "AUDIT — B RELIEF TEA FUND",
        "text": "Sgt Bream, treasurer of the tea fund since Suez, reports it £3.72 short. Suspicion has settled on PC Duffin — last man seen with the biscuit-tin key, first man seen with a new car radio. Half the relief have decided there is a tea-leaf in the tea fund and want blood; the other half note that Bream's arithmetic once brought a whip-round out at minus elevenpence. The tin sits on your desk, accusingly empty but for a single Rich Tea.",
        "choices": [
          {
            "label": "Quietly make it up from your own pocket",
            "result": "Peace is restored for the price of a decent lunch. Word travels upstairs that B Relief's guvnor settles theft out of petty cash — and downstairs that {he}’s a soft touch.",
            "effects": {
              "relief": 5,
              "brass": -3
            }
          },
          {
            "label": "Order a full audit, receipts and all",
            "result": "Bream produces a shoebox of sugar receipts going back to 1971. The audit finds the fund is actually 40p over, which is somehow worse.",
            "effects": {
              "brass": 5,
              "relief": -7
            }
          },
          {
            "label": "Announce the tin stays open tonight, no questions",
            "result": "By four a.m. the money is back, with an anonymous packet of Garibaldis on top. Justice, Thorne Street fashion.",
            "effects": {
              "relief": 2
            }
          }
        ],
        "tone": "weary",
        "window": [1, 7]
      },
      {
        "id": "station_spot_visit",
        "title": "RUMOUR — SPOT VISIT, CH SUPT MOLLAND",
        "text": "A friendly clerk at Division telephones, whispering. Chief Superintendent Molland is minded to make a 'surprise visit to a station on the ground' tonight. Thorne Street's charge room hasn't seen a mop since the last power cut but one, the noticeboard advertises a darts night from 1973, and somebody has chalked a study of the Commander on the parade-room board that is, whatever else you can say about it, a good likeness.",
        "choices": [
          {
            "label": "Turn out two PCs to scrub the nick",
            "result": "The nick gleams like a new whistle. Molland never comes, and the manor spends two hours burgling itself in peace.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 2,
              "brass": 8,
              "relief": -5,
              "streets": -4
            }
          },
          {
            "label": "It's only a rumour — carry on",
            "result": "At two a.m. Molland's Rover glides into the yard. He runs one gloved finger along the charge-room counter and writes in a small black book. Men have been posted to Orkney for less.",
            "effects": {
              "brass": -8,
              "relief": 3
            }
          },
          {
            "label": "Ring the clerk back — where's Molland really going",
            "result": "Cricklewood, as it happens. The clerk considers the old debt from the summons mix-up settled, which is the dearest bottle of Bell's you never bought.",
            "effects": {
              "favours": -1,
              "brass": 3
            }
          }
        ],
        "tone": "grief",
        "window": [
          1,
          8
        ]
      },
      {
        "id": "station_helmet_gosling",
        "window": [2, 8],
        "title": "PROPERTY — LOSS OF HELMET, PC GOSLING (THIRD)",
        "text": "Probationer PC Gosling, not yet trusted with a beat of his own, stands bare-headed before your desk for the third time since August. This helmet went over the wall of the Eldon Road lido during 'a pursuit' — of whom or what he declines to say, though somebody plainly had it away on his toes. A third loss report goes on his record at Division — and, in a quieter way, on yours. From the corridor, the station sergeant silently mouths the words 'bin him.'",
        "choices": [
          {
            "label": "Send PC Whittle to fish it out of the lido",
            "result": "PC Whittle returns with the helmet, a shopping trolley and a second helmet, German, that nobody wants to discuss. Gosling is pathetically grateful.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "relief": 3,
              "streets": -3
            }
          },
          {
            "label": "File the loss report — proper channels",
            "result": "Division notes it is Thorne Street's third helmet this quarter. Somewhere a clerk opens a folder with your name on it too.",
            "effects": {
              "brass": 2,
              "relief": -5
            }
          },
          {
            "label": "Issue him the spare from the property store",
            "result": "Gosling parades in a helmet two sizes too big, last worn in 1968. He looks like a mushroom with anxieties, but the paperwork sleeps.",
            "effects": {
              "relief": 2,
              "brass": -4
            }
          }
        ],
        "tone": "weary"
      },
      {
        "id": "station_fed_grievance",
        "title": "GRIEVANCE — FEDERATION REP, PC LATCH",
        "text": "PC Latch, Federation representative and the station's leading barrack-room lawyer, has come in on his own time — which he wants noted — to present a grievance in triplicate: refs cut short contrary to regulation, and the October-issue boots 'an industrial injury pending.' He has quotations. He has precedents. He has, if you let him begin, the whole of your night. The relief watch from the parade room to see whether their guvnor takes boots seriously.",
        "choices": [
          {
            "label": "Hear him out in full, minute every word",
            "result": "Two hours on the tensile properties of boot leather. The relief are touched; the ground, unsupervised, makes its own arrangements.",
            "effects": {
              "relief": 6,
              "streets": -5,
              "brass": -2
            }
          },
          {
            "label": "Endorse it and send it up to Division",
            "result": "Latch shakes your hand like you've signed Magna Carta. Division returns it marked 'noted,' which is Division for 'no.'",
            "effects": {
              "relief": 4,
              "brass": -6
            }
          },
          {
            "label": "Tell him to save it for the branch meeting",
            "result": "Latch writes down your exact words, with the date and time. From a man with precedents, this is never a good sign.",
            "effects": {
              "relief": -5,
              "brass": 3
            }
          }
        ],
        "tone": "weary",
        "window": [2, 9]
      },
      {
        "id": "station_collator_index",
        "window": [1, 6],
        "title": "SICK ABSENCE — COLLATOR, PC PURBRIGHT",
        "text": "PC Purbright, collator, has run the local intelligence index out of shoeboxes and memory since 1961, and tonight he is off sick with his chest. CID want the card on the Maunder brothers' lorry firm — villains to a man, haulage contractors on paper — within the hour. The only map of the boxes is inside Purbright's head, and the temporary clerk has already alphabetised one drawer, destroying a filing system based, as far as anyone can establish, on grudges.",
        "choices": [
          {
            "label": "Send a PC round to Purbright's drum with grapes",
            "result": "Propped on pillows, Purbright recites box number, card colour, and the elder Maunder's mother's maiden name. CID get their card; the grapes do not survive the visit.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 2,
              "streets": 4,
              "brass": 2
            }
          },
          {
            "label": "Let the clerk carry on alphabetising",
            "result": "By dawn the index is in perfect order and perfectly useless. Fifteen years of grudges gone — the Library of Alexandria, if Alexandria had been mainly about stolen lead.",
            "effects": {
              "brass": 2,
              "streets": -6
            }
          },
          {
            "label": "Tell CID it waits until Purbright's chest clears",
            "result": "CID mutter about wooden-top obstruction all the way back upstairs. The Maunder brothers, unaware of any of this, have an excellent week.",
            "effects": {
              "streets": -5,
              "brass": -2
            }
          }
        ],
        "tone": "grief"
      },
      {
        "id": "station_poach_hartree",
        "window": [2, 7],
        "title": "TRANSFER REQUEST — PC HARTREE TO A RELIEF",
        "text": "Inspector Voss of A Relief, a man who smiles like a filing cabinet, has applied for PC Hartree — your best thief-taker, divisional record-holder for collars before refs, tonight on a rare rest day — to join his early turn 'for career development.' Hartree hasn't been asked. Voss has had the forms typed in advance. The parade room has gone quiet, waiting to learn whether their guvnor fights for {his} own.",
        "choices": [
          {
            "label": "Block it and fight Voss at Division",
            "result": "Voss withdraws with the look of a man filing you under Later. Division notes you are 'territorial' — a flaw upstairs, a virtue downstairs.",
            "effects": {
              "relief": 7,
              "brass": -6
            }
          },
          {
            "label": "Horse-trade: Hartree for Voss's two best aids",
            "result": "Hartree goes quietly. The two aids duly arrive: one is keen, and one is Voss's revenge.",
            "effects": {
              "relief": -5,
              "brass": 2,
              "streets": 2
            }
          },
          {
            "label": "Let Hartree choose for himself",
            "result": "He'd rather stay, he says, but his missus likes early turns. He goes, and your arrest figures go with him.",
            "effects": {
              "relief": 2,
              "streets": -4
            }
          },
          {
            "label": "Call in your marker with the Chief Clerk",
            "result": "The transfer forms suffer a mysterious accident in the internal post. Voss suspects everyone, which suits everyone.",
            "effects": {
              "favours": -1,
              "relief": 5
            }
          }
        ],
        "tone": "grief"
      },
      {
        "id": "station_canteen_pies",
        "title": "PUBLIC HEALTH — CANTEEN STEAK AND KIDNEY",
        "text": "Three of the relief are down with stomach trouble after the canteen's Friday steak-and-kidney pie, and the whisper on the relief is that tonight's batch came off the same tray. Mrs Ogboddy, canteen manageress for twenty-two years, stands guard over her hot cabinet, defying anyone to say the word 'kidney' with implication. The Environmental Health man is one turn of the blower away; so, unfortunately, is Mrs Ogboddy's memory, which forgets nothing.",
        "choices": [
          {
            "label": "Ring Environmental Health — by the book",
            "result": "The canteen closes pending inspection and the relief dine on cold sausage rolls from the all-night garage, which is out of the frying pan into the forecourt.",
            "effects": {
              "brass": 4,
              "relief": -6
            }
          },
          {
            "label": "Quietly bin tonight's batch, say nothing",
            "result": "Mrs Ogboddy watches you carry the tray out like a coffin at a state funeral. You have made an enemy with access to your tea.",
            "effects": {
              "relief": 3,
              "brass": -2
            }
          },
          {
            "label": "Eat one yourself, publicly, to steady the ranks",
            "result": "Morale soars at the sight of the guvnor going over the top first. At three a.m., alone, you understand the fuss profoundly.",
            "effects": {
              "relief": 6,
              "streets": -3
            }
          }
        ],
        "tone": "weary",
        "window": [1, 6]
      },
      {
        "id": "station_a10_visit",
        "window": [4, 10],
        "title": "VISITORS — A10, FRONT OFFICE",
        "text": "Two men in raincoats too clean for the weather are at the front desk asking for the duty officer. A10 — anti-corruption, the complaints lot — making 'routine enquiries' into an allegation from a minicab tout that someone on B Relief is bent enough to take a drink for overlooking the rank on Balcombe Lane. They want the occurrence book, the pocket books, and a quiet room with a kettle. The station has already gone silent without being asked.",
        "choices": [
          {
            "label": "Full cooperation — open every book",
            "result": "A10 depart satisfied. The relief develop selective deafness whenever the guvnor's voice comes over the wireless.",
            "effects": {
              "brass": 6,
              "relief": -9
            }
          },
          {
            "label": "Cooperate slowly — the photocopier is 'broken'",
            "result": "They leave with half of what they came for and a note about your photocopier. Both sides know exactly what happened, which in the Met passes for an understanding.",
            "effects": {
              "brass": -4,
              "relief": 5
            }
          },
          {
            "label": "Get the Federation rep in before anyone speaks",
            "result": "Regulation quotations fill the air like flak. A10 pack their raincoats and go. This round to Thorne Street; A10 do not forget rounds.",
            "effects": {
              "relief": 7,
              "brass": -7
            }
          }
        ],
        "tone": "grief"
      },
      {
        "id": "station_section_house",
        "window": [10, 16],
        "title": "TELEPHONE — MRS CADWALLADER, SECTION HOUSE",
        "text": "Mrs Cadwallader, who runs the section house with the warmth of a Victorian iceberg, is on the phone. PC Warlow of the Early Turn has, she reports, been entertaining 'a young lady' contrary to house rules, frying bacon after ten, and — she saves the gravest for last — moving her hallway aspidistra. Unless he is dealt with tonight she will telephone the Superintendent at home, and she has done it before.",
        "choices": [
          {
            "label": "Send a sergeant round with a box of Milk Tray",
            "result": "Forty minutes of flattery later, the aspidistra is back on its plinth and the young lady has left by the fire escape with her dignity intact.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "relief": 3,
              "brass": 2
            }
          },
          {
            "label": "Invite her to put it in writing",
            "result": "She does. In green ink. To the Commander, copied — for reasons nobody can establish — to the London Electricity Board.",
            "effects": {
              "brass": -6,
              "relief": 2
            }
          },
          {
            "label": "Order Warlow back to face her himself",
            "result": "He returns to find his belongings stacked with military precision under the aspidistra, which has won.",
            "effects": {
              "relief": -5,
              "brass": 3
            }
          }
        ],
        "tone": "weary"
      },
      {
        "id": "ordinary_peabody_domestic",
        "title": "DOMESTIC DISTURBANCE — 14 TENCH HOUSE, PEABODY BUILDINGS",
        "text": "The blower again: screaming and breakage at 14 Tench House, audible three floors down through Mrs Grigson's ceiling. Sgt Bream doesn't need the address repeating — it's the Rondels, whose fixture list runs back in the occurrence book to Coronation year. He's put her in the eye before; she once put a flat-iron in him. Two small kids in the flat. Bream looks up over his custard cream with the face of a man who has written '14 Tench House' too many times.",
        "tone": "grief",
        "choices": [
          {
            "label": "Send Doyle and Whittle up, and this time he comes in",
            "result": "Rondel comes downstairs in handcuffs and half a shirt, swearing eternal vengeance and asking after his dinner. By Monday she may not press it — she rarely does — but tonight two kids get a quiet flat, and that's worth the paperwork.",
            "effects": {
              "streets": 8,
              "brass": -3,
              "relief": -2,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "One PC up to calm it down and leave",
            "result": "Duffin delivers the usual sermon on the stairwell and Rondel goes apologetic the way a kettle goes quiet — by coming off the boil until next time. Everyone signs off satisfied except Mrs Grigson's ceiling, which knows better.",
            "effects": {
              "streets": -4,
              "relief": 2,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "It's a domestic. Log it and keep the airwaves clear",
            "result": "The entry reads 'noise abated by 0140.' It abated because somebody stopped making it. Sgt Bream writes the address without being told and doesn't look at you, which from Bream is a speech.",
            "effects": {
              "streets": -8,
              "relief": -2
            }
          }
        ],
        "window": [
          1,
          7
        ]
      },
      {
        "id": "ordinary_chemist_break",
        "window": [5, 12],
        "title": "BURGLARY IN PROGRESS — GATHERCOLE'S CHEMISTS, ORDNANCE STREET",
        "text": "A cabbie off the Ordnance Street rank dials 999: torchlight moving inside Gathercole's Chemists, glass out of the transom, and the unmistakable sound of a crowbar being introduced to the Dangerous Drugs cabinet. Gathercole's holds this division's entire stock of physeptone and dexies, which on the street isn't medicine, it's currency. Whoever's inside is still inside. The cab rank has formed a semicircle at a professional distance to watch.",
        "tone": "grief",
        "choices": [
          {
            "label": "Everything spare — front, back, and the alley roof",
            "result": "Two villains come off the flat roof into the arms of PC Whittle, pockets rattling like maracas. The drugs cabinet is scratched but shut. Even the cabbies applaud, and cabbies applaud nothing.",
            "effects": {
              "streets": 10,
              "brass": 4,
              "arrests": 2,
              "dispatchUnits": 3,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Area car alone, and hope they're amateurs",
            "result": "They aren't amateurs. One goes over the yard wall with a pharmacy in his coat; the other stops to argue and loses. Doyle collects a split lip and an opinion about being sent in single-handed that the whole relief will share by refs.",
            "effects": {
              "streets": 3,
              "relief": -5,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            },
            "risk": {
              "odds": 45,
              "failResult": "They aren't amateurs, and tonight they prove it in full: both over the yard wall with the cabinet in their coats while Doyle sits in the broken glass counting his own teeth. The cab rank gives him a slow round of applause, which is the part he'll be hearing about till Christmas.",
              "failEffects": {
                "streets": -7,
                "relief": -8
              }
            }
          },
          {
            "label": "Note it for CID's morning list",
            "result": "By dawn the cabinet is bare and by Sunday half the borough is remarkably cheerful. Mr Gathercole rings the Yard, the Yard rings Commander Rossiter, and Rossiter rings you, in the voice of a man reading the Dangerous Drugs Act with his finger on it.",
            "effects": {
              "streets": -9,
              "brass": -5
            }
          }
        ]
      },
      {
        "id": "ordinary_vicar_tda",
        "title": "TDA — MORRIS MINOR, ST SAVIOUR'S VICARAGE",
        "text": "The Reverend Basil Tremlett reports his Morris Minor Traveller taken from outside the vicarage. This is academic, because the Morris is currently doing stately laps of Chapel Yard Market with two juveniles aboard, horn going, top speed a devout twenty-eight. PC Duffin is watching it orbit from the Wimpy doorway and reports the passenger waves to him on every circuit. The vicar wants his car, his rosary, and, unhelpfully, the boys' names for the parish magazine.",
        "tone": "weary",
        "choices": [
          {
            "label": "Two pandas, box it in at the market gates",
            "result": "The Morris surrenders at walking pace, indicating correctly. The driver turns out to be twelve; his lookout is ten and asks Duffin for a lift home. One juvenile in the book, one delivered to his mother, one Traveller returned smelling faintly of incense and crisps.",
            "effects": {
              "streets": 5,
              "relief": 2,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Let it run dry — follow at a respectful distance",
            "result": "The Morris expires with dignity by the whelk stall after forty minutes, having used less petrol than the panda idling behind it. The relief will dine out on the eight-mile-an-hour pursuit for a month. The vicar is less amused by the mileage.",
            "effects": {
              "streets": 2,
              "relief": 4,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          },
          {
            "label": "It'll park itself when they're bored. Log it",
            "result": "The Morris is found at dawn on the towpath, unharmed but baptised to the doorsills in canal. The Reverend Tremlett, it emerges, sits on the same Rotary committee as Commander Rossiter, and preaches Sunday on the shepherd who could not be bothered.",
            "effects": {
              "streets": -5,
              "brass": -3
            }
          }
        ],
        "window": [
          1,
          5
        ]
      },
      {
        "id": "ordinary_church_lead",
        "window": [7, 14],
        "title": "THEFT IN PROGRESS — LEAD, ST SAVIOUR'S ROOF",
        "text": "Third time this quarter: the verger of St Saviour's, out with a torch after a suspicious cat, reports scraping overhead and a rope over the vestry gutter. Somebody is up the church roof unstitching the lead, rolling it like pastry and lowering it to a handcart in the graveyard. The price of scrap being what it is, half the God-fearing roofs in London are migrating to the yards by night. It is raining, which the congregation will notice before the diocese does.",
        "tone": "weary",
        "choices": [
          {
            "label": "Surround it — one on the cart, two round the buttresses",
            "result": "The man on the roof declines to come down for an hour on grounds of doctrine, then slips on his own handiwork and descends via the yew. Two collars, one handcart, a hundredweight of St Saviour's recovered. The relief spend the night wet through, and Whittle wants it minuted that he likes neither heights nor churches.",
            "effects": {
              "streets": 7,
              "relief": -3,
              "arrests": 2,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            },
            "risk": {
              "odds": 60,
              "failResult": "The man on the roof declines to come down and proves it, away across the wet slates with the borough's lead under his arm while Whittle, in pursuit, puts a boot through the vestry skylight. Two collars becomes none, and St Saviour's now leaks in a place it didn't.",
              "failEffects": {
                "streets": -6,
                "relief": -5
              }
            }
          },
          {
            "label": "Nick the cart man, let gravity mind the roof",
            "result": "The cart man is captured mid-load, wearing the resigned air of a man whose partner is now marooned forty feet up in the rain. His mate waits out the panda, then legs it across the rooftops empty-handed, abandoning the night's takings to the graveyard.",
            "effects": {
              "streets": 3,
              "relief": 2,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "The lead's rolled and gone by now. Crime book it",
            "result": "By morning the vestry ceiling admits the dawn and the font is filling unassisted. The Reverend Tremlett — twice a victim this quarter — writes to the diocese, the diocese writes to the Yard, and the reply lands on your desk with your name spelt correctly, which is never good.",
            "effects": {
              "streets": -4,
              "brass": -3
            }
          }
        ]
      },
      {
        "id": "ordinary_bingo_snatch",
        "title": "ROBBERY (HANDBAG) — REGAL BINGO, JUBILEE STREET",
        "text": "Friday is jackpot night at the Regal Bingo, which every tea-leaf on the manor also knows. A youth in a parka has had the handbag off Mrs Meakin, seventy-one, on the steps — knocked her into the railings and away towards the lock-ups. The bag held her pension, her door key and thirty-two pounds of winnings. The queue is livid. Mrs Meakin, note, is mother to Terry Meakin of Meakin Salvage, who hears everything on this ground and forgets nothing done to his mum.",
        "tone": "grief",
        "choices": [
          {
            "label": "Two units to turn out the lock-ups before he's home",
            "result": "They find him in lock-up nine, sat on an oil drum counting her pension by match-light. The bag comes back complete, at some cost to the parka's dignity. The Regal queue gives the panda a round of applause usually reserved for a full house.",
            "effects": {
              "streets": 7,
              "brass": 2,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            },
            "risk": {
              "odds": 60,
              "failResult": "Lock-up nine holds an oil drum, a spent match and nobody — the parka went over the back fence with the pension while your units were still choosing doors. Word reaches Meakin Salvage anyway, and Terry's lads are now conducting their own enquiries with a directness the Yard would envy.",
              "failEffects": {
                "streets": -6,
                "brass": -3
              }
            }
          },
          {
            "label": "See Mrs Meakin home proper — statement, sweet tea, new bolt on the door",
            "result": "Doyle fits the bolt, drinks the tea and admires forty years of seaside photographs. Word reaches Meakin Salvage by breakfast. Terry sends nothing so vulgar as thanks — just the message that Thorne Street should ask, if ever Thorne Street needs.",
            "effects": {
              "streets": 2,
              "relief": 2,
              "favours": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            },
            "sets": "meakin_owed"
          },
          {
            "label": "Crime number, description circulated, next customer",
            "result": "Mrs Meakin walks home with no key and no pension, escorted by two furious ladies from the Regal who make sure the whole queue knows the Old Bill's contribution was a reference number. The relief hear about it at refs and don't laugh.",
            "effects": {
              "streets": -5,
              "relief": -3
            }
          }
        ],
        "window": [
          1,
          4
        ]
      },
      {
        "id": "ordinary_supermarket_lockin",
        "title": "INTRUDER LOCKED IN — NORRELL'S SUPERMARKET",
        "text": "Norrell's rings: the night restocker has found a shoplifter locked in since closing. Arthur Peel, gentleman of the road, hid in the stockroom at ten to six meaning to slip out with a bottle of sherry, and has instead spent five hours alone with the confectionery aisle. He has eaten, by his own tally, four swiss rolls, a jar of pickled eggs and most of a Dundee cake, and is now lying in cold meats groaning about his conscience. The manager wants him gone before the area supervisor's dawn visit.",
        "tone": "weary",
        "choices": [
          {
            "label": "Send a unit and book him — theft is theft, even by the slice",
            "result": "Peel comes quietly, pausing to return a fifth swiss roll from inside his coat 'as a gesture.' Sgt Bream itemises the haul in the charge book with the gravity of a war crimes indictment. The cells get their best-fed occupant of the year.",
            "effects": {
              "streets": 3,
              "relief": 3,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Let the manager settle it between themselves",
            "result": "Peel, having no money, is made to restack tins till dawn, which both parties call fair and the law calls nothing at all. By Tuesday every vagrant in the borough knows Norrell's does bed and board for the price of getting caught.",
            "effects": {
              "streets": -4,
              "brass": -2
            }
          },
          {
            "label": "He's contained. Early Turn's problem",
            "result": "Peel passes the night in dairy, at considerable cost to dairy. The area supervisor arrives at six, finds him asleep in a nest of flattened cereal boxes, and asks in writing why the police were told and did nothing. The Early Turn inherit the prisoner and the letter.",
            "effects": {
              "streets": -2,
              "brass": -5,
              "relief": 2
            }
          }
        ],
        "window": [
          1,
          4
        ]
      },
      {
        "id": "ordinary_section_house_prowler",
        "title": "PROWLER — SECTION HOUSE FIRE ESCAPE, MILFORD LANE",
        "text": "Delicate one, guvnor. WPC Hartle at the Milford Lane Section House reports a man on the fire escape at the bathroom window — third sighting this week, always around the eleven o'clock baths, always gone before anyone gets a shoe on. That's police lodgings: thirty single officers, none of them amused. The Section House sergeant wants it quiet, the WPCs want it tonight, and if the Yard ever pairs 'prowler' with 'Section House' in one memo there'll be an inspection by Thursday.",
        "tone": "grief",
        "choices": [
          {
            "label": "Plain-clothes eyes on the yard — take him properly, tonight",
            "result": "At ten past eleven a figure ascends; at quarter past it descends considerably faster, into Doyle and a dustbin. A clerk from the insurance office opposite, with binoculars and an explanation nobody requests twice. Charged, and the Section House sleeps. The relief take it as proof the guvnor looks after {his} own.",
            "effects": {
              "streets": 5,
              "brass": 2,
              "relief": 8,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            },
            "risk": {
              "odds": 55,
              "failResult": "Eleven o'clock comes and goes with Doyle in the dustbins and nothing on the fire escape but frost — the man clocked the obbo from the insurance office window, where it turns out he works late. The Section House concludes the guvnor sent two men to watch the bathroom window and caught nobody, and phrases it considerably less kindly than that.",
              "failEffects": {
                "streets": -3,
                "relief": -8
              }
            }
          },
          {
            "label": "Let the Section House handle it their own way",
            "result": "You ask no questions. At twenty past eleven there's a noise on the fire escape like a wardrobe learning to fly, and a man limps into the Royal Free swearing he fell off a wall three streets away. Nothing in any book anywhere. If it ever surfaces — and these things surface — it lands on you.",
            "effects": {
              "streets": -2,
              "brass": -7,
              "relief": 4
            }
          },
          {
            "label": "Report it up — let the Yard send its own people",
            "result": "The Yard descends with clipboards and takes statements from every WPC about her bathing arrangements, which is somehow worse than the prowler. He's never seen again. Nor is the Section House's good opinion of you, which departs by the same fire escape.",
            "effects": {
              "brass": 4,
              "relief": -8
            }
          }
        ],
        "window": [
          1,
          4
        ]
      },
      {
        "id": "ordinary_warehouse_alarm",
        "window": [3, 11],
        "title": "AUDIBLE ALARM — HOBBS & MILNER BONDED WAREHOUSE",
        "text": "The alarm at Hobbs & Milner — wholesale tobacco and fancy goods — has rung every night this week, blamed variously on pigeons, frost and the wiring of 1938. The relief have christened it the nightingale. Tonight it's singing again, but the keyholder can't be raised, and the beat PC reports what the nightingale never had before: the wicket gate ajar, a padlock lying cut in the gutter, and a Luton van backed up to the loading bay with its engine running.",
        "tone": "grief",
        "choices": [
          {
            "label": "Silent approach — everything spare, plug both ends of the street",
            "result": "Three villains walk a hundredweight of cigarettes into a street that has quietly filled with Old Bill. The van is already loaded, which saves everyone carrying the evidence back in. The cells feel suddenly smaller, but the Yard's crime return reads beautifully.",
            "effects": {
              "streets": 11,
              "brass": 5,
              "arrests": 3,
              "dispatchUnits": 3,
              "dispatchTurns": 2
            },
            "risk": {
              "odds": 65,
              "failResult": "A dropped torch rings off the cobbles like a dinner gong and the Luton comes through the cordon lights-off, scattering Old Bill like skittles. Three villains, a hundredweight of cigarettes and the van clear the ground entirely, leaving you a cut padlock, a singing alarm and a street full of witnesses to nothing.",
              "failEffects": {
                "streets": -8,
                "brass": -5
              }
            }
          },
          {
            "label": "One panda for the usual look-see",
            "result": "Duffin strolls in expecting pigeons and finds three men and a laden van. He gets one — the slow one — plus a rolled tarpaulin across the ear; the van leaves with the rest. The relief's verdict at refs: cut padlock, engine running, and the guvnor sent one man.",
            "effects": {
              "streets": 2,
              "relief": -6,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "The nightingale again. Log it, ring the keyholder come morning",
            "result": "The van makes three trips. By Monday half the patch smokes for free, and Hobbs & Milner's insurers ask the Yard why a ringing alarm and a cut padlock were logged as birdlife. Commander Rossiter's memo does not use the word 'nightingale.'",
            "effects": {
              "streets": -9,
              "brass": -6
            }
          }
        ]
      },
      {
        "id": "ordinary_milk_float",
        "title": "THEFT — MILK FLOAT AND FLOAT MONEY, BEACON DAIRIES",
        "text": "Beacon Dairies report float number nine missing from the Jubilee Street depot, along with roundsman Sidney Grout's leather bag — eleven pounds in coppers and the Christmas Club money. A milk float's top speed is eight miles an hour and it whines like a wasp in a jar, so this is less a getaway than a procession. Sightings arrive steadily; it appears to be heading, with the slow certainty of fate, in the general direction of the Duke of Clarence.",
        "tone": "weary",
        "choices": [
          {
            "label": "One panda to the Duke of Clarence. Wait by the pumps",
            "result": "Float nine glides up at ten past midnight, driven by a Clarence regular who lost his bus fare on the dogs and swears he meant to bring it back. The Christmas Club money is intact, minus a round he'd already promised the saloon bar. Sgt Bream books him without either managing a straight face.",
            "effects": {
              "streets": 4,
              "relief": 4,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Full circulation — pandas, neighbouring grounds, the lot",
            "result": "Two cars, three grounds and a running commentary on the main set eventually corner a milk float doing eight miles an hour up Corporation Row. The transcript will be read aloud at refs for a decade, and D Division ask, formally, to be included in future operations of this calibre.",
            "effects": {
              "streets": 5,
              "brass": -2,
              "relief": -3,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            }
          },
          {
            "label": "It's a milk float. Somebody awake will find it. Log it",
            "result": "Float nine turns up at dawn on the towpath, empty — the coppers gone, the Christmas Club gone, forty doorsteps on Jubilee Street gone without. Sidney Grout stands at the front desk at six with his empty bag, and Sgt Bream's silence has a temperature.",
            "effects": {
              "streets": -4,
              "relief": -2
            }
          }
        ],
        "window": [
          1,
          5
        ]
      },
      {
        "id": "ordinary_chipshop_till",
        "title": "ROBBERY — PERRETTI'S FISH BAR, CORPORATION ROW",
        "text": "A man in a balaclava has had eighteen pounds and a jar of pickled onions off Perretti's till at the point of what Mr Perretti describes as 'a very hesitant chisel.' The balaclava is powder blue with a bobble, knitted by the nan of Kenny Ollerenshaw, and worn over a face that paused mid-robbery to ask for a saveloy 'while the fryer's on.' Perretti, three customers and the cat all name Kenny unprompted. Kenny lives over the launderette, forty yards off.",
        "tone": "grief",
        "choices": [
          {
            "label": "Round to the launderette before his supper's cold",
            "result": "Kenny answers the door with the balaclava pushed up like a nightcap, saveloy in hand, genuinely staggered to have been identified. Seventeen pounds forty recovered — the difference being supper. In the charge book, under distinguishing marks, Sgt Bream writes 'bobble.'",
            "effects": {
              "streets": 8,
              "brass": 3,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Word through a snout: money back on the counter by two, and he's nicked civilised in the morning",
            "result": "The eighteen pounds reappears on Perretti's counter at half one, wrapped in greaseproof, the pickled onions untouched as a point of honour. Kenny presents himself at nine, scrubbed, in his court blazer. The Early Turn get the collar and you keep your cells — but arrangements like that get remembered in the wrong ledgers too.",
            "effects": {
              "streets": 3,
              "brass": -2,
              "relief": 2,
              "favours": -1
            }
          },
          {
            "label": "Everyone knows it's Kenny. CID can lift him Monday",
            "result": "By Saturday dinner the whole of Corporation Row knows you can rob Perretti's in your nan's knitting and sleep in your own bed after. Kenny, emboldened, tries the Wimpy on Sunday with the same chisel. The relief take it personally: they know where he lives, and so, they mutter, does everyone but the guvnor.",
            "effects": {
              "streets": -6,
              "relief": -4
            }
          }
        ],
        "window": [
          1,
          4
        ]
      },
      {
        "id": "dawn_chapel_crates",
        "title": "AFFRAY BREWING — CHAPEL YARD MARKET, SET-UP",
        "text": "The first barrows are rolling into Chapel Yard towards dawn when the porters find the night's leavings warming themselves at the braziers — half a dozen drunks the pubs surrendered and nobody claimed. Words are exchanged, then a cauliflower, then crates. Two trestles are down, Nobby Hale is swinging a chestnut pan, and Cyril Pocock is on the blower demanding the market fit for honest trade by opening, or the Federation will want to know why.",
        "choices": [
          {
            "label": "Send two units in while the crates hold out",
            "result": "Doyle and Whittle wade in through the cabbage leaves and gather the drunks into the van like windfalls, two of them charged on principle. The porters, deprived of an enemy, go back to their trestles; the market is trading before the sky is.",
            "effects": {
              "streets": 7,
              "relief": -4,
              "arrests": 2,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Go down yourself and stand in the middle of it",
            "result": "The crates stop in mid-air. Half the porters have known your face since you walked a beat, and Nobby Hale lowers the pan and rules it 'done with'. The drunks get tea at the brazier, the trestles get righted, and Pocock rings back to withdraw the Federation's concern with something close to disappointment.",
            "effects": {
              "streets": 8,
              "brass": 3
            },
            "risk": {
              "odds": 60,
              "failResult": "A crate of King Edwards arrives from a direction nobody afterwards saw, and the guvnor of Thorne Street sits down hard among the cabbage leaves in front of forty porters. The brawl runs itself out on its own terms, and by first light the story is in every café on the manor with you as the punchline.",
              "failEffects": {
                "streets": -7,
                "brass": -4,
                "relief": -4
              }
            }
          },
          {
            "label": "The market has policed itself since Victoria — let it",
            "result": "Honour runs its course and the drunks are repelled by superior logistics, one leaving in a barrow. By opening the market is trading, two crates of oranges have died for the cause, and Pocock's letter to the Commander is already in the first post.",
            "effects": {
              "streets": -7,
              "relief": 3
            }
          }
        ],
        "tone": "grief",
        "window": [
          13,
          16
        ]
      },
      {
        "id": "dawn_first_editions",
        "title": "FIRST EDITIONS — DAILY METEOR, PAGE FIVE, RE: TONIGHT",
        "text": "The van from Fleet Street drops its bundle at the kiosk by the Wimpy while the sky is still deciding, and Meggs the kiosk man is holding a copy up before he's cut the string. Page five of the Daily Meteor: POLICE STOOD BY, it says, about tonight — the details wrong, the street right, the night unmistakably yours. Commander Rossiter takes the Meteor with his breakfast. The later editions go to press within the hour, Meggs mentions, helpfully.",
        "choices": [
          {
            "label": "Wake the press office early man and call in your marker",
            "result": "The duty press man, roused towards dawn, performs surgery by telephone: the later editions soften to POLICE STRETCHED BUT PRESENT, which is nearly a bouquet. Rossiter's breakfast passes without incident, and the gatekeeper of Fleet Street will collect his kindness at a time of his choosing.",
            "effects": {
              "brass": 6,
              "favours": -1
            }
          },
          {
            "label": "Send Whittle out with the tea fund to buy the borough's copies",
            "result": "Whittle returns with ninety-one Meteors and a bacon roll, and the manor's newsagents enjoy their best morning since VE Day. Page five never reaches the borough; the tea fund never recovers; Sgt Bream rules a black border round the ledger entry.",
            "effects": {
              "brass": 4,
              "relief": -3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Let it lie — today's front page is tomorrow's chip paper",
            "result": "Rossiter rings while the kettle is still warming and reads page five aloud, slowly, twice, with the punctuation. The clipping goes into a file that has your name on it and a spring binding, built to take more.",
            "effects": {
              "streets": -3,
              "brass": -8
            }
          }
        ],
        "tone": "grief",
        "window": [
          13,
          16
        ]
      },
      {
        "id": "dawn_bakery_sleeper",
        "title": "BREAK-IN — PARDOE'S BAKERY, INTRUDER STILL ON PREMISES",
        "text": "Pardoe the baker arrives towards first light to find his back window out and his ovens already lit. The intruder let himself in during the small hours, ate half a tray of yesterday's buns, put the first batch in more or less correctly, and fell asleep in the proving corner — the warmest berth the night has to offer. He is still there, snoring in the flour. The smell of baking has drawn a small congregation to the shopfront, and Pardoe can't decide between fury and a job offer.",
        "choices": [
          {
            "label": "Wake him gently and book him for burglary",
            "result": "He comes quietly, still warm, and asks from the cell whether anyone took the second batch out. The charge sheet reads burglary; beneath it, in another hand entirely, someone has written 'good crust'.",
            "effects": {
              "streets": 5,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Let Pardoe settle it — labour in lieu of the window",
            "result": "By the time the light is up the intruder is in an apron, working off a window at bakery rates, and nothing troubles the occurrence book. Word goes round that Pardoe's hires by the simple expedient of breaking in — but Pardoe owes Thorne Street now, and his rounds pass every door on the ground.",
            "effects": {
              "streets": -4,
              "favours": 1
            }
          },
          {
            "label": "Book him — and buy the batch he baked for the relief",
            "result": "One burglar in the cells and four dozen rolls in the canteen, still warm, paid out of your own pocket at what Pardoe insists is 'the police rate'. The relief eat the evidence and vote the prisoner, in absentia, baker of the year.",
            "effects": {
              "streets": 3,
              "brass": -3,
              "relief": 7,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          }
        ],
        "tone": "weary",
        "window": [
          13,
          16
        ]
      },
      {
        "id": "dawn_milk_floats",
        "title": "MILK FLOATS OUT — BEACON DAIRIES, JUBILEE STREET",
        "text": "Beacon Dairies' floats whine out of the Jubilee Street depot at the tail of the night, straight into everything the shift hasn't tidied: glass across Verity Street, the tobacconist's door standing open, a gentleman asleep in the dairy's own crate stack, and what roundsman Sidney Grout calls 'a commotion, ongoing' outside the Duke of Clarence. The roundsmen ring it all in from phone boxes, conscientious to a man, and the whole borough is suddenly being inventoried at eight miles an hour.",
        "choices": [
          {
            "label": "Sweep the round ahead of the floats — everything you've got left",
            "result": "The pandas leapfrog the floats street by street, sweeping glass and steering sleepers homeward, and the manor gets a fast dusting before the light finds it. Early Turn inherit a patch so tidy they suspect it.",
            "effects": {
              "streets": 8,
              "relief": -5,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Take Grout's list, fix the worst, book the rest for Early Turn",
            "result": "The tobacconist's door is secured and the commotion outside the Clarence talked into a taxi; the rest goes into the occurrence book in your best neutral hand. Grout leaves a pint of gold top at the front desk 'for services to the round'.",
            "effects": {
              "streets": 4,
              "brass": 3,
              "relief": -3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Thank the roundsmen kindly and let the morning find its own",
            "result": "The relief get their last hour by the radiator while the streets are inventoried at eight miles an hour by men in white coats. The day inspector reads the dairy's list at parade with pauses in all the worst places.",
            "effects": {
              "streets": -6,
              "relief": 3
            }
          }
        ],
        "tone": "weary",
        "window": [
          13,
          16
        ]
      },
      {
        "id": "dawn_cid_bodies",
        "title": "DAY CID EARLY — REQUEST FOR BODIES, CELLS, AND DOYLE",
        "text": "Day-turn CID arrive while the kettle is still warming, smelling of yesterday's cigars and tomorrow's glory: DI Grafton and two suits, warrants in hand for a dawn spin on somebody else's ground. He wants three bodies for the doors, both your empty cells for the proceeds, and — consulting no list — PC Doyle, 'the useful one'. The relief have the tail of the night left in their legs and a shift behind them Grafton didn't see. He is already handing out door assignments.",
        "choices": [
          {
            "label": "Give him the three and Doyle — a full house",
            "result": "The doors go in at first light on somebody else's ground and every one of them is yours. Grafton gets his prisoners, Division gets its headline, and your manor spends the last of the night policed by milk floats.",
            "effects": {
              "streets": -4,
              "brass": 6,
              "relief": -6,
              "dispatchUnits": 3,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Cells yes, bodies no — the manor comes first",
            "result": "Grafton appeals over your head and finds nothing awake to appeal to. He leaves with his two suits and a grievance he'll file where grievances go, and the relief finish the night on their own streets, which is where nights are supposed to end.",
            "effects": {
              "streets": 3,
              "brass": -4,
              "relief": 4
            }
          },
          {
            "label": "Trade him Doyle for first pick of the prisoners",
            "result": "Doyle takes a back door two miles east and comes home with a body for your book and most of the story. Grafton pronounces him 'wasted in uniform', a compliment Doyle reports to you like a symptom.",
            "effects": {
              "brass": 3,
              "relief": -3,
              "arrests": 1,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          }
        ],
        "tone": "grief",
        "window": [
          13,
          16
        ]
      },
      {
        "id": "dawn_bench_overflow",
        "title": "CELLS FULL — THREE D AND D ON THE BENCH",
        "text": "Every cell is spoken for, and the night's last three drunk-and-incapables are ranged along the charge-room bench like fixtures — one singing, one weeping, one apparently presiding. Sgt Bream reports the drunk tank at capacity 'plus opinion'. The day inspector walks his inspection when the light comes up, clipboard first, and he holds views on prisoners kept on benches. The singing one has moved on to hymns, which the weeping one is finding very moving.",
        "choices": [
          {
            "label": "Walk them home — Hartle and the dawn air",
            "result": "Hartle delivers three men to three doorsteps as the sky goes grey: one wife grateful, one volcanic, and the presiding one, who has no doorstep, steered to his sister's on the last of the night's patience. The bench stands empty for inspection, smelling only faintly of hymns.",
            "effects": {
              "streets": -3,
              "brass": 5,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Ring the Clarence's landlord — he owes this nick a warm room",
            "result": "The landlord takes all three into the saloon with blankets and yesterday's pies, strictly as guests of the house. The inspection finds a regulation drunk tank and an empty bench, and nobody asks why the Clarence's chimney is going before opening time.",
            "effects": {
              "brass": 4,
              "relief": 3,
              "favours": -1
            }
          },
          {
            "label": "Let the inspector find them — the bench is honest",
            "result": "He counts three prisoners, one bench and no cell, and writes for a full minute without looking up. The relief, at least, appreciate that the singing was allowed to reach its natural end.",
            "effects": {
              "brass": -9,
              "relief": 3
            }
          },
          {
            "label": "The tank will take three more — capacity is a state of mind",
            "result": "The tank achieves a density otherwise found on the Underground, and the presiding one lodges a formal complaint about the choir. The inspection passes; the smell does not, for some days.",
            "effects": {
              "brass": -3,
              "relief": -4
            }
          }
        ],
        "tone": "weary",
        "window": [
          13,
          16
        ]
      },
      {
        "id": "dawn_window_cleaner",
        "title": "WINDOW CLEANER REPORTS — FLAT OVER IRONMONGER'S, MELDON ST",
        "text": "A window cleaner named Perce presents himself at the desk at first light, chamois still in hand, and takes a while to get to it. Top of his ladder, first job of the day, the flat over the ironmonger's on Meldon Street: a gap in the curtains, a man on the floor not moving, and what Perce — steadying himself on the desk — calls 'a lot of red about'. He couldn't look long enough to be sure, and has no intention of looking again.",
        "choices": [
          {
            "label": "Take the door — two units and the first-aid box",
            "result": "The door gives on the third swing. Mr Sillitoe the ironmonger is face-down among tins of red-lead primer with a burst pipe dripping through the light fitting — concussed, paint-soaked and breathing. He complains about the door, then thanks you, in that order, and the ambulance men rule it the tidiest mess of their night.",
            "effects": {
              "streets": 6,
              "brass": 3,
              "relief": -3,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Go up Perce's ladder yourself for one proper look",
            "result": "From the top rung the room resolves: Sillitoe the ironmonger flat out among tins of red-lead primer, a pipe dripping through the light fitting, and a chest rising and falling. You wake him through the glass, he opens his own front door in his own time, and the night keeps its dignity — his and, more to the point, yours.",
            "effects": {
              "streets": 7,
              "brass": 4
            },
            "risk": {
              "odds": 55,
              "failResult": "The ladder was rated for Perce, who is nine stone in his boots. It puts you across the ironmonger's awning in front of the first bus queue of the day, and the door still has to go in afterwards. Sillitoe — concussed, paint-soaked, alive — will recover faster than your standing.",
              "failEffects": {
                "streets": -5,
                "brass": -6,
                "relief": -4
              }
            }
          },
          {
            "label": "Note it for Early Turn — Perce isn't sure, and it's nearly light",
            "result": "Early Turn find the door on the latch and Sillitoe where he had lain since the small hours — alive, concussed, and colder than another hour's waiting had any business making him. The book records when Perce reported it and when anybody went, and the space between the two entries is yours to keep.",
            "effects": {
              "streets": -8,
              "brass": -5
            }
          }
        ],
        "tone": "grief",
        "window": [
          13,
          16
        ]
      },
      {
        "id": "dawn_washerama_ernest",
        "venue": "washerama",
        "title": "REFUSING TO LEAVE — WASHERAMA LAUNDERETTE, BIDDER ST",
        "text": "The Washerama's attendant rings, more tired than cross: her last customer has been washing the same shirt since the small hours and won't go. He's an old boy called Ernest, coat gone at the elbows, and when she called time he said the launderette is the only warm place the night has left — which the attendant, stood in her doorway with the dawn coming up grey, found she could not argue with. He isn't drunk and he isn't trouble. He just isn't leaving.",
        "choices": [
          {
            "label": "Send Hartle to walk him somewhere with tea in it",
            "result": "Hartle knows the mission hall behind Chapel Yard does teas for the porters from first light, and walks Ernest over at his pace, which is slow, through streets going grey. She comes back quiet and signs off without a word, which from Hartle is a report.",
            "effects": {
              "streets": 4,
              "relief": -3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Have him up to the nick — Bream's on the urn",
            "result": "Ernest drinks two mugs, pronounces the canteen 'palatial', and tells Bream about Normandy until the urn needs refilling. The day inspector finds a civilian at the tea urn and asks under what regulation; Bream cites hospitality, which isn't one.",
            "effects": {
              "brass": -4,
              "relief": 4
            }
          },
          {
            "label": "Tell the attendant it's her premises — she can put him out",
            "result": "She does it because you said she could, and hates the telephone for the rest of her shift. Ernest folds his one dry shirt like a man leaving nowhere in particular, and the street takes him. The relief hear it at refs and say nothing at all, loudly.",
            "effects": {
              "streets": -4,
              "relief": -5
            }
          },
          {
            "label": "Find a charge that fits and a cell that's warm",
            "result": "The charge is thin as his coat and Bream books it without a flicker, adding two blankets and the cell over the boiler-pipe. In the morning the beak will give him a caution and the court canteen will give him breakfast, which was, more or less, the idea.",
            "effects": {
              "brass": -3,
              "relief": 3,
              "arrests": 1
            }
          }
        ],
        "tone": "weary",
        "window": [
          13,
          16
        ]
      },
      {
        "id": "ordinary_gpo_pole",
        "tone": "weary",
        "title": "MAN UP A POLE — CHANDOS WALK EXCHANGE",
        "window": [
          1,
          8
        ],
        "text": "A prowler reported halfway up a telegraph pole on Chandos Walk turns out to be Mr Skinner of the GPO, mending a fault by torchlight in the rain. The union's work-to-rule starts at midnight, and Mr Skinner intends to finish this joint 'before the meeting decides whether I'm allowed to.' He will not come down for the beat man, the desk, or God: only for his own supervisor, who is asleep in Broadstairs. A small crowd has formed below with the settled air of an audience that has paid.",
        "choices": [
          {
            "label": "Send a PC to hold the ladder and disperse the gallery",
            "result": "Duffin stands forty minutes in the rain holding a ladder that Mr Skinner is not using, while the crowd offers technical advice to both of them. The fault is mended at half past; Skinner descends, shakes Duffin's hand as if concluding a summit, and leaves the ladder. The Walk gets its phones back and the night gets no worse, which at this hour is called a victory.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "streets": 2,
              "relief": -1
            }
          },
          {
            "label": "Ring the GPO night controller and demand the supervisor",
            "result": "The night controller, woken to the news that the Metropolitan Police require a supervisor for Mr Skinner, promises a man from Broadstairs by six and rings Skinner's pole direct — there is a phone up there, of course; he is the phone company. Told that authority is coming, Skinner finishes the fault out of pure spite in eleven minutes and comes down whistling. The Post Office will write a letter about channels. So will you.",
            "effects": {
              "brass": -1,
              "streets": 2
            }
          },
          {
            "label": "Leave him to it — it's his pole",
            "result": "You leave the GPO to its own weather. At a quarter to one Mr Skinner descends to a round of applause from the crowd, takes a bow, and presents himself at the front desk to report an inspector for 'failing to safeguard a working engineer.' Bream takes the complaint down verbatim, gravely, in the book that gets lost.",
            "effects": {
              "streets": -2
            }
          }
        ]
      },
      {
        "id": "ordinary_hearse_tda",
        "tone": "weary",
        "title": "TAKEN WITHOUT CONSENT — HEARSE, MARSDEN & SON",
        "window": [
          3,
          11
        ],
        "text": "Mr Marsden of Marsden & Son, Funeral Furnishers, presents himself in dressing gown and slippers to report the firm's Daimler hearse taken from the yard. Aboard it: the 'Windsor', a display coffin, empty, velvet-lined, retail nineteen guineas. The panda clocked the vehicle at the Gresham Road lights doing a stately fifteen, driver in a top hat, four gentlemen in the back riding with the Windsor between them like a card table. They waved. Mr Marsden wishes it recorded that the firm has a reputation, and that the reputation is for gravity.",
        "choices": [
          {
            "label": "Circulate it — every unit east of the canal, respectfully",
            "result": "A hearse is not a vehicle that hides. It is found at twenty to three outside a kebab house, hazards on, the Windsor propped open on the pavement full of ice and light ale: a darts team celebrating a cup win with what they describe as 'a dress rehearsal.' Four bookings for TDA, one top hat returned with its dignity somehow intact, and a Daimler driven home at walking pace by Whittle, who has always wanted to.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 2,
              "arrests": 2,
              "streets": 3,
              "relief": 1
            }
          },
          {
            "label": "Wait — nobody keeps a hearse",
            "result": "You reason, correctly, that a hearse is the one vehicle in London that always comes home. It returns to the yard at four, washed, with a pound note under the wiper and a card: 'SORRY FOR YOUR TROUBLE.' Mr Marsden withdraws the complaint at dawn with the air of a man who has decided to be mystified for the rest of his life. Bream frames the card for the front office.",
            "effects": {
              "streets": -1,
              "relief": 1
            }
          },
          {
            "label": "Nick the darts team the panda clocked — start at the club",
            "result": "The Anchor & Hope's darts team are taken at the club steps, top hat and all, still toasting 'absent friends, none absent.' Four in the book and the Windsor recovered with a chip in the veneer that Mr Marsden prices, on reflection, at the full nineteen guineas. The magistrate will enjoy this one more than anybody in the cells is currently enjoying it.",
            "effects": {
              "arrests": 3,
              "streets": 2,
              "brass": -1,
              "relief": -1
            }
          }
        ]
      },
      {
        "id": "ordinary_prophet_lamppost",
        "tone": "weary",
        "title": "OBSTRUCTION (PROPHETIC) — GAUMONT CORNER",
        "window": [
          5,
          13
        ],
        "text": "Mr Elphick, of no fixed abode but considerable conviction, has chained himself to the lamppost at Gaumont Corner wearing sandwich boards reading THE END IS AT SIX O'CLOCK — BE READY. He has posted the padlock key to himself, first class, 'to remove temptation.' The end of the world is scheduled for six a.m., which Bream observes is also when the night duty ends, 'so he's half right.' Traffic is managing. The all-night café has sent him out a tea, which he has accepted, for a man expecting the apocalypse, quite calmly.",
        "choices": [
          {
            "label": "Bolt-croppers and a caution, gently",
            "result": "Doyle fetches the croppers and frees Mr Elphick with the tenderness of a man opening a tin of peaches. The prophet takes it philosophically — 'the chain was symbolic' — and agrees to await the end in the café instead, where the boards get their own chair. The relief take the view that ironmongery at three in the morning was not what they joined for.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "streets": 2,
              "relief": -1
            }
          },
          {
            "label": "Let him see six o'clock out — the boards are load-bearing by now",
            "result": "You leave prophecy to run its course. At six precisely Mr Elphick consults the sky, finds the world regrettably intact, announces 'POSTPONED' to the milk float, and unchains himself with a spare key from his sock. He catches the 42 home. Bream enters it in the book as 'END OF WORLD — DID NOT PROCEED' and rules the matter closed.",
            "effects": {
              "streets": -1,
              "relief": 1
            }
          },
          {
            "label": "Book him — obstruction, and the boards come in as evidence",
            "result": "Mr Elphick goes in the book and the boards go in the property store, where THE END IS AT SIX O'CLOCK now faces the door and unsettles everyone who signs anything in. He spends the night in a cell radiating the quiet triumph of a man being persecuted exactly as foretold. The magistrate, at ten, will bind him over and privately agree about the end being nigh.",
            "effects": {
              "arrests": 1,
              "brass": 1,
              "streets": 1,
              "relief": -1
            }
          }
        ]
      },
      {
        "id": "ordinary_borstal_steps",
        "tone": "weary",
        "title": "REFUSING TO LEAVE — FRONT STEPS, THORNE STREET",
        "window": [
          8,
          16
        ],
        "text": "Terence Cudlip, nineteen, released from Borstal on Tuesday, has been sitting on the nick's front steps since midnight with one carrier bag and a City & Guilds certificate in bricklaying. He is not drunk, not wanted and not moving. Asked what he's doing, he says he's waiting to be let back in somewhere with rules in it, and that this was the nearest place with a light on. It is two degrees out and his jacket is the kind that photographs warmer than it wears.",
        "choices": [
          {
            "label": "Tea, the waiting-room bench, and the Sally Army at six",
            "result": "Not procedure, and nobody checks the waiting room till the Early Turn anyway. Cudlip sleeps under last year's crime prevention posters with his certificate inside his shirt, and at six the Salvation Army captain collects him like a parcel that's been kept safe. Bream leaves it out of the book on the grounds that the book has no column for it.",
            "effects": {
              "relief": 2,
              "brass": -1
            }
          },
          {
            "label": "Stand over the probation night line until it answers",
            "result": "The duty probation officer, run to ground on the fourth ring of a phone in Croydon, arrives at four with actual paperwork and an actual bed at a working men's hostel that takes his cases. Cudlip signs everything he's given, twice, to be sure. It is the system operating as designed, an event rare enough that you note the date.",
            "effects": {
              "brass": 2,
              "relief": -1
            }
          },
          {
            "label": "Call in a marker — a section-house cot, off the books",
            "result": "The section-house sergeant owes you from the summer and pays it at one a.m. without a word. Cudlip sleeps in the spare cot, is fed at the long table with thirty single policemen at six, and by way of rent points out to the boiler man which course of bricks is letting the damp in. Two of the relief privately conclude their guvnor is soft. Neither says it like a criticism.",
            "effects": {
              "favours": -1,
              "relief": 3
            }
          },
          {
            "label": "Move him on — it's a police station, not a hostel",
            "result": "He goes when he's told, because rules are the one thing he does. The beat man finds him at five in the bus shelter on Halkin Parade, sitting up straight, keeping the bench tidy. Nobody involved feels any better for the correctness of it, and the certificate stays folded in the carrier bag.",
            "effects": {
              "streets": -1,
              "relief": -2
            }
          }
        ]
      },
      {
        "id": "ordinary_mecca_queen",
        "tone": "weary",
        "title": "REFUSING TO LEAVE — MECCA BALLROOM, HALKIN PARADE",
        "window": [
          4,
          10
        ],
        "text": "Miss Dockside 1975 was decided at eleven, and at half past the runner-up, Miss Marilyn Steed (sponsored by Steed's Eels), occupied the stage with the microphone and a grievance about the arithmetic. She has the sash — nobody is entirely sure how — and is disputing the scoring round by round to an audience of cleaners, who are on her side. The manager wants his stage back. The winner left an hour ago in the promotional Cortina.",
        "choices": [
          {
            "label": "Hear the recount case out — all of it",
            "result": "Forty minutes on deportment scores and the bias of the swimwear judge, delivered from memory to an inspector standing where the band was. The awful thing, you conclude, is that she's right — the adding-up favours the Cortina dealer's niece. The Mecca's decision is final anyway. Miss Steed leaves with her chin up and the sash, which it turns out she has stitched to her coat, and the cleaners give her the door like royalty.",
            "effects": {
              "relief": -1,
              "streets": 1
            }
          },
          {
            "label": "Send the WPC to talk her down off the stage",
            "needsWpc": true,
            "result": "Hartle goes up, admires the sash professionally, and conducts the negotiation in the tone of one working woman to another at the end of a long shift. The two of them leave arm in arm past a manager who decides, on review of the optics, not to press anything. The microphone is returned. The arithmetic is not discussed further, except by the cleaners, for years.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "relief": 1,
              "streets": 1
            }
          },
          {
            "label": "Clear the stage — his premises, his rules",
            "result": "Miss Dockside's runner-up is removed from the stage of the Mecca ballroom by the Metropolitan Police, an event witnessed by eleven cleaners and, thanks to one of them having a brother on the Gazette picture desk, eventually by the borough. The charge doesn't survive the morning. The photograph of the sash in the charge room does.",
            "effects": {
              "arrests": 1,
              "brass": -2,
              "relief": -1
            }
          }
        ]
      },
      {
        "id": "ordinary_conscience_burglar",
        "tone": "weary",
        "title": "FOUND PROPERTY (SERIAL) — RETURNS IN THE NIGHT",
        "window": [
          6,
          14
        ],
        "text": "Third call of the night on the same theme: householders waking to find things arriving on their doorsteps. A carriage clock in Ropemakers Row, a christening spoon two streets over, a Box Brownie camera with a note in careful capitals: 'TOOK THIS 1968. SORRY. GETTING RIGHT WITH GOD.' Somewhere out in the rain a burglar is doing his rounds in reverse. Mrs Ogle, restored to a clock she'd forgotten owning, wants it dusted for fingerprints 'in case it's a trick,' though she cannot say what the trick would be.",
        "choices": [
          {
            "label": "Let him finish the round — book it all as found property",
            "result": "By five o'clock, eleven households are up on 1968. The property register fills with restitution, each entry needing a form designed for the opposite direction of travel, and Bream types 'CIRCUMSTANCES: REMORSE' eleven times with mounting respect. Whoever he is, he had a good year in 1968 and a better conscience now. The manor, waking item by item, is oddly moved.",
            "effects": {
              "brass": -1,
              "streets": 2
            }
          },
          {
            "label": "Put a PC on the pattern and catch him mid-repentance",
            "result": "The pattern is a map of 1968 walked in order, and Doyle is waiting at what must be the next address when a man in a duffel coat arrives holding a barometer. Mr Foley, retired locksmith, produces a ledger of every job since the coronation and asks only to finish the row first. You take the ledger and the man, in that order.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 2,
              "arrests": 1,
              "brass": 3,
              "relief": -1
            },
            "risk": {
              "odds": 55,
              "failResult": "The pattern is right but the night is long: Mr Foley clocks Doyle's silhouette from the corner and posts the remaining nine items, plus the ledger, plus a covering apology, to the nick — first class, like his padlock keys, to remove temptation. The parcels arrive Tuesday. The man does not.",
              "failEffects": {
                "brass": -1
              }
            }
          },
          {
            "label": "Dust Mrs Ogle's clock, since she asks",
            "result": "The print man, got out of bed for a carriage clock, examines it at length under Mrs Ogle's supervision and files a report reading, in its entirety, 'POLISH.' Mrs Ogle is satisfied that the Force takes her seriously, which — an hour of a specialist's night having gone on it — is not deniable. The clock keeps excellent time.",
            "effects": {
              "relief": -1,
              "brass": 1
            }
          }
        ]
      },
      {
        "id": "ordinary_mynah_bird",
        "tone": "weary",
        "title": "ALARM — PET SHOP, CHURCH WALK",
        "window": [
          2,
          10
        ],
        "text": "The alarm at the Church Walk pet shop brings the beat man at a run, to find no entry, no loss, and a mynah bird named Nelson doing a police whistle at concert pitch. The neighbours are convinced there is an officer trapped inside; there is only Nelson, who follows the whistle with 'YOU'RE NICKED, SUNSHINE' and then, in the unmistakable cadence of the stipendiary magistrate, two words that would clear a courtroom. Somebody has been educating this bird, and recently.",
        "choices": [
          {
            "label": "Silence the alarm, note the log, leave Nelson the night",
            "result": "The bell is stilled and the shop left to its sentinel. Nelson sees you off with the whistle, the caution, and — as the door closes — the magistrate's two words, delivered with what witnesses agree is timing. The neighbours go back to bed unsure whether they have been protected or reviewed.",
            "effects": {
              "streets": -1,
              "relief": 1
            }
          },
          {
            "label": "Knock up the keyholder for a proper look round",
            "result": "The keyholder arrives in pyjamas and finds what the glass hid: the stockroom transom forced and the till float gone — someone in and out the quiet way while Nelson provided the commentary. A crime discovered is better than a crime slept through, and the keyholder, doing sums, concludes the bird earned his cuttlefish. Nelson does the whistle at Whittle by way of goodnight.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "brass": 1,
              "streets": 2
            }
          },
          {
            "label": "Take Nelson in — material witness",
            "result": "Nelson attends Thorne Street in his cage and spends the night on the front counter impersonating Bream's whistle until the front office answers doors that haven't gone. At four he produces the magistrate's two words during the booking-in of a drunk, who pleads guilty on the spot to be away from it. Front-office discipline does not survive the shift. Nobody regrets it.",
            "sets": "flag_nelson_nicked",
            "effects": {
              "relief": 2,
              "brass": -2
            }
          }
        ]
      },
      {
        "id": "ordinary_rollers_queue",
        "tone": "weary",
        "title": "OVERNIGHT QUEUE — ODEON, MARSH LANE",
        "window": [
          10,
          16
        ],
        "text": "The Odeon box office opens at nine for the Bay City Rollers, and by four the queue is two hundred girls in tartan scarves, forty supervising mums with flasks, and one scalper — Tickets Maurice — working the line like a gleaner. The queue has organised itself: numbered wrists, a rota for the caff's lavatory, a strict register kept by a mum called Mrs Prentice whom Bream, on the phone, has already described as 'wasted outside the Job.' The Odeon manager wants crowd control. The crowd is controlling itself better than most Cup finals.",
        "choices": [
          {
            "label": "Drive past hourly and wave",
            "result": "The area car makes its pass on the hour and is cheered like a float. Mrs Prentice flags it once — to hand over a girl's forgotten inhaler, retrieved by rota from her mum's kitchen — and the queue holds its shape till dawn under a command structure the Army would envy. In the log it goes down as 'assembly, orderly, tartan.'",
            "effects": {
              "streets": 1,
              "relief": 1
            }
          },
          {
            "label": "Move Tickets Maurice along — the mums have noticed him",
            "result": "Maurice is repositioned to a distance from which resale is theoretical, protesting that he is 'providing liquidity.' The mums see him off with a look that will keep him honest into December, and Mrs Prentice strikes his wrist-numbers from the register with a biro stroke you can hear. Duffin walks the line once, gravely, and is given a butterscotch.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "streets": 2,
              "brass": 1
            }
          },
          {
            "label": "Disperse the queue — no assembly before dawn",
            "result": "Two hundred girls do not disperse. They re-form around the corner, singing, in the same order — the register sees to that — and the Gazette's early man photographs an inspector being comprehensively defeated by tartan. The Odeon manager, whose idea this now isn't, opens the box office early in self-defence. The picture runs Thursday.",
            "effects": {
              "streets": -3,
              "brass": -1,
              "relief": -1
            }
          }
        ]
      },
      {
        "id": "ordinary_vault_guard",
        "tone": "weary",
        "title": "MAN TRAPPED — PROVIDENT BANK STRONGROOM",
        "window": [
          3,
          12
        ],
        "text": "Mr Beeby, night guard at the Provident, has contrived to lock himself inside the strongroom, a thing three engineers will later agree is impossible. The time-lock opens at 8:45 a.m. He has the internal phone, half a corned-beef sandwich, and a voice climbing steadily through the registers of a man who has just remembered he doesn't care for small rooms. The manager, reached in Guildford, says the lock is the lock, the door is four inches of Sheffield's best, and Mr Beeby — this said with feeling — is the lock's problem now.",
        "choices": [
          {
            "label": "Talk him through the night on the phone, in shifts",
            "result": "The front desk takes Mr Beeby in relays: Bream on the fishing, Doyle on the football, the small hours filled with the wedding of Beeby's daughter and the case for and against caravans. His breathing comes down out of the flute register somewhere around four. At 8:45 the door swings open on a man composed, corned-beef finished, who asks the assembled staff what all the fuss was. The desk log runs to nine pages.",
            "effects": {
              "relief": -1,
              "brass": 1
            }
          },
          {
            "label": "Get the maker's night engineer out of bed in Wolverhampton",
            "result": "You call in the marker and a man in Wolverhampton talks the mechanism into opening at ten past four, by telephone, in the tone of a vet delivering a foal — 'gently now, quarter turn, she'll want to stick.' The door yields. Mr Beeby emerges into the arms of the night and shakes everyone's hand twice. The Provident's manager, informed at breakfast, asks what it costs and is told: a favour. He doesn't understand and never will.",
            "effects": {
              "favours": -1,
              "relief": 1,
              "brass": 1
            }
          },
          {
            "label": "Brigade with the cutting gear — he sounds bad",
            "result": "The Brigade come mob-handed and go through four inches of Sheffield's best in a firework of sparks that Mr Beeby, wrapped in a blanket, watches with the pride of a man being expensively rescued. He is out by three. The Provident's directors bill the Home Office for a strongroom door, the Home Office asks the Yard, and the Yard asks you, in writing, whether Mr Beeby's breathing was 'clinically assessed.'",
            "effects": {
              "streets": 1,
              "brass": -3,
              "relief": 1
            }
          }
        ]
      },
      {
        "id": "grime_turkey_hijack",
        "tone": "grief",
        "title": "HIJACK — REFRIGERATED LORRY, THE EASTWAY",
        "window": [
          2,
          9
        ],
        "text": "Bernard's Poultry's eight-tonner — four hundred oven-ready turkeys, five weeks before Christmas — taken at the Eastway lights by three men with stockings on their heads and no appetite for conversation. They took the driver's boots, 'so he couldn't be a hero,' and he has walked back to the box in his socks with his dignity, on the whole, enhanced. It is the third load lifted across the divisions this month. A refrigerated trailer has to sit somewhere with power to it, and the manor does not have so very many yards that hum.",
        "choices": [
          {
            "label": "Work the humming lock-ups — two PCs and the collator's list",
            "result": "The collator's list of yards with three-phase power is eleven entries long, and the fifth hums. Whittle and Duffin go in over the wire and find the Wallis brothers ankle-deep in frozen birds, loading a Transit by torchlight with the fatalism of men who know exactly how this looks. Two in the book, four hundred turkeys recovered, and Bernard's Poultry's reward — a brace of birds for the nick — declined at the desk and reported, correctly, to the last penny.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 2,
              "arrests": 2,
              "streets": 4,
              "brass": 2
            },
            "risk": {
              "odds": 50,
              "failResult": "Right idea, wrong night: the humming yards hold a printing works, two banana ripeners and a man restoring an organ. By the time the list is exhausted the trailer is unloaded and dark somewhere off the manor, and four hundred turkeys have begun their journey into the Christmas economy at a discount nobody will report.",
              "failEffects": {
                "streets": -2
              }
            }
          },
          {
            "label": "Circulate ports and markets for the morning trade",
            "result": "Descriptions to the markets by teleprinter: a man offering oven-ready birds in bulk, no paperwork, seasonal prices. It is Smithfield's problem by four and the Flying Squad's by Monday, which is the correct channel and feels like posting a letter into fog. The driver is run home in his socks. Bernard's write to the Commander about the state of the Eastway, copy to their insurers.",
            "effects": {
              "brass": 1
            }
          },
          {
            "label": "Ring your man in the meat trade — where do hot birds land?",
            "result": "Your man in the trade, rung at home over the noise of his supper, names a yard off the bypass without pausing to think — 'where else has the power and no questions?' — and is right. The birds are back in lawful refrigeration by three, one Wallis brother in the book, the other over the fence in his socks, which the driver, hearing it, calls justice. The marker is spent. Christmas is saved, wholesale.",
            "effects": {
              "favours": -1,
              "arrests": 1,
              "streets": 3
            }
          }
        ]
      },
      {
        "id": "grime_uxb_depot",
        "tone": "grief",
        "title": "UNEXPLODED ORDNANCE — OLD TRAM DEPOT SITE",
        "window": [
          3,
          10
        ],
        "text": "The demolition crew working nights under floodlights at the old tram depot have uncovered a fin. Then, with the next bucket, the rest of it: a German bomb the size of a dustbin, thirty years asleep under the hardstanding, now lying in the works lamp-light with everyone's torches pointed respectfully elsewhere. The Sappers are coming from Chatham and are hours out. The foreman, who is paid by the yard cleared, proposes to 'work round it.' Three streets of sleeping houses stand inside the arc a bomb that size commands.",
        "choices": [
          {
            "label": "Evacuate the arc — knock up three streets in their curlers",
            "result": "Three streets are knocked up at two in the morning and herded, in dressing gowns and language, to the church hall, where the tea urn is going by half past and a card school by three. It is correct, it is procedure, and it is hated with a unanimity the borough usually reserves for the rates. When the Sappers render it safe at five, the loudest complainers are first back in, pausing only to tell you they'd never doubted it was nothing.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 2,
              "streets": 2,
              "brass": 2,
              "relief": -2
            }
          },
          {
            "label": "Cordon only — let sleeping streets lie till the Sappers rule",
            "result": "You throw a cordon round the site, stop the dig, and let three streets sleep beside their lodger as they have unknowingly done since 1940. The Sappers arrive at five, tut at the state of the fuse, and render it safe before the first kettle goes on. Nobody ever knows. It is the kind of judgement that is either sound nerve or luck, and only the morning knows which.",
            "effects": {
              "brass": 1,
              "streets": 1
            },
            "risk": {
              "odds": 60,
              "failResult": "The bomb sleeps on — but the foreman, sent home unpaid, talks, and by breakfast the Gazette has 'POLICE LET BOROUGH SLEEP BESIDE BOMB' and a diagram with concentric circles on it. The Sappers' quote — 'stable as a church, as it happens' — runs in paragraph nine, where nobody reads it.",
              "failEffects": {
                "brass": -4
              }
            }
          },
          {
            "label": "Stop the dig and argue it out with the foreman",
            "result": "The dig stops. The foreman rings his firm, his firm rings its lawyer, and by half past someone has woken an MP, who rings the nick to ask why progress is being obstructed and is read, slowly, the dimensions of the object in question. The site stands silent till the Sappers come. The foreman spends the night doing sums about penalty clauses aloud, at you, which under the circumstances counts as background music.",
            "effects": {
              "streets": 1,
              "brass": 1,
              "relief": -1
            }
          }
        ]
      },
      {
        "id": "grime_lead_empire",
        "tone": "grief",
        "title": "THEFT IN PROGRESS — LEAD, EMPIRE CINEMA ROOF",
        "window": [
          4,
          12
        ],
        "text": "A watcher across the road reports figures on the roof of the old Empire — dark since 1971, owner in Malta — rolling lead off the ridge like pastry. A lorry idles in the alley below with its plates mudded. It is raining, the slates are forty feet up and greasy as a chip, and the lead, by the sound of it, is coming off in yards. The Empire's marquee still advertises, in the letters nobody took down, LAST DAYS.",
        "choices": [
          {
            "label": "Take the lorry first, then wait under the ladder",
            "result": "The lorry is boxed in and its driver invited to keep quiet, which he does, being paid by the hundredweight and not for loyalty. Then it is simply a matter of waiting under the only ladder with the patience of the employed. Gravity is on the strength tonight: two roofers come down at half past, hands full of nothing, into as easy a pair of bookings as the night book has ever taken. The lead goes back up in April, at the insurer's pleasure.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 1,
              "arrests": 2,
              "streets": 3
            }
          },
          {
            "label": "Up after them — the wet slates be damned",
            "result": "Whittle goes up the ladder into the rain and along the ridge like a man who did his National Service somewhere vertical, and takes the nearest roofer by the collar at the exact moment the man's nerve goes. Both come down slowly, roped to the chimney breast, to a crowd that has materialised despite the hour and applauds. The second man surrenders at the ladder foot on the grounds, he says, of having seen enough.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "arrests": 1,
              "streets": 2,
              "relief": 2
            },
            "risk": {
              "odds": 40,
              "failResult": "The slates are on their side. Whittle comes down the fast way as far as the guttering, which holds — barely — and hangs there while the roofers go over the far parapet and away down a drainpipe with the night's lead already aboard the lorry. Nothing is broken except his opinion of the order that sent him up, which was yours.",
              "failEffects": {
                "relief": -4,
                "streets": -1
              }
            }
          },
          {
            "label": "Log it — the owner's in Malta and the rain's on their side",
            "result": "You leave the Empire to its last days in fact as well as neon. By morning the ridge is stripped to the boards and the first November rain is standing in the stalls where the one-and-nines used to be. The insurers will fight the owner, the owner will fight the council, and the building — which showed 'Brief Encounter' four hundred times — will not see spring. The beat man minds more than he says.",
            "effects": {
              "streets": -3
            }
          }
        ]
      },
      {
        "id": "grime_bookie_welsh",
        "tone": "grief",
        "title": "CROWD — TURF ACCOUNTANT, RENNIE'S CORNER",
        "window": [
          2,
          8
        ],
        "text": "Rennie's Turf Accountants has its shutters down with Friday's payouts inside, and Mr Rennie's Jaguar was seen at eight heading south 'with luggage.' Outside in the rain, forty punters are doing arithmetic aloud, and the arithmetic keeps coming out at a week's wages apiece. The window has already taken one bottle. The crowd's spokesman, a docker with a betting slip laminated in desperation, wants to know whose side the law is on, of a Friday, in the wet.",
        "choices": [
          {
            "label": "Two PCs on the shutters till the arithmetic cools",
            "result": "Doyle and Duffin stand the shutters like sentries at a tomb, which in the sense that matters it is. The crowd, denied the window, settles into the grim comfort of collective grievance, exchanges addresses like veterans, and drains away by two. The shop survives the night. The savings inside it were gone by teatime, but that is a crime for daylight and the Fraud Squad, who work bankers' hours because they are, after a fashion, bankers.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 2,
              "streets": 2,
              "relief": -1
            }
          },
          {
            "label": "Take statements and promise the Fraud Squad at nine",
            "result": "You set up at the café over the road and take forty statements of increasing bitterness, each beginning with the horse that came in and none ending anywhere good. The pile of paper is a foot of pure grief with a paperclip on it. The crowd disperses because writing it down felt, briefly, like something happening. In the window's opinion, expressed at half past one via half a brick, it wasn't.",
            "effects": {
              "brass": 1,
              "streets": -2
            }
          },
          {
            "label": "All-ports for the Jaguar — Rennie can answer it tonight",
            "result": "The Jaguar is stopped on the Dover road at four with Mr Rennie, a suitcase of Friday's payouts, and a booking on the morning ferry made — the desk finds this detail restorative — in his own name. He comes back up the A2 between two Kent officers, complaining about jurisdiction. Word reaches the corner by breakfast and the manor concludes the law is, occasionally, on the right side of a Friday.",
            "effects": {
              "brass": 2,
              "streets": 2
            }
          },
          {
            "label": "Let the window go — insurance pays faster than Rennie",
            "result": "You keep the crowd off each other and let the shopfront take the verdict. It goes at half past midnight to a roar you can hear at the nick, and the crowd, honour satisfied, goes home to break the news to forty kitchens. The relief privately enjoy it. Upstairs, in the morning, does not: 'police stood by' is a phrase with a career of its own.",
            "effects": {
              "streets": -3,
              "relief": 1,
              "brass": -2
            }
          }
        ]
      },
      {
        "id": "grime_fivers_flood",
        "tone": "grief",
        "title": "COUNTERFEIT — FIVERS ALONG THE HIGH STREET",
        "window": [
          5,
          12
        ],
        "text": "Closing time delivers five landlords to the front desk in a body, each holding a five-pound note, each note with the same serial number, the ink still faintly damp and Her Majesty looking, in the phrase of the Feathers' governor, 'seasick.' Someone has drunk his way west along the high street passing them one per pub, tipping generously, described by all as 'a lovely fella.' The Feathers took nine. The night is young and the high street runs a good deal further west.",
        "choices": [
          {
            "label": "Map the run — where does a man drinking westward finish?",
            "result": "A man spending westward at that rate finishes where the high street does. Doyle takes the trajectory and finds him in the last doorway before the canal, asleep under his coat like a full stop, forty-one seasick fivers in one pocket and, in the other, the tips he'd been given as change — which are real, and add up to more than he'd spent. The printer's name comes out of him by six, in exchange for aspirin.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 2,
              "arrests": 1,
              "streets": 3,
              "brass": 2
            },
            "risk": {
              "odds": 55,
              "failResult": "The trajectory is sound but the man has stamina: somewhere past the Duke of Clarence he found a minicab, and the trail of seasick Queens goes cold at the rank. The notes will surface for weeks — in offertory plates, in the market floats, once in the nick's own tea fund, a discovery Bream declines to log.",
              "failEffects": {
                "brass": -1
              }
            }
          },
          {
            "label": "Collect the notes and book the statements for nine",
            "result": "Five landlords make five statements and surrender five exhibits, which go into an envelope marked for the Yard's forgery people — C7, who will confirm within the week what everyone at the desk can see tonight: same plate, poor water-mark, lovely fella. It is the correct channel. The high street's tills, meanwhile, stay open westward, taking the Queen at her word.",
            "effects": {
              "brass": 1,
              "streets": -1
            }
          },
          {
            "label": "Ring ahead — warn every all-night till before he lands",
            "result": "Bream works the phone westward like an artillery observer: the all-night caff, the taxi rank, the off-licence that pretends it's shut but isn't. By one o'clock every till on the route is holding notes up to the light, and somewhere out there a lovely fella finds the manor has stopped taking his money. He leaves it, eventually, in a phone box — forty fivers folded into the directory at 'P', which the finder, to his lasting credit, brings in.",
            "effects": {
              "streets": 2,
              "relief": -1
            }
          }
        ]
      },
      {
        "id": "grime_jcb_joyride",
        "tone": "grief",
        "title": "PLANT IN MOTION — EXCAVATOR, HIGH STREET",
        "window": [
          6,
          13
        ],
        "text": "A stolen excavator is proceeding down the high street at walking pace with its bucket raised in what witnesses independently describe as a salute. The driver is singing selections from South Pacific. Six bollards and a keep-left sign are already recumbent, and the site watchman is in pursuit on a bicycle, ringing his bell, which the excavator cannot hear and history will not record. It is, the panda observes over the air, 'not so much a chase as a procession.'",
        "choices": [
          {
            "label": "Box it in with both pandas at the narrows",
            "result": "The narrows by the war memorial will not pass an excavator and two pandas, and the procession concludes there with the dignity of a state occasion. The driver descends from the cab, finishes the chorus, and offers his wrists with the observation that he has 'always wanted a go on one.' A crane man by trade, it turns out, laid off Tuesday. The magistrate will hear the whole song of it at ten.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 1,
              "arrests": 1,
              "streets": 3,
              "brass": 1
            }
          },
          {
            "label": "Let it run out of diesel — follow at a dignified distance",
            "result": "The tank was near empty when he took it, and the excavator splutters its last outside the war memorial with a theatrical sense of venue. The driver climbs down, bows to the following traffic — by now four vehicles and the bicycle — and sits on the bucket to wait for you, singing softer. Cheapest arrest of the month: no damage after the bollards, no struggle, one encore.",
            "effects": {
              "arrests": 1,
              "streets": 1,
              "relief": 2
            },
            "risk": {
              "odds": 65,
              "failResult": "The gauge lied. At the junction he finds reverse, a side street, and a parked Cortina, in that order, and the procession becomes a demolition. He is taken eventually — the bicycle, of all things, heading him off at the yard gate — but the street behind him bills the night for one Cortina, two more bollards and a garden wall.",
              "failEffects": {
                "streets": -3,
                "brass": -1
              }
            }
          },
          {
            "label": "The watchman's bicycle is gaining — observe",
            "result": "You let private enterprise run its course. The watchman draws level at the lights, boards the excavator at a bound that takes ten years off him, and stalls it with the master switch, after which the two men sit in the cab arguing about the rugby until the panda arrives. The watchman declines all praise and asks only that his employers never learn the machine was left fuelled with the key in. They learn it in paragraph one.",
            "effects": {
              "streets": -2,
              "relief": 1
            }
          }
        ]
      },
      {
        "id": "grime_squat_bailiffs",
        "tone": "grief",
        "title": "BREACH OF PEACE (IMMINENT) — EVICTION, CHAPEL YARD",
        "window": [
          13,
          16
        ],
        "text": "Private bailiffs for Grendon Estates have arrived at the Chapel Yard squat at ten to five with sledgehammers, a dog, and a vanload of large assistants hired by the shift. The possession order in the foreman's fist says nine a.m., which he calls 'a detail of timing.' Inside are eleven adults, four children and a dog of their own, all asleep until the first knock. The foreman's men are warming up in the way of men who have been promised the house will be empty before the paperwork wakes up.",
        "choices": [
          {
            "label": "Stand in the doorway — nine o'clock means nine o'clock",
            "result": "You put yourself and the warrant card between the sledgehammers and the door and read the foreman his own possession order, twice, with emphasis on the nine. His lawyer, rung at five a.m., declines to instruct him to go through an inspector. The van withdraws to the corner to wait for lawful daylight, engine running, while the squat boils a kettle behind you. Grendon Estates will complain to the Yard about 'obstruction.' Let them spell it.",
            "effects": {
              "streets": 2,
              "brass": -2,
              "relief": 2
            }
          },
          {
            "label": "Escort the van off — and log every name in it",
            "result": "Whittle takes the van's occupants one by one through the ritual of names, addresses and 'occupation?', an exercise that costs nothing and which men hired by the shift like least of anything in the world. Two give names the collator recognises with pleasure. The van leaves before the last page is done, timing suddenly being a detail they respect, and the nine o'clock eviction happens at nine, lawfully, with the Early Turn watching.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "streets": 2,
              "brass": 1
            }
          },
          {
            "label": "Let them proceed — a court order's a court order",
            "result": "It is not, at ten to five, and every window in Chapel Yard knows it. The door goes in at five sharp and eleven adults, four children and a dog are on the pavement with their bedding among the last of the night, watched by neighbours who will remember which uniforms stood by for longer than anyone will remember Grendon Estates. The paperwork, when the courts open, was four hours short of lawful. So, this morning, were you.",
            "effects": {
              "streets": -3,
              "relief": -3,
              "brass": 1
            }
          }
        ]
      },
      {
        "id": "grime_blue_films",
        "tone": "grief",
        "title": "INFORMATION RECEIVED — CINE CLUB OVER THE TOBACCONIST",
        "window": [
          7,
          14
        ],
        "text": "A tip arrives at the desk, typed, spelled correctly, unsigned: the 'Curzon Film Appreciation Society,' meeting Fridays above the tobacconist on Gresham Road, appreciates films of a kind the Board of Censors has never been troubled with. Tonight's programme began at midnight. Membership is by card, the projectionist is a retired schoolmaster, and the clientele is described as 'distinguished' — a word doing, in Bream's estimation, a full night's overtime in that sentence.",
        "choices": [
          {
            "label": "Raid it — up the stairs before the reel changes",
            "result": "The Society is taken mid-reel: projector seized still warm, a cash box of membership fees, and fourteen distinguished gentlemen looking for their coats with a unanimity of purpose the films never achieved. Two names in the book and one name not in it — a name that makes Bream whistle and write it on a separate piece of paper for you alone. That paper is worth more than the projector. Handle it like a detonator.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 1,
              "arrests": 2,
              "brass": 3,
              "streets": 1
            },
            "risk": {
              "odds": 45,
              "failResult": "The stairs are watched — of course they are; the tobacconist sells the watchers their cigarettes — and by the time you're up them the Society is deep in a slide lecture on the Lake District, projector cool, membership cards gone. Fourteen gentlemen regard you with mild cultural interest. The unsigned tipster's next note, Monday, says only: 'TOLD YOU THEY WERE QUICK.'",
              "failEffects": {
                "brass": -3
              }
            }
          },
          {
            "label": "Pass it to Obscene Publications at the Yard",
            "result": "The tip goes upstairs to the Obscene Publications Squad, whose relationship with Soho's film trade is, this year of grace 1975, itself the subject of unsigned notes. Perhaps it lands on an honest desk; the Yard has more of them than it did. The Society's Fridays continue meanwhile, distinguished as ever. Thorne Street's hands are clean and empty, which is the correct channel's speciality.",
            "effects": {
              "brass": 1
            }
          },
          {
            "label": "Open a collator's file and watch a while",
            "result": "Patience, the cheapest instrument in the drawer. The beat man notes the Friday cars and the collator's file fattens weekly: registrations, times, a magistrate's Rover parked two streets off with the thoroughness of the practised. Nothing is spent, nothing shown, and in a month the file will be the kind of document that opens doors — or closes them quietly, depending on who is asked to read it.",
            "effects": {
              "streets": 1
            }
          }
        ]
      },
      {
        "id": "grime_seance_flat",
        "tone": "grief",
        "title": "DISTURBANCE — SÉANCE, PEABODY BUILDINGS",
        "window": [
          6,
          12
        ],
        "text": "Neighbours in the Peabody Buildings report moaning, and the beat man finds a séance in full session: Madame Ostrova (of Catford), six chairs, a red bulb, and Mrs Callan, a docker's widow, who has paid four pounds tonight — and twice weekly since August — to hear the late Mr Callan 'come through.' The moaning was the radiogram, warming up behind a curtain. Fraudulent mediumship is an offence nobody has charged since the war. Grief, which is what's actually being farmed in this room, is not an offence at all.",
        "choices": [
          {
            "label": "Sit in on the circle and let her watch you not believe",
            "result": "You take the seventh chair in full uniform and the temperature of the beyond drops sharply. Madame Ostrova's guides, so talkative since August, cannot tonight find the frequency, and in the lengthening silence Mrs Callan's eye travels from the medium to the curtain to the radiogram's little amber dial, still lit. She stands, takes her coat, and says she'll be stopping her Thursdays. On the stairs she tells you Mr Callan never had the patience for chairs anyway.",
            "effects": {
              "streets": 2,
              "relief": -1
            }
          },
          {
            "label": "Charge her — the Fraudulent Mediums Act 1951",
            "result": "Bream has to fetch the ladder for the Act, which has slept on the top shelf since Attlee, and reads the charge to Madame Ostrova with the reverence owed to rare stamps. She goes in the book and the radiogram goes in as Exhibit A, still warm. The magistrate will make legal history of a small kind at ten. Mrs Callan, asked for a statement, gives one loyal to the medium in every line, which tells you what was really being purchased, and it wasn't Mr Callan.",
            "effects": {
              "arrests": 1,
              "brass": 2,
              "relief": -1
            }
          },
          {
            "label": "A word on the stairs: the money back, the visits done",
            "result": "On the landing, out of the red light, you put the arithmetic to Madame Ostrova: August, twice weekly, four pounds — and the sum comes back out of the cocoa tin before you reach the end of it. The Thursdays are over; Catford is welcome to her. Unofficial, unrecordable, and Mrs Callan keeps both the money and the belief, which at her age and on her landing may be the kindest split available.",
            "effects": {
              "streets": 1,
              "relief": 1
            }
          }
        ]
      },
      {
        "id": "ordinary_cab_bilker",
        "tone": "weary",
        "title": "BILKING — FARE DELIVERED, METER RUNNING",
        "window": [
          3,
          12
        ],
        "text": "A taxi draws up at the front steps with its fare still aboard, the doors held on the locks and the meter conspicuously running. The cabbie, Mr Coker, explains from the pavement: three pounds forty from the West End, at journey's end the gentleman 'discovered he had no money in these trousers' and offered a visiting card instead — so Mr Coker has driven him to the one address in the borough where the matter can be, as he puts it, 'arbitrated.' The fare, in dinner dress, is hammering on the glass and invoking habeas corpus. The meter reads four pounds five and climbing, Mr Coker having declined to stop it on principle.",
        "choices": [
          {
            "label": "Nick the fare — bilking is bilking, dinner dress or not",
            "result": "The gentleman is booked for making off without payment, protesting that his people will hear of it, which they will, from him, at length. Mr Coker stops the meter at four sixty-five, accepts the sum from the property found in the gentleman's pockets — there was money in those trousers after all, folded behind the cigar case — and departs, satisfied that the law works. Word goes round the ranks by two o'clock: Thorne Street sees a cabbie right.",
            "effects": {
              "arrests": 1,
              "streets": 2
            }
          },
          {
            "label": "Arbitrate at the desk — the card, the wife, the money by noon",
            "result": "The visiting card is real and so, once woken by telephone, is the wife, who arrives at half past in a Rover with the housekeeping and an expression that suggests the fare's troubles are only beginning. Four pounds five is paid, plus a shilling for the glass being hammered on, plus a tip that mends nothing. Mr Coker departs content. The gentleman departs in the Rover, in the passenger seat, in silence.",
            "effects": {
              "streets": 1,
              "brass": 1
            }
          },
          {
            "label": "Ask Mr Coker what locking a man in a cab is called",
            "result": "You observe, conversationally, that the meter is running on a gentleman detained against his will, and that the word for that has a statute attached. The locks come off at speed. The fare, freed and vindicated, promptly finds a five-pound note in his cummerbund and pays in full to make a point of his magnanimity. Both parties leave united in the sincere opinion that the police protect nobody, which the desk agrees has been a fair night's work.",
            "effects": {
              "streets": -1,
              "relief": 1
            }
          }
        ]
      },
      {
        "id": "follow_rooftop_legend",
        "tone": "weary",
        "title": "FIGURE ON THE LEADS — CO-OP ROOF, QUERY GUVNOR",
        "window": [
          2,
          10
        ],
        "requiresFlag": "rooftop_legend",
        "text": "Since the night you went over the parapet on Cadogan Row, the manor has decided its inspector is part steeplejack, and tonight it collects: a figure reported on the Co-op roof, and the beat man, radioing it in, adds — hopefully, and in everyone's hearing — that it 'sounds like one for the guvnor personally.' The relief have stopped typing. Sgt Bream has, without comment, fetched the torch you used last time and set it on the desk like a ceremonial sword.",
        "choices": [
          {
            "label": "Go up yourself — legends have maintenance costs",
            "result": "You go up the Co-op fire ladder with the ceremonial torch and the relief's entire attention, and come down eleven minutes later with a tomcat under one arm and the legend not merely intact but compounding. The figure was the cat's shadow thrown by a loose floodlight. Nobody downstairs will ever believe that, and you have stopped correcting them.",
            "effects": {
              "streets": 2,
              "relief": 3,
              "brass": -1
            }
          },
          {
            "label": "Two PCs and the long ladder — delegation is also command",
            "result": "The long ladder goes up and so do two constables, who find a loose floodlight, a tomcat, and a roof otherwise innocent of villainy. The relief receive the news with the faint disappointment of a crowd sold tickets to a cancelled fight. The legend survives on a technicality: you would have gone, everyone agrees, if it had been anything.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 1,
              "streets": 1
            }
          },
          {
            "label": "Field glasses from the yard first — heroics can wait a look",
            "result": "From the yard, through Bream's racing binoculars, the figure resolves into the Co-op's own banner worked loose and flapping against the parapet — MEMBERS' DIVIDEND WEEK, waving to the borough. You announce it to the front office in the tone of a {man} declining an encore. The torch goes back in the drawer until the next time, and there will be a next time.",
            "effects": {
              "relief": -1,
              "brass": 1
            }
          }
        ]
      },
      {
        "id": "follow_gull_on_side",
        "tone": "grief",
        "title": "WORD FROM THE GULL — SOMEONE ON HIS OLD PATCH",
        "window": [
          3,
          11
        ],
        "requiresFlag": "gull_on_side",
        "text": "A note arrives at the desk by a route nobody can quite reconstruct — inside the returned canteen flask, in a hand like copperplate frost: the Gull presents his compliments. Somebody is working his old rooftops, crudely — forced skylights, broken tiles, a dog kicked — and it offends him professionally. He offers a name and a window and an address, price as before: strict anonymity, and no one ever asks him to repeat it in a witness box. Doing business with him worked once. That is precisely what worries you about doing it twice.",
        "choices": [
          {
            "label": "Act on the name tonight — his eye was never wrong yet",
            "result": "The name is good, the window is good, the address is a lock-up with a ladder still warm against the back wall. The imitator comes down at the sight of the torches and asks, bitterly, who grassed — a question the charge sheet leaves elegantly unanswered. Somewhere above the fog, professional standards have been upheld.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 2,
              "arrests": 1,
              "streets": 3,
              "brass": 2
            }
          },
          {
            "label": "Put it through the collator as anonymous information",
            "result": "The name goes into the index in the collator's careful hand, sourced 'ANON — RELIABLE', which is both words true and neither adequate. It will surface in a case file within the month wearing somebody else's deduction, which is how the Gull prefers his justice: done, and not signed. The imitator's days are numbered by paperwork.",
            "effects": {
              "streets": 1,
              "brass": 1
            }
          },
          {
            "label": "Decline — an informant you can never book is a debt compounding",
            "result": "You burn the note in the charge-room grate and tell nobody, which is the only way to decline a man who reads walks, not faces. The rooftops stay crude and broken-tiled for another week until the imitator falls through a conservatory in the next division, solving himself. The Gull sends no further notes. You are not sure whether that is relief or loss, and neither is the manor.",
            "effects": {
              "streets": -2,
              "brass": 1
            }
          }
        ]
      },
      {
        "id": "follow_dawn_peace",
        "tone": "weary",
        "title": "DEPUTATION — THE THORNE STREET TREATMENT, PLEASE",
        "window": [
          2,
          9
        ],
        "requiresFlag": "dawn_peace",
        "text": "The unsigned peace of Thameshead Wharf has entered circulation, and tonight it produces a deputation at the front desk: three men from the Beacon Dairies night shift and one from the depot management, mid-dispute over rosters, all four asking — politely, and having plainly rehearsed it — for 'the Thorne Street treatment.' They have brought their own cocoa. Sgt Bream is already looking at the canteen urn the way a gunner looks at his gun.",
        "choices": [
          {
            "label": "Send the urn and an hour — once more, off the record",
            "result": "The urn goes down to the dairy with Bream in attendance, and by half past the rosters have assembled themselves into something both sides call unfair in the identical proportion, which is the definition of a settlement. Nothing is signed; everything is honoured. Upstairs, word spreads that Thorne Street has opened a conciliation service, and the Commander's eyebrow can be heard rising from here.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "streets": 2,
              "relief": 1,
              "brass": -2
            }
          },
          {
            "label": "Decline — once was a favour, twice is a precedent",
            "result": "You explain, with the urn in eyeshot, that the Metropolitan Police keeps the peace but does not negotiate it, and that Thameshead was the exception that proves the rule nobody can state. The deputation withdraws with dignity and their own cocoa. The dairy dispute runs three more days and settles on terms indistinguishable from what an hour and an urn would have got them.",
            "effects": {
              "streets": -1,
              "brass": 2
            }
          },
          {
            "label": "Ring Parris — let the wildcats' own peacemaker take the case",
            "result": "You put the deputation on the phone to Parris of the dockers, who brokered his own men home at Thameshead and accepts the commission with the gravity of an elder statesman being asked to open a fête. The dairy settles by two o'clock, union to union, no police involved — which is, you note for the file, exactly the correct outcome, arrived at entirely by irregular means.",
            "effects": {
              "streets": 1,
              "relief": 1
            }
          }
        ]
      },
      {
        "id": "follow_cray_manifest",
        "tone": "grief",
        "title": "CRAY'S REMAINDERS — NIGHT LORRIES ON THE BYPASS",
        "window": [
          4,
          12
        ],
        "requiresFlag": "cray_manifest",
        "text": "Aldous Cray is on remand and his friends upstairs are still having diary trouble, but his freight has not stopped moving — it has rerouted. Your man at Customs rings the back line: the bonded Scotch that used to sail through Thameshead now travels by night lorry, and the route runs up your bypass, Tuesdays and Fridays, papers describing a cargo of Danish pork that no one has ever seen unloaded. Separately, and not coincidentally, a smooth solicitor has lodged a complaint alleging you 'exceeded jurisdiction' at the wharf. The two documents read better side by side.",
        "choices": [
          {
            "label": "Stop the Friday lorry on the bypass — papers, load, the lot",
            "result": "The lorry comes through at ten past two and stops for the lamp with the resignation of a driver who has been expecting it for weeks. Under the courtesy layer of Danish pork: the Clyde's finest, bonded, bound officially for Rotterdam and actually for a lock-up off the Eastway. Driver in the book, load impounded, and the smooth solicitor's complaint develops, overnight, a sudden interest in being withdrawn.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 2,
              "arrests": 1,
              "streets": 3,
              "brass": 2
            },
            "risk": {
              "odds": 55,
              "failResult": "The Friday lorry is, this Friday, actually carrying Danish pork — every box of it, all the way down, fragrant and lawful. The driver accepts your apology with the graciousness of a man who was told to expect you, because he was: the route changed Tuesday. The solicitor's complaint gains a second page by morning.",
              "failEffects": {
                "brass": -4
              }
            }
          },
          {
            "label": "Hand the route to Customs — their marker runs your way now",
            "result": "You give your man the schedule and stand well back. Customs take the Tuesday lorry at the county boundary with the quiet joy of their calling, and the seizure enters the record as theirs, the intelligence as nobody's. Your man is now twice in your debt, and says so, which from Customs and Excise is practically a ceremony.",
            "effects": {
              "favours": 1,
              "brass": 1
            }
          },
          {
            "label": "File the complaint and the tip together and touch neither",
            "result": "You minute both documents for the Fraud Squad's morning men with a covering note whose restraint costs you something to write. The lorries run twice more before anybody with a warrant card in daylight hours gets around to them. The solicitor's complaint, unanswered, ripens on a desk upstairs — which is where complaints against inspectors who exceed jurisdiction do their best work.",
            "effects": {
              "streets": -1,
              "brass": -1
            }
          }
        ]
      },
      {
        "id": "follow_agincourt_walked",
        "tone": "weary",
        "title": "CALLER AT THE DESK — MISS MEAKIN, WITH ARTWORK",
        "window": [
          1,
          8
        ],
        "requiresFlag": "agincourt_walked_home",
        "text": "Maureen Meakin, nine, presents herself at the front desk at half past ten — accompanied, at a distance calibrated to preserve everyone's dignity, by her grandfather's yard foreman — bearing a drawing in wax crayon: Agincourt the police horse, a constable rendered mostly as boots, and a small figure holding a nosebag, all under a sky containing both moon and sun 'because it took all night.' It is addressed, in letters that improve as they go, TO THE POLICE. Sgt Bream has gone very still.",
        "choices": [
          {
            "label": "The noticeboard, centre position, at wax-crayon eye level",
            "result": "The drawing goes up in the front office between the wanted notices and the Colorado beetle poster, at a height where its artist can inspect the hanging, which she does, twice, gravely. The relief pass it all night and every one of them stops. By six it has quietly become the thing the nick is proudest of, and nobody will say so, and everybody knows it.",
            "effects": {
              "relief": 3
            }
          },
          {
            "label": "Have the officer walk her home past the dairy — full honours",
            "result": "The constable who walked Agincourt home now walks his smallest witness home by the same route, pausing at the dairy fence so that a horse who is officially asleep can be officially not asleep for two minutes. The drawing rides in the pocket book for safe keeping. Old man Meakin watches from the yard gate and says nothing, and sends round a second sack of carrots on Monday.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "streets": 1,
              "relief": 2
            }
          },
          {
            "label": "A receipt for one (1) artwork, signed and stamped",
            "result": "Bream types a formal property receipt — ONE DRAWING, HORSE (MOUNTED BRANCH), OFFICERS (VARIOUS), SKY (BOTH KINDS) — stamps it twice, and presents it across the desk with the solemnity of a man handing over a warrant. Miss Meakin receives it as exactly what it is: proof that the police take her seriously. She will keep it longer than the nick keeps most of its records.",
            "effects": {
              "brass": 1,
              "relief": 1
            }
          }
        ]
      },
      {
        "id": "follow_agincourt_page",
        "tone": "weary",
        "title": "THE GAFFER PICKS HIS GREENS — THE PRESS BUREAU WRITES",
        "window": [
          2,
          9
        ],
        "requiresFlag": "agincourt_front_page",
        "text": "The front page did what front pages do: the Yard's press bureau requires 'a full account of the circumstances in which a Mounted Branch remount came to be photographed judging vegetables,' Commander Rossiter's office has underlined 'full' in a way the typist felt, and — by the same post — Chapel Yard Market's traders' association formally invites Agincourt to open Saturday trading, ribbon and all. The horse, consulted at the dairy fence, seemed amenable.",
        "choices": [
          {
            "label": "Write the account straight — every word true and none of them sorry",
            "result": "You set out the night as it happened: horse loose, fog, market, recovery without injury to any person, animal or vegetable, public confidence in the police visibly improved. It is the kind of report that survives because it declines to apologise for succeeding. Rossiter reads it twice, writes 'NOTED' in a hand that concedes nothing, and files it. The press bureau is not heard from again.",
            "effects": {
              "brass": 2,
              "relief": -1
            }
          },
          {
            "label": "Let the market have its opening — lean all the way in",
            "result": "Saturday trading is opened by eleven hundredweight of police horse in a ribbon, to a turnout the market has not seen since VE night. The borough is delighted beyond the reach of any crime statistic; the Yard's press bureau receives a second front page with its coffee and takes it in the manner of a body receiving a second bee sting. The account they wanted is now owed with interest.",
            "effects": {
              "streets": 3,
              "brass": -3
            }
          },
          {
            "label": "Let the request mature in the internal post",
            "result": "The bureau's memo goes into the tray that answers things eventually, where it settles among its own kind. Nothing happens for eleven days, which in press-bureau time is geological, and by then a junior minister has been photographed falling off a pier and the Force has a new favourite embarrassment. The market's invitation you answer personally, with regrets, and keep the ribbon they sent.",
            "effects": {
              "brass": -1,
              "relief": 1
            }
          }
        ]
      },
      {
        "id": "ira_ticking_store",
        "title": "TICKING — THE PROPERTY STORE",
        "text": "Sgt Bream reports, in the level voice he saves for the genuinely bad, a distinct ticking from the property store — which has been locked for the night, helpfully, by Mr Impy, the store's ancient non-warranted keeper, a man who smells faintly of cabbage and will not read a form unless it is written in the correct shade of black. Bream's unease has a shape: his first act of the shift, with Impy still on the premises, was to book in a lost suitcase belonging to a Mr Patrick Kerr — a name he now realises is on tonight's briefing, on a slide added Met-wide by Special Branch. You check. He's right. But the briefing also mentions a Swiss gentleman, Mr Patrik Kehr, in London to exhibit his world-famous cuckoo clocks — and for all his fastidiousness, Mr Impy's handwriting is shocking. It could be either name. Or neither.",
        "choices": [
          {
            "label": "Leave it. It's clocks. Probably. Say 'probably' with authority",
            "result": "The night passes to a muffled metronome nobody mentions and nobody stops hearing, and at six o'clock precisely the property store erupts — in a chorus of forty-one cuckoos, straight through the Early Turn's parade. Herr Kehr collects his samples at nine with apologies for the travel alarm packed among them, and Bream enters the night in the book as 'all correct', pressing rather hard on the pen.",
            "effects": {
              "relief": -3
            },
            "risk": {
              "odds": 75,
              "failResult": "At half past four the ticking stops, which is the last quiet thing it does. The device — small, incendiary, and Mr Kerr's — takes the store door off its hinges and cremates every lost umbrella on the manor; nobody is hurt, the drunk in cell two sleeps through the bells, and Special Branch arrive by six wanting to know, in writing, in order, who heard ticking and decided on 'probably'.",
              "failEffects": {
                "brass": -8,
                "streets": -3
              }
            }
          },
          {
            "label": "Get Mr Impy out of his bed",
            "result": "Mr Impy arrives by panda in dressing gown and overcoat, smelling faintly of cabbage and strongly of grievance, and declines to consult the ledger until issued a torch of a wattage he approves. Then: 'Kehr. With an aitch. I wrote it plainly.' The suitcase is opened under his supervision — he has the second key on his person, of course he does — and forty-one cuckoo clocks tick on in Swiss unison. He waits, in silence, to be driven home.",
            "effects": {
              "favours": -1
            }
          },
          {
            "label": "Evacuate — bomb squad out, everyone to the Duke of Cumberland",
            "result": "The nick decants to the Duke of Cumberland, where the clientele — finding the entire night shift suddenly among them — achieve a standard of behaviour the licensing justices should see. Expo works the store alone for an hour and emerges at half three with the verdict: cuckoo clocks, forty-one of them — and one travel alarm nobody can account for, which they take away without comment. The relief return to the nick warm, and oddly fond of the Duke of Cumberland.",
            "effects": {
              "streets": 2,
              "brass": -2,
              "relief": 2
            }
          },
          {
            "label": "If it's Paddy Kerr's, there's no nick tomorrow. The river. Now.",
            "result": "National service says a suspect device goes into deep water, and national service carries the day — and the suitcase, at arm's length, to the embankment, at a pace between a march and a prayer. At twenty past four, slack tide, the river coughs once: a flat, heavy thump that rattles the chains on the wall. Special Branch arrive by seven asking questions in the tone of men who already know the answers, and for once the answers reflect — grudgingly, unrepeatably — well.",
            "effects": {
              "brass": -2,
              "relief": -2
            },
            "risk": {
              "odds": 25,
              "failResult": "The river accepts the suitcase without comment and returns it, via police frogman, on Tuesday. The remains are laid out on a tarpaulin: forty-one masterpieces of the Swiss clockmaker's art, drowned. Herr Kehr looks at them for a long time, says nothing, and then asks — through the consul, in writing — for the name of the officer concerned. The Foreign Office describes the subsequent note as the stiffest in living memory.",
              "failEffects": {
                "brass": -6,
                "streets": -1
              }
            }
          }
        ],
        "tone": "grief",
        "window": [
          2,
          8
        ]
      },
      {
        "id": "ira_family_43",
        "title": "INFORMATION RECEIVED — THE FAMILY AT NO. 43",
        "text": "Second post brings an unsigned letter in block capitals: the Dolans at 43 Eldon Road are 'HARBOURING MEN FOR THE BOMBERS' — lights at all hours, comings and goings, 'IRISH VOICES'. Sgt Bream has known Ted Dolan twenty years; he plays full-back for the Legion seconds. This is the fourth such letter on the manor since the autumn. The other three were nothing, and one of them cost an innocent man his job anyway. That is the season's poison, and it is on your desk now: because the fourth one, some night, at some address, won't be nothing.",
        "choices": [
          {
            "label": "Send PC Duffin round for a quiet word over the fence",
            "result": "PC Duffin knows the house, which is the whole art: the comings and goings are bakery shifts and a new baby, the lights at all hours are the baby's, and the block capitals match — to the crossing of the sevens — the man at 41, who lost the fence dispute in the summer and has found the era a convenient weapon. The letter goes in the file. The man at 41 gets a quiet word of his own, of a weight he will remember.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "streets": 2,
              "relief": 2
            }
          },
          {
            "label": "Pass it to Special Branch unweighed — let the system say",
            "result": "The letter goes up the chain in its envelope and becomes a docket, and the docket becomes two men in a car at the end of Eldon Road for a week. It closes months later marked 'no trace', as three before it closed. The Dolans learn of the car the way people always learn, and the manor's Irish doors — the ones that used to open to a knock and a kettle — get harder to knock on for everyone.",
            "effects": {
              "brass": 2,
              "streets": -3
            }
          },
          {
            "label": "File it with the other three",
            "result": "It goes in the drawer, initialled NFA in Bream's steadiest hand, on top of the letter about the Keoghs and the one about the man who whistles. Nothing happens, which is what was in it. The drawer is getting full, and every man who opens it knows the arithmetic the season is running.",
            "effects": {}
          }
        ],
        "tone": "grief",
        "window": [
          2,
          10
        ]
      },
      {
        "id": "ira_cortina",
        "title": "THE CORTINA BY THE SECTION HOUSE",
        "text": "A green Cortina has stood three nights hard against the section house wall: tax disc out of date, boot riding low, and tonight — the beat man reports it flat, the way men report the thing they hope is nothing — a smell off the boot seam he can't name. He chalked the tyres on Tuesday; it hasn't moved a foot. In November 1975 nobody in London looks at an unattended car the old way any more, and the section house has forty officers asleep on the other side of that wall.",
        "choices": [
          {
            "label": "Cordon it and call Expo — it gets treated as real",
            "result": "The Expo officer arrives, walks his slow circle, and opens the boot with the drill and the mirror while the section house watches from the wrong side of its own windows in pyjamas. The contents: a market bulk-buy of bacon, three weeks gone to its reward. The owner — Nurse Aherne, nights at the London, fan belt gone since Tuesday — arrives mid-cordon, mortified. The Expo man declares it the worst thing he has opened all year, and means it both ways.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 1,
              "streets": -2,
              "brass": 3
            }
          },
          {
            "label": "Have the beat man slip the door and look inside",
            "result": "The door yields to a wiper blade and forty seconds of misspent youth. The logbook in the glovebox gives the owner in one line, the smell gives itself away as somebody's shopping, and the whole affair is pushed to the kerb, resolved, before the kettle's boiled — nothing on paper, nobody in pyjamas.",
            "effects": {
              "streets": 1
            },
            "risk": {
              "odds": 60,
              "failResult": "The beat man is elbow-deep through the quarterlight when the Special Branch area car happens past on its own patrol, and the explaining — why a constable is breaking into a suspect vehicle, at night, with no cordon, against every circular of the season — lasts until four and reads worse than it lasted. The car turns out to be a nurse's, full of ruined bacon, which does not help the paperwork at all.",
              "failEffects": {
                "brass": -5
              }
            }
          },
          {
            "label": "Index the plates with the collator and wait for daylight",
            "result": "The index comes back to a hire firm in Kilburn, which in this season means an hour of careful telephone calls establishing that it means nothing at all — which it does. The car keeps its counsel till morning; the manor walks wide of it one more night; the section house sleeps unknowing, which was most of the point.",
            "effects": {
              "streets": -1,
              "brass": 1
            }
          }
        ],
        "tone": "grief",
        "window": [
          5,
          12
        ]
      },
      {
        "id": "flying_squad_leaving_do",
        "title": "FLYING SQUAD — DIRECT FROM THE LEAVING DO",
        "text": "The Flying Squad are in the front office, direct from DS Buckland's leaving do, leaning on each other, on two random pedestrians they appear to have brought with them, and now on your team for support in every sense. Between the pub and here they bumped into one of their sources, and the source says Billy the Blagger's crew are tooling up right now in a warehouse in Stepney to knock over a cash-in-transit van at dawn. The Squad's requirements, delivered at saloon-bar volume: three of your cells booked, the loan of a car, and the armoury open. They are drunk as lords and, on this subject, deadly serious.",
        "choices": [
          {
            "label": "Give them what they ask for — cells, car, and the armoury key",
            "result": "Adrenaline is a sobering agent the Yard has never had to requisition. The Squad go through the warehouse door at four like the wrath of God in borrowed transport, and Billy the Blagger's crew are taken mid-tool-up, sawn-offs still in the sacking. Three of them come back in your cells, singing, and the Squad sign your armoury book with a flourish that nearly tears the page.",
            "effects": {
              "arrests": 3,
              "streets": 4,
              "brass": 3
            },
            "risk": {
              "odds": 55,
              "failResult": "The warehouse is the right warehouse and the door is the wrong door — the Squad go through a wholesale fruiterer's at four in a shower of splintered pallets, and Billy the Blagger, two streets away, hears the commotion and calls the whole thing off. Your three booked cells hold two Flying Squad men sleeping it off and one wrongly-lifted nightwatchman awaiting his apology, and your armoury book holds a signature nobody can read.",
              "failEffects": {
                "brass": -6,
                "streets": -2
              }
            }
          },
          {
            "label": "Write them up — drunk on duty, the lot of them",
            "result": "The words 'unfit through drink' are barely on the paper before the front office turns lary: a coat rack goes over, a pedestrian is reclaimed, and Bream restores order with the teapot and a voice off the parade ground. The Squad leave vowing consequences. The tip leaves with them, unactioned.",
            "effects": {
              "brass": -5,
              "streets": -3,
              "relief": -3
            }
          },
          {
            "label": "Ring the Yard — somebody else's raid, your coffee",
            "result": "One call to a night-duty commander who owes the nick, and the Squad's own reserve crew take the warehouse with sober hands while your front office fills with coffee and men calling your relief 'woodentops' as a term of endearment. The blag dies in Stepney at four. The credit goes upstream, past you, at speed.",
            "effects": {
              "favours": -1,
              "brass": 4,
              "relief": -3
            }
          },
          {
            "label": "This mob would shoot their own fingers off — send the whole team",
            "result": "Thorne Street takes Stepney with the Squad's intelligence and none of the Squad's blood alcohol. It is a textbook approach, a quiet door, and two of Billy's crew in the bag before the sawn-offs come out of the sacking — the rest scatter into the small hours empty-handed. The Squad, watching from the borrowed car with a takeaway, declare it 'tidy work for woodentops' — which, from them, is a citation.",
            "effects": {
              "dispatchUnits": 3,
              "dispatchTurns": 2,
              "arrests": 2,
              "streets": 3,
              "brass": 4,
              "relief": 2
            }
          }
        ],
        "tone": "grief",
        "window": [
          4,
          11
        ]
      },
      {
        "id": "inn_lost_patrol",
        "title": "MISSED RING-IN — PETTIFER'S INN",
        "text": "Pettifer's Inn is the manor's oddest acre: the smallest of the Inns of Court — a walled square of barristers' chambers, older than the borough, no beer sold since the Fire — with its own gate, its own rules, and by ancient arrangement its own constable: one Thorne Street PC locked inside at dusk to walk the lawyers' courts till the porter unlocks at six. That constable is PC Swaffham, eleven years on the posting, and he has missed his half-past ring-in. Now the phone goes: Swaffham, from the box by the mulberry tree, whispering. The fog is in over the wall, he has passed the same sundial four times, and staircase G has, he reports, moved.",
        "choices": [
          {
            "label": "Send PC Doyle over the wall with the 1908 plan",
            "result": "PC Doyle goes over by the coal merchant's ladder and is himself lost inside twenty minutes. The two of them meet — by luck, both will swear by navigation — under the mulberry tree, from which the smell of the buttery's toast leads them to the lodge like a beacon. The 1908 plan is returned with apologies and one new annotation: HERE BE G.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 2,
              "relief": 2,
              "streets": 1
            }
          },
          {
            "label": "Talk him round it by phone — the fire plan is on your wall",
            "result": "You walk him through it staircase by staircase, sundial by sundial, like Division talking down an aeroplane. Forty minutes later he rings in from the lodge, steady again, and asks that the fire plan be framed.",
            "effects": {
              "relief": 3,
              "brass": 1
            },
            "risk": {
              "odds": 60,
              "failResult": "The pips go, the line drops, and the last thing you hear is Swaffham observing that there is a door beside him that was not there on Tuesday. He passes the rest of the night in the Hall doorway under the portraits, who watch him, he will maintain forever, all night.",
              "failEffects": {
                "relief": -3
              }
            }
          },
          {
            "label": "He's inside locked walls — safest man in London. Ring off.",
            "result": "You log it as 'all correct, Inn patrol', which is true in the sense that nothing can get in at him except the Inn itself. At six the porter unlocks the gate and Swaffham comes out backwards, watching the staircases. He says nothing at all at parade, which says a great deal.",
            "effects": {
              "brass": 1,
              "relief": -3
            }
          }
        ],
        "tone": "weary",
        "window": [
          6,
          12
        ],
        "venue": "pettifers"
      },
      {
        "id": "inn_hall_voice",
        "title": "LATIN IN THE HALL — PETTIFER'S INN",
        "text": "PC Swaffham — the constable Thorne Street locks inside Pettifer's Inn every night, that little walled Inn of Court where the barristers keep chambers and the gate keeps mediaeval hours — is on the phone from the box by the mulberry tree, whispering. There is a voice in the Inn's darkened dining Hall. It is reading aloud — Latin, he thinks, and not kindly Latin — and one candle is burning at the bench end beneath the portraits, which have, he reports, opinions about it. He has been the Inn's night man for eleven years and has never once entered the Hall after dark, a policy he stands ready to defend before any tribunal you care to convene.",
        "choices": [
          {
            "label": "Send WPC Hartle over the wall to go in with him",
            "needsWpc": true,
            "result": "WPC Hartle goes in first, Swaffham one respectful pace behind. The voice is Master Verrall, ninety-one, senior bencher of the Inn, who cannot sleep and so re-argues the case he lost in 1931 to the portraits, candle for an usher — and wins it, every time, by a margin that grows with the years. Hartle sits as the jury until he rests. He thanks her from the bench.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "relief": 3
            }
          },
          {
            "label": "Order Swaffham into that Hall — eleven years is long enough",
            "result": "Eleven years of policy go down before a direct order. Swaffham enters the Hall, meets Master Verrall mid-peroration, and is examined as a witness on the spot, which steadies both of them. They now take cocoa together at two, the constable and the bencher, and the Inn patrol has a friend inside the walls for the first time since the war.",
            "effects": {
              "streets": 2,
              "relief": 2
            },
            "risk": {
              "odds": 55,
              "failResult": "Swaffham gets three steps into the Hall. The candle gutters, the Latin stops, and a voice of great age and courtesy says 'you are out of time, sir.' He retires to the lodge at what he later describes as regulation pace, and posts his resignation from the Inn detail under your door before dawn. It is not accepted, but it is kept.",
              "failEffects": {
                "relief": -4
              }
            }
          },
          {
            "label": "Book it: 'Hall — voices, ancient, no offence disclosed'",
            "result": "The entry is admired at Division for its economy and initialled by Bream without comment. Nothing changes at the Inn, where the voice concludes for the night at ten past three, as — the porter confirms, when eventually consulted — it always does, and always at ten past three.",
            "effects": {
              "brass": 1,
              "relief": -1
            }
          }
        ],
        "tone": "grief",
        "window": [
          7,
          12
        ],
        "venue": "pettifers"
      },
      {
        "id": "inn_accidental_pupil",
        "title": "PUPIL BY MISADVENTURE — PETTIFER'S INN",
        "text": "Inside the walls of Pettifer's Inn — the manor's own pocket Inn of Court, where barristers' chambers stand round a locked courtyard and Thorne Street posts one constable a night to mind it all — the chambers of Sir Aubrey Twiss QC are lit at three in the morning: a ship seized at the docks, an emergency injunction wanted at morning court. And the head clerk, Mr Loach, two pots of coffee past reason, has mistaken PC Swaffham, the Inn's night constable, sheltering from the rain in a doorway with his helmet under his arm, for the pupil barrister expected down from Cambridge. Swaffham, too polite to interrupt a man in full flight, has been set to work. He rings from the clerks' room, whispering: he is on page four of an opinion in the matter of the RMS Boleslaw, and Mr Loach has called his drafting 'promising'. He would like guidance.",
        "choices": [
          {
            "label": "Retrieve your constable with apologies all round",
            "result": "Mr Loach, told the truth, looks at Swaffham for a long moment and says 'the Bar has lost a career this night.' The apologies take sherry, the real pupil is telephoned at Cambridge and sworn at, and Swaffham is escorted to the gate holding his page four, which Loach would not take back.",
            "effects": {
              "relief": 2
            }
          },
          {
            "label": "Let him finish the page — the Inn will owe Thorne Street",
            "result": "The opinion goes up to counsel at five with its middle section in Swaffham's careful police-statement hand — 'I observed the vessel to be under arrest' — and the injunction is granted at dawn. Sir Aubrey is told, eventually, and sends the nick a dozen of port. Mr Loach now nods to Swaffham across the court as one professional to another.",
            "effects": {
              "favours": 1,
              "relief": 1
            }
          },
          {
            "label": "Say nothing — let us see how far this goes",
            "result": "Swaffham survives until the Cambridge pupil arrives at six, hands over the file as between colleagues, and departs with his helmet and his dignity intact. Nobody in chambers ever learns. Swaffham acquires, permanently, the manner of a man who has advised on Admiralty matters, and uses it at parade.",
            "effects": {
              "brass": 2,
              "relief": 2
            },
            "risk": {
              "odds": 45,
              "failResult": "Sir Aubrey Twiss QC comes off the night sleeper early, finds a uniformed constable of the Metropolitan Police drafting his opinion by lamplight, and telephones the Commissioner at four in the morning to enquire, partly in Latin, whether this is now the practice. The Commissioner's office enquires onward, in English, downhill.",
              "failEffects": {
                "brass": -6
              }
            }
          }
        ],
        "tone": "weary",
        "window": [
          9,
          13
        ],
        "venue": "pettifers"
      },
      {
        "id": "inn_walled_burglar",
        "title": "PRISONER OF THE INN — PETTIFER'S",
        "text": "PC Swaffham — Thorne Street's man inside Pettifer's Inn, the walled lawyers' enclave that locks its one gate at dusk and keeps a constable in with it — rings at conversational volume for once, sounding almost cheerful: he has found a burglar. Or rather, the Inn has. Chummy came over the wall after the barristers' Hall silver at nine and discovered what every pupil learns in his first week — the wall is easier climbed from the street than from within. He has been round the whole circuit twice, the fog has come in, and Swaffham has been following him at a distance 'for the company'. He is now sitting under the mulberry tree, quite broken, asking to be arrested.",
        "choices": [
          {
            "label": "Van round — the porter unlocks for police business",
            "result": "The porter, woken for the second time this century, unlocks the wicket gate under protest that outlasts the arrest. Chummy comes quietly — gratefully — and asks in the van whether the place is always like that. Nobody answers him, and he does not press it.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "arrests": 1,
              "streets": 3,
              "brass": 1
            }
          },
          {
            "label": "Swaffham keeps him till the gate opens at six",
            "result": "Constable and burglar share the lodge fire and the porter's cocoa ration. By six they are agreed on the pools and the impossibility of staircase G, and chummy hands himself over at the gate like a man checking out of a hotel — with a complaint, entered in the book, about the sundials.",
            "effects": {
              "streets": 2,
              "relief": 2
            }
          },
          {
            "label": "It happened inside the walls — the Benchers' jurisdiction",
            "result": "The Benchers convene at ten and deal with the matter under the Inn's own ancient jurisdiction, the exact nature of which Division cannot discover and the Under-Treasurer declines, with regret, to explain. The burglar is seen at Michaelmas sweeping the court in a porter's apron, apparently content.",
            "effects": {
              "streets": 1,
              "brass": -2
            }
          }
        ],
        "tone": "weary",
        "window": [
          4,
          10
        ],
        "venue": "pettifers"
      },
      {
        "id": "tube_last_train",
        "title": "LAST TRAIN — PADDOCK LANE UNDERGROUND",
        "text": "Mr Pomeroy, station inspector at Paddock Lane Underground, reports the last westbound has terminated with one passenger still aboard: a docker built like a wardrobe, fast asleep, who by his ticket has been round the Circle line since half past four. The Transport Police finished at midnight, the gates are going on the chains, and Mr Pomeroy — who has run his station for twenty years on the principle that nothing may remain on it after close — wants him removed by somebody in a helmet before the current goes off.",
        "choices": [
          {
            "label": "Send PC Duffin down to walk him up into the night air",
            "result": "The docker wakes courteously, apologises to the train, and tells PC Duffin his entire life between the escalators — two wives, one ship, forty years of the docks going quiet. At street level he shakes hands like a man concluding a treaty and steers for home by the gasworks. Duffin comes back oddly moved.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "relief": 3,
              "streets": 1
            }
          },
          {
            "label": "Rule it London Transport property — quote the boundary at Pomeroy",
            "result": "Mr Pomeroy reads the boundary back with station-inspector precision, observes that the sleeper therefore becomes yours the moment he is put out the door, puts him out the door, and locks it. The docker sleeps on in the nick's porch until four, when he wakes and asks the front desk, with great courtesy, which platform this is.",
            "effects": {
              "brass": -3,
              "streets": -2
            }
          },
          {
            "label": "Ring the Transport Police night desk and stand on the agreement",
            "result": "Forty minutes later a Transport Police van arrives, driven by their night sergeant in person, who collects the docker with professional tenderness — 'come on, Samson, third time this month' — and signs Mr Pomeroy's book. Honour is preserved on all sides at no cost to yours.",
            "effects": {
              "brass": 2,
              "streets": 1
            },
            "risk": {
              "odds": 55,
              "failResult": "The Transport Police night desk — one sergeant covering everything from Ealing to the estuary — laughs for some time, quite kindly, and logs your request as 'noted.' Mr Pomeroy meanwhile has telephoned Division direct, and Division wants to know why an inspector with a station full of constables spent forty minutes negotiating over one sleeping docker.",
              "failEffects": {
                "brass": -5
              }
            }
          }
        ],
        "tone": "weary",
        "window": [
          4,
          7
        ],
        "venue": "paddock_lane"
      },
      {
        "id": "tube_fluffers",
        "title": "TRACK REPORT — FLUFFERS, PADDOCK LANE",
        "text": "The fluffers — the night gang of women who clean the running tunnels once the current is off — have come up at Paddock Lane with their ganger, Mrs Deverell, who has cleaned under London for thirty years and fears nothing down there except idleness. In the crossover passage west of the platform they report a made-up bed, a paraffin stove, a shaving mirror, and a shelf of tinned pears arranged by size. Somebody is living in the Underground, and doing it tidily. The current returns at half past four.",
        "choices": [
          {
            "label": "Send PC Whittle and a mate down while the current is off",
            "result": "They find him at home: Mr Albery, formerly of the Merchant Navy, four years resident, no fixed abode now very firmly fixed. He comes up blinking with his pears in a kitbag and is booked a bed at the Rowton house. Whittle signs for the stove, which Mrs Deverell has already confiscated on grounds of fire.",
            "effects": {
              "dispatchUnits": 2,
              "dispatchTurns": 2,
              "streets": 3,
              "brass": 2
            }
          },
          {
            "label": "Go down yourself with Mrs Deverell's lamp",
            "result": "He receives you like a householder, because down here he is one: Mr Albery, Merchant Navy, four years in the crossover and proud of his housekeeping. You talk ships until the fluffers' whistle goes. He accepts the Rowton house on one condition, gravely negotiated: the pears travel with him. The relief speak of nothing else for days, and Mrs Deverell declares you 'not entirely useless' — her highest known grade.",
            "effects": {
              "relief": 4,
              "streets": 2
            },
            "risk": {
              "odds": 60,
              "failResult": "You are two hundred yards into the dark, learning more than you wished about what fluff is made of, when word goes round Thorne Street that the guvnor is under London with a lamp. Division rings at ten to four wanting to know who exactly is minding the manor, and the man of the crossover — warned by the vibration of approaching authority — has moved out, pears and all, before you reach his door.",
              "failEffects": {
                "brass": -4,
                "streets": -2
              }
            }
          },
          {
            "label": "It's London Transport's tunnel — leave it to their department",
            "result": "London Transport's department for such things consists, at night, of a memo. The bed and the stove stay where they are, the paraffin smell strengthens weekly, and Mrs Deverell — who told a police station and watched nothing happen — now cleans past your name with a sniff you can hear over the trains.",
            "effects": {
              "streets": -3,
              "brass": -2
            }
          }
        ],
        "tone": "weary",
        "window": [
          7,
          12
        ],
        "venue": "paddock_lane"
      },
      {
        "id": "follow_sokol_grudge",
        "venue": "greek_court",
        "title": "GREEK COURT GOES QUIET — SOKOL REMEMBERS",
        "text": "The night after you shut the Blue Parrot, Greek Court has developed a memory. Bernie Sokol, out on bail and holding court in the Cypriot café like a deposed king, has put the word about: anyone seen talking to Thorne Street answers to him for it. The court's usual whispers — the ones that solve half your crime for you — have dried up overnight. And at half past the hour a minicab office that pays Sokol rent loses its windows to persons the counterman, staring straight at you, describes as 'nobody I ever saw.'",
        "tone": "grief",
        "requiresFlag": "flag_parrot_raided",
        "window": [2, 9],
        "choices": [
          {
            "label": "Put a PC on Greek Court until the whispers come back",
            "result": "Whittle stands in Greek Court for three hours being conspicuously bored at Sokol's expense, which is the only language a grudge respects. The café empties by degrees, the counterman remembers a name after all, and by four the court has quietly concluded that Sokol is yesterday's king. Rent is paid in fear, and his has stopped arriving.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 3,
              "streets": 4,
              "relief": -1
            }
          },
          {
            "label": "Have Sokol fetched in and read him the terms",
            "result": "Sokol arrives with a lawyer and leaves without one, the lawyer having heard the phrase 'every premises you hold an interest in, weekly, by the book' and started billing by the retreat. It is not subtle and it is not deniable and upstairs will call it harassment if he complains — but the windows stop breaking tonight.",
            "effects": {
              "streets": 3,
              "brass": -3
            }
          },
          {
            "label": "Let Greek Court sulk — grudges starve if you don't feed them",
            "result": "You leave the court to its silence. The silence holds all night: no whispers, no names, two more windows and a beat man working blind. Sokol's grudge will pass, everyone agrees. Nobody agrees when.",
            "effects": {
              "streets": -4
            }
          }
        ]
      },
      {
        "id": "follow_pemberton_marker",
        "venue": "pemberton",
        "title": "CALLER AT THE DESK — MR LISLE, WITH A HAMPER",
        "text": "Mr Lisle of the Pemberton Club presents himself at the front desk at a civilised hour with an uncivilised object: a Fortnum's hamper the size of a coffin, 'a small acknowledgement from the membership.' Under the champagne there is a card, and on the card, in a very good hand: 'The Pemberton settles its markers.' He would also, while he is here, value a word about what a sensible arrangement between the club and its local station might look like, going forward. Sgt Bream is holding the hamper the way one holds evidence.",
        "tone": "weary",
        "requiresFlag": "flag_pemberton_marker",
        "window": [2, 10],
        "choices": [
          {
            "label": "Take the marker — goodwill banked is goodwill owed",
            "result": "The hamper goes back in the Bentley, but the marker stays on the table: you let Lisle understand that the Pemberton owes Thorne Street one civil answer, on demand, no questions elaborated. It is exactly the kind of arrangement A10 (Anti-Corruption) draws diagrams of, and exactly the kind that gets a guvnor through a bad night. Bream types nothing, loudly.",
            "effects": {
              "favours": 1,
              "brass": -2
            }
          },
          {
            "label": "Send the hamper back where it came from, card and all",
            "result": "The hamper returns to Berkeley Row unopened, with a receipt for its own delivery — Bream's idea, and a small masterpiece: the Pemberton now holds signed proof that Thorne Street can't be bought, which is the one document a club like that has no drawer for. Lisle's smile, for the first time in your acquaintance, goes all the way out.",
            "effects": {
              "brass": 3
            }
          },
          {
            "label": "Log it with A10 (Anti-Corruption) and let them fish",
            "result": "You book the hamper as an attempted inducement and pass the card upstairs to A10 (Anti-Corruption), who receive it the way a pike receives a duckling. What they do with the Pemberton from here is their affair and will take years. The relief hear about it by two and go quiet around you: nobody loves a {man} who logs a gift, even a bent one.",
            "effects": {
              "brass": 4,
              "relief": -3
            }
          }
        ]
      },
      {
        "id": "follow_freddie_gesture",
        "venue": "greek_court",
        "title": "THE BACK DOOR — A CRATE FROM MALTESE FREDDIE",
        "text": "The gesture between neighbours has grown a second act: a crate of duty-free brandy on the back step at midnight, no van seen, with a card in Maltese Freddie's own looping hand — 'To my good friends at Thorne Street, who understand how a manor works.' It is excellent brandy. It is also a hook with twelve bottles of bait on it, and somewhere in Greek Court Freddie is waiting to hear which way the nick swallows.",
        "tone": "weary",
        "requiresFlag": "flag_freddie_gesture",
        "window": [1, 8],
        "choices": [
          {
            "label": "Send it back with a constable and a straight face",
            "result": "Doyle carries the crate back to the Valhalla through the rain and sets it on Freddie's own bar with the message 'the Inspector says {he} understands exactly how a manor works.' Freddie laughs for a full minute, which in Greek Court is reported by dawn as a declaration of war, respect, or both. Either way the account between you is closed and everyone saw it close.",
            "effects": {
              "dispatchUnits": 1,
              "dispatchTurns": 1,
              "brass": 3
            }
          },
          {
            "label": "Book it in as found property and bury it in the ledger",
            "result": "Twelve bottles of brandy enter the found property register as 'goods, unclaimed, origin unknown,' which is technically true of everything if you go back far enough. Nobody drinks it; nobody returns it; in six months it becomes the Commissioner's problem by rota. Freddie, receiving no answer, is left to wonder — which for a man who trades in certainties is its own small punishment.",
            "effects": {
              "brass": 1
            }
          },
          {
            "label": "Let the relief have a bottle at six — it's been a night",
            "result": "One bottle, at six, glasses raised in the parade room to absent friends and present villains. It is the best the relief has felt all week and precisely what Freddie paid for: there is now a photograph-shaped fact in Greek Court's ledger that Thorne Street drank his brandy. He will never mention it. He will never need to.",
            "effects": {
              "relief": 5,
              "brass": -4
            }
          }
        ]
      },
      {
        "id": "follow_halloran_collects",
        "window": [2, 8],
        "title": "CALLER AT THE DESK — DS HALLORAN, RE: A SMALL FAVOUR",
        "text": "DS Halloran again, deep in the shift, smelling of cigars and rain and reading the charge book like a menu. One of tonight's guests — a doorman off Greek Court, in for D and D — carries a pocket book his squad would rather nobody typed up. As a friend, Halloran wonders whether it might travel. He mentions the drink you took, the ledger that walked, and how warmly you're spoken of across the river. Regan leaves the room.",
        "tone": "grief",
        "requiresFlag": "halloran_friend",
        "choices": [
          {
            "label": "Let the pocket book travel — friends are friends",
            "result": "It leaves in the overcoat with the cigars. The doorman walks at first light with his memory tidied, and somewhere across the river a list with your name on it collects its second tick.",
            "effects": {
              "streets": -6,
              "brass": 3,
              "relief": -5
            }
          },
          {
            "label": "Fetch Bream in and refuse him in front of a witness",
            "result": "Charm with an audience is only noise, and Halloran knows it. He withdraws pleasantly, promising nothing — which, from Halloran, is a promise. The friendship was a lease, it turns out, and the rent has just gone up.",
            "effects": {
              "brass": -5,
              "relief": 5
            }
          },
          {
            "label": "Book the pocket book into the property register, every page, two initials",
            "result": "Hartle numbers, Bream initials, and by the end of the shift the pocket book has stopped being borrowable and become geology. Halloran watches the last signature go on and leaves without mentioning friendship once.",
            "effects": {
              "streets": 3,
              "brass": -3,
              "relief": 4,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Ring A10 (anti-corruption) with Halloran still at the desk",
            "result": "They answer on the second ring — they keep a drawer with his name on it now. Halloran watches you dial the whole number and, for the first time in the acquaintance, stops smiling.",
            "effects": {
              "streets": 3,
              "brass": -8,
              "relief": 3
            }
          }
        ]
      },
      {
        "id": "follow_a10_raincoat",
        "window": [3, 10],
        "title": "DIVISION REGRETS — AND A MAN IN A CLEAN RAINCOAT",
        "text": "Since you dialled A10 — anti-corruption — the fifth floor answers Thorne Street the way a man answers a debt collector. Tonight it bites: a remand prisoner wants escorting to Brixton and Division regrets, twice, in writing. Then a raincoat too clean for the weather appears at the desk — the A10 sergeant who took your statement. He's heard about the escort. He knows a garage sergeant who owes him. He can have a van here before the kettle's boiled, and nobody upstairs need know whose.",
        "tone": "weary",
        "requiresFlag": "a10_called",
        "choices": [
          {
            "label": "Take the van and ask no questions",
            "result": "The van arrives unmarked, punctual and driven by a man who doesn't chat. The prisoner is at Brixton before the tea goes round. The rubber heels, it turns out, look after people who dial — you're not sure how you feel about being people.",
            "effects": {
              "streets": 3,
              "brass": -3,
              "relief": 3
            }
          },
          {
            "label": "Do it yourselves — two of yours and the spare Bedford",
            "result": "Two of yours and the spare Bedford do it the long way, and the ground runs thin for half the night. It's in the book, it's yours, and nobody across the river is owed a thing — which is worth precisely what it cost.",
            "effects": {
              "streets": -3,
              "brass": 3,
              "relief": -4,
              "dispatchUnits": 2,
              "dispatchTurns": 3
            }
          },
          {
            "label": "Ring Division a third time and quote the regulations",
            "result": "The third refusal arrives faster than the first two, marked 'noted', which is Division for no. The prisoner stays in your cells eating your breakfast, and the fifth floor adds a line to whatever it is they keep.",
            "effects": {
              "streets": -4,
              "brass": -5
            }
          }
        ]
      },
      {
        "id": "follow_meakin_crane",
        "window": [4, 12],
        "title": "OBSTRUCTION — ARTIC DOWN ON THE CANAL BRIDGE",
        "text": "A meat lorry has jackknifed across the canal bridge at the neck of the high street, shedding sides of beef like a battlefield. The driver is unhurt, the bridge is shut, and the garage sergeant can raise no recovery this side of morning — Traffic Division won't come south of the canal, on principle. Fog coming, buses stacking, tea-leaves circling the beef. And a message from Meakin Salvage, unprompted: Terry heard. Terry's crane doesn't sleep. Thorne Street was told to ask.",
        "tone": "weary",
        "requiresFlag": "meakin_owed",
        "choices": [
          {
            "label": "Ask — Meakin's crane, and no questions about the beef",
            "result": "Meakin's crane is on the bridge before the fog settles, and the artic is gone inside the hour — along with two sides of beef, which both parties regard as a fair rate for night work. Nothing in the book explains how, and nobody upstairs asks the right question.",
            "effects": {
              "streets": 6,
              "brass": -3,
              "favours": -1
            }
          },
          {
            "label": "Cone it and divert all night, by the book",
            "result": "Cones, lamps and two crews waving traffic down back doubles till dawn. The bridge reopens when the Board's own lorry finally ambles up, and the relief come in frozen, asking who owns the crane that sat idle half a mile off all night.",
            "effects": {
              "streets": -3,
              "brass": 3,
              "relief": -5,
              "dispatchUnits": 2,
              "dispatchTurns": 4
            }
          },
          {
            "label": "Leave it to the Board and the dawn",
            "result": "The bridge stays shut, the buses give up, and by the small hours the beef has been rehomed by parties unknown at commendable speed. The Chronicle photographs the whole tableau under BRIDGE OF SIGHS.",
            "effects": {
              "streets": -7,
              "brass": -3
            }
          }
        ]
      },
      {
        "id": "follow_squad_regrets",
        "window": [6, 13],
        "title": "ARMED BLAG — EXCELSIOR BILLIARD HALL, SQUAD ENGAGED ELSEWHERE",
        "text": "A wages blag at the Excelsior billiard hall — shooters shown, two men away in a Zephyr, still on the manor if the sightings hold. You ring the Flying Squad, as regulation requires. Critchley's office regrets that all units are committed, in a voice wearing driving gloves. Since Jubilee Street the Squad's memory has been long and its diary always full. Whatever gets done tonight, Thorne Street does alone, and the Yard's morning conference will only ask why it wasn't done faster.",
        "tone": "grief",
        "requiresFlag": "squad_grudge",
        "choices": [
          {
            "label": "Flood the ground yourself — every spare body, both bridges",
            "result": "Both bridges plugged inside twenty minutes, and the Zephyr runs out of manor at the gasworks. One in the cells, one over the wall, the wages bag in the canal mud for the divers. The Squad rings at dawn to ask, without shame, who's handling the press.",
            "effects": {
              "streets": 7,
              "relief": -5,
              "arrests": 1,
              "dispatchUnits": 3,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Borrow D Division's area cars on an old marker",
            "result": "D Division's controller hears the word 'Critchley' and asks only where you want the cars. The Zephyr is boxed in on neutral ground, which suits everyone but the Squad, whose regret acquires a permanent edge.",
            "effects": {
              "streets": 5,
              "brass": 3,
              "favours": -1
            }
          },
          {
            "label": "Log Critchley's regrets word for word and work it at dawn",
            "result": "The entry goes down word for word, timed, initialled — a small, patient act of war. The blaggers drink their doubles in Fulham, and come morning conference the Yard reads your log aloud and looks at the Squad's man while doing it.",
            "effects": {
              "streets": -6,
              "brass": 3
            }
          }
        ]
      },
      {
        "id": "follow_grappa_word",
        "window": [3, 10],
        "title": "MESSAGE — FROM IL PROFESSORE, WITH RESPECT",
        "text": "A boy on a bicycle hands the front desk a note and pedals off without waiting. Unsigned, save a red-and-black ribbon: men have been asking after paraffin and the Bella Ferrovia's insurance; Bonetti's books are sicker than his house red; Friday, when the fryers are cold. Scarlatti — from wherever the commune scattered to — passes word to one policeman only, and Sgt Bream would like it minuted that anarchists writing to the guvnor is now a thing that happens.",
        "tone": "weary",
        "requiresFlag": "grappa_peace",
        "choices": [
          {
            "label": "Obbo on the Trattoria till the paraffin shows",
            "result": "Two nights of cold obbo, and on the second the paraffin arrives in a Bedford with its plates taped over. Two collars at the back door, jerrycans in hand. The insurance job dies unlit, and a postcard arrives the following week: 'THE HONEST POLICEMAN DOES NOT SLEEP. — E.S.'",
            "effects": {
              "streets": 8,
              "brass": 3,
              "arrests": 2,
              "dispatchUnits": 2,
              "dispatchTurns": 3
            }
          },
          {
            "label": "A quiet word with Bonetti about his books and his luck",
            "result": "Bonetti weeps, denies everything in an order that confirms most of it, and by Friday the Bella Ferrovia's policy is quietly reduced and its fryers professionally serviced. Whatever was going to happen doesn't, which will never appear in any figures.",
            "effects": {
              "streets": 3,
              "brass": -3
            }
          },
          {
            "label": "Anarchist gossip. File it",
            "result": "Friday delivers a fire that starts, says the brigade, in six places at once — a thing paraffin does and wiring doesn't. Bonetti collects in full. The next note has no ribbon: 'YOU WERE TOLD.'",
            "effects": {
              "streets": -8,
              "brass": -4
            }
          }
        ]
      },
      {
        "id": "follow_kilbride_wall",
        "window": [5, 13],
        "title": "HIT AND RUN — OUTSIDE THE KILBRIDE SOCIAL CLUB",
        "text": "A man is knocked down outside the Kilbride Social Club at turning-out — leg broken, car gone, thirty witnesses studying the pavement. Since the weekend your cells held two of their own under the Act and gave them back without charge or apology, the club's answer to any uniform is the wall. The victim himself, white with pain, tells Doyle to leave it. Father Muldane watches from the doorway, saying nothing, which is the loudest thing said all night.",
        "tone": "grief",
        "requiresFlag": "kilbride_shame",
        "choices": [
          {
            "label": "Go yourself, bare-headed, and say the word the Act never did — sorry",
            "result": "Father Muldane hears you out on the step, nods once, and shuts the door. Towards dawn a folded betting slip reaches the desk with an index number on it and no name. Not forgiveness — a transaction. But the wall, for one night, showed a gate.",
            "effects": {
              "streets": 5,
              "brass": -5,
              "relief": 3
            }
          },
          {
            "label": "Door to door, statements, both sides of the street",
            "result": "Doors close down both sides of the street in strict rotation, like a tide going out. Doyle's notebook comes back empty but for the victim's name, which he gave himself, spelling it slowly, as if to a child.",
            "effects": {
              "streets": -4,
              "relief": -3,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Log it. Some walls you built yourself",
            "result": "The entry reads 'no witnesses forthcoming', which is true the way a locked door is true. The driver stays loose, the leg mends crooked, and the club adds one more evening to the account it keeps.",
            "effects": {
              "streets": -6,
              "relief": -3
            }
          }
        ]
      },
      {
        "id": "follow_peagram_steps",
        "window": [4, 11],
        "venue": "alhambra",
        "title": "LOITERING (QUERY) — R. PEAGRAM, ALHAMBRA STEPS",
        "text": "Ronald Peagram, on bail till the sessions, has taken to standing across from the Alhambra at turning-out in his caller's blazer, silent, mouthing each number as the tannoy calls it. Prewitt wants him moved as a matter of policy; the pensioners have started bringing him tea as a matter of theirs. Wally Fenton, magnanimous in victory, offers to speak for him at the trial. Sgt Bream asks what exactly the charge would be — loving bingo, with previous?",
        "tone": "weary",
        "requiresFlag": "peagram_nicked",
        "choices": [
          {
            "label": "Have a PC walk him home, gentle, most nights",
            "result": "Whittle walks him back to Ferrier Street most nights, learning more about the calling world than any man needs. Peagram shakes his hand at the door like a colleague. Prewitt, deprived of a grievance, invents a smaller one.",
            "effects": {
              "streets": 3,
              "relief": 3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Warn him off — and breach his bail if he's back",
            "result": "He's back the next night, of course — the Alhambra is the only theatre he has. The breach takes four minutes and no strength at all, and the pensioners watch it done in a silence you'll hear again at the trial.",
            "effects": {
              "streets": 3,
              "brass": 3,
              "relief": -4,
              "arrests": 1
            }
          },
          {
            "label": "He's breaking no law anyone would want read out. Leave him his numbers",
            "result": "He stands, he mouths, he harms nobody. Prewitt writes to the Commander about 'an atmosphere'; the pensioners write more letters, and kinder. On the cold nights somebody brings him a scarf, and Bream pretends not to know whose it was.",
            "effects": {
              "streets": -3,
              "brass": -3,
              "relief": 3
            }
          }
        ]
      },
      {
        "id": "follow_halloran_paid",
        "window": [2, 9],
        "title": "PAID IN FULL — A COMPLAINT WITHDRAWN",
        "text": "The tout's complaint against PC Doyle — listed for the discipline board, briefs instructed — dies overnight. Withdrawn, notarised, the file mislaid with surgical neatness. Then the blower: Halloran, warm as an unlit cellar. 'We look after our friends, guvnor.' Nobody asked him. That's rather the point of Halloran. Doyle, who is innocent and cheerful and knows none of this, wants to stand his mystery benefactor a pint.",
        "tone": "grief",
        "requiresFlag": "halloran_friend",
        "choices": [
          {
            "label": "Bank the quiet and say nothing",
            "result": "The board date vanishes from the diary and nobody says a word, including you — especially you. Doyle buys a round for luck. Across the river the friendship compounds quietly, like interest.",
            "effects": {
              "streets": -3,
              "brass": 3,
              "relief": -3
            }
          },
          {
            "label": "Ring A10 (anti-corruption) and report the interference — Doyle's name and all",
            "result": "A10 reopen the complaint, which means Doyle sweats it for months and clears himself the slow, honest way. He never learns what it cost or who spent it. The drawer with Halloran's name in it gets a page thicker.",
            "effects": {
              "streets": 3,
              "brass": -9,
              "relief": 3
            }
          },
          {
            "label": "Ring Halloran back: the account's closed, both directions",
            "result": "'Course it's closed, guvnor,' says Halloran, agreeable as ever, and rings off. The line clicks like a lock being tried. There is no ledger where accounts with Halloran close; there is only whose turn it is.",
            "effects": {
              "brass": -3,
              "relief": 3
            }
          }
        ]
      }
    ],
    "storylines": [
      {
        "id": "earl",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 THE EARL OF ALDWYNE REMANDED AT BOW STREET; THE NANNY SITTING UP AND TAKING SOUP. THE CHANDOS CLUB IS NOT RECEIVING PRESS.",
          "mixed": "THE MORNING AFTER \u2014 THE YARD PARADES THE EARL FOR THE CAMERAS. THORNE STREET'S PART IS A FOOTNOTE, WHICH UPSTAIRS CALLS TIDY.",
          "poor": "THE MORNING AFTER \u2014 THE EARL LANDED AT DIEPPE, UNMET. THE NANNY'S SISTER TELEPHONED THE DESK TO SAY WHAT SHE THINKS OF US; THE DESK WROTE IT DOWN.",
          "unresolved": "THE MORNING AFTER \u2014 STILL NO EARL. SUSSEX WATCH THE PORTS, THE PAPERS WATCH THE CLUB, AND THE NANNY SLEEPS UNDER GUARD AT BART'S."
        },
        "title": "THE VANISHED EARL",
        "startTurn": 3,
        "unresolvedOutcome": "The Earl of Aldwyne was still missing at six — the nanny sleeping under police guard, the Chandos Club sleeping the sleep of the well-advised, and a warrant getting colder by the hour. A year from now men in his circle will still be saying he's in Africa, in the manner of men holding the door.",
        "stages": [
          {
            "id": "earl_house",
            "title": "SCREAMS AT HALKIN GARDENS — THE EARL IS GONE",
            "text": "A 999 from the grandest address on the manor: the nanny at Aldwyne House found at the foot of the basement stairs, bleeding but breathing — she'd say only 'his voice, it was his voice' before the ambulance took her to St Mark's. The Countess, white as the stucco, says her husband has 'gone to the club, or the country, or wherever it is he goes'. The Earl of Aldwyne — gambler, charmer, seventh of his line — is not at the club, the country, or anywhere else. His Mercedes is gone from the mews, and it is a year almost to the week since the last lord did this to a nanny and a nation.",
            "choices": [
              {
                "label": "Flood the square — every spare body, ports circular, the lot.",
                "result": "Torches in the mews, a PC on every corner of the gardens, and the registration wired to every force with a coastline. The neighbours watch from behind curtains that cost more than the nick. Within the hour a sighting comes in from the river.",
                "effects": {
                  "dispatchUnits": 2,
          "dispatchTurns": 2,
                  "streets": -3,
                  "brass": 4
                },
                "goto": "earl_car",
                "delay": 1
              },
              {
                "label": "Sit with the Countess and take it from the top, gently.",
                "result": "Tea in a drawing room the size of the parade room. The Countess talks in circles that keep passing through the Chandos Club, debts 'that were being seen to', and a marriage kept, like the silver, for best. She asks, twice, whether the nanny will 'be discreet'. You note which question came first.",
                "effects": {},
                "goto": "earl_nanny",
                "delay": 1
              },
              {
                "label": "Hand it straight up — the Yard can have the peerage.",
                "result": "You ring the Yard and a Commander materialises with a murder bag and a press officer, in that order. Thorne Street is thanked at the door of its own case.",
                "effects": {
                  "favours": -1,
                  "brass": 3
                },
                "outcome": "You handed the Earl to the Yard inside the hour. Correct, safe, and the last Thorne Street heard of it — when the file went cold in the spring, it went cold as somebody else's failure, which is a kind of success with the flavour boiled out.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "earl_car",
            "title": "THE MERCEDES — SHADWELL STAIR",
            "text": "The Earl's Mercedes stands at the top of Shadwell Stair with the driver's door open to the rain, which is how the river likes its abandoned cars presented. Blood on the seat edge — a smear, not a flood. In the glovebox: tide tables, a torch, and an envelope of tens fat enough to argue with. Either a man has drowned himself leaving his money behind, or a man wants the river to say so while he travels light on someone else's.",
            "choices": [
              {
                "label": "Drag crews on the foreshore now, before the tide turns.",
                "result": "Lamps on the mud and the dignity of the drowned attended to properly.",
                "effects": {
                  "dispatchUnits": 2,
          "dispatchTurns": 2,
                  "relief": -4
                },
                "risk": {
                  "odds": 45,
                  "failResult": "Six hours of mud, two shopping trolleys and a Victorian bicycle. The river has nothing of his. The tens in the glovebox look fatter every time you think of them, and the Chandos Club has begun, discreetly, to ring around.",
                  "failEffects": {
                    "relief": -3,
                    "brass": -2
                  },
                  "failGoto": "earl_club"
                },
                "goto": "earl_found",
                "delay": 1
              },
              {
                "label": "Leave a quiet watch on it — let the stage set play to an empty house.",
                "result": "One PC in a doorway with a flask, and the car left exactly as arranged. If the Earl staged this, someone will come to check the reviews. Meanwhile the club set have started telephoning each other in relays; the exchange operator, a friend of the nick, mentions it unprompted.",
                "effects": {
                  "dispatchUnits": 1,
          "dispatchTurns": 2
                },
                "goto": "earl_club",
                "delay": 1
              },
              {
                "label": "Log it, photograph it, and work the living leads instead.",
                "result": "The car goes in the book and the book goes on. Rivers keep; clubs close ranks by morning. It is the club, every road tonight runs through the club.",
                "effects": {},
                "goto": "earl_club",
                "delay": 1
              }
            ]
          },
          {
            "id": "earl_nanny",
            "title": "WARD FOUR — MISS CAREY'S ACCOUNT",
            "text": "Miss Carey, twenty-six, concussed and steady as a rock for all that, gives her statement at St Mark's with a WPC at the bedside. It was dark in the basement; the light had been taken out — taken, not blown. A man's voice she has heard every day for two years said her name once, wrongly, the way the Earl says it when he's been at the club. She held onto the banister and screamed the house down, which is the only reason there is a statement to take. She asks if she still has a job. Nobody in the room can answer.",
            "choices": [
              {
                "label": "Circulate the Earl as wanted — her word is evidence enough.",
                "result": "The telex goes to every port and force by midnight: wanted for questioning, attempted murder. No peer has been circulated like a car thief in living memory, and the night duty press bureau rings twice to make sure you meant it. You meant it.",
                "effects": {
                  "brass": -6,
                  "streets": 2
                },
                "goto": "earl_club",
                "delay": 1
              },
              {
                "label": "Keep her statement close and let the club think it's a burglary gone wrong.",
                "result": "The occurrence book says 'intruder, inquiries continue', and the Chandos Club relaxes by one collective inch — men who relax make telephone calls, and the exchange is listening. Miss Carey sleeps under guard; her statement sleeps in your safe.",
                "effects": {},
                "goto": "earl_club",
                "delay": 1
              }
            ]
          },
          {
            "id": "earl_club",
            "title": "THE CHANDOS CLUB — RANKS, CLOSED",
            "text": "The Chandos at two a.m.: baize the colour of money, a backgammon board still warm, and eleven men of consequence who all say 'poor Bunty' and none of whom will say when they saw him. A solicitor has arrived before you did, which is its own evidence. The steward polishes a glass that is already clean. Upstairs is members only; the smoke curling down the staircase has a fresh cigar in it, and every man in the room watches you not look at the stairs.",
            "choices": [
              {
                "label": "Go up the stairs now — warrant's a word they understand.",
                "result": "Past the steward, past the solicitor's rising objection, two PCs taking the back stairs at a run.",
                "effects": {
                  "dispatchUnits": 2,
          "dispatchTurns": 2,
                  "brass": -5
                },
                "risk": {
                  "odds": 55,
                  "failResult": "The room above holds a card table, a sleeping brigadier, and no Earl — gone through the kitchen minutes ahead of you, if he was there at all. The solicitor writes down the time with a fountain pen like a man signing your transfer.",
                  "failEffects": {
                    "brass": -4
                  },
                  "failGoto": "earl_tipoff"
                },
                "goto": "earl_attic",
                "delay": 1
              },
              {
                "label": "Sit in the bar and let the silence do the asking.",
                "result": "You order a tonic water and outstay three of them. Men of consequence cannot bear a policeman drinking slowly; by half past two one of them — younger, drunker, angrier about a debt — follows you to the coat rack and mutters about Newhaven, a boat, and 'the arrangements they made for him, same as they'd never make for me.'",
                "effects": {},
                "goto": "earl_tipoff",
                "delay": 1
              },
              {
                "label": "Post a PC on the club doors and starve them of exits.",
                "result": "The Chandos discovers its members' cars are all, suddenly, parked illegally. Nobody leaves without a name taken. The solicitor calls it harassment; the young one with the debt calls the nick from the box on the corner instead, which is what you wanted.",
                "effects": {
                  "dispatchUnits": 1,
          "dispatchTurns": 2,
                  "brass": -2
                },
                "goto": "earl_tipoff",
                "delay": 1
              }
            ]
          },
          {
            "id": "earl_attic",
            "title": "THE ROOM ABOVE THE CHANDOS",
            "text": "Members only: a valet's cot made up with hospital corners, a washstand, a half-packed grip, and cigar ash still warm in a saucer. On the cot, pressed flat as evidence, tomorrow's tide tables — the same edition as the glovebox — and a first-class boat-train ticket, Victoria to Newhaven, in a plain envelope with no name because names are for people who get caught. Below, the club has gone quiet the way a house goes quiet around a dropped glass. He was here past midnight. Someone dressed him, fed him and moved him — and eleven men downstairs are being magnificent about it.",
            "choices": [
          {
            "label": "Bag the ticket and the ash — build the case on paper, calmly.",
            "result": "Exhibits, photographs, and the grip inventoried down to its monogram. No drama on the stairs, just a chain of evidence with eleven links in it.",
            "effects": {},
            "outcome": "You didn't catch the Earl — you caught the room. The ticket, the tide tables and the warm ash convicted the Chandos arrangement at leisure: four members and the steward for assisting an offender, the Earl tried in his absence by every paper in London. Somewhere abroad a tall man reads about the friends who are paying for his exit, slowly.",
            "grade": "mixed"
          },
              {
                "label": "Take the steward in for obstruction and let the club watch.",
                "result": "The steward is walked out through the bar in front of the membership, protesting in a whisper. The silence he leaves behind him has a crack in it now: by four, two members have remembered things, separately, in writing.",
                "effects": {
                  "arrests": 1,
                  "brass": -4
                },
                "outcome": "The Earl was gone, but the machine that moved him seized up the moment you booked its steward. The conspiracy came apart in affidavits all spring — five of the eleven in the dock for assisting an offender, the club's royal warrant quietly not renewed. The Earl himself is a postcard from nowhere; the men who held the door for him are not.",
                "grade": "mixed"
              },
              {
                "label": "Straight to Victoria — the boat train, before it leaves.",
                "result": "Two PCs and the area car, blue-lighting it up Grosvenor Place with the tide tables on the dashboard.",
                "effects": {
                  "dispatchUnits": 2,
          "dispatchTurns": 2,
                  "streets": -2
                },
                "risk": {
                  "odds": 50,
                  "failResult": "The boat train pulls out as the area car pulls in. A guard remembers a tall man with a plaster on his chin boarding early, first class, no luggage to speak of. Newhaven is Sussex's ground and the night ferry doesn't wait; the phone call you make next is the whole case.",
                  "failEffects": {
                    "streets": -2
                  },
                  "failOutcome": "He was on the boat train while the Chandos poured your tonic water. Sussex met the ferry at Newhaven and found a first-class compartment, still warm, and a plaster in the ashtray. The Earl of Aldwyne is in France, or past it, and eleven men are home in bed being magnificent. The file stays open; the wound stays yours.",
                  "failGrade": "poor"
                },
                "outcome": "The area car beat the boat train by four minutes. The Earl of Aldwyne was arrested in a first-class compartment at Victoria wearing his valet's coat, and asked only that the handcuffs wait until the platform was empty. They did not. Miss Carey's statement did the rest; the Chandos Club has resigned itself, one affidavit at a time.",
                "grade": "good"
              }
            ]
          },
          {
            "id": "earl_tipoff",
            "title": "NEWHAVEN WHISPERS — THE LAST BOAT",
            "text": "It assembles like weather: the young member's mutter, the exchange operator's list of calls to a Sussex number, and now a coastguard cousin of Sgt Bream's who reports a private yacht — the Persephone, registered to a Chandos man — taking on stores at Newhaven at two in the morning, which is not an hour at which honest men victual. The night ferry sails at six. The tide serves at five. Whatever is going to happen at Newhaven happens before your relief ends, or not at all.",
            "choices": [
              {
                "label": "Send two PCs down the A23 with the area car singing.",
                "result": "Ninety minutes of wet road with the two-tones clearing the milk lorries.",
                "effects": {
                  "dispatchUnits": 2,
          "dispatchTurns": 3,
                  "relief": -3
                },
                "risk": {
                  "odds": 55,
                  "failResult": "The Persephone is gone on the five o'clock tide, riding light. The harbourmaster logs her for Dieppe. On the quay, one kid glove, size nine and a half.",
                  "failEffects": {
                    "brass": -3
                  },
                  "failOutcome": "The Persephone sailed on the tide with one passenger not on her papers, and your PCs reached the quay in time to watch her lights. France will not send back what it has not officially received. The Earl is a rumour now — Cannes, Nairobi, a ranch in Paraguay — and the Chandos Club buys the rumour drinks.",
                  "failGrade": "poor"
                },
                "outcome": "Your PCs came down the quay as the Persephone singled up, and the Earl of Aldwyne was taken on the gangplank in a deckhand's jersey, protesting mildly about the salt air. Sussex lent the cells; Thorne Street kept the collar. Miss Carey identified his voice from behind a screen without a second's pause, and eleven magnificent men are learning what accessory means.",
                "grade": "good"
              },
              {
                "label": "Ring Sussex and the coastguard — spend the marker, hold the boat.",
                "result": "A favour called in at three a.m. travels further than an area car: the coastguard finds the Persephone's papers suddenly fascinating, and Newhaven harbour develops a fault in its lock gates that a man from the ministry must inspect at first light.",
                "effects": {
                  "favours": -1,
                  "brass": 4
                },
                "outcome": "The Persephone never sailed: held at Newhaven on a marvellously boring technicality until Sussex went aboard with daylight and found the Earl in the sail locker, seasick at anchor, which the arresting sergeant called 'the best of it'. The collar reads Sussex, the work reads Thorne Street, and the men of the Chandos are discovering that markers, unlike memberships, get called in.",
                "grade": "good"
              },
              {
                "label": "Log the lot for the morning — peers keep, and so does paper.",
                "result": "It all goes in the book in your best hand: the yacht, the number, the tide. The book does not sail at five, however, and neither does anyone who reads it after six.",
                "effects": {},
                "outcome": "By the time the morning men read your beautiful notes, the Persephone was in French water and the Earl was a postcard. The file is immaculate and the bird is flown; the Yard's review praised Thorne Street's 'meticulous record of the hours in which nothing was done'.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "earl_found",
            "title": "THE FORESHORE GIVES HIM UP",
            "text": "The drag crews work the low water by lamplight and the river, for once, deals honestly: not a body — a man. The Earl of Aldwyne is found at half-tide sitting against the stair wall below the high-water mark, soaked to the ribs, too cold to run and too proud to call out, waiting for a boat that was evidently late. The staged car, the tide tables, the money — all of it assembled for an exit the river declined to schedule. He looks up at your torches and says, 'I suppose you'd better be sensible about this.'",
            "choices": [
              {
                "label": "Arrest him at the water's edge, by the book, by torchlight.",
                "result": "Cautioned on the foreshore with the tide coming back over his shoes. He is charged at Thorne Street before the club's solicitor has finished dressing.",
                "effects": {
                  "arrests": 1,
                  "streets": 3,
                  "brass": 2
                },
                "outcome": "The Earl of Aldwyne was charged at Thorne Street at four in the morning, river mud to the knee, while the Chandos Club slept on its arrangements. Miss Carey's statement held like the banister she'd clung to. It is the collar of the decade and it was made by a night nick with wet boots.",
                "grade": "good"
              },
              {
                "label": "Let him dry out in an interview room first — a cold man says warm things.",
                "result": "Blankets, Bream's worst cocoa, and forty unguarded minutes in which the Earl, shivering and expansive, explains everything as a series of misfortunes with his own grammar. The statement he signs before the solicitor arrives is eleven pages and ruinous.",
                "effects": {},
                "outcome": "He talked himself to the bottom of eleven pages before his people reached him, and the pages did what pages do. Charged by five, committed by spring — and the Chandos names in his statement kept the fifth floor reading all year. Bream has asked for the cocoa mug to be preserved for the nation.",
                "grade": "good"
              },
              {
                "label": "Ring the Yard to take the arrest — too grand for a night nick.",
                "result": "The Commander arrives with dry shoes to arrest a man your crews pulled off the mud. The handshakes are for the cameras and none of them are pointed at you.",
                "effects": {
                  "brass": 5,
                  "relief": -6
                },
                "outcome": "The Yard took the Earl, the credit, and the press conference; Thorne Street took the wet socks. Upstairs is delighted with you in the way one is delighted with a good drain. The relief will bring it up, correctly, for years.",
                "grade": "mixed"
              }
            ]
          }
        ]
      },
      {
        "id": "mp",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 THE HONOURABLE MEMBER APPEARED AT BOW STREET UNDER HIS FULL NAME. FLEET STREET SENT EVERYBODY. THE MANOR APPROVES OF YOU.",
          "mixed": "THE MORNING AFTER \u2014 THE YARD HAS THE HONOURABLE MEMBER AND THE CREDIT. RITA HAS SOLD HER STORY TWICE, ONCE TO EACH SIDE.",
          "poor": "THE MORNING AFTER \u2014 THE EVENING THAT NEVER HAPPENED IS BEING OFFICIALLY DENIED, WHICH IS HOW EVERYONE KNOWS. WHITEHALL HAS RUNG TWICE.",
          "unresolved": "THE MORNING AFTER \u2014 THE EARLY TURN INHERITED THE HONOURABLE MEMBER AT SIX, AND WISH IT MINUTED THAT THEY HAVE NOT FORGIVEN US."
        },
        "title": "THE HONOURABLE MEMBER",
        "startTurn": 2,
        "stages": [
          {
            "id": "mp_cell3",
            "title": "PRISONER IN CELL 3 — THE HONOURABLE MEMBER",
            "text": "Sgt Bream puts his head round the door wearing the smile of a man whose pools numbers have come up. The Late Turn has banged up Gerald Ffoulkes-Hume MP, Parliamentary Under-Secretary at Prices and Consumer Protection, captured in the public convenience off Marsh Lane in the company of a working girl called Rita. He is now in cell 3 demanding the Home Secretary through the hatch. It is Friday night, the pubs are still open, and he is occupying one of your four cells. 'Griefy one, guv,' says Bream, with the air of a connoisseur.",
            "choices": [
              {
                "label": "Charge him like any other punter",
                "result": "The charge sheet is typed in respectful silence, then Bream reads it aloud twice for pleasure. Upstairs, telephones begin to ring and do not stop.",
                "effects": {
                  "streets": 5,
                  "brass": -12,
                  "relief": 7
                },
                "outcome": "You charged a serving minister over an incident in a public convenience. The manor approves, the Yard does not, and Monday's Hansard will be lively.",
                "grade": "good"
              },
              {
                "label": "Hear Rita's side of it first",
                "result": "Rita is fetched up with a cup of tea, which she accepts like royalty. 'About time somebody sensible asked,' she says.",
                "effects": {},
                "goto": "mp_rita",
                "delay": 1
              },
              {
                "label": "Ring the Yard — make him their problem",
                "result": "You call in a marker with the Commander's office. A car is sent, the Member departs bleating, and the paperwork evaporates somewhere on the way up.",
                "effects": {
                  "favours": -1,
                  "brass": 5
                },
                "outcome": "You handed the Honourable Member up to the Yard, gift-wrapped, at the price of a favour you'll miss come the next inquiry.",
                "grade": "mixed"
              },
              {
                "label": "Let him stew — you've a shift to run",
                "result": "Bream serves the Member cocoa in the nick's worst mug and calls him 'sunshine'. Word of who's in cell 3, meanwhile, is already halfway to Fleet Street.",
                "effects": {
                  "relief": 2,
                  "brass": -3
                },
                "goto": "mp_stringer",
                "delay": 2
              }
            ]
          },
          {
            "id": "mp_rita",
            "title": "RITA'S VERSION",
            "text": "Rita Sallow — occupation 'model', currently the most sensible person in the building — gives her account with the brisk economy of a witness who has done this before. He offered her three quid and then cried; she was mainly worried he'd catch his death on the tiles. Then the useful bit: a bloke with a camera has been keeping watch by the railings opposite since before chucking-out time, and he isn't there for the architecture. Cell 3, meanwhile, wishes to know whether the Home Secretary has been informed.",
            "choices": [
              {
                "label": "Take her statement and charge him properly",
                "result": "Rita signs a statement so clear it could be framed and hung. Bream types the charge sheet with two fingers and total joy.",
                "effects": {
                  "streets": 4,
                  "brass": -11,
                  "relief": 7
                },
                "outcome": "Charged on Rita Sallow's immaculate evidence: a minister undone by the one straight goer in the borough.",
                "grade": "good"
              },
              {
                "label": "Send PC Whittle to move the camera merchant along",
                "result": "PC Whittle strolls over and takes a professional interest in the man's tripod. Dennis Clegg of the Sunday Mercury withdraws to the Blue Star café, filmless and sulking.",
                "effects": {
                  "streets": 2,
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "mp_yardcall",
                "delay": 2
              },
              {
                "label": "Turn Rita loose in a minicab on petty cash",
                "result": "Rita departs with her fee, her dignity and your telephone number 'in case anything wants straightening'. Somewhere the night's paperwork acquires a small hole.",
                "effects": {
                  "favours": 1,
                  "brass": -4
                },
                "goto": "mp_stringer",
                "delay": 2
              },
              {
                "label": "Put her back downstairs and press on",
                "result": "Rita goes back down shaking her head at the state of the Old Bill these days. She told you one useful thing tonight, and you have just ignored it.",
                "effects": {
                  "relief": -2
                },
                "goto": "mp_stringer",
                "delay": 2
              }
            ]
          },
          {
            "id": "mp_stringer",
            "title": "GENTLEMAN OF THE PRESS",
            "text": "Dennis Clegg, stringer for the Sunday Mercury, is at the front desk buying teas for the area car crew and asking, lightly, whether it's true the nick is entertaining a 'well-spoken gentleman guest' tonight. His camera is in the Cortina outside; his deadline is the four a.m. first edition. In cell 3 the Honourable Member has moved on from the Home Secretary to demanding his club secretary, and Bream has begun charging the lads 2p a look, 3p with commentary.",
            "choices": [
              {
                "label": "Charge the MP now, in plain sight",
                "result": "Clegg gets his story the honest way: read out of the charge book. 'Lovely,' he says. 'Both barrels, then.' The Yard will read it over breakfast.",
                "effects": {
                  "streets": 5,
                  "brass": -13,
                  "relief": 8
                },
                "outcome": "Charged in front of the press — brave, correct, and career-limiting, in roughly that order.",
                "grade": "good"
              },
              {
                "label": "Remind Clegg about his drink-drive matter, still pending",
                "result": "Clegg goes pale, remembers an urgent appointment, and leaves the camera in the Cortina all the way home. Grubby, but the front desk is quiet again.",
                "effects": {
                  "brass": -2
                },
                "goto": "mp_yardcall",
                "delay": 1,
                "risk": {
                  "odds": 55,
                  "failResult": "Clegg writes down your exact words, with the date and the time, in the shorthand of a man who has been threatened by professionals and collects the set. The Mercury holds the minister for page five and runs the duty inspector on page one.",
                  "failEffects": {
                    "brass": -8,
                    "streets": -2
                  }
                }
              },
              {
                "label": "Walk him out the side door, sharpish",
                "result": "He's halfway across the yard, straightening his tie, when the night goes white. Clegg had a second camera. Of course he had a second camera.",
                "effects": {
                  "relief": -3
                },
                "goto": "mp_splash",
                "delay": 1
              },
              {
                "label": "Tell the desk to say nothing and hope",
                "result": "Clegg settles in on the bench with his teas — he has all night, and the first edition hasn't. Upstairs, someone makes a nervous telephone call about 'containment'.",
                "effects": {
                  "streets": -2,
                  "brass": -3
                },
                "goto": "mp_branch",
                "delay": 2
              }
            ]
          },
          {
            "id": "mp_yardcall",
            "title": "A CALL FROM THE YARD",
            "text": "Commander Askew of the Yard on the telephone, using the voice senior officers keep for career advice. 'Nobody wants a circus, Inspector. The gentleman leaves quietly, nothing on paper, and certain people remember you fondly.' Through the floor you can hear the gentleman in question singing the Eton Boating Song. Bream has stopped grinning: the Friday-night pubs have all turned out, the night's D and D trade is already on its way in, cell 3 is prime real estate, and the Honourable Member is still in it.",
            "choices": [
              {
                "label": "Side door, quiet word, no charge sheet",
                "result": "At half past three a Daimler collects the Honourable Member from the yard, and the night's paperwork develops a tasteful gap. Bream hands you the unused charge sheet without a word, which is worse than words.",
                "effects": {
                  "brass": 8,
                  "relief": -8,
                  "streets": -3
                },
                "outcome": "The Honourable Member left by the side door and officially the evening never happened. The Commander remembers you fondly; your relief remembers you differently.",
                "grade": "poor"
              },
              {
                "label": "Charge him anyway — let Askew choke on it",
                "result": "There is a silence on the line you could park a bus in. 'Your funeral, Inspector,' says Askew, and the click echoes.",
                "effects": {
                  "brass": -14,
                  "relief": 9,
                  "streets": 5
                },
                "outcome": "You charged him with the Yard listening in. Correct in law, magnificent in the canteen, fatal on the fifth floor.",
                "grade": "good"
              },
              {
                "label": "Send him up to the Yard with a bow on",
                "result": "You call in your marker with the Commander's clerk: a car, two silent men, a receipt. The Member leaves under someone else's authority, which is the whole point.",
                "effects": {
                  "favours": -1,
                  "brass": 4
                },
                "outcome": "Handed upward on a favour: the Yard owns the problem now, and you own one fewer favour.",
                "grade": "mixed"
              },
              {
                "label": "Tell Askew you'll ring him back",
                "result": "Commanders are not rung back; commanders ring. The next word about the Honourable Member won't come down the blower at all — it'll be headlights in the yard.",
                "effects": {
                  "brass": -4
                },
                "goto": "mp_branch",
                "delay": 2
              }
            ]
          },
          {
            "id": "mp_splash",
            "title": "FLASHBULB AT THE SIDE DOOR",
            "text": "The Honourable Member is back in cell 3 with gravel on his knees, having had it away on his toes back into the nick at a speed unbecoming to a member of Her Majesty's Government. Dennis Clegg now owns a photograph of a junior minister leaving a police station by the side door in the dead of night, and the Sunday Mercury's night desk is on the line, offering you the chance to 'clarify matters' before the first edition goes to bed at four. Bream, loyally, suggests shooting the messenger.",
            "choices": [
              {
                "label": "Charge him and hand the Mercury the facts",
                "result": "'MINISTER CHARGED' at least has the virtue of being true. Clegg buys the whole desk teas; the Yard's press office wakes up screaming.",
                "effects": {
                  "brass": -13,
                  "streets": 4,
                  "relief": 5
                },
                "outcome": "Charged after the flashbulb, so the Yard got the scandal and none of the credit. Honesty arrived, as usual, slightly late.",
                "grade": "mixed"
              },
              {
                "label": "Deny everything and get him gone anyway",
                "result": "The Daimler makes it away on the second attempt. MIDNIGHT MYSTERY OF MINISTER, page one, above a photograph the Yard's inquiry will describe as 'regrettably crisp'.",
                "effects": {
                  "brass": -10,
                  "relief": -6,
                  "streets": -4
                },
                "outcome": "He got away and the picture ran anyway. The inquiry will find nobody to blame, and then it will find you.",
                "grade": "poor"
              },
              {
                "label": "Ring the Yard and hand them the whole parcel",
                "result": "Your marker buys you two rubber-heeled gentlemen who collect the Member, the negatives conversation, and the blame. You are left holding the cocoa mug.",
                "effects": {
                  "favours": -1,
                  "brass": 3
                },
                "outcome": "The Yard swallowed the mess — minister, photographs and all — for the price of a favour and most of your pride.",
                "grade": "mixed"
              },
              {
                "label": "Say 'no comment' and hide in your office",
                "result": "'No comment', it turns out, sets in 72-point type just as well as anything else. Upstairs, someone with an unlisted number decides the situation wants 'managing'.",
                "effects": {
                  "streets": -3,
                  "brass": -3
                },
                "goto": "mp_branch",
                "delay": 1
              }
            ]
          },
          {
            "id": "mp_branch",
            "title": "TWO MEN IN A ROVER",
            "text": "Gone midnight. A grey Rover P6 idles in the yard and two men stand at the desk showing warrant cards a shade too fast to read. The one calling himself Mr Todd wants the Honourable Member, the charge book, Rita's statement and the visitors' book, and has brought no paperwork whatsoever — paperwork, he explains pleasantly, being rather the point. Bream looks at you the way a man looks at his guvnor when history is being decided at the front desk.",
            "choices": [
              {
                "label": "Hand over the lot, take the receipt you'll never get",
                "result": "The Rover leaves heavier than it arrived. By dawn cell 3 has never been occupied, and the night, officially, was quiet.",
                "effects": {
                  "brass": 5,
                  "relief": -9,
                  "streets": -3
                },
                "outcome": "Special Branch — if that's who they were — took the Member and the paper trail. Officially your shift was uneventful, which is somehow the most frightening word available.",
                "grade": "poor"
              },
              {
                "label": "No paperwork, no prisoner — dig in",
                "result": "You make Mr Todd fill out a Form 62 at the front desk while the relief watch in reverent silence. He does it, eventually, in handwriting like barbed wire.",
                "effects": {
                  "brass": -9,
                  "relief": 10,
                  "streets": 2
                },
                "outcome": "You made Special Branch queue at the desk and sign for their minister like everyone else. The relief will dine out on it for years; you may be dining alone.",
                "grade": "good"
              },
              {
                "label": "One call to your own man at the Yard",
                "result": "Ten minutes of murmured telephone diplomacy and the Rover departs empty, Mr Todd wearing the look of a man overruled from above. The Member goes upstairs by arrangement, with paperwork.",
                "effects": {
                  "favours": -1,
                  "brass": 3,
                  "relief": 4
                },
                "outcome": "You trumped Special Branch with a better contact: the mess went upstairs with the forms filled in, costing one favour and Mr Todd's undying enmity.",
                "grade": "good"
              }
            ]
          }
        ],
        "unresolvedOutcome": "Gerald Ffoulkes-Hume MP was still in Cell 3 when the Early Turn arrived — a problem you have now bequeathed, with compliments, to somebody else’s career."
      },
      {
        "id": "tratt",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 THE BELLA FERROVIA REOPENS TONIGHT WITH A NEW DISH CHALKED UP: PENNE ALLA REVOLUZIONE. THE GUVNOR EATS FREE, IT SAYS HERE.",
          "mixed": "THE MORNING AFTER \u2014 THE TRATTORIA SWEEPS UP GLASS AND ZABAGLIONE. BONETTI IS BAILED TO HIS AUNT'S, AND THE HEAVY MOB HAVE SENT THEIR CLEANING BILL.",
          "poor": "THE MORNING AFTER \u2014 THE COMMUNE AT THE BELLA FERROVIA ENTERS DAY TWO. THE STANDARD HAS A MAN AT A PAVEMENT TABLE, FILING DAILY.",
          "unresolved": "THE MORNING AFTER \u2014 RED-AND-BLACK STILL FLIES OVER THE BELLA FERROVIA; LIBERATED BREAKFASTS CONTINUE. THE BREWERY DRAYMAN REFUSES TO CROSS."
        },
        "title": "THE TRATTORIA",
        "startTurn": 6,
        "stages": [
          {
            "id": "tratt_report",
            "title": "A Disturbance of the Menu",
            "text": "Sgt Bream puts his head round the door with the air of a man reporting a UFO. The Trattoria Bella Ferrovia on Calthorpe Street has been seized mid-service by the Circolo Anarchico 'Ettore Malaspina' (London Section) — seven Italian anarchists who have declared a free commune, are feeding the supper queue for nothing, and are issuing communiqués through the tannoy of a borrowed ice-cream van. Signor Bonetti, the owner, weeps on the pavement in his apron. 'It's a griefy one, guv,' says Bream. 'The diners won't be rescued. Apparently the food's come on no end.'",
            "choices": [
              {
                "label": "Send a panda round for a proper butcher's",
                "result": "PC Doyle radios in from the doorway, audibly chewing. He would like it on record that the osso buco is a substantial improvement on Bonetti's.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "tratt_commune",
                "delay": 1
              },
              {
                "label": "A catering dispute. Not police business.",
                "result": "You enter it in the OB under 'civil matter'. Bonetti weeps harder, and somewhere in the November dark an ice-cream van clears its throat.",
                "effects": {
                  "streets": -4
                },
                "goto": "tratt_van",
                "delay": 2
              },
              {
                "label": "Sit Bonetti down with sweet tea and a statement form",
                "result": "Four pages of immaculate paperwork, mostly concerning his mother's recipes. Upstairs will be delighted; the anarchists, meanwhile, are on to the puddings.",
                "effects": {
                  "brass": 2,
                  "streets": -3
                },
                "goto": "tratt_van",
                "delay": 2
              }
            ]
          },
          {
            "id": "tratt_commune",
            "title": "The People's Osso Buco",
            "text": "PC Doyle's report, read to the office over cocoa: seven anarchists under one Ennio Scarlatti, known as Il Professore, currently wearing Bonetti's second-best apron. No form on him this side of the Channel; Milan, presumably, could oblige. Red-and-black bunting over the specials board. The till drawer stands open, full of IOUs addressed 'to History'. Forty diners refuse rescue on the grounds that the saltimbocca has never been better, the ice-cream van is rehearsing Communiqué No. 4, and a queue is forming in the drizzle. Bonetti has stopped weeping and started shouting figures at anyone in uniform.",
            "choices": [
              {
                "label": "Go down yourself — and tell them to dust off the good grappa glasses",
                "result": "You leave Sgt Bream holding the fort. Scarlatti receives you like visiting royalty, which worries you considerably more than the bunting.",
                "effects": {},
                "goto": "tratt_grappa",
                "delay": 1
              },
              {
                "label": "Send in the heavy mob before the puddings turn political",
                "result": "Two anarchists nicked, five away on their toes out the kitchen window, and a diner writes to the Standard about the ruination of his zabaglione. The relief spend an hour picking bunting off their tunics.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 2,
                  "arrests": 2,
                  "streets": 8,
                  "brass": -3,
                  "relief": -5
                },
                "outcome": "The Trattoria commune fell to the heavy mob mid-dessert — order restored, zabaglione avenged, two anarchists cooling in the cells and singing till breakfast.",
                "grade": "mixed"
              },
              {
                "label": "Get the town hall on the blower — Vokes, the food inspector, out of his bed",
                "result": "It costs you the marker from the drains business, but Mr Vokes agrees to attend with clipboard and thermometer. He sounds almost eager.",
                "effects": {
                  "favours": -1
                },
                "goto": "tratt_inspector",
                "delay": 1
              },
              {
                "label": "Let them simmer overnight — revolutions hate a Saturday",
                "result": "Within the hour the queue is round the block and the communiqués have moved on to the subject of the Old Bill.",
                "effects": {
                  "streets": -5
                },
                "goto": "tratt_standoff",
                "delay": 2
              }
            ]
          },
          {
            "id": "tratt_van",
            "title": "Communiqué Number Nine",
            "text": "The borrowed ice-cream van has found its voice. Communiqué No. 9 — property is theft, but the veal is liberated — rolls down Calthorpe Street through the chimes of 'O Sole Mio'. The free-food queue now stretches past the Duke of Clarence — a slaggy little boozer at the best of times — whose landlord is livid at the competition, and a young man from the Standard is buying the anarchists' life stories in halves of lager. Bonetti has chained himself to his own drainpipe in protest at being locked out of his own protest.",
            "choices": [
              {
                "label": "Go down in person — grappa diplomacy, before the Standard writes the ending",
                "result": "Scarlatti pronounces you 'the first honest policeman since the Paris Commune' through the tannoy. You would rather he hadn't.",
                "effects": {},
                "goto": "tratt_grappa",
                "delay": 1
              },
              {
                "label": "Heavy mob, now, while they're distracted by the queue",
                "result": "Three captured, the van's chimes jammed on 'O Sole Mio', and a photograph of PC Whittle wrestling a stockpot destined for Monday's front page.",
                "effects": {
                  "dispatchUnits": 3,
                  "dispatchTurns": 2,
                  "arrests": 3,
                  "streets": 9,
                  "brass": -4,
                  "relief": -6
                },
                "outcome": "B Relief stormed the Trattoria to the tune of 'O Sole Mio' — three collars, one stockpot casualty, and a press photo the Commander keeps mentioning.",
                "grade": "mixed"
              },
              {
                "label": "Ring the town hall — time Mr Vokes earned his pension",
                "result": "You burn the marker from the drains business. Vokes arrives in bicycle clips and a dressing-gown collar, radiating quiet menace.",
                "effects": {
                  "favours": -1
                },
                "goto": "tratt_inspector",
                "delay": 1
              },
              {
                "label": "Let the revolution run out of veal on its own",
                "result": "It doesn't. Communiqué No. 14 announces a permanent occupation, a crèche, and Sunday opening.",
                "effects": {
                  "streets": -6
                },
                "goto": "tratt_standoff",
                "delay": 2
              }
            ]
          },
          {
            "id": "tratt_grappa",
            "title": "Grappa with Il Professore",
            "text": "The dining room falls silent as you enter alone, hat under arm. Scarlatti clears a table himself, pours two grappas, and states his position: the commune is eternal, the people are fed, and Bonetti — a ponce and a profiteer — was watering the house red anyway. Forty diners pretend not to listen. The grappa, annoyingly, is excellent. Behind you a PC breathes on the window. One wrong word and this becomes a siege; one right one and everybody is home within the hour.",
            "choices": [
              {
                "label": "Shake on it: one last free service, gone by dawn, and nothing goes in the occurrence book",
                "result": "Scarlatti weeps, embraces you, and comps you the veal. By dawn the commune is a rumour and the washing-up, miraculously, is done.",
                "effects": {
                  "streets": 8,
                  "brass": -3,
                  "relief": 6
                },
                "outcome": "The guvnor talked the anarchists out over grappa — no arrests, no paperwork, and a rumour upstairs that {he} toasted the revolution twice.",
                "grade": "good",
                "sets": "grappa_peace"
              },
              {
                "label": "Demand unconditional surrender between toasts",
                "result": "Scarlatti rises, wounded to the soul, and declares the negotiation 'a bourgeois ambush'. The shutters come down with you barely out the door.",
                "effects": {
                  "streets": -4
                },
                "goto": "tratt_standoff",
                "delay": 1
              },
              {
                "label": "Nick Scarlatti at the table — cut off the head",
                "result": "Il Professore goes quietly, beaming — no man was ever gladder to be captured, martyrdom having always been Plan A. The remaining six barricade the kitchen and start printing pamphlets on the meat slicer.",
                "effects": {
                  "arrests": 1,
                  "brass": 3,
                  "streets": -3
                },
                "goto": "tratt_standoff",
                "delay": 1,
                "risk": {
                  "odds": 45,
                  "failResult": "You get a hand to his collar and forty contented diners rise as one man, every one of them on the side of the kitchen. Il Professore departs through the pantry window with the grappa under his arm, and you are escorted to the pavement by a wall of napkins, minus your hat, which the commune later exhibits.",
                  "failEffects": {
                    "brass": -5,
                    "streets": -4
                  }
                }
              }
            ]
          },
          {
            "id": "tratt_inspector",
            "title": "The Man from the Town Hall",
            "text": "Mr Vokes of the borough environmental health department stands in the Trattoria doorway with a clipboard, a probe thermometer and the moral certainty of a man who has closed pie stalls in three boroughs. The anarchists, braced for truncheons, have no doctrine for him. He has already noted an unlagged pipe, an uncovered stockpot and a cat. Scarlatti attempts to explain that hygiene regulations are an instrument of the state. Vokes agrees, pleasantly, and clicks his pen.",
            "choices": [
              {
                "label": "Let Vokes off the leash",
                "result": "Condemned under Regulation 16: the commune cannot lawfully feed the people, and an anarchist who poisons the people is merely a caterer. They withdraw under protest, singing. Vokes stays behind to measure the fridge.",
                "effects": {
                  "streets": 7,
                  "brass": 4,
                  "relief": 3
                },
                "outcome": "The commune fell not to the truncheon but to the clipboard — Mr Vokes condemned the stockpot and seven anarchists left singing, beaten by Regulation 16.",
                "grade": "good"
              },
              {
                "label": "Ask Vokes to hold off till office hours — it seems excessive at 1 a.m.",
                "result": "Vokes departs, wounded, pocketing his thermometer like a duelling pistol. The tannoy declares victory over 'the sanitary arm of capital'.",
                "effects": {
                  "streets": -5
                },
                "goto": "tratt_standoff",
                "delay": 2
              },
              {
                "label": "March the seven out under escort while Vokes reads the charges",
                "result": "Two who won't budge are nicked for obstructing an environmental health officer — a first for the borough, possibly for jurisprudence. The station sergeant demands to know how to spell 'stockpot' before he'll have it in the charge book.",
                "effects": {
                  "arrests": 2,
                  "streets": 6,
                  "brass": 3,
                  "relief": -4
                },
                "outcome": "Bureaucracy and the boot combined: Vokes condemned the kitchen while two anarchists went in the book for obstructing his thermometer.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "tratt_standoff",
            "title": "The Siege of the Bella Ferrovia",
            "text": "Full house. Red-and-black flags on the roof, a bedsheet banner reading TUTTO PER TUTTI misspelt in Bonetti's own paint, and the Yard has telephoned twice to ask why an ice-cream van is broadcasting anarchism on the Commander's manor. Bonetti, freed from his drainpipe, is giving the Standard an interview on the theme of betrayal. Inside: seven anarchists and forty contented diners who have just asked for the cheese course. It ends tonight, guvnor, one way or another.",
            "choices": [
              {
                "label": "Send in the heavy mob — every body you can spare",
                "result": "It takes eleven minutes and looks every second of it. Three collars, one PC lightly breaded, and a photographer on the launderette roof getting the lot.",
                "effects": {
                  "dispatchUnits": 3,
                  "dispatchTurns": 3,
                  "arrests": 3,
                  "streets": 10,
                  "brass": -5,
                  "relief": -8
                },
                "outcome": "The siege of the Bella Ferrovia ended with the heavy mob in the flock wallpaper — streets quiet, three under lock and key, and the Commander framing entirely the wrong photograph.",
                "grade": "mixed"
              },
              {
                "label": "Walk in alone, hands in pockets, and hear their terms",
                "result": "They leave at four, with a signed letter on station notepaper praising the borough's revolutionary spirit. You will be hearing about that letter for the rest of your time in the Job.",
                "effects": {
                  "streets": 5,
                  "brass": -8,
                  "relief": 3
                },
                "outcome": "The guvnor talked the siege down solo — anarchists gone by four a.m., and a letter of surrender the Yard insists on calling a letter of endorsement.",
                "grade": "mixed"
              },
              {
                "label": "Cordon it off and let the wine run out",
                "result": "The relief play cards in the vans while the commune sings itself hoarse. It ends Tuesday, when the grappa does — C Relief's problem, and the borough knows it.",
                "effects": {
                  "streets": -9,
                  "brass": -4,
                  "relief": 4
                },
                "outcome": "The commune outlasted the shift and folded on Tuesday when the cellar ran dry — nobody hurt, nobody impressed, everybody fed.",
                "grade": "poor"
              }
            ]
          }
        ],
        "unresolvedOutcome": "The Bella Ferrovia was still flying red-and-black at six a.m., serving liberated breakfasts — noted, in writing, by the Commander."
      },
      {
        "id": "ira",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 EXPO'S MAN GOT A QUIET HANDSHAKE IN A CORRIDOR AND A REPORT NOBODY WILL EVER READ ALOUD. THE ALHAMBRA REOPENS FRIDAY.",
          "mixed": "THE MORNING AFTER \u2014 THE ALHAMBRA COUNTS ITS GREEN SHIELD STAMPS AND ITS LUCK. THE CODEWORD INDEX AT THE YARD GAINS ONE CAREFUL ASTERISK.",
          "poor": "THE MORNING AFTER \u2014 THE KILBRIDE SOCIAL CLUB IS OWED TWO APOLOGIES THE ACT DOES NOT PROVIDE FOR. ITS DOORS HAVE CLOSED TO THE UNIFORM.",
          "unresolved": "THE MORNING AFTER \u2014 THE ALHAMBRA QUESTION STAYS OPEN ON THE YARD'S BOOKS. THE BINGO CALLER HAS DEVELOPED, THE MANAGER REPORTS, A STAMMER."
        },
        "venue": "alhambra",
        "title": "THE CODEWORD",
        "startTurn": 10,
        "stages": [
          {
            "id": "ira_call",
            "title": "THE CODEWORD",
            "text": "The blower goes at the front desk and Sgt Bream's face does something you have never seen it do. A muffled voice, male, gave a codeword — the Irish Republican Army's way of marking a bomb warning as the real thing, a word only they and the Yard are meant to know, and this one is a proper one, or near enough — and one sentence: the Alhambra Bingo Hall, high street. Tonight is the Alhambra's All-Night Charity Marathon: three hundred pensioners locked in with their books until dawn, the Snowball standing at £470. Bream has written the time in the occurrence book in a very steady hand. It is half past two. The line is dead.",
            "choices": [
              {
                "label": "Clear the Alhambra — everything you can spare",
                "result": "Three crews go with the bells on. The high street wakes to blue lights, and Mr Prewitt, the manager, meets them at the doors with the words 'mid-Snowball' as if they were a legal defence.",
                "effects": {
                  "dispatchUnits": 3,
                  "dispatchTurns": 3,
                  "streets": -3
                },
                "goto": "ira_evac",
                "delay": 1
              },
              {
                "label": "Verify the codeword with the Yard before you commit",
                "result": "The Yard's night duty officer explains that the current codeword list lives in the safe in Room 411, and the man who knows the combination is at a retirement do in Pimlico. He'll ring back. Minutes start doing that thing minutes do.",
                "effects": {
                  "streets": -2
                },
                "goto": "ira_yard",
                "delay": 1
              },
              {
                "label": "Some joker having a laugh — log it and crack on",
                "result": "It goes in the OB between a stray dog and a broken shopfront. Bream logs it without comment, which from Bream is a speech. Nobody in the parade room looks at you.",
                "effects": {
                  "streets": -4,
                  "relief": -4
                },
                "goto": "ira_sat",
                "delay": 2
              }
            ]
          },
          {
            "id": "ira_yard",
            "title": "ROOM 411",
            "text": "The Yard rings back. The codeword was genuine — and withdrawn in March. Stale. Either an old hand being careless, or somebody who has seen a piece of paper they shouldn't. While you digest this, Commander Rossiter comes on the other line demanding total discretion and visible action, in that order, in the same sentence. He also mentions, in the voice of a man not mentioning it, that under the new Act you could always lift the usual Irishmen and be seen to be busy. The Alhambra plays on.",
            "choices": [
              {
                "label": "Evacuate anyway — stale codeword or not, you can't wear it",
                "result": "Three crews roll. If it's real you were right; if it's not, you're the {man} who stopped the Snowball. Both careers are survivable. Only one of them sleeps.",
                "effects": {
                  "dispatchUnits": 3,
                  "dispatchTurns": 3,
                  "streets": -3
                },
                "goto": "ira_evac",
                "delay": 1
              },
              {
                "label": "Work the caller — that voice knew the session times",
                "result": "PC Whittle goes to take tea with the Alhambra's manager, notebook open. Whoever rang knew the marathon schedule, knew the Snowball, and said 'Al-AM-bra' like a man who has stood under the glitterball.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2,
                  "streets": -2
                },
                "goto": "ira_hoax",
                "delay": 1
              },
              {
                "label": "Lift the usual Irishmen and be seen to be busy",
                "result": "Two names off the collator's card index, both asleep, both taken quietly. The forms under the Act take forty minutes to fill in. It takes rather longer for anyone in the charge room to say a word to you.",
                "effects": {
                  "arrests": 2,
                  "brass": 6,
                  "relief": -10,
                  "streets": -8
                },
                "outcome": "Two men from the Kilbride Social Club spent the weekend in your cells under the Act and walked out Monday without charge, evidence or apology — and the Alhambra was never searched, because nobody ever looked. The Commander's memo praises your 'firm grip'. It reads the way ash tastes, and everyone from Bream to the tea lady knows whose grip it was.",
                "grade": "poor",
                "sets": "kilbride_shame"
              },
              {
                "label": "Hold everything until Room 411 opens in the morning",
                "result": "The safe holds the codeword list, and the safe holds office hours. You hold the line, and listen to the Alhambra's tannoy in your mind's ear.",
                "effects": {
                  "streets": -4
                },
                "goto": "ira_sat",
                "delay": 2
              }
            ]
          },
          {
            "id": "ira_evac",
            "title": "MID-SNOWBALL",
            "text": "Clearing the Alhambra is not policing, it is siege work. Three hundred pensioners, one Snowball still unclaimed, and a resident caller, Wally Fenton, who announces 'a short interval, positions honoured' with the dignity of a man abandoning a liner. Ladies dab their books on the way out. One requires PC Duffin to mind her seat cushion. Mr Prewitt begs, generally. The Wimpy over the road takes in refugees three to a banquette. The Explosives Officer is coming from Cannon Row, they say, drinking his thermos as he drives.",
            "choices": [
              {
                "label": "Cordon both ends of the high street and wait for the Expo, by the book",
                "result": "Tape, trestles, and a PC on every corner, with the Alhambra between them like a tooth waiting for the dentist. Rossiter rings to say the word 'discretion' and hears nothing back but the wind of an empty high street.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 4,
                  "brass": 3
                },
                "goto": "ira_expo",
                "delay": 1
              },
              {
                "label": "Improvise the cordon from what's on scene — trestles, dustbins and Duffin",
                "result": "The cordon is one part tape to four parts Duffin waving his arms. Two dabbers get back in through the fire exit for their handbags and are escorted out again, slower and angrier.",
                "effects": {
                  "streets": -4,
                  "relief": -4
                },
                "goto": "ira_expo",
                "delay": 1
              },
              {
                "label": "Call in your marker with the Fire Brigade — lads and lamps",
                "result": "Station Officer Meech brings a pump, floodlights, and the quiet satisfaction of a man squaring an old debt. 'Now we're even, Inspector.' You were saving that one.",
                "effects": {
                  "favours": -1,
                  "streets": 2
                },
                "goto": "ira_expo",
                "delay": 1
              }
            ]
          },
          {
            "id": "ira_expo",
            "title": "THE LONG WALK",
            "text": "The hall stands empty for the first time since the Coronation. Under seat forty-four, where the search parties met, there is a fibre suitcase that nobody will claim. The Explosives Officer arrives without bells, parks facing away, and asks one question — 'Anybody still inside? No? Good' — in the tone of a man confirming a milk order. Then he sets down his thermos, looks at the doors for a while, and begins the long walk in. Everyone else discovers a deep interest in the far end of the street.",
            "choices": [
              {
                "label": "Hold everything and let him work — however long it takes",
                "result": "Time goes strange. Duffin stops selling anybody anything. Somewhere towards dawn the Explosives Officer walks back out, no faster than he walked in, carrying nothing, and says the street can have its morning back.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 3,
                  "streets": 13,
                  "brass": 12,
                  "relief": 8
                },
                "outcome": "It was real, and it was made safe by one calm man while your relief held the street around him. Three hundred pensioners, a caller, a manager and a station cat's worth of borough, all still here. The Yard's teleprinter uses the word 'exemplary'; Bream pastes it into the book, and nobody on B Relief buys their own drinks for a month.",
                "grade": "good"
              },
              {
                "label": "Take no chances — controlled explosion, and give the street back sooner",
                "result": "One flat crack behind the sandbags and it is over. Then the snow starts: small, green, adhesive snow, settling all down the high street in the lamplight.",
                "effects": {
                  "streets": 5,
                  "brass": -4,
                  "relief": 2
                },
                "outcome": "The suitcase held thirty-one full books of Green Shield stamps — fifteen years of saving towards a twin-tub, left under seat forty-four in the excitement. PC Duffin, who knows stamps, counted what could be gathered and couldn't speak. The street is safe, the Yard is unamused, and on Monday a widow from Dunmow Road will be told as gently as anyone can manage.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "ira_hoax",
            "title": "THE MAN WHO HATED WALLY FENTON",
            "text": "Patient work, done quietly. Whittle comes back with tea in him and a name: Ronald Peagram, the Alhambra's relief caller for eleven years, passed over for the marathon microphone and sacked in April over 'the incident with the tannoy'. The withdrawn codeword? Pinned on a Home Office circular in Prewitt's office until spring, where a relief caller might read it nightly and nurse it. Peagram's flat on Ferrier Street overlooks a phone box. Whittle walked past it on his way back. The coin box, he mentions, was warm.",
            "choices": [
              {
                "label": "Nick Peagram at his flat before he rings anybody else",
                "result": "He answers the door in his caller's blazer, as if he had been expecting a bigger audience. On the table there is a rehearsal script for the call, with the pauses marked in pencil.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2,
                  "arrests": 1,
                  "streets": 8,
                  "brass": 7,
                  "relief": 5
                },
                "outcome": "Ronald Peagram, 54, charged over a codeword he memorised out of spite and a grudge the size of the Snowball. No device, no danger, one collar, three hundred pensioners none the wiser. Wally Fenton has offered B Relief free books for life, positions honoured.",
                "grade": "good"
              },
              {
                "label": "Sit on the phone box and take him mid-performance",
                "result": "Two crews, one doorway, forty minutes of November. At ten to four Peagram crosses the road in his slippers with fourpence ready, and gives the performance of his life to a dead line and an audience of four.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 3,
                  "arrests": 1,
                  "streets": 9,
                  "brass": 9,
                  "relief": 6
                },
                "outcome": "Captured in the act, coins in hand, voice on the record — a brief-proof collar even the Yard couldn't improve. Rossiter uses the word 'textbook', then asks, quietly, that the bingo element be kept out of the press summary.",
                "grade": "good",
                "sets": "peagram_nicked"
              },
              {
                "label": "Flag it for the Early Turn and stand your people down",
                "result": "You write it up fair and full and leave it in the tray. The night gets its units back; the morning gets its glory.",
                "effects": {
                  "streets": -3,
                  "brass": -5,
                  "relief": 2
                },
                "outcome": "A Relief lifted Peagram at nine sharp, working exactly to your notes, and the Commander's memo praised their initiative by name. Your name appears once, in the phrase 'information received'.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "ira_sat",
            "title": "THE SECOND CALL",
            "text": "The voice rings again — straight to the Yard switchboard this time, same codeword, same address, louder. Which means Commander Rossiter now knows the Alhambra threat has been sitting on Thorne Street's books while the bingo played on. The Bomb Squad is rolling from Cannon Row whether you like it or not, Rossiter is on the phone asking for your occurrence book in the tone of a man asking for a resignation, and the Alhambra is still full. The Snowball stands at £480, and somebody in there has just won a line.",
            "choices": [
              {
                "label": "Get your units there first and run it yourself",
                "result": "You beat the Yard's convoy to the doors by four minutes and are standing on the pavement, tape in hand, when it arrives. Rossiter's man surveys the scene and finds nothing left to take over, which is the only apology you'll get.",
                "effects": {
                  "dispatchUnits": 3,
                  "dispatchTurns": 3,
                  "brass": -5
                },
                "goto": "ira_evac",
                "delay": 1
              },
              {
                "label": "Stand off and let the Yard's mob run it",
                "result": "Their units clear the hall with metropolitan efficiency and no local knowledge — the Snowball dispute alone occupies three of their sergeants. You watch from your own ground like a guest.",
                "effects": {
                  "brass": -8,
                  "relief": -6,
                  "streets": -3
                },
                "outcome": "The Yard emptied the Alhambra, found an abandoned suitcase full of somebody's Green Shield stamps, and wrote a report in which Thorne Street's forty silent minutes appear in the margin, underlined, twice. Nobody was hurt. Careers were.",
                "grade": "poor"
              },
              {
                "label": "Give Rossiter a name for the delay — the log was Bream's",
                "result": "You say it quickly, before you can hear yourself say it. Rossiter accepts the offering the way senior officers do, without gratitude. Down the corridor, Bream is filling in his pools coupon and doesn't know yet.",
                "effects": {
                  "brass": 2,
                  "relief": -12,
                  "streets": -2
                },
                "outcome": "The Yard cleared the hall, the threat came to nothing, and the paper for the delay carries Sgt Bream's number because you put it there. The custard creams have stopped appearing. 'Cheap at the price' is a thing you'll say to the shaving mirror, and not believe.",
                "grade": "poor"
              }
            ]
          }
        ],
        "unresolvedOutcome": "The Alhambra question was still open when the Early Turn took over — the codeword unverified, the hall unsearched, and the occurrence book showing, in Sgt Bream's very steady hand, exactly when Thorne Street knew."
      },
      {
        "id": "brown",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 A10 — THE YARD'S OWN ANTI-CORRUPTION SQUAD — WERE AT THREE SOHO DESKS BY NINE, COLLECTING THE LEDGER'S NAMES. NOBODY AT THORNE STREET IS AMONG THEM, WHICH IS BEING NOTICED, FAVOURABLY.",
          "mixed": "THE MORNING AFTER \u2014 THE LEDGER DOES ITS WORK, MINUS FOUR PAGES. CERTAIN TELEPHONES ACROSS THE RIVER HAVE GONE VERY QUIET.",
          "poor": "THE MORNING AFTER \u2014 THE MONTHLY COLLECTIONS RESUME ON SCHEDULE. A CAR NOBODY KNOWS SAT OPPOSITE THE NICK FOR AN HOUR AT EIGHT.",
          "unresolved": "THE MORNING AFTER \u2014 THE LEDGER SITS IN THE SAFE AND THE SAFE SITS IN EVERYONE'S MIND. THE DAY GUVNOR HAS ASKED, CAREFULLY, WHAT IT IS."
        },
        "title": "THE BROWN ENVELOPE",
        "startTurn": 3,
        "stages": [
          {
            "id": "brown_raid",
            "title": "ADULT LITERATURE AND MARINE CHARTS",
            "text": "The van comes back from the bookshop raid heavier than the warrant strictly covers: eleven boxes of stock, one till, and a ledger — names, dates, amounts, monthly. Some of the entries aren't names at all but warrant numbers — the number every police officer carries on his warrant card. Coppers, in a Soho bookshop's payment ledger, at monthly rates. PC Whittle, nineteen and helpful, read two pages aloud in his best court voice before anyone thought to stop him. Sgt Bream has gone very quiet over his custard creams, and a quiet Bream is a barometer falling. Somewhere across the river, you would swear, a telephone has already started ringing.",
            "choices": [
              {
                "label": "Lock it in your safe and think",
                "result": "The safe shuts with a bank-vault click that convinces nobody, least of all you. Word of what came off that van is travelling faster than the van did.",
                "effects": {},
                "goto": "brown_halloran",
                "delay": 1
              },
              {
                "label": "Put WPC Hartle on it — pages numbered, now",
                "needsWpc": true,
                "result": "Hartle takes the ledger, a biro and the good desk lamp, initialling as she goes. It's slow, it's clerking, and it's the only armour on offer at this hour.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2,
                  "relief": 2
                },
                "goto": "brown_property",
                "delay": 1
              },
              {
                "label": "Ring the Yard and ask whose ledger this is",
                "result": "A courteous voice says someone will 'pop round'. You have just told the one squad that didn't know where their ledger was exactly where their ledger is.",
                "effects": {
                  "brass": 2
                },
                "goto": "brown_halloran",
                "delay": 1
              },
              {
                "label": "Send it back with the stock — not your circus",
                "result": "The ledger goes back in the box and the box goes back on the van. Whittle watches you do it, which is the part you'll remember.",
                "effects": {
                  "streets": -4,
                  "relief": -6,
                  "brass": 3
                },
                "outcome": "The ledger went back under Soho's floorboards and the monthly collections never missed a beat. Upstairs was grateful the way people are grateful to a {man} who didn’t make a smell — and your name went on a quiet list of officers who can be relied upon to look away.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "brown_halloran",
            "title": "A VISITOR FROM THE DIRTY SQUAD",
            "text": "Within the hour there's a man at the front desk the desk never announced: DS Halloran, Obscene Publications Squad, charming as a hinge that never squeaks and smelling of cigars and rain. He's come to 'take the exhibits off your hands — save your lads the paperwork, guvnor.' He knows Whittle's name. He knows Bream takes sugar. He is currently scratching Regan behind the ears, and the cat — a judge of character until tonight — is letting him. First offer on the table: a proper drink, after.",
            "choices": [
              {
                "label": "Let him take the lot — his squad, his mess",
                "result": "Two signatures he doesn't wait for, and the ledger goes out under a damp overcoat. 'Any time you need anything, guvnor. Any time at all.'",
                "effects": {
                  "favours": 1,
                  "relief": -8,
                  "streets": -5
                },
                "outcome": "Halloran walked out with the ledger and left you a friend at the dirty squad. Friends like that stay bought only until the price changes — within the month the till at Adult Literature and Marine Charts was ringing again, and your relief knew exactly who let it.",
                "grade": "poor",
                "sets": "halloran_friend"
              },
              {
                "label": "Ring A10 (anti-corruption) while he's still charming the cat",
                "result": "You dial with Halloran watching through the glass, and his smile does something no smile should. A10 answer on the second ring; they have been waiting years for this postcode.",
                "effects": {
                  "brass": -12,
                  "relief": 4,
                  "streets": 2
                },
                "outcome": "A10 took the ledger, Whittle's statement and, across the following year, eleven detectives. The fifth floor treated you like something catching all winter — but when the trials finished, yours was the signature everybody suddenly remembered being proud of.",
                "grade": "good",
                "sets": "a10_called"
              },
              {
                "label": "Take the drink, promise nothing",
                "result": "He leaves a bottle of Scotch 'for the mess fund' and the sensation of having been measured for something. On his way out he waves at Whittle, by name.",
                "effects": {},
                "goto": "brown_probationer",
                "delay": 1
              },
              {
                "label": "Fetch Bream in to witness every word",
                "result": "Charm with an audience is only noise, and Halloran knows it. He withdraws, promising — pleasantly, twice — to pop back later.",
                "effects": {
                  "brass": -2
                },
                "goto": "brown_property",
                "delay": 1
              }
            ]
          },
          {
            "id": "brown_probationer",
            "title": "THE BOY WHO READ IT OUT",
            "text": "PC Whittle read two pages of that ledger aloud, and the whole nick heard the till of it. Now a call has come through from a man who wouldn't leave a name: there is a transfer opportunity for a keen young officer at a division fifty miles' bus ride away — or alternatively a complaint pending about his conduct during the raid. 'Depending,' the voice said. Whittle, meanwhile, is at his locker polishing boots that don't need it, which is what a probationer does instead of asking his guvnor if everything is all right.",
            "choices": [
              {
                "label": "Sit him down — statement, signed and countersigned",
                "result": "Whittle writes slowly and spells 'ledger' right on the third attempt. It exists in his own hand now, witnessed — a thing much harder to disappear than a memory.",
                "effects": {
                  "relief": 4
                },
                "goto": "brown_envelope",
                "delay": 1
              },
              {
                "label": "Crew him on the area car till the shift ends",
                "result": "The safest place on the ground tonight is a moving vehicle. Whittle goes out with PC Doyle, delighted, under the impression it's a reward.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 3,
                  "relief": 2
                },
                "goto": "brown_envelope",
                "delay": 1
              },
              {
                "label": "Tell him he saw a stock list and nothing more",
                "result": "'Yes, guv,' he says, in the tone probationers use when they've just learned something much bigger than the lesson you intended.",
                "effects": {
                  "relief": -7,
                  "brass": 3
                },
                "goto": "brown_envelope",
                "delay": 2
              }
            ]
          },
          {
            "id": "brown_property",
            "title": "THE LEDGER GOES IN THE PROPERTY BOOK",
            "text": "The bookshop ledger — the one with warrant numbers where names should be — is still on the desk, and Sgt Bream produces the property register the way other men produce a family Bible. His position, delivered between custard creams: enter every exhibit from the raid properly — page numbered, description recorded, two initials against every line — and none of it can quietly stop existing, because the book would show the hole. It is the dullest protection known to policing, and the only kind the ledger's owners can't charm away. It will take most of what's left of the night, and it wants doing before anybody comes to 'pop back' for their property.",
            "choices": [
              {
                "label": "Every page, two signatures — do it properly",
                "result": "Hartle numbers, Bream initials, and the OB gets a cross-reference in handwriting you could notarise. Deep in the shift it stops being evidence and becomes geology.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2,
                  "brass": -5,
                  "relief": 6,
                  "streets": 2
                },
                "outcome": "Ledger, property book, three sets of initials and a cross-referenced occurrence entry: by morning it belonged to the Metropolitan Police and not to whoever wanted it back. Nobody thanked you — clerks are never thanked — but when the dirty squad fell, two years on, yours was the paperwork nobody had managed to lose.",
                "grade": "good"
              },
              {
                "label": "Log the covers and a sample — the lot would take all night",
                "result": "Half an entry is half an armour. The pages in the book are safe as houses; the pages not in the book have already started their journey somewhere else.",
                "effects": {
                  "brass": -2
                },
                "goto": "brown_envelope",
                "delay": 1
              },
              {
                "label": "Leave it in your safe — a lock beats a ledger entry",
                "result": "Bream closes the register without a word. Every safe key in the borough has a duplicate somewhere, guv, and yours was cut by the same locksmith as everybody else's.",
                "effects": {
                  "streets": -2
                },
                "goto": "brown_envelope",
                "delay": 2
              }
            ]
          },
          {
            "id": "brown_envelope",
            "title": "THE BROWN ENVELOPE",
            "text": "Halloran again, deep in the shift, minus the top layer of charm. On your desk he sets a brown envelope, fat as a Sunday sermon — 'the squad's whip-round, guvnor, for a colleague under strain' — and beside it, delivered like a weather forecast, the observation that pensions are delicate instruments, that discipline boards can be slow, and that he'd hate to see a {man} your age start again in security work. The envelope sits there. Rain ticks on the window. Regan has left the room.",
            "choices": [
              {
                "label": "Keep the envelope shut — but let him take the ledger",
                "result": "'Sensible,' he says, in a voice you will be hearing for years. The ledger leaves in a cigar-scented overcoat; the envelope stays, untouched, like a stain in reverse.",
                "effects": {
                  "favours": 1,
                  "relief": -9,
                  "streets": -6
                },
                "outcome": "No money changed hands — you'll tell yourself that on the bad nights. The ledger walked, the collections on the patch resumed by the weekend, and DS Halloran now owes you one. Men like Halloran always pay their debts. That's the trouble.",
                "grade": "poor",
                "sets": "halloran_friend"
              },
              {
                "label": "Ring A10 (anti-corruption) with the envelope still warm on the desk",
                "result": "The envelope, unopened, becomes Exhibit One before Halloran's back is through the door. A10 arrive with the rain still on their coats and take everything, including — politely — your statement.",
                "effects": {
                  "brass": -14,
                  "relief": 5,
                  "streets": 3
                },
                "outcome": "The envelope went to A10 unopened, which made it the most eloquent object in the whole inquiry. Upstairs called the scandal your fault right up until the convictions, at which point it had been everyone's idea all along — but the record shows who dialled, and records outlive commanders.",
                "grade": "good",
                "sets": "a10_called"
              },
              {
                "label": "Nick him — attempting to corrupt, envelope as exhibit",
                "result": "There is a silence you could frame. Then Bream, from the doorway, already holding the charge book: 'Name?' Halloran gives it, spelling it out, which is the closest he comes to dignity.",
                "effects": {
                  "arrests": 1,
                  "brass": -10,
                  "relief": 12,
                  "streets": 4
                },
                "outcome": "DS Halloran, banged up by uniform at a divisional nick. His brief had him out by breakfast, but the entry survives — charge books being the one thing his squad never learned to lose — and the thread pulled loose that night had eleven careers on the end of it.",
                "grade": "good"
              },
              {
                "label": "Tell him you'll think about it",
                "result": "He leaves the envelope where it lies. 'Course you will, guvnor.' After that, the corridor by the property store goes very quiet — quiet like held breath.",
                "effects": {
                  "streets": -3
                },
                "goto": "brown_thin",
                "delay": 1
              }
            ]
          },
          {
            "id": "brown_thin",
            "title": "HELD BREATH",
            "text": "The guard around that ledger is now a rumour. Bream has found fresh scratches round the property store lock; a page of the duplicate occurrence book has gone for a stroll; across the road a Granada idles with its wipers going, though the rain has stopped. Whittle keeps finding reasons to stand near your office. Whatever you are going to do about the dirty squad's ledger wants doing before the Early Turn arrives with its unfamiliar faces and its innocent questions about the safe.",
            "choices": [
              {
                "label": "Ring A10 now, with whatever's left",
                "result": "They answer fast and arrive faster, and the Granada across the road pulls away before their car doors have shut.",
                "effects": {
                  "brass": -11,
                  "relief": 3
                },
                "outcome": "A10 got the ledger minus four pages nobody has ever accounted for. It was enough. The inquiry ran the better part of a year and read your occurrence book aloud in court like scripture. Vindication arrived late and slightly torn, which is how it usually travels.",
                "grade": "mixed"
              },
              {
                "label": "Step out for refs and let the store mind itself",
                "result": "The canteen tea has never tasted of so little. When you come back, the scratches round the lock have company, and the ledger has stopped being your problem in the worst available way.",
                "effects": {
                  "favours": 1,
                  "relief": -10,
                  "streets": -7
                },
                "outcome": "By first light the ledger had never existed, and you had earned a marker from men whose markers are debts. Sgt Bream never mentioned it again — which, from Bream, is a verdict.",
                "grade": "poor"
              },
              {
                "label": "Turn out Bream and Hartle — log every page left",
                "result": "Three tired signatures against every page while the kettle goes round. It isn't glory. It was never going to be glory. It is, however, in the book.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1,
                  "brass": -4,
                  "relief": 5,
                  "streets": 2
                },
                "outcome": "Clerking, at the end of a long night: every surviving page numbered, initialled and cross-referenced by three witnesses. When the dirty squad finally fell, the property book was the one document nobody had contrived to lose, and your initials ran through it like a watermark.",
                "grade": "good"
              }
            ]
          }
        ],
        "unresolvedOutcome": "The ledger was still in the safe at six, its guard changing with the shift — and things that sit in safes overnight round here have a way of becoming rumours by Monday."
      },
      {
        "id": "football",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 BRITISH RAIL FOUND THE RELIEF TRAIN AND BIG TOMMY LEGGE FOUND IMMORTALITY. NORTHGATE LOST AWAY, WHICH IS NOT OUR FILE.",
          "mixed": "THE MORNING AFTER \u2014 THE PUBS DECLARE RECORD TAKINGS AND ONE MISSING DARTBOARD. FOUR HUNDRED LETTERS OF APOLOGY ARE NOT EXPECTED.",
          "poor": "THE MORNING AFTER \u2014 NORTHGATE STRAGGLERS SURFACED ALL MORNING: TWO IN THE MARKET, ONE IN A SKIP, ONE ENGAGED TO A BARMAID AT THE FEATHERS.",
          "unresolved": "THE MORNING AFTER \u2014 THE LAST OF THE FOOTBALL SPECIAL LEFT ON THE 0840, SINGING. THE HIGH STREET IS BEING SWEPT IN SHIFTS."
        },
        "title": "THE FOOTBALL SPECIAL",
        "startTurn": 3,
        "stages": [
          {
            "id": "football_decant",
            "title": "THE FOOTBALL SPECIAL",
            "text": "The teleprinter clears its throat and delivers the night's first act of God: British Rail regrets that the football special conveying Northgate Wanderers' away support has failed at the junction and been decanted. Four hundred fans, three hours early, on your ground, with one working chip shop and the pubs still open. The Wanderers lost — a disputed penalty, deep in injury time — and the singing coming up the approach road is not the happy kind. Sgt Bream puts down his pools coupon, which he only does for royalty and disasters.",
            "choices": [
              {
                "label": "Walk two crews alongside the column into the borough",
                "result": "Doyle and Hartle fall in beside the column like sheepdogs with a flock that outweighs them forty to one. The fans take it well enough — one offers Doyle a scarf, which he declines, and a meat pie, which he doesn't.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 2,
                  "streets": 2
                },
                "goto": "football_clarence",
                "delay": 1
              },
              {
                "label": "Send Whittle to find the man they all keep glancing at",
                "result": "Every crowd this size has a chairman. Whittle comes back with a name: Big Tommy Legge, scaffolder, top boy of the Northgate end, currently installed in the snug of the Duke of Clarence and — Whittle chooses the word carefully — 'holding court'.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "goto": "football_tommy",
                "delay": 1
              },
              {
                "label": "Let the pubs take the strain and get on with your night",
                "result": "Four hundred thirsts distribute themselves across the patch's licensed premises with the efficiency of water finding a drain. The Duke of Clarence takes the bulk. Its landlord rings the nick to say thank you in words the switchboard declines to log.",
                "effects": {
                  "brass": -4,
                  "streets": -2
                },
                "goto": "football_clarence",
                "delay": 2
              },
              {
                "label": "Ring British Rail and demand the relief train immediately",
                "result": "A man at divisional control promises a relief train 'within the hour', in the tone of a man reading it off a card. You will hear this sentence again tonight. It does not improve with repetition.",
                "effects": {
                  "streets": -3
                },
                "goto": "football_clarence",
                "delay": 2
              }
            ]
          },
          {
            "id": "football_clarence",
            "title": "THE DUKE OF CLARENCE, AT CAPACITY",
            "text": "The Duke of Clarence has passed capacity and kept going, like a lift with the cable cut. Fans are drinking in the yard, on the step, and in one case up a drainpipe. Across the road, outside the Wimpy, the local youth are assembling in that quiet, purposeful way that never precedes anything good. British Rail rings to cancel the relief train and promise another one. Closing time is near, and when it comes, four hundred grieving Northgate men get decanted a second time — onto your high street.",
            "choices": [
              {
                "label": "The big shepherd — every spare body, walk them to the junction",
                "result": "You start emptying the nick. Bream keeps the desk and the cat keeps Bream. Duffin goes ahead to clear the route, and the word goes down the column: we are all going to the junction, gentlemen, and we are going to sing.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "football_shepherd",
                "delay": 1
              },
              {
                "label": "Go and have that pint with Big Tommy Legge",
                "result": "You go in alone, hat under your arm, and the snug goes quiet the way a courtroom does. Tommy Legge is a big man drinking a small mild. He looks you over and says, 'Sit down, Inspector. You'll be the {man} with a train problem.'",
                "effects": {},
                "goto": "football_tommy",
                "delay": 1,
                "risk": {
                  "odds": 55,
                  "failResult": "The snug does not go quiet — it goes loud, four hundred grieving voices settling on the one uniform in the room, and somebody's pint arrives by air. You leave by the yard door wearing most of a light and bitter, and Tommy Legge, who might have talked to a guvnor, has just watched his lads learn they needn't.",
                  "failEffects": {
                    "streets": -6,
                    "relief": -4
                  }
                }
              },
              {
                "label": "Let them stay open past time and pray",
                "result": "You make it known, unofficially, that Thorne Street's watches are running slow tonight. The Clarence pulls pints past closing time like a field hospital. Somewhere in there the singing turns from vengeful to sentimental, which is the sound of a crowd deciding to live.",
                "effects": {
                  "streets": 4,
                  "brass": -9,
                  "relief": 2
                },
                "outcome": "The pubs held them, barely — four hundred fans drank the manor dry, wept over the disputed penalty, and were poured onto a dawn relief train without a window broken. The licensing file on your desk is three inches thick, and the Commander's covering note is one sentence long.",
                "grade": "mixed"
              },
              {
                "label": "Keep your crews close and wait for British Rail's train",
                "result": "You hold what you hold and trust a nationalised industry. The promised train is cancelled with regrets, then promised again with regrets, and outside the Wimpy the locals have begun sharing out the pool cues.",
                "effects": {
                  "streets": -4
                },
                "goto": "football_horses",
                "delay": 1
              }
            ]
          },
          {
            "id": "football_tommy",
            "title": "A PINT WITH BIG TOMMY LEGGE",
            "text": "Big Tommy Legge, scaffolder, of Northgate, occupies the snug like weather occupies a bank holiday. He is, against every expectation the file gave you, a reasonable man. His terms arrive in order: chips for the lads, because grief is hungrier than victory; nobody mentions the score, ever; and a train that actually comes. In return he'll walk his own to the junction personally, singing kept to the sad ones. He puts out a hand the size of a coal shovel and waits to see what kind of guvnor you are.",
            "choices": [
              {
                "label": "Shake it — chips, silence on the score, and lean on British Rail for his train",
                "result": "The handshake costs you a knuckle and a marker — the divisional controller at British Rail owes you nothing after tonight, because you've spent it. Tommy stands on a table and addresses the Clarence in the voice of a foreman calling the end of a shift.",
                "effects": {
                  "favours": -1,
                  "streets": 11,
                  "brass": 3,
                  "relief": 4
                },
                "outcome": "Big Tommy Legge walked four hundred men to the junction in good order, complaints confined to the penalty, and shook hands with Sgt Bream on the way past the nick. The chip shop did the trade of its life. Somewhere upstairs, a memo asks why the night went quiet and declines to believe the answer.",
                "grade": "good"
              },
              {
                "label": "Shake it, but keep two crews strolling the route in case his writ runs short",
                "result": "Tommy notices the crews, because Tommy notices everything, and takes no offence: 'You'd be a mug not to, Inspector.' The column moves with police book-ends and one supervised detour for chips.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 2,
                  "streets": 8,
                  "brass": 5,
                  "relief": 2
                },
                "outcome": "The deal held and the insurance was never needed — though it did let Rossiter's morning summary contain the word 'measures', which keeps everyone happy. Four hundred fans left your ground fed, escorted and singing something slow.",
                "grade": "good"
              },
              {
                "label": "Nick him — form as long as the platform, and he's the head of the snake",
                "result": "He goes quietly, which is somehow worse. Word travels from the snug to the public bar to the street in under a minute, and the singing stops — which any copper who has worked a football crowd will tell you is the bad sound.",
                "effects": {
                  "arrests": 1,
                  "streets": -8,
                  "relief": -3
                },
                "goto": "football_battle",
                "delay": 1
              },
              {
                "label": "Tell him you'll think on it and see how the night runs",
                "result": "Tommy looks at you the way a foreman looks at a lad who's asked for Monday off. 'Suit yourself, Inspector. But I'm one pint past my best, and the lads are three.' His authority is a perishable good, and the night is warm with beer.",
                "effects": {
                  "streets": -4
                },
                "goto": "football_battle",
                "delay": 2
              }
            ]
          },
          {
            "id": "football_shepherd",
            "title": "THE BIG SHEPHERD",
            "text": "It is the biggest single movement of persons this ground has seen since the war, and it is yours. Four hundred Northgate men, six deep, with every officer you could scrape walking the flanks and Duffin at the front like a drum major who has lost his band. The junction is a long way off, the night is cold, and the column wants to sing. What it sings, and which streets hear it, is now the only policing question left.",
            "choices": [
              {
                "label": "The full parade — up the high street, singing, every body you have",
                "result": "The high street gets a spectacle: four hundred voices doing the slow ones, coppers on the flanks in step despite themselves, shopkeepers in doorways, and the locals outside the Wimpy reduced from a mob to an audience. Nobody throws anything at a choir.",
                "effects": {
                  "dispatchUnits": 3,
                  "dispatchTurns": 3,
                  "streets": 14,
                  "brass": 6,
                  "relief": 7
                },
                "outcome": "The big shepherd entered Thorne Street legend before it reached the junction — four hundred fans delivered singing to a relief train that, shamed by an inspector standing on the platform, actually came. The OB entry runs two pages, and Bream writes it like scripture.",
                "grade": "good"
              },
              {
                "label": "The back doubles — past Meakin Salvage and the gasworks, quiet and quick",
                "result": "It is longer, darker and colder, and everybody hates it, including the fans, who feel it as a judgement. But nothing goes through a window, chiefly because the route past Meakin Salvage has no windows.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 3,
                  "streets": 7,
                  "relief": -4
                },
                "outcome": "Four hundred men arrived at the junction cold, sober and resentful, which British Rail's relief train — late, and two carriages short — did nothing to mend. Nothing broke, nobody bled, and no one will ever thank you, which is the Job in one sentence.",
                "grade": "mixed"
              },
              {
                "label": "Point the column at the junction and let it walk itself",
                "result": "A column without shepherds is just a crowd with a bearing. It sheds men at every pub, every chip queue and every unattended milk float, and what arrives at the junction is half the size of what left.",
                "effects": {
                  "streets": -9,
                  "brass": -6
                },
                "outcome": "Perhaps two hundred made the train. The rest bedded into the back streets like shrapnel, and the Early Turn will be finding them for a week — in lock-ups, snooker halls and one allotment shed. The Commander's note asks what, precisely, was the plan. It is a fair question.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "football_horses",
            "title": "GIFT HORSES",
            "text": "British Rail cancels the promised relief train again, with regrets, and promises another, without conviction. The Clarence is under siege from the inside, and the locals outside the Wimpy now number sixty and have found a flag. Then the blower goes: Commander Rossiter, silky, offering Mounted Branch — six horses, on your ground within the half hour. The strings arrive in the same breath: the request must be logged as yours, in writing, which in the Yard's dialect means a Duty Inspector confessing {his} manor got away from {him}.",
            "choices": [
              {
                "label": "Take the horses and wear the paperwork",
                "result": "They come up the high street two abreast, enormous and unhurried, and the physics of the night change. Crowds argue with coppers; nobody argues with a ton of horse. The fans pat them. The locals evaporate.",
                "effects": {
                  "streets": 9,
                  "brass": -8,
                  "relief": 3
                },
                "outcome": "Six horses did what forty men couldn't, and the night died of respectability — fans entrained at the junction, locals home by the small hours. Your signed request for aid sits in a Yard file with your name under the word 'overwhelmed', where Rossiter can visit it whenever he needs cheering up.",
                "grade": "mixed"
              },
              {
                "label": "Decline the horses and walk them to the junction yourself — the big shepherd",
                "result": "'No thank you, sir' is a complete sentence, though not a career-enhancing one. You put the phone down and start emptying the nick instead — if the streets are to be saved, they will be saved on foot, by people who know them.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1,
                  "brass": -3
                },
                "goto": "football_shepherd",
                "delay": 1
              },
              {
                "label": "Lean on the Clarence to stay open, keep them drinking, and pray",
                "result": "The Clarence's landlord, invited to hold four hundred grieving men in a room built for ninety, laughs down the phone until he has to sit. The beer runs out just before the goodwill does.",
                "effects": {
                  "streets": -12,
                  "brass": -10,
                  "relief": -3
                },
                "outcome": "The Clarence ran dry deep in the small hours and delivered its cargo onto the street all at once — angry, thirsty and facing sixty locals with a flag. What followed took every unit you had left and made the Sunday papers. The licensing hearing will be well attended.",
                "grade": "poor"
              },
              {
                "label": "Hold what you hold and wait the train out",
                "result": "You hold. British Rail promises, cancels, and promises again with mounting sorrow, like a suitor who has no intention of marrying. The gap between the Clarence and the Wimpy narrows by the minute, and somebody has started selling chips off a barrow to both sides.",
                "effects": {
                  "streets": -6
                },
                "goto": "football_battle",
                "delay": 1
              }
            ]
          },
          {
            "id": "football_battle",
            "title": "THE BATTLE OF THE HIGH STREET",
            "text": "It goes the way these things go: one thrown chip, tribally attributed, and then everyone is running. Four hundred Northgate men and every local with a grievance meet along the length of the high street, with the chip shop, the Wimpy and the Clarence's remaining windows in between. Bream comes through on every channel with the calm of a shipping forecast. There is no version of this you win, guvnor. There are only sizes of losing.",
            "choices": [
              {
                "label": "Everything left in the nick — wedge the high street and take the middle",
                "result": "Twenty minutes of shield-less, helmet-losing, seam-splitting police work of the old kind. The line holds at the Wimpy, buckles at the chip barrow, and holds again. Hartle nicks three men with one set of cuffs, a piece of arithmetic the charge room will discuss for years.",
                "effects": {
                  "dispatchUnits": 3,
                  "dispatchTurns": 3,
                  "arrests": 3,
                  "streets": 5,
                  "brass": -5,
                  "relief": -6
                },
                "outcome": "The high street was retaken shop by shop, and the cost is written in helmets, windows and overtime — the cells full, two officers on the sick list, and the chip barrow a total loss. Rossiter's memo calls it 'a firm response to disorder', which everyone understands to mean 'never again'.",
                "grade": "mixed"
              },
              {
                "label": "Swallow it and beg the Yard for the horses now",
                "result": "Rossiter takes your call, lets the silence do the work, and says 'Of course, Inspector' with terrible kindness. The horses arrive mid-battle and end it in four minutes, the way weather ends a garden party.",
                "effects": {
                  "favours": -1,
                  "arrests": 2,
                  "streets": 7,
                  "brass": -11,
                  "relief": 2
                },
                "outcome": "Mounted Branch cleared the high street before the worst of it, and the bill arrived with the dawn: your name on an aid request timed after the fighting started, which is the Yard's favourite kind. Rossiter has practically framed it. The division, at least, is intact — mostly.",
                "grade": "mixed"
              },
              {
                "label": "Fall back to the nick, hold the bridge, and let it burn itself out",
                "result": "You save your people and spend your ground. From the nick steps you can hear the high street settling its differences the old way, and Duffin, unasked, begins boarding the front windows with the sad competence of a man who has done it before.",
                "effects": {
                  "streets": -14,
                  "brass": -9,
                  "relief": -5
                },
                "outcome": "The high street fought itself to a standstill somewhere towards dawn and presented the bill to the morning: forty broken windows, the chip shop gutted, and a manor that watched the Old Bill watch it happen. The Wanderers, at least, got their train. Nobody sang.",
                "grade": "poor"
              }
            ]
          }
        ],
        "unresolvedOutcome": "Four hundred Northgate supporters greeted the dawn on your high street, still waiting for a train British Rail now denies ever existed; the Early Turn inherited them one chorus at a time."
      },
      {
        "id": "absconder",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 GEORGIE SPARROW BACK IN THE SCRUBS BY BREAKFAST, WAVING FROM THE VAN LIKE ROYALTY. HIS MOTHER HAS SENT THE DESK A CAKE.",
          "mixed": "THE MORNING AFTER \u2014 SPARROW WENT QUIETLY, BUT THE ALHAMBRA JOB RIDES WITH HIM. HIS BRIEF IS ALREADY CALLING THE TEAPOT ENTRAPMENT.",
          "poor": "THE MORNING AFTER \u2014 MRS SPARROW'S DOOR IS ON THE COUNCIL'S LIST AND THE SQUAD'S PHOTOGRAPH IS ON PAGE THREE. HER STREET HAS STOPPED TALKING TO US.",
          "unresolved": "THE MORNING AFTER \u2014 GEORGIE SPARROW STILL OUT, LAST SEEN IN A BLACK TIE. SOMEBODY GETS MARRIED TODAY, AND THE SCRUBS CAN COUNT."
        },
        "title": "THE ABSCONDER",
        "startTurn": 4,
        "stages": [
          {
            "id": "absconder_wire",
            "title": "OVER THE WALL — GEORGIE SPARROW",
            "text": "The teleprinter delivers it with its usual tact: GEORGE ARTHUR SPARROW, 34, absconded HMP Wormwood Scrubs in a laundry van, believed headed for your manor. Believed, nothing — half the front desk queue has already seen him, and his mum on Jubilee Street has the kettle on. The evening paper says DANGEROUS FUGITIVE, which will surprise anyone who's met him: Georgie cracks safes like a surgeon and has never raised his voice, let alone a fist. The Flying Squad are reportedly 'very keen'. Your snouts say he's only home for his nan's funeral in the morning.",
            "choices": [
              {
                "label": "Slide a panda past Jubilee Street, softly",
                "result": "Whittle parks the panda two streets off and strolls past with his helmet under his arm, fooling nobody. Net curtains twitch in salute. There's a light in Mrs Sparrow's kitchen and washing-up steam on the glass.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "absconder_kitchen",
                "delay": 1
              },
              {
                "label": "Ring the Flying Squad — regulation says it's theirs",
                "result": "The Squad office answers on half a ring, which tells you everything about their Friday. 'Sparrow? Lovely,' says a voice already reaching for its coat.",
                "effects": {
                  "brass": 3
                },
                "goto": "absconder_squad",
                "delay": 1
              },
              {
                "label": "Take the call from his brief that Bream keeps waving at you",
                "result": "Mr Loomis, of Loomis & Croft, speaks in the measured tones of a man who bills by the hour even at this hour. His client, he says, wishes to discuss 'an orderly arrangement'.",
                "effects": {},
                "goto": "absconder_brief",
                "delay": 1
              },
              {
                "label": "The Scrubs lost him; the Scrubs can find him",
                "result": "You file the telex under Pending and return to the night's log. Somewhere out on the ground, a man with the gentlest hands in London finds himself entirely unsupervised.",
                "effects": {
                  "brass": -3
                },
                "goto": "absconder_peterman",
                "delay": 3
              }
            ]
          },
          {
            "id": "absconder_kitchen",
            "title": "THE KITCHEN OBBO",
            "text": "Whittle's report comes in over the radio at a discreet murmur. Georgie Sparrow is in his mum's kitchen doing the washing-up in rolled shirtsleeves, wearing the pinny his nan bought him. Mrs Sparrow has put out the good biscuits. Half of Jubilee Street knows he's home and the other half is round having a cup of tea. He's watched the panda go by twice; Whittle swears he waved. No man was ever less on the run. The evening paper's late edition, meanwhile, has him ARMED AND DESPERATE.",
            "choices": [
              {
                "label": "Two PCs, the back gate, and let his mum pour",
                "result": "Duffin knocks; Mrs Sparrow says 'You'll want tea,' and it isn't a question. Georgie finishes drying the cups, puts his jacket on and offers his wrists like a gent presenting cufflinks. Not a raised voice on the whole street.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 1,
                  "arrests": 1,
                  "streets": 7,
                  "relief": 9,
                  "brass": -8
                },
                "outcome": "Georgie Sparrow lifted over a pot of tea with the whole street approving — the Flying Squad are calling it 'interference with a Squad operation', which is one name for good manners.",
                "grade": "good"
              },
              {
                "label": "Leave Whittle where he is and hear what his brief is offering",
                "result": "Whittle settles in with a flask and a view of the pinny. On the telephone, Mr Loomis of Loomis & Croft clears his throat like a man producing a contract from a waistcoat.",
                "effects": {},
                "goto": "absconder_brief",
                "delay": 1
              },
              {
                "label": "Give the Squad the address and step well back",
                "result": "You read the address down the phone and hear it being underlined, twice, with relish. On the far side of the river, something heavy starts a cold engine.",
                "effects": {
                  "brass": 4,
                  "streets": -2
                },
                "goto": "absconder_squad",
                "delay": 1
              },
              {
                "label": "Stand Whittle down — the funeral will keep him put",
                "result": "Whittle comes in frozen and unconvinced. 'He waved, guv,' he says, as if that settles something. In a way you'll discover shortly, it doesn't.",
                "effects": {
                  "relief": -2
                },
                "goto": "absconder_peterman",
                "delay": 2
              }
            ]
          },
          {
            "id": "absconder_brief",
            "title": "AN APPOINTMENT IS PROPOSED",
            "text": "Mr Loomis of Loomis & Croft attends the front desk in person, homburg in hand, and lays out terms like a man selling a very reasonable funeral plan — which, in a sense, he is. His client will surrender, by appointment, at first light: shaved, sober, carrying his own toothbrush. One condition. Georgie attends his nan's funeral first — cuffed, supervised, dignified. Doyle has already volunteered; the old lady used to keep barley sugars for the beat lads. Bream observes that the charge book has seen stranger entries, though not many kinder ones.",
            "choices": [
              {
                "label": "Shake on it — dawn surrender, Doyle takes the funeral detail",
                "result": "Loomis produces paperwork already drafted, which is briefs for you. You square the arrangement with a magistrate who owes you one, and Bream enters it in the OB under 'miscellaneous'.",
                "effects": {
                  "favours": -1,
                  "arrests": 1,
                  "streets": 8,
                  "relief": 10,
                  "brass": -6
                },
                "outcome": "The appointment held: Georgie surrendered at first light in his best suit, buried his nan cuffed to Doyle, and the borough decided the Old Bill might be human after all — a rumour the Flying Squad is working hard to correct.",
                "grade": "good"
              },
              {
                "label": "Agree — but keep it off the books till it's done",
                "result": "Nothing on paper, nothing on the wire, and Loomis leaves by the side door. Trouble is, the Squad pays retainers to half the minicab drivers in the borough, and Loomis came by minicab.",
                "effects": {},
                "goto": "absconder_standoff",
                "delay": 2
              },
              {
                "label": "No deals with briefs — the Met doesn't book appointments",
                "result": "Loomis replaces his homburg with terrible courtesy. 'Then my client remains at large, Inspector, at his own recognisance.' Bream watches him go and quietly loses a shilling to Duffin.",
                "effects": {
                  "brass": 2,
                  "relief": -4
                },
                "goto": "absconder_peterman",
                "delay": 2
              },
              {
                "label": "String Loomis along while the Squad gets into position",
                "result": "You keep Loomis discussing arrangements you've no intention of honouring while, across the river, sledgehammers are loaded into a Transit with something like affection.",
                "effects": {
                  "brass": 5,
                  "relief": -5
                },
                "goto": "absconder_squad",
                "delay": 1,
                "risk": {
                  "odds": 50,
                  "failResult": "Loomis stops mid-sentence, looks at you the way a man checks his change, and replaces his homburg: 'I see we are wasting each other's evening, Inspector.' By the time the Transit turns into Jubilee Street the kitchen light is off, the suitcase is gone, and Georgie is at large with a grievance he didn't have an hour ago.",
                  "failEffects": {
                    "brass": -6,
                    "streets": -5
                  }
                }
              }
            ]
          },
          {
            "id": "absconder_squad",
            "title": "THE SQUAD ARRIVES MOB-HANDED",
            "text": "The Flying Squad arrives the way it always does: four cars, one dog van, and a DI named Critchley wearing driving gloves indoors. He's brought a sledgehammer called Doris and, by remarkable coincidence, a BBC camera crew who 'happened to be passing'. The plan is the front door of a sixty-year-old widow at no notice, for a safe-cracker who has never so much as slammed one. 'Public confidence, Inspector,' says Critchley, straightening his gloves. Jubilee Street's curtains are already twitching; Georgie's mum has put the kettle on regardless.",
            "choices": [
              {
                "label": "Stand back and let them have their television",
                "result": "Doris makes short work of a door that was, as it happens, unlocked. Georgie comes out with his hands up and a look of genuine professional embarrassment at the state of the hinges.",
                "effects": {
                  "brass": 9,
                  "streets": -8,
                  "relief": -7
                },
                "outcome": "The Squad took Mrs Sparrow's door off its hinges for the cameras and found Georgie waiting on the settee with his coat on — upstairs is delighted, and Jubilee Street will remember it for twenty years, which is rather longer than upstairs will.",
                "grade": "poor"
              },
              {
                "label": "Your ground, your knock — send two of yours in first",
                "result": "Duffin and Whittle go in through the kitchen while Critchley is still positioning his cameraman. Georgie greets them by name and asks after Regan the station cat.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 1,
                  "arrests": 1,
                  "streets": 5,
                  "relief": 8,
                  "brass": -10
                },
                "outcome": "Your lads brought Georgie out mid-teacup before Doris got her moment — the collar is Thorne Street's, the cameras got nothing, and DI Critchley's complaint reached the Yard before you'd finished the biscuits.",
                "grade": "good"
              },
              {
                "label": "One call to the Yard — get their leash pulled",
                "result": "Ten minutes of murmured diplomacy and Critchley's radio makes a noise that visibly ages him. The convoy withdraws, Doris unswung, and Loomis rings to confirm his client will attend at first light.",
                "effects": {
                  "favours": -1,
                  "arrests": 1,
                  "streets": 6,
                  "relief": 5,
                  "brass": -4
                },
                "outcome": "The Squad was recalled mid-deployment by a voice it couldn't argue with, and Georgie came in quietly at first light by arrangement — a result so tidy that everyone upstairs assumes you fixed it, which you did.",
                "grade": "good"
              },
              {
                "label": "Argue jurisdiction on the pavement till everyone's cold",
                "result": "You and Critchley conduct a full and frank exchange of paperwork in the middle of the road. Absorbing stuff. Absorbing enough that nobody is actually watching the back of the house.",
                "effects": {
                  "brass": -5,
                  "streets": -2
                },
                "goto": "absconder_peterman",
                "delay": 2
              }
            ]
          },
          {
            "id": "absconder_peterman",
            "title": "ONE FOR THE ROAD",
            "text": "The manager of the Alhambra Bingo Hall reports his office safe open and the night's takings gone — no marks, no damage, the combination lock left, he says, 'running smoother than it has in years'. There's a washed cup and saucer on the draining board. Nobody was hunting Georgie Sparrow tonight, and Georgie, waiting on a funeral with idle hands, has kept them in practice. The late editions will make it a crime wave by morning, the Squad now has its mandate, and every kind option you had has quietly gone up in price.",
            "choices": [
              {
                "label": "The kitchen lift, quick, before the Squad wakes up",
                "result": "Duffin knocks; the tea is poured; Georgie comes quietly, apologising, obscurely, about the bingo. The Alhambra's takings turn up intact in a left-luggage locker, the ticket posted to the nick first class.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 1,
                  "arrests": 1,
                  "streets": 4,
                  "relief": 4,
                  "brass": -7
                },
                "outcome": "You got him over the teapot after all — but with the Alhambra job fresh on the sheet the papers called it 'belated', the Squad called it theirs, and the returned takings helped nobody's paperwork.",
                "grade": "mixed"
              },
              {
                "label": "Give it to the Squad — it's their kind of morning now",
                "result": "Critchley receives the Alhambra news like a man handed a search warrant for Christmas. Doris rides up front. The camera crew, this time, was invited in writing.",
                "effects": {
                  "brass": 6,
                  "streets": -7,
                  "relief": -6
                },
                "outcome": "The Squad had the door, the dog van and the cameras, Mrs Sparrow had the broken hinges, and by the time the funeral cars rolled past the wreckage nobody on Jubilee Street was waving at pandas any more.",
                "grade": "poor"
              },
              {
                "label": "Ring Loomis — the appointment stands, but the price went up",
                "result": "Loomis, roused and reproachful, concedes his client has been 'regrettably industrious'. Terms are re-drafted at the desk; Bream witnesses; a magistrate who owes you one stops owing you one.",
                "effects": {
                  "favours": -1,
                  "arrests": 1,
                  "streets": 5,
                  "relief": 6,
                  "brass": -9
                },
                "outcome": "Georgie still came in at first light, toothbrush and all, and buried his nan cuffed to Doyle — but squaring an appointment surrender with a fresh safe job on the books cost you the favour, the argument, and most of upstairs' remaining patience.",
                "grade": "mixed"
              },
              {
                "label": "Enter it in the book and bequeath him to the Early Turn",
                "result": "You record the Alhambra job in a fair round hand and leave the rest to providence and the day inspector, in that order of reliability.",
                "effects": {
                  "streets": -6,
                  "brass": -6,
                  "relief": -3
                },
                "outcome": "Georgie attended the funeral unfetched, wept decently, and was gone before the sandwiches — the Scrubs' problem once more, except the occurrence book records exactly how long he was yours first.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "absconder_standoff",
            "title": "SLEDGEHAMMERS ON JUBILEE STREET",
            "text": "The arrangement was off the books, which is precisely where the Flying Squad does its best reading. Hours before Georgie is due to walk into the nick of his own accord, four Squad cars slide into Jubilee Street and DI Critchley starts deploying men with hand signals he learned off the pictures. In the kitchen, Georgie's packed suitcase sits by the door; his mum is frying him a send-off regardless of the hour. Doyle, pressed and polished for the funeral detail, looks at you. One street, two plans, and a sledgehammer named Doris.",
            "choices": [
              {
                "label": "Stand in the road — your manor, your prisoner, your appointment",
                "result": "You plant yourself between Doris and the door and quote station boundaries at Critchley until he goes the colour of corned beef. Behind you, Georgie emerges carrying his own suitcase and thanks everyone for their patience.",
                "effects": {
                  "arrests": 1,
                  "streets": 7,
                  "relief": 11,
                  "brass": -12
                },
                "outcome": "You faced down the Flying Squad in the middle of Jubilee Street and the appointment held — Georgie surrendered as promised, buried his nan cuffed to Doyle, and Critchley's complaint runs to three typed pages, every one of them worth it.",
                "grade": "good",
                "sets": "squad_grudge"
              },
              {
                "label": "Spend the marker — have the Yard call them home",
                "result": "One telephone call from Mrs Sparrow's hallway — she holds your tea while you dial — and Critchley's radio recalls him in a voice that brooks no argument. The convoy leaves; the suitcase stays.",
                "effects": {
                  "favours": -1,
                  "arrests": 1,
                  "streets": 8,
                  "relief": 8,
                  "brass": -3
                },
                "outcome": "A murmured word at the Yard turned the convoy round mid-street; Georgie came in exactly as arranged, the funeral went ahead with Doyle at his wrist, and the only casualty was a favour you may want back someday.",
                "grade": "good"
              },
              {
                "label": "Step aside — you were never officially here",
                "result": "Doris gets her moment. Georgie, who was reaching for the latch to let them in, takes the door on the shoulder and goes quietly anyway, because he was always going quietly.",
                "effects": {
                  "brass": 7,
                  "streets": -7,
                  "relief": -9
                },
                "outcome": "The door came off after all, the appointment died in the wreckage, and Doyle attended the funeral anyway, on his own time, standing at the back — which says everything the report leaves out.",
                "grade": "poor"
              }
            ]
          }
        ],
        "unresolvedOutcome": "Georgie Sparrow was still at large at six — last seen, says the milkman, in a black tie, walking towards the flower stall; the Flying Squad’s dawn raid found only a warm teapot."
      },
      {
        "id": "ufo",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 THE PAVILION EXHIBITION DRAWS A STEADY CROWD: SCHEDULE, CHIT AND MAP UNDER GLASS. THE CIRCLE HAS ADDED A CORRECTIONS PAGE.",
          "mixed": "THE MORNING AFTER \u2014 THE REC KEEPS ITS MYSTERY AND ITS CHESTNUT MAN. THURSDAY'S WATCH IS OVERSUBSCRIBED; BRING YOUR OWN DECKCHAIR.",
          "poor": "THE MORNING AFTER \u2014 THE REC IS ROPED OFF AND NOBODY WILL SAY WHY IN WRITING. THE TORCH IN THE PROPERTY STORE HAS BEEN MOVED TO A HIGHER SHELF.",
          "unresolved": "THE MORNING AFTER \u2014 THE FILE ON THE REC HOLDS AT ONE PAGE, MARKED METEOROLOGICAL. THE DOGS ON CORPORATION ROW HAVE NOT SETTLED."
        },
        "title": "THE LIGHTS OVER THE REC",
        "startTurn": 4,
        "gradeFlags": {
          "poor": "flag_pc_abducted"
        },
        "unresolvedOutcome": "The lights over the recreation ground were never explained and never officially admitted, and the file — one page, no conclusions — is held at Division under 'meteorological'. The Anomalous Phenomena Circle still keeps a Thursday watch on the rise, with a thermos rota, and the manor has learned not to ask them how it's going.",
        "stages": [
          {
            "id": "ufo_calls",
            "title": "SWITCHBOARD — LIGHTS OVER THE RECREATION GROUND",
            "text": "Eleven calls in twenty minutes, and the switchboard girls have stopped smiling about it. Three amber lights over the recreation ground, low, silent, moving — as one caller puts it — 'like they meant it'. The callers include a bus inspector, two night workers, and Mrs Grigson, who is precise, unexcitable, and therefore the worst news on the list. The gasworks, telephoned, deny flaring tonight in a voice that would rather not be asked twice.",
            "choices": [
              {
                "label": "Send PC Doyle up the rec for a policeman's look",
                "result": "PC Doyle reports from the box by the pavilion: the lights were gone before he topped the rise, the grass at the crown of the hill is pressed down in a wide ring — 'polite-like', his word — and his torch has twice flickered in a manner he is prepared to discuss only in person.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "goto": "ufo_crowd",
                "delay": 1
              },
              {
                "label": "Log it: aircraft, weather, or the gasworks being modest",
                "result": "Eleven callers receive the official position with eleven degrees of scorn. The switchboard settles into a low hum of dissatisfaction, and the bus inspector rings back to say that in thirty years on the late routes he has seen every aircraft there is, 'and that,' he says, 'was not one.'",
                "effects": {},
                "goto": "ufo_crowd",
                "delay": 1
              },
              {
                "label": "Ring the Air Ministry night desk for traffic",
                "result": "The RAF confirms nothing on radar between the coast and Northolt, in the practised tone of men who have answered this telephone before, and enters your enquiry in a log which they volunteer, unprompted, is 'thicker than you'd hope'.",
                "effects": {
                  "brass": -1
                },
                "goto": "ufo_crowd",
                "delay": 1
              }
            ]
          },
          {
            "id": "ufo_crowd",
            "title": "THE REC AT MIDNIGHT — THERMOS COUNTRY",
            "text": "Word has travelled at the speed of the saloon bar, and the recreation ground now holds forty people in deckchairs, a chestnut brazier doing serious trade, and the South London chapter of the Anomalous Phenomena Circle — five members, matching anoraks, a tape recorder and a discipline that would flatter most regiments. Children who should long be in bed are being held up to see. The sky, for its part, is currently declining to perform.",
            "choices": [
              {
                "label": "Police it like a fair — two hands, good humour",
                "result": "Two officers walk the deckchair lines keeping the brazier and the blankets apart, and the night takes on the temper of a well-run beano. The Circle's chairman thanks the Force for 'facilitating the vigil' and issues both officers with observation cards, which they solemnly complete.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 1,
                  "streets": 1
                },
                "goto": "ufo_return",
                "delay": 1
              },
              {
                "label": "Let the sky mind its own business — beat men drift past",
                "result": "The rec is left to govern itself, which it does in the British manner: a queue forms at the brazier, somebody starts a singsong, and the Circle logs 'no anomalous activity, high public interest' at fifteen-minute intervals in a hand that never wavers.",
                "effects": {
                  "relief": 1
                },
                "goto": "ufo_return",
                "delay": 1
              },
              {
                "label": "Clear the rec — council land, midnight, out",
                "result": "Moving on the hopeful is no better a manoeuvre than moving on the devout. The crowd withdraws at glacier pace to the allotment fence, where it re-forms facing the rise, now with the added grievance of a principle, and the Circle's log acquires the entry 'obstruction by authority'.",
                "effects": {
                  "streets": 2,
                  "relief": -2
                },
                "goto": "ufo_press",
                "delay": 1
              }
            ]
          },
          {
            "id": "ufo_press",
            "title": "THE CHRONICLE AND THE GROUP CAPTAIN",
            "text": "The Chronicle's stringer has found the story, and worse, has found Group Captain Brice, RAF (retired), of the Gables, who has declared the sighting 'classic — a textbook Warminster pattern' to anyone with a notebook. The stringer wants a police position by two o'clock. The Group Captain wants official liaison. The Circle wants the Group Captain to stop giving interviews on ground they surveyed first, and feelings between the two schools are running high by the pavilion.",
            "choices": [
              {
                "label": "Give the press the gasworks line, firmly, on paper",
                "result": "A statement is issued attributing the lights to 'industrial venting, refracted' — wording the Gas Board declines to confirm but cannot dignify with a denial. The stringer files it under protest, marking the quote 'police source, unconvinced by own statement'.",
                "effects": {
                  "brass": 1
                },
                "goto": "ufo_return",
                "delay": 1
              },
              {
                "label": "No comment — the Force does not do astronomy",
                "result": "The refusal is issued with a courtesy that leaves nothing to quote. The stringer, robbed of a police angle, files six paragraphs of Group Captain instead, which serves the Group Captain right.",
                "effects": {},
                "goto": "ufo_return",
                "delay": 1
              },
              {
                "label": "Deputise enthusiasm — put the Group Captain on the case",
                "result": "The Group Captain accepts the commission with terrifying energy, organises Circle and crowd alike into observation shifts with a tea rota and a reporting form of his own design, and the rec becomes, by half past one, the best-administered field station in the northern hemisphere.",
                "effects": {
                  "relief": 2
                },
                "risk": {
                  "odds": 55,
                  "failResult": "The Group Captain's first act as honorary liaison is to inform the Chronicle that the Metropolitan Police have 'requested RAF coordination', which is true in no particular and headline in every one. YARD CALLS IN AIR FORCE OVER REC LIGHTS is being set by two.",
                  "failGoto": "ufo_night"
                },
                "goto": "ufo_return",
                "delay": 1
              }
            ]
          },
          {
            "id": "ufo_return",
            "title": "THE LIGHTS COME BACK",
            "text": "At ten to two the singing stops mid-verse. Three amber lights, low over the gasworks end of the rec, holding station in a line — then moving, slowly, with what forty witnesses will independently describe as intent. Every dog on Corporation Row is howling. The Circle's tape recorder captures a hum 'like a wet finger on glass, but patient'. The beat man on the pavilion phone, a steady enough hand by daylight, requests 'instructions, or company — in that order or the other one'.",
            "choices": [
              {
                "label": "Go up yourself with the beat man — police eyes on it",
                "result": "You climb the rise together, torches down, and stand in the ring of pressed grass while the lights hold their line beyond the gasworks. What you see, you see. What you will write is another matter, and both of you know it before the lights slide east and go out like a held breath released.",
                "effects": {},
                "goto": "ufo_solve",
                "delay": 1
              },
              {
                "label": "Send PC Doyle up the rise for a closer look — he's steady",
                "result": "PC Doyle goes up the rise at a walk, torch steady, forty people and one tape recorder holding their breath behind him. From the crown of the hill his light shows once, twice — a signal you never agreed — and the amber lights, for one long moment, appear to consider him.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "ufo_solve",
                "delay": 1
              },
              {
                "label": "Full sweep — every hand, lamps on, walk the lights down",
                "result": "A line of lamps advances up the recreation ground like a search for a lost child, which in every way that matters is what it is. The amber lights withdraw before the line at a fixed distance, precise as a rule, and are over the river and gone before the sweep crests the rise.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 1,
                  "streets": -1
                },
                "risk": {
                  "odds": 50,
                  "failResult": "Half the sweep's lamps fail on the rise — batteries, the sensible say, and say it quickly — and the line comes down off the hill faster and quieter than it went up. The crowd reads the retreat fluently. By morning the manor believes, and the Chronicle knows it believes.",
                  "failGoto": "ufo_night"
                },
                "goto": "ufo_solve",
                "delay": 1
              }
            ]
          },
          {
            "id": "ufo_solve",
            "title": "WHAT THE NIGHT WAS MADE OF",
            "notBefore": 10,
            "text": "By four o'clock the pieces are on your desk, for those who want pieces: a Gas Board venting schedule two days out of date, a Meteorological Office balloon chit with a track that argues, and the chestnut man's brazier throwing amber on the low cloud whenever the wind leant south. Together they cover nearly everything. Nearly. The ring of pressed grass at the crown of the rise is not on anybody's schedule, and the Circle's tape, played back in the front office at low volume, empties the room without anyone agreeing to leave.",
            "choices": [
              {
                "label": "Lay it out at dawn — schedule, chit and map on the pavilion wall",
                "result": "The explanation is posted where the deckchairs stood, with the documents pinned under glass like a small municipal exhibition. It holds for the bus inspector, for the Chronicle, and for the district at large, which wanted its sleep back. The Circle thank you, without irony, for 'the cover story', and resume Thursdays.",
                "effects": {
                  "streets": 3,
                  "brass": 2
                },
                "outcome": "The lights over the rec were officially a coincidence of venting, weather and chestnuts, and the file closed in time for the morning papers to lose interest. The ring in the grass grew out by spring. The tape is in the property store, and nobody has ever borrowed it twice.",
                "grade": "good"
              },
              {
                "label": "Stake out the ring till dawn with the Circle's recorder",
                "result": "You sit the last two hours on the rise with the tape running and the Circle's chairman beside you, both flasks going, and watch the sky do nothing with tremendous conviction. At first light the gasworks vents, the cloud catches amber, and the chairman shakes your hand: 'that's our lights — and it wasn't them last night, and we both know it.'",
                "effects": {
                  "relief": 2
                },
                "risk": {
                  "odds": 45,
                  "failResult": "At twenty past four the recorder's reels stop dead with both batteries showing full, and the hum comes again — closer, and patient — and the chairman of the Anomalous Phenomena Circle, fourteen years on the Thursday watch, is the first of the two of you off the hill.",
                  "failGoto": "ufo_night"
                },
                "outcome": "The dawn stake-out gave the gasworks explanation a witness of unimpeachable bias, and the Circle's own log now reads 'RESOLVED — TERRESTRIAL, PROBABLY' in the chairman's steadiest hand. The 'probably' was the price of his signature, and cheap at that.",
                "grade": "good"
              },
              {
                "label": "Let the mystery stand — the manor could use one",
                "result": "No statement is issued, no exhibition mounted. The rec keeps its ring and its story, the chestnut man doubles his pitch for a fortnight, and the manor acquires the small warm glow of a place where something might have happened — which, on the file as written, it might.",
                "effects": {
                  "relief": 2,
                  "streets": 2
                },
                "outcome": "The lights were never explained because nobody with the schedule and the chit chose to explain them, and the borough is quietly the richer for it. Division's file holds one page and the word 'meteorological'. The Circle's Thursday watch has a waiting list now, and brings its own urn.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "ufo_night",
            "title": "THE NIGHT DOES NOT EXPLAIN ITSELF",
            "text": "It is coming apart. The crowd at the allotment fence has doubled and stopped singing; the Chronicle's stringer is dictating from the pavilion phone with his hat off; the Group Captain and the Circle have made common cause, which frightens everyone; and at twenty to five the lights come a third time — lower, over the rise itself, above the ring of pressed grass, holding. Forty-one adults and one police force are looking at the same thing, and the thing is looking back.",
            "choices": [
              {
                "label": "Hold the ground till dawn — let daylight do the arguing",
                "result": "You put the line at the fence and hold it, facing the rise, and give the night nothing but patience. At six minutes past five the lights climb, dim, and are gone into the greying east, and the crowd disperses backwards, nobody quite turning their back on the hill until the streetlamps go out.",
                "effects": {
                  "streets": 2
                },
                "outcome": "The third visitation ended at dawn with nothing lost but sleep, and the story ran out of night to grow in. LIGHTS OVER SOUTH LONDON: WATCHERS DISPERSE ran below the fold, beaten by the fish prices. The file is open. The Thursday watch continues. Nobody at Thorne Street walks the rec alone, and nobody will say so.",
                "grade": "mixed"
              },
              {
                "label": "Somebody must look them in the light — send PC Doyle up",
                "result": "PC Doyle goes up the rise a second time at a walk, torch steady, because somebody must and he is the steadiest you have. At the crown of the hill his torch stops. The lights dip once — precisely, all three, the way a thing acknowledges a thing — and go out. The hum runs off the tape. The hill, when the line reaches it at a run, holds a ring of pressed grass and a torch standing upright in the middle of it, still burning.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "outcome": "PC Doyle was not at six o'clock parade, and was not at the section house, and was not anywhere the Force looks when it looks hard. The Yard's assessment, delivered by second post, rules the matter 'one for local management' — and declines, in four paragraphs of masterly abstention, to define the matter. His torch is in the property store, and it was still burning at noon.",
                "grade": "poor"
              },
              {
                "label": "Spend a marker — the Chronicle runs it as GASWORKS",
                "result": "One call to the night editor who owes the nick his quietest year, and the morning edition carries GASWORKS FLARE ALARMS FORTY on page nine, mostly bus prices thereafter. The stringer takes the spike with the grace of a man adding it to an account he intends, someday, to present.",
                "effects": {
                  "favours": -1,
                  "streets": 3
                },
                "outcome": "The story died on page nine and the crowd thinned with the coverage, as crowds do. What the forty-one saw at twenty to five they now tell only at home, quietly, and the manor has divided — permanently, and along no line the census recognises — into those who were at the fence that night and those who were not.",
                "grade": "mixed"
              }
            ]
          }
        ]
      },
      {
        "id": "president",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 THREE HUNDRED LEYLAND BUSES SIGNED FOR AT TEN. ZUBROVIAN STATE RADIO IS PLAYING KNEES UP MOTHER BROWN AT INTERVALS.",
          "mixed": "THE MORNING AFTER \u2014 THE STATE VISIT CONCLUDED WITHOUT INCIDENT, SAYS THE BULLETIN, IN THE TONE OF A DRAW AWAY FROM HOME.",
          "poor": "THE MORNING AFTER \u2014 PRESIDENT LOOSE IN LONDON RUNS TO A SECOND EDITION. NO 10'S DISPLEASURE HAS REACHED DIVISION AND IS DESCENDING.",
          "unresolved": "THE MORNING AFTER \u2014 THE EMBASSY RECOVERED ITS PRESIDENT AT HALF PAST SEVEN, DELIGHTED. SPECIAL BRANCH'S REPORT RUNS ELEVEN PAGES; WE ARE ON NINE."
        },
        "title": "THE STATE VISIT",
        "startTurn": 2,
        "gradeFlags": {
          "good": "flag_president_grateful"
        },
        "unresolvedOutcome": "President Bazhek of Zubrovia was still somewhere on the manor when the Early Turn paraded, wearing a porter's cap and, by one account, directing traffic. He was recovered by his own embassy at half past seven, delighted. Special Branch's report runs to eleven pages; Thorne Street appears on nine of them, never favourably.",
        "stages": [
          {
            "id": "president_call",
            "title": "SPECIAL BRANCH BY SCRAMBLER — THE GUEST",
            "text": "DS Mullard of Special Branch is at the front desk with a letter on Downing Street paper and the face of a man carrying a bomb. President Miro Bazhek of the People's Republic of Zubrovia — state visit, day two, three hundred Leyland buses hanging on his signature — has cancelled the opera. He wants, the interpreter renders it, 'a real London night: no flags, no speeches, no white gloves.' Somebody at the Yard has chosen your manor as authentic but containable, and No 10 has agreed, and the grey Rover arrives at eleven with the President, his bodyguard Major Osk, the interpreter Miss Vadas, and Mullard's whole career.",
            "choices": [
              {
                "label": "Walk it yourself — the guvnor shows the manor to the guest",
                "result": "You meet the Rover at the corner in a mackintosh over the uniform. The President looks you up and down, says something short in Zubrovian, and Miss Vadas translates with visible relief: 'he says — at last, a {man} whose town it is.'",
                "effects": {
                  "streets": -1
                },
                "goto": "president_feathers",
                "delay": 1
              },
              {
                "label": "Give him PC Duffin and the beat he'd trust his mother on",
                "result": "PC Duffin receives the assignment with the expression of a man told to mind a lit firework, and takes to it inside five minutes. The President walks the beat beside him asking what everything costs and writing the answers in a little book.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "president_feathers",
                "delay": 1
              },
              {
                "label": "Refuse the circus — the borough is not a zoo. Ring No 10 back.",
                "result": "You decline, in writing, with reasons. The silence from the other end of the scrambler has texture to it.",
                "effects": {
                  "brass": -2,
                  "streets": 2
                },
                "outcome": "The night went to the neighbouring division instead, whose high street ate the presidential party inside the hour — the story made the continental papers, the buses hung unsigned for a month, and Thorne Street's name stayed out of everything. Which was the choice, and it was a choice.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "president_feathers",
            "title": "THE FEATHERS AT CLOSING — THE ROUND OF THE CENTURY",
            "text": "The President of Zubrovia is in the public bar of the Feathers in a borrowed donkey jacket, and he has bought the house a round. He has arm-wrestled Chalky the coalman to an honourable draw, been adopted by the darts team, and asked Miss Vadas to explain the sign — 'Free House: free of what?' — a question the bar is now debating with real feeling. Major Osk stands at the door approving of everything. DS Mullard has aged. The landlord, ringing the ten-minute bell, wants only to know who exactly is paying.",
            "choices": [
              {
                "label": "Let it run to time — call it diplomacy and mean it",
                "result": "The last quarter hour of lawful drinking proceeds at treaty level. The darts team presents the President with a spare flight set; he presents Chalky with a Zubrovian medal, small but apparently real; and the bell goes on a room that empties singing.",
                "effects": {
                  "relief": 2,
                  "streets": -1
                },
                "goto": "president_queue",
                "delay": 2
              },
              {
                "label": "Move the party on before somebody places the face",
                "result": "The President is extracted mid-anecdote with the smoothness of long practice — Mullard's, not yours — and the bar is left believing he was a merchant captain out of Gdansk, which is the story Miss Vadas seeded on the way in. Two doors down, he asks what's next with the air of a man collecting the set.",
                "effects": {
                  "streets": 1
                },
                "goto": "president_queue",
                "delay": 2
              },
              {
                "label": "An after-hours lock-in — cleared with absolutely nobody",
                "result": "The towels go over the pumps, the curtains are drawn, and the Feathers enters its finest hour: a head of state, a coalman, a darts team and a Special Branch officer, locked in by consent of the Crown in the person of yourself. What is sung stays sung.",
                "effects": {
                  "brass": -2
                },
                "risk": {
                  "odds": 55,
                  "failResult": "The beat man, unbriefed by design, reports lights and singing at the Feathers after time — by procedure, on the air, in the clear. Half the manor's night owls hear it, and one of them is the Chronicle's stringer, who knows the difference between a lock-in and a lock-in worth walking to.",
                  "failGoto": "president_stringer"
                },
                "goto": "president_queue",
                "delay": 1
              }
            ]
          },
          {
            "id": "president_queue",
            "title": "THE PIE STALL — HE HAS DISCOVERED THE QUEUE",
            "text": "The all-night pie stall by the market, and the President of Zubrovia has discovered queueing. He is enchanted. He has joined the end of it, twice — the second time for the pleasure — refused all offers of precedence, and is interviewing the man ahead of him about the etiquette of the thing through Miss Vadas, who is by now translating on instinct alone. 'In Zubrovia,' he announces to the queue at large, 'the queue is a punishment. Here it is a parliament.' The queue, to a man, agrees with him about parliaments.",
            "choices": [
              {
                "label": "Let him queue it out — post PC Whittle two places back",
                "result": "PC Whittle joins the queue in plain coat, two behind, and spends twenty minutes as the worst-briefed protection officer in Europe. The President reaches the hatch, orders 'what the gentleman had', and pronounces the pie 'honest — like bread that has done something with its life.'",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "goto": "president_missing",
                "delay": 1
              },
              {
                "label": "Pies to the car — the full queue is not survivable",
                "result": "Mullard fetches four pies to the Rover with the faces of the queue on his back. The President eats his on the bonnet, which was not the compromise Mullard intended, and grades it against the queue experience as 'the pie without the parliament — half the meal.'",
                "effects": {},
                "goto": "president_missing",
                "delay": 1
              },
              {
                "label": "Call the night done at the stall — home charmed by two",
                "result": "The President is walked gently Rover-wards on the promise that the best of the manor keeps. He goes with the good grace of a man who has been promised a next time, and the car door closes on him mid-sentence about the pie.",
                "effects": {
                  "brass": 2,
                  "relief": 2
                },
                "outcome": "The President was home by two, charmed and short-changed, and said so to No 10 in the morning with a partisan's directness: 'your policeman ended the battle at the winning of it.' The buses were signed for all the same — but the night is filed at the Yard as adequate, which on this manor is a wound.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "president_missing",
            "title": "THE PRESIDENT IS NOT WHERE THE PRESIDENT WAS",
            "text": "Between the stall and the car, in the forty feet of fog and arches where the market keeps its shadows, President Bazhek has slipped his own protection — cleanly, professionally, and by every sign deliberately. Major Osk, far from alarmed, is radiant with national pride: 'Nineteen forty-three,' he says, as if that settles it, 'the Germans also could not hold him.' Miss Vadas has sat down on a crate. DS Mullard is grey as wet slate and has begun, quietly, to talk about his pension. Twenty minutes, and the fog is thickening.",
            "choices": [
              {
                "label": "Everything free sweeps the market — quiet as you can make it",
                "result": "Every spare hand walks the arches at a murmur, torches down: no name on the air, only 'an elderly gentleman in a donkey jacket, speaks little English, answer to sir.' The market, which knows a discreet emergency when it sees one, joins in without being asked.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 1,
                  "streets": -1
                },
                "goto": "president_found",
                "delay": 1
              },
              {
                "label": "Think like a partisan — where would you go? Towards the river.",
                "result": "A man who walked out of occupied mountains does not wander: he reconnoitres, and he goes where the ground is oldest. You take the river steps yourself, alone, at a walk — and hear, from the dark below the wall, the unmistakable sound of a brazier being poked by somebody in charge of it.",
                "effects": {},
                "goto": "president_found",
                "delay": 1
              },
              {
                "label": "Tell nobody and trust him to surface — Osk says he does this",
                "result": "You post nothing, log nothing, and stand at the Rover with Mullard learning what his silences are made of. Twenty long minutes later, word comes up from the river of singing — two languages, one tune.",
                "effects": {},
                "risk": {
                  "odds": 45,
                  "failResult": "The twenty minutes become forty, and forty is where nerve ends: Mullard breaks first and puts it on the Yard's own channel, in the clear, with the word PRINCIPAL in it. By the time the river gives him back, three duty officers and one stringer know Thorne Street mislaid a head of state and elected to wait.",
                  "failGoto": "president_stringer"
                },
                "goto": "president_found",
                "delay": 1
              }
            ]
          },
          {
            "id": "president_found",
            "title": "FOUND — THE BRAZIER BELOW THE RIVER WALL",
            "text": "The President of Zubrovia is at the porters' brazier below the river wall, wearing a porter's cap — his watch went the other way in the trade, and both parties consider it a bargain — teaching the night porters a partisan song of the mountains. They have taught him 'Knees Up Mother Brown', which he sings with the gravity of an anthem. Room is made for you at the fire without comment, which is the market's highest honour. It is coming up four o'clock, and somewhere behind the fog the morning papers are being set.",
            "choices": [
              {
                "label": "Home the back way now — end the night on the high note",
                "result": "One last verse in each language, a round of handshakes that goes twice round the fire, and the grey Rover slides out of the manor by the streets you chose for their darkness. At the embassy gate the President takes your hand in both of his and says, without the interpreter, 'good town. Good police.'",
                "effects": {
                  "streets": 2,
                  "brass": 3
                },
                "outcome": "The President signed for the buses at ten with the porter's cap on the table beside the pen, and told No 10 the Metropolitan Police had shown him 'the true London, and returned him sober enough to sign, which is the whole art of policing.' Special Branch's report is one page. The last line is a commendation.",
                "grade": "good"
              },
              {
                "label": "One more hour — he has earned the dawn fish market",
                "result": "The fish market at five is the manor with its sleeves rolled, and the President walks it like a returning mayor — pricing everything, shaking wet hands, saluted by the porters' union rep with a haddock. It is, Miss Vadas translates unprompted, the finest hour of the visit.",
                "effects": {
                  "relief": 2,
                  "streets": 2
                },
                "risk": {
                  "odds": 50,
                  "failResult": "The fish market at dawn is also where the picture desks send their early men. One of them, sent for salmon prices, instead gets the President of Zubrovia in a porter's cap holding a conger eel like a regimental colour — and knows precisely what he has.",
                  "failGoto": "president_stringer"
                },
                "outcome": "The dawn market entered Zubrovian state legend before the party left it — the President's memoirs give it a chapter, the haddock salute a full page. The buses were signed for at ten, the porters' union sent the nick a crate of kippers, and No 10's letter to the Commander used the word 'exemplary', which the Commander has had framed.",
                "grade": "good"
              },
              {
                "label": "Hand him back to Mullard and wash your hands, in writing",
                "result": "The transfer of the principal is effected at the top of the river steps with a signature and a time, like returned property. The President shakes hands courteously and looks at you, for the first time all night, the way heads of state look at policemen.",
                "effects": {
                  "brass": 2,
                  "streets": 2
                },
                "outcome": "The night ended in good order and on paper, which satisfied everyone whose satisfaction is professional. The President signed for the buses and said nothing memorable about it; the manor got no thanks and expected none; and something that was nearly a story about this town became, instead, a file.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "president_stringer",
            "title": "THE CHRONICLE MAN HAS A PICTURE",
            "text": "The Chronicle's stringer has found the night, or enough of it: notes, a witness or two from the Feathers, and — he lets you see the edge of it — a photograph with the President of Zubrovia unmistakably in it and the manor unmistakably around him. He is not hostile; he is a man holding a winning coupon and wondering where to cash it. Downing Street wakes in three hours. Zubrovia's papers, Miss Vadas observes to nobody, wake earlier than that.",
            "choices": [
              {
                "label": "Trade him the exclusive — held until the flight leaves",
                "result": "Terms are agreed at the pie stall over two teas: everything, verified, with quotes — the day after the presidential aircraft is wheels-up. He shakes on it like a man buying a house, and keeps it, because a stringer who burns a nick has no manor left to work.",
                "effects": {
                  "brass": -1,
                  "streets": 2
                },
                "outcome": "THE PRESIDENT WHO QUEUED ran two days after departure, warm as fresh bread, and was reprinted in Zubrovia under state approval. No 10 declared itself, on balance and after consideration, amused. The buses were signed for; the Yard's post-visit review notes 'press handling: unorthodox.' It does not say failed.",
                "grade": "mixed"
              },
              {
                "label": "Spend a marker at the Chronicle — the plate goes missing",
                "result": "One telephone call to a night editor who owes the nick his quietest scandal, and the photograph becomes a filing error. The stringer takes it philosophically — plates go missing, manors remember — and files instead on the gasworks dispute, at length, in revenge.",
                "effects": {
                  "favours": -1
                },
                "outcome": "The night that officially never happened stayed unhappened: no picture, no story, one bus contract signed at ten sharp, and a President who left believing — correctly — that this town had kept his secret. What it cost is written down nowhere, which is the price of things written down nowhere.",
                "grade": "good"
              },
              {
                "label": "Let it print and brief No 10 to smile",
                "result": "You decline to interfere on the reasonable grounds that the truth is charming. The Chronicle disagrees about which truth: the picture runs under PRESIDENT LOOSE IN LONDON — YARD BAFFLED, which is neither the picture's fault nor accurate, and by eight the scrambler traffic is continuous.",
                "effects": {},
                "outcome": "No 10 did not smile. The Zubrovian ambassador was summoned, then the Commissioner, then — a long way down a bad morning — you. The buses were signed for eventually, at a discount nobody itemises, and the file on the night carries the Home Office stamp that means 'never again', with Thorne Street's name inside it.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "royal",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 THE DUKE OF THORNBURY HAS SENT THE NICK A CASE OF SOMETHING FRENCH AND UNPRONOUNCEABLE. THE GAZETTE PRINTED THE WEATHER.",
          "mixed": "THE MORNING AFTER \u2014 THE PALACE THANKS THE YARD, THE YARD THANKS ITSELF, AND THORNE STREET GETS ON WITH THE FISH PRICES.",
          "poor": "THE MORNING AFTER \u2014 THE PHOTOGRAPH IS ON EVERY FRONT PAGE AND THE DUKE IS ON AN AEROPLANE. THE PALACE PRESS OFFICE ANSWERS ON THE FIRST RING NOW.",
          "unresolved": "THE MORNING AFTER \u2014 THE DUKE SURFACED AT A CHELSEA BREAKFAST TABLE, UNHARMED AND UNREPENTANT. THE PALACE IS CHOOSING TO BE AMUSED."
        },
        "gradeFlags": { "good": "flag_duke_grateful" },
        "venue": "greek_court",
        "title": "THE DUKE ON THE LOOSE",
        "startTurn": 3,
        "unresolvedOutcome": "HRH the Duke of Thornbury was still loose on the manor when the Early Turn booked on — the Palace telephoning every half hour, Protection's man weeping gently in the canteen, and a borrowed doorman's mackintosh the only fixed point in the whole affair. The morning would find him, or the Gazette would. Either way it would not be you, and the file would carry your name at the top of the hours in which nothing was done.",
        "stages": [
          {
            "id": "royal_slip",
            "title": "ROYALTY PROTECTION — A VOICE WITH NO NAME",
            "text": "The blower goes and a voice that gives no name and no station says the same sentence twice: HRH the Duke of Thornbury has 'become separated from his party.' Twenty-three years old, tenth in a line that stopped mattering somewhere around the fourth, dining privately at the Gresham, he has stepped out for air in a borrowed doorman's mackintosh and not come back. His personal protection officer is in the gentlemen's being quietly sick. The Palace is awake. The Gazette must not be. Thornbury, the voice adds, in the flat tone of a man reading his own obituary aloud, 'has previous for this sort of evening.'",
            "choices": [
              {
                "label": "Flood the likely doors — quietly, no titles on the air",
                "result": "You put two out on the clubs and cab ranks with orders to describe him as 'a misper, mac, twenties' and nothing else. The manor's night people are canvassed by men who know how to ask without saying why. Within the hour, a cabman.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 2,
                  "streets": -2
                },
                "goto": "royal_cab",
                "delay": 1
              },
              {
                "label": "Make Protection earn it — their man, your manor",
                "result": "You tell the nameless voice that Thornbury is its problem and Thorne Street is its map, and no more. Two large men in raincoats arrive to be politely useless in your front office, and the search proceeds at the pace of wounded pride. It costs the relief an hour of babysitting the Palace.",
                "effects": {
                  "relief": -3
                },
                "goto": "royal_cab",
                "delay": 2
              },
              {
                "label": "Hand the coronet straight to the Yard",
                "result": "You ring the Commander's night man and make a royal manhunt somebody else's decision, at the usual price. A car with tinted glass takes the problem away, and Thorne Street is thanked for its discretion at the door of its own case.",
                "effects": {
                  "favours": -1,
                  "brass": 3
                },
                "outcome": "You handed the Duke to the Yard inside the hour. Correct, bloodless, and forgotten by Monday — the boy was retrieved from somewhere no report will ever name, and the only trace on the ground is a favour spent and a night you watched from the touchline.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "royal_cab",
            "title": "THE CABMAN REMEMBERS",
            "text": "A night cabman off the Gresham rank remembers the fare well: 'Nice enough young feller. Borrowed mac. Tipped like he'd never seen money and never had to earn it.' Set down at the Blue Parrot on Greek Court. The Blue Parrot is a spieler — an illegal drinker with a chemin-de-fer table up the stairs and a membership book that is a work of imaginative fiction. It is kept by Bernie Sokol, who is a friend of the nick in the way a crocodile is a friend of the riverbank.",
            "choices": [
              {
                "label": "Two in plain clothes through the front, warrant in the pocket",
                "result": "Doyle and whoever's tidiest lose the helmets and go in as men who fancy a late hand of cards. Sokol's doorman takes one look at the walk and knows, but the warrant in the pocket is the one card the Blue Parrot can't trump.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "goto": "royal_parrot",
                "delay": 1
              },
              {
                "label": "Ring Sokol direct — call in what he owes the nick",
                "result": "Sokol takes the call like a man who has been expecting a worse one. 'Your boy? He's my boy tonight, guvnor, and he's lucky at the shoe.' A marker is spent; the door will be open when you come, and the table will be, regrettably, mid-hand.",
                "effects": {
                  "favours": -1
                },
                "goto": "royal_parrot",
                "delay": 1
              },
              {
                "label": "Watch the door and let him come out to you",
                "result": "One man in a shadow across Greek Court with a flask and a description. The Blue Parrot keeps its own hours and its own counsel, and so, for now, do you. But a spieler at this hour is a lit window in a dark street, and lit windows draw more than moths.",
                "effects": {},
                "goto": "royal_stringer",
                "delay": 1
              }
            ]
          },
          {
            "id": "royal_parrot",
            "title": "THE BLUE PARROT — NINE HUNDRED UP AND HAPPY",
            "text": "He is at the chemmy table in the borrowed mac, nine hundred pounds to the good, being toasted by a room that worked out precisely who he is and precisely what he is worth to it an hour ago. Bernie Sokol has given him the good brandy and the worst possible impression of London. The Duke is having, by his own carrying account, the finest night of his life, and has just invited the entire table to Thornbury for the twelfth of August.",
            "choices": [
              {
                "label": "Ease him out the back with his winnings and his dignity",
                "result": "A quiet word, a coat over the famous face, and the heir to nothing very much is walked out through Sokol's kitchen into the night, protesting only that he hadn't finished his brandy. Protection's Rover collects him from a corner where no photograph was ever possible. Sokol keeps his club; you keep the peace; nobody keeps the nine hundred, which is somehow already Sokol's again.",
                "effects": {
                  "streets": 2,
                  "brass": 4
                },
                "outcome": "You brought the Duke of Thornbury out of a spieler by the back stairs at three in the morning with his name unspoken and his photograph untaken. The Palace knows exactly whom to thank and, in the manner of Palaces, never will. The best kind of night's work: the kind that never happened.",
                "grade": "good"
              },
              {
                "label": "Raid the Parrot — book Sokol; the Duke walks out in the confusion",
                "result": "Whistles and the good news. Sokol's table goes over, the membership book of fiction is seized as an exhibit, and in the general stampede a young man in a borrowed mac is bundled out by a constable who has been told only 'the drunk in the corner is ours.'",
                "effects": {
                  "arrests": 1,
                  "streets": 3,
                  "brass": -3,
                  "relief": 2
                },
                "risk": {
                  "odds": 55,
                  "failResult": "The raid is clean, Sokol is booked — and a flashbulb goes off across the street as the Duke is walked to the van, because raids draw exactly the crowd a runaway royal cannot afford. The negative is already three streets away in a despatch rider's bag.",
                  "failEffects": {
                    "brass": -4
                  },
                  "failGoto": "royal_scandal"
                },
                "outcome": "You closed the Blue Parrot for good and got the Duke home in the wash of it — Sokol in the book, the boy in the Rover, the manor down one spieler by dawn. The Palace is grateful and appalled in exact measure, which at Thorne Street is called a result.",
                "grade": "mixed",
                "sets": "flag_parrot_raided",
                "setsEitherWay": true
              },
              {
                "label": "Leave him — a man of twenty-three, winning, hurts nobody",
                "result": "You stand in the doorway long enough to be sure it's him and no worse than merry, and you let the finest night of his life run its course. It is, you tell yourself, not a crime to be royal and lucky. Outside, Greek Court is no longer as empty as it was.",
                "effects": {},
                "goto": "royal_stringer",
                "delay": 1
              }
            ]
          },
          {
            "id": "royal_stringer",
            "title": "THE GAZETTE'S MAN HAS THE SCENT",
            "text": "It was always going to be a race, and the other runner has just appeared: the Gazette's night stringer, hat down, notebook out, working Greek Court doorway by doorway with the patience of a man who can smell a Thursday splash. He does not have the name yet. He has 'a toff on a bender somewhere posh has no business being,' which is nine-tenths of the way there, and a photographer two pubs back catching up.",
            "choices": [
              {
                "label": "Get to the Duke first and run him home the back way",
                "result": "A dead sprint through the kitchens and yards you know and the stringer doesn't, the boy half-carried and wholly baffled.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2,
                  "streets": -1
                },
                "risk": {
                  "odds": 60,
                  "failResult": "You reach him a clean thirty seconds too late: the photographer has his shot from the mouth of the alley, the Duke waving, delighted, at what he takes for an admirer. The plate is exposed. Everything after this is damage.",
                  "failEffects": {
                    "brass": -3
                  },
                  "failOutcome": "The photograph ran on Thursday under a headline that wrote itself, and the Duke of Thornbury's finest night became Thorne Street's worst review. The Palace understood, coldly, that you had been within thirty seconds and a locked yard gate of saving them, which is not the same as having saved them.",
                  "failGrade": "poor"
                },
                "outcome": "You had the Duke over your shoulder and through the back of the Feathers before the shutter could find him, and the Gazette's man got a lungful of kitchen steam and nothing else. Thursday's paper ran a paragraph about nothing. It is the finest thirty seconds of your night.",
                "grade": "good"
              },
              {
                "label": "Give the stringer a better, duller story to chase",
                "result": "You take the Gazette's man aside and trade him something real and safe — the spieler, the cards, Sokol's fiction of a membership book — for his forgetting the toff entirely. He is a professional; a firm arrest beats a rumoured lord, most Thursdays.",
                "effects": {
                  "brass": -2
                },
                "outcome": "The stringer got his spieler splash and never knew how close he came to the front page. The Duke went home a footnote; the Gazette's Thursday led on Bernie Sokol; and a favour of the unspoken kind now sits between you and the fourth estate, which is worth having.",
                "grade": "mixed"
              },
              {
                "label": "Do nothing and hope the night is kind",
                "result": "You let it run. Hope is not a method the Regulations recognise, and Greek Court at this hour is no place to be trusting to luck, but the alternatives all cost, and the meters are what they are.",
                "effects": {},
                "goto": "royal_dawn",
                "delay": 2
              }
            ]
          },
          {
            "id": "royal_scandal",
            "title": "THE PICTURE IS OUT — CONTAINMENT ONLY",
            "text": "The negative is gone and the Duke is now, definitively, a story; the only question left is how big. Protection are here at last, grey-faced. The Gazette's picture desk will have the plate developed within the hour, and somewhere a night lawyer is being woken to argue about it. You cannot un-take a photograph. You can only decide what Thorne Street's name is worth in the wreckage.",
            "choices": [
              {
                "label": "Spend the last marker — lean on the Gazette to hold the plate",
                "result": "You call in the deepest favour you have with the one man on the picture desk who owes the nick a real one. The plate is 'mislaid' pending 'legal advice' that will outlast the news cycle. It costs you everything you were owed and it works.",
                "effects": {
                  "favours": -1
                },
                "outcome": "The photograph never ran. It cost the last marker Thorne Street held anywhere that mattered, and the Palace will never know the price or the peril — but the Duke of Thornbury remains a private embarrassment rather than a public one, and that, tonight, is the whole of the job.",
                "grade": "mixed"
              },
              {
                "label": "Let it run and get the boy home before the second edition",
                "result": "You can't stop Thursday, so you salvage tonight: the Duke goes home in the Rover while the going is merely bad, before the crowd and the follow-up and the second photographer arrive to make it worse.",
                "effects": {
                  "streets": 2
                },
                "outcome": "The picture ran and the Duke's night was in every paper by Thursday, but you got him off the street before it became a scene, and the Yard's review conceded that Thorne Street had lost the battle competently. Faint praise, filed forever.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "royal_dawn",
            "notBefore": 13,
            "title": "FIRST LIGHT — THE DUKE UNACCOUNTED FOR",
            "text": "The sky goes the colour of a policeman's overcoat and the Duke of Thornbury is still, officially, a doorman's mackintosh last seen going into a spieler. Protection have stopped pretending to be calm. The Palace has stopped ringing, which is worse. And the Gazette's man has gone home to file something — you don't know what, and not knowing is its own kind of dawn. Whatever Thorne Street does now, it does in the last half hour it will have any say at all.",
            "choices": [
              {
                "label": "Turn out everything left and sweep Greek Court end to end",
                "result": "The last of the relief walk the court and its yards in the grey light and find him at last, asleep and beaming in the back of a minicab that never moved, the meter run to eleven pounds and the driver too star-struck to wake him. Home by six, filthy and royal.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 2,
                  "streets": -2
                },
                "outcome": "You found the Duke of Thornbury at ten to six asleep in a stationary minicab and got him home before the Early Turn could see. Late, ragged, and a night older than you were — but found, and quiet, which at first light is the best word in the book.",
                "grade": "mixed"
              },
              {
                "label": "Hand it to the Early Turn with a full and honest log",
                "result": "You write it all down — the call, the cabman, the Parrot, the hours — in a hand that hides nothing, and you give the whole doomed affair to the day relief with your compliments. The book is immaculate. The Duke is still out there in it.",
                "effects": {},
                "outcome": "The Duke of Thornbury was still missing when you signed off, bequeathed with a beautiful log to a day relief who will never thank you for it. The Palace remembers the night by the name at the top of the occurrence book, and the name at the top of the occurrence book is yours.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "souper",
        "gradeFlags": {
          "good": "rooftop_legend"
        },
        "echoes": {
          "good": "THE MORNING AFTER \u2014 VERNON SILL CHARGED ON FOUR COUNTS; THE GULL, THEY SAY, SENT A WREATH TO THE COURT. CADOGAN ROW SLEEPS EASIER.",
          "mixed": "THE MORNING AFTER \u2014 THE EMERALDS ARE BACK IN THE SAFE AND THE ARTIST IS BACK IN THE FOG. THE INSURERS HAVE SENT A CAREFUL LETTER OF THANKS.",
          "poor": "THE MORNING AFTER \u2014 FOUR SAFES ON CADOGAN ROW STAND OPEN AND THE FOG TOOK THE ANSWER WITH IT. THE GULL IS BELIEVED FLATTERED.",
          "unresolved": "THE MORNING AFTER \u2014 CADOGAN ROW COUNTS ITS LOSSES BY DAYLIGHT. THE FOG IS FORECAST BACK TONIGHT; SO, IN CID'S VIEW, IS THE ARTIST."
        },
        "title": "THE PEA-SOUPER ARTIST",
        "startTurn": 6,
        "stages": [
          {
            "id": "souper_fog",
            "title": "FOG OFF THE RIVER — THREE SKYLIGHTS, CADOGAN ROW",
            "text": "The fog comes up off the river about the middle of the shift, a proper yellow-grey pea-souper of the sort the Clean Air Act was supposed to have pensioned off, and it has brought company. Sgt Bream lays three burglary reports on your desk like a losing hand: three of the grand terraces on Cadogan Row done inside ninety minutes, entry through the skylights, exit across the leads, nothing in the houses disturbed but the safes — a Milner among them, opened, not blown. And at every scene the same touch: the family photographs on the mantel turned face-down, gently. The insurance men are already on the blower using words like 'confidence' and 'premium'. Somewhere above the fog, a craftsman is working your ground.",
            "choices": [
              {
                "label": "Turn out two units — seal the Row and put men on the roofline",
                "result": "Doyle and Whittle go up through a trapdoor with a torch apiece and the fog swallows them to the sound of mild blasphemy. Nothing moves on the leads but the pigeons — and, twice, something Whittle swears was politer than a pigeon.",
                "effects": {
                  "streets": 3,
                  "relief": -3,
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "goto": "souper_gull",
                "delay": 1
              },
              {
                "label": "Go down yourself and read the workmanship",
                "result": "You leave Bream the desk and take the fog at walking pace, headlamps full of nothing. The third house is still warm, so to speak: the householder on the stairs in a dressing gown, and the safe standing open like a criticism.",
                "effects": {},
                "goto": "souper_scene",
                "delay": 1
              },
              {
                "label": "Burglary is a daylight crime to solve — leave it for CID's morning men",
                "result": "The reports go in the CID tray and the fog goes on manufacturing alibis. The insurance men ring twice more before the small hours and are given a reference number, which soothes them not at all.",
                "effects": {
                  "streets": -4,
                  "brass": -2
                },
                "goto": "souper_fourth",
                "delay": 2
              }
            ]
          },
          {
            "id": "souper_scene",
            "title": "THE WORKMANSHIP — NUMBER ELEVEN",
            "text": "Number eleven, Cadogan Row. The skylight has been taken out whole — putty softened, glass lifted, laid on the leads like a tea tray — and the safe stands open with its dignity gone and nothing else in the house so much as breathed on. No drawers turned out, no mud on the carpets, the dog still asleep. It is WPC Hartle who finds the signature: every family photograph on the piano laid face-down, gently, as though the artist preferred not to be watched at his work. Mr Pelling, assessor for the Anchor & Sovereign, is already on the step in a fog-damp bowler, discussing the size of the claim in the voice of a man announcing a bereavement. 'Three tonight,' he says. 'You'll appreciate the arithmetic.'",
            "choices": [
              {
                "label": "Put watchers on the roofs at the unburgled end of the Row",
                "result": "Whittle and Duffin go up among the chimney pots with one flask between them and orders to freeze quietly. If the artist means to finish the terrace, he will finish it into the arms of the Metropolitan Police.",
                "effects": {
                  "relief": -3,
                  "dispatchUnits": 2,
                  "dispatchTurns": 3
                },
                "goto": "souper_rooftops",
                "delay": 2
              },
              {
                "label": "Back to the nick — pull every climbing file the collator owns",
                "result": "The collator's index offers a short, elegiac list of men who could work a skylight in the dark, most of them dead, inside, or too fat. One card stays in your hand: GULLIVER, Albert Edward, known as the Gull. Retired, it says. Twice.",
                "effects": {},
                "goto": "souper_gull",
                "delay": 1
              },
              {
                "label": "Board the skylight, one line in the OB, pick it up towards dawn",
                "result": "The carpenter's hammer sounds through the fog like a coffin being finished. Mr Pelling watches the boarding-up from the pavement and writes something in his book that is not a compliment.",
                "effects": {
                  "streets": -3,
                  "brass": -2
                },
                "goto": "souper_fourth",
                "delay": 2
              }
            ]
          },
          {
            "id": "souper_gull",
            "title": "GENTLEMAN AT THE DESK — RE: HIS REPUTATION",
            "text": "Albert 'the Gull' Gulliver — the finest climber this manor ever produced, these days proprietor of a pet shop off Chapel Yard Market — presents himself at the front desk in carpet slippers with a cockatiel on his shoulder, to state for the record that he has been retired eleven years and that whoever is at it on Cadogan Row is 'no better than adequate'. He then critiques the evening's work at length and unprompted: the wet mark left on a drainpipe ('sloppy'), the Milner taken in twenty minutes ('I'd have had her in twelve'), and the photographs turned face-down — at which he stops talking altogether and looks, briefly, like a man who has seen a ghost. Below the cockatiel sits Regan the station cat, with the patience of the truly professional.",
            "choices": [
              {
                "label": "Nick him — he fits, and the insurance men want a name tonight",
                "result": "The Gull goes into cell two under protest and the cockatiel goes into Property under Bream. The manor's pensioned villainy is scandalised to a man, and through the hatch comes a recitation of innocence in the tones of a wronged archbishop.",
                "effects": {
                  "streets": 2,
                  "brass": 3,
                  "relief": -2,
                  "arrests": 1
                },
                "goto": "souper_fourth",
                "delay": 1
              },
              {
                "label": "Spread the scene photographs on the desk and ask his professional opinion",
                "result": "He goes through them like a master judging an apprentice piece — which, it dawns on you around the third photograph, is precisely what he is doing. 'The pictures on the piano,' he says at last, quietly. 'That's my rule. I only ever taught it to one man.'",
                "effects": {},
                "goto": "souper_apprentice",
                "delay": 1
              },
              {
                "label": "Send him home — a pet shop needs its proprietor",
                "result": "The Gull departs into the fog under a cloud of injured dignity, announcing that when the Metropolitan Police want the benefit of forty years on the leads, they know where the shop is. The cockatiel has the last word, twice.",
                "effects": {
                  "streets": -2
                },
                "goto": "souper_fourth",
                "delay": 2
              }
            ]
          },
          {
            "id": "souper_fourth",
            "title": "THE FOURTH JOB — LADY ANTROBUS'S EMERALDS",
            "text": "The fog thickens and the artist improves. Number three, Cadogan Row — the big double-fronted one — done while the household played bridge two floors below: in through the lantern light above the stairwell, the safe open, Lady Antrobus's emeralds gone, and on every mantel in the house the photographs laid face-down, including, as a flourish, the one of Sir Giles collecting his gong. The Anchor & Sovereign has gone over your head to the Yard, Mr Pelling has begun using the word 'series' at the front desk, and Commander Rossiter rings in person to observe that four safes in one night's fog is 'the sort of arithmetic that reaches the newspapers'. Wherever Albert Gulliver is spending his evening, it is provably not on a roof, and he will be mentioning that for years.",
            "choices": [
              {
                "label": "Everything that rolls to Cadogan Row — cordon below, men on the leads",
                "result": "The Row is sealed at both ends and the rooftops sown with cold policemen. Towards the turn of the night Whittle signals from a chimney stack that the fog is moving in a way fog doesn't.",
                "effects": {
                  "streets": 2,
                  "relief": -4,
                  "dispatchUnits": 3,
                  "dispatchTurns": 2
                },
                "goto": "souper_rooftops",
                "delay": 1
              },
              {
                "label": "Ring the pet shop and eat humble pie by the spoonful",
                "result": "It takes three apologies, one 'maestro', and an undertaking regarding the cockatiel's travelling arrangements, but the Gull consents to attend and study the new photographs. 'Adequate,' he says of the lantern-light entry, in the voice of a man deciding something.",
                "effects": {},
                "goto": "souper_apprentice",
                "delay": 1
              },
              {
                "label": "It's the insurance trade's grief — write it up fair and mind the shift",
                "result": "The reports are typed, the claims certified, and the fog keeps its own counsel. Towards dawn a breeze comes up off the river like a stagehand and strikes the set.",
                "effects": {
                  "streets": -8,
                  "brass": -6,
                  "relief": 2
                },
                "outcome": "The pea-souper lifted towards dawn and the artist retired with it, undetected, four safes to the good. The Anchor & Sovereign paid out in full, raised every premium on the Row, and mentioned Thorne Street by name in the covering letter. On the mantels of Cadogan Row the photographs stand upright again, none the wiser.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "souper_rooftops",
            "title": "ON THE LEADS",
            "text": "There. Two torch flashes off Whittle's chimney stack: a figure on the roofline of the end house, moving through the fog with the unhurried tread of a man in his own workshop. Below, the Row is sealed. Above, there is nothing between him and the river but wet slate, forty chimneys, and whichever officers you are prepared to put over a parapet in a pea-souper. Doyle has found a trapdoor and is holding it open like a question. The torch beam dies at six feet, the slates are greased with fog, and somewhere ahead of you a skylight, softly, ceases to be locked.",
            "choices": [
              {
                "label": "Over the parapet — take him on the leads, guvnor leading",
                "result": "You go along the roofline by feel and by blasphemy, Doyle's torch swinging like a lighthouse with doubts. He is at the skylight, putty knife in hand, when the beam finds him. He considers the fog, the drop and the arithmetic, then holds out his wrists like a gentleman. 'Fair capture,' he says. 'You walked the leads for it.'",
                "effects": {
                  "streets": 12,
                  "brass": 5,
                  "relief": 6,
                  "arrests": 1,
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "risk": {
                  "odds": 55,
                  "failResult": "The slates give their opinion. Doyle goes through a conservatory roof into a lily pond — nothing broken but the lilies and his standing — and by the time the shouting stops the roofline is empty, one skylight is politely closed, and the fog has taken its craftsman home. The Yard hears about the pond by breakfast.",
                  "failEffects": {
                    "streets": -6,
                    "brass": -5,
                    "relief": -4
                  },
                  "failOutcome": "The rooftop capture came apart in the fog — Doyle through a conservatory roof into a lily pond, the artist away over the chimneys with the emeralds, and the Yard in possession of the word 'pond' by breakfast. On the mantels of Cadogan Row the photographs stay face-down.",
                  "failGrade": "poor"
                },
                "outcome": "Vernon Sill, the Gull's own estranged apprentice, taken in the act on the rooftops of Cadogan Row and brought down through a trapdoor to quiet applause. The emeralds come home, the photographs go back up, and at a pet shop off Chapel Yard Market an old man pretends very hard not to be proud.",
                "grade": "good",
              },
              {
                "label": "Hold the ring below — every door, drainpipe and coal-hole covered",
                "result": "He tries three drainpipes and finds an officer at the foot of each, which plainly offends his sense of workmanship. Somewhere over the chimney tops he weighs the swag against the getaway and chooses like a professional: Lady Antrobus's emeralds come down a rainwater hopper wrapped in wash-leather, and their courier does not.",
                "effects": {
                  "streets": 4,
                  "brass": 3,
                  "relief": -3,
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "outcome": "The cordon held and the artist paid the toll: emeralds and a roll of housebreaking tools recovered from a hopper on Cadogan Row, their owner away over the chimneys with empty pockets. The Anchor & Sovereign is relieved, the Yard unconvinced, and somewhere out in the fog a craftsman is redesigning his retirement.",
                "grade": "mixed"
              },
              {
                "label": "Call them down — nobody dies on wet slate for jewellery",
                "result": "The trapdoors close, the torches descend, and the relief thaw out in the canteen while the roofline keeps its secrets. Towards dawn the breeze arrives off the river and takes the fog away, and everything it was carrying.",
                "effects": {
                  "streets": -7,
                  "brass": -4,
                  "relief": 3
                },
                "outcome": "The fog lifted towards dawn and took the artist with it, undetected, the season's work complete. The insurance paid out, the premiums went up, and the only proof he was ever there is a terrace of family photographs lying face-down, as though the houses themselves had been asked to look away.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "souper_apprentice",
            "title": "THE GULL'S RULE",
            "text": "'Never let the family watch you work.' The Gull says it like catechism, straightening the scene photographs on your desk. 'My rule. Manners, not sentiment. I taught it to one man in my life: Vernon Sill. Best hands I ever trained, and the worst falling-out I ever had.' What turned him, in the end, was not civic duty but Mr Pelling's assessment, read aloud at the desk: 'in the style of the old Gulliver jobs, though tidier in execution.' Tidier. The Gull removed his coat and asked for a chair. Emeralds of that quality, he says, sit still for exactly one fence on this manor — Manny Coplans, clocks and small repairs, Chapel Yard Market, three generations of discretion over the door. He will take you there himself, on terms: it is done respectful, his name stays out of it, and the record states the workmanship was no better than adequate.",
            "choices": [
              {
                "label": "Take his terms — share a doorway opposite the clock shop till the knock comes",
                "result": "You and the Gull watch the fog turn from yellow to grey across the Market, and towards dawn a figure comes up past the shuttered stalls with his collar up and a wash-leather bundle under one arm. The Gull reads the walk, not the face. 'That's him. Told him for years to mend that walk. Never listened.'",
                "effects": {
                  "streets": 8,
                  "brass": 4,
                  "relief": 2,
                  "favours": -1,
                  "arrests": 1
                },
                "outcome": "Vernon Sill met at his fence's door towards dawn, emeralds in a wash-leather bundle, identified by the one man alive who could read the style — his old master, whose price was a favour, strict anonymity, and an official record describing the workmanship as 'no better than adequate'. At the pet shop the cockatiel is learning a new word, and it sounds remarkably like 'guilty'.",
                "grade": "good",
                "sets": "gull_on_side"
              },
              {
                "label": "Thank him kindly and spin Coplans's mob-handed on the nick's own authority",
                "result": "The van is audible three streets off — fog does that — and the clock shop, when opened, contains clocks. The floor safe yields a jeweller's parcel from the first three jobs and Manny Coplans, protesting he bought the lot off 'a bloke'. Of Vernon Sill and the emeralds: nothing but a smell of oil and recently opened door.",
                "effects": {
                  "streets": 4,
                  "brass": -3,
                  "relief": -2,
                  "arrests": 1,
                  "dispatchUnits": 2,
                  "dispatchTurns": 1
                },
                "outcome": "Manny Coplans in the book for receiving and a parcel of Cadogan Row property recovered — but the artist heard the van coming and retired with the emeralds, undetected. The Gull, unconsulted at the finish, has withdrawn his cooperation, his respect, and Thorne Street's discount on bird seed.",
                "grade": "mixed"
              },
              {
                "label": "An old man's wounded pride isn't evidence — let it lie",
                "result": "The Gull puts his coat back on with terrible dignity and goes home through the fog to his birds. The name Vernon Sill goes into the collator's index, where it will sit like a stone in a shoe.",
                "effects": {
                  "streets": -7,
                  "brass": -4
                },
                "outcome": "The fog lifted towards dawn and Vernon Sill retired with it, undetected and complete. The Anchor & Sovereign paid out with a covering letter the Yard framed for the wrong reasons, and the Gull now tells the whole of Chapel Yard Market that he handed the Metropolitan Police the artist's name and they preferred the paperwork.",
                "grade": "poor"
              }
            ]
          }
        ],
        "unresolvedOutcome": "The fog outlasted the shift and so did the artist — four safes open along Cadogan Row, the photographs still face-down, and the Gull installed at the front desk when the Early Turn arrived, offering his professional opinion to anyone in uniform."
      },
      {
        "id": "docks",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 THAMESHEAD WORKED THE DAWN TIDE AS IF NOTHING HAD HAPPENED, BECAUSE OFFICIALLY NOTHING DID. ERNIE'S BRAZIER IS STILL WARM.",
          "mixed": "THE MORNING AFTER \u2014 THE WHISKY UNDER THE PORK IS EVIDENCE NOW; WHOSE, REMAINS TO BE SEEN. THE WHARF WORKS. THE PAPERWORK DOESN'T.",
          "poor": "THE MORNING AFTER \u2014 CRAY CONTINENTAL SAILED ON TIME, AND THE GATE KNOWS WHO SWEPT IT CLEAR. THE UNION BRANCH MINUTES NAME THE NICK.",
          "unresolved": "THE MORNING AFTER \u2014 THAMESHEAD STILL OUT; THE DAY SHIFT JOINED THE BRAZIER AT EIGHT. CRAY'S INTERESTING CARGO SITS WHERE IT SAT."
        },
        "title": "THE WILDCAT",
        "startTurn": 2,
        "stages": [
          {
            "id": "docks_gate",
            "title": "WILDCAT — THAMESHEAD WHARF",
            "text": "Sgt Bream brings it in with the cocoa: Thameshead Wharf has come out. Unofficial — no ballot, no banners, just the night gang walking off behind Ernie Slade, a crane driver of twenty-two years sacked at the gate by the superintendent for refusing a lift. By closing time there is a brazier going, a picket growing by the pub-load, and a queue of Cray Continental refrigerated lorries idling nose-to-tail back past the Duke of Clarence. Mr Aldous Cray himself has telephoned twice — a haulier with friends upstairs and a voice like a bank manager calling in a loan — wanting the gate 'swept clear' before his cargo spoils. The pickets have sent a boy to the Wimpy for twenty-six teas. The Wimpy, sensing history, has stayed open.",
            "choices": [
              {
                "label": "Send Doyle and Whittle to hold the gate — visible, civil, nobody's bouncers",
                "result": "Doyle parks the panda where both sides can see it, and Whittle is handed a mug of picket tea inside the half hour, which he pronounces the best on the manor. Nothing moves through the gate, but nothing burns either, and both camps begin addressing their grievances to the referee.",
                "effects": {
                  "streets": 4,
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "goto": "docks_brazier",
                "delay": 1
              },
              {
                "label": "Go down yourself and hear the man they sacked",
                "result": "The picket captain grants you an audience with the air of a man lending out the crown jewels. Slade is by the brazier with his tally book under his arm, saying nothing, while forty men say it for him.",
                "effects": {},
                "goto": "docks_slade",
                "delay": 1
              },
              {
                "label": "Ring Cray back: the Met keeps the peace, it doesn't sweep gates",
                "result": "There is a pause of the expensive kind. 'I quite understand,' says Mr Cray, pleasantly, and rings off without a goodbye. Men like Cray don't ring back. They ring up.",
                "effects": {
                  "brass": -4
                },
                "goto": "docks_cray",
                "delay": 1
              },
              {
                "label": "A trade dispute is day-shift grief — minute it and move on",
                "result": "The occurrence book gets three tidy lines and the wharf gets the freedom of the night. By the small hours the picket has doubled, a second brazier has arrived by pram, and Cray's drivers are running their engines for the heaters, which is doing nothing for anybody's temper or Mr Cray's diesel bill.",
                "effects": {
                  "streets": -6
                },
                "goto": "docks_brazier",
                "delay": 2
              }
            ]
          },
          {
            "id": "docks_slade",
            "title": "THE MAN THEY SACKED",
            "text": "Ernie Slade gives his account like a man reading a tide table: twenty-two years on the cranes, never a day's grief, sacked at the gate before his tea went cold. The lift he refused was a Cray Continental reefer box, manifested as frozen Danish pork for the early markets — and it came up on his hook a ton and a half light, bone dry, and silent, no motor running in weather that wants one. He queried the tally. Within the hour the superintendent's office had queried his employment. 'I'm not political, guvnor,' he says, handing over the tally book like evidence, which it is. 'I just know what a ton feels like.' Behind him, the picket sings something older than the union.",
            "choices": [
              {
                "label": "Put WPC Hartle on the tally book, line against line",
                "needsWpc": true,
                "result": "Hartle takes the book, a biro and the good desk lamp, and cross-checks it against the wharf's lodged manifests with the patience of geology. By her third pass she has four more Cray lifts that weigh wrong — all refrigerated, all silent, all signed through by the same office that sacked Slade.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "docks_manifest",
                "delay": 2
              },
              {
                "label": "Walk him back to the brazier and promise his case a proper hearing",
                "result": "The picket parts for the pair of you like a wedding congregation. You promise nothing except that his case will be heard, and Slade repeats it to the line word for word, adding nothing — which is how you know he's straight.",
                "effects": {
                  "streets": 3
                },
                "goto": "docks_brazier",
                "delay": 1
              },
              {
                "label": "Sympathy and tea, but reinstatement isn't police work",
                "result": "'No,' Slade agrees, 'I don't suppose it is.' He goes back to his brazier and his forty interpreters, and whatever was riding light and silent in that box goes on being nobody's business. Cray's office, you learn later, has stopped ringing you and started ringing over you.",
                "effects": {
                  "streets": -4,
                  "brass": -3
                },
                "goto": "docks_cray",
                "delay": 2
              }
            ]
          },
          {
            "id": "docks_cray",
            "title": "A MAN WITH FRIENDS UPSTAIRS",
            "text": "Mr Aldous Cray presents himself at the nick in a camel coat that outranks yours, with the manner of a man who has already had this conversation elsewhere and is waiting for you to catch up. His lorries are perishable, his patience likewise; he mentions Commander Rossiter twice and their golf once, and asks for the gate to be 'swept clear' the way other men ask for a window shut. As his Jaguar pulls away, the blower goes: Rossiter himself, wanting to know why a friend of the force is being held to ransom by 'a rabble round a bonfire'. Through the office window, faintly, the rabble can be heard singing in four-part harmony.",
            "choices": [
              {
                "label": "Sweep the gate for him — heavy mob, vans, done by first light",
                "result": "It takes the heavy mob twenty minutes and looks like every second of it. The brazier goes over in a shower of sparks, Slade and two of his tally-men go in the van for obstruction, and Cray's lorries roll through a dock gate held open by coppers. The drivers don't look at the pickets as they pass. The pickets look at nothing but the uniforms.",
                "effects": {
                  "streets": -8,
                  "brass": 9,
                  "relief": -7,
                  "arrests": 3,
                  "dispatchUnits": 3,
                  "dispatchTurns": 2
                },
                "outcome": "The gate was swept clear for Cray Continental, and it worked — that is the worst of it. The lorries rolled, cargo unexamined, and Rossiter's morning conference purred. But the manor keeps its own occurrence book: for years afterwards, Thameshead men will cross the road rather than share a pavement with a Thorne Street uniform, and the brazier ash by the gate never quite seems to wash away.",
                "grade": "poor"
              },
              {
                "label": "Tell them both the gate stays policed, not swept",
                "result": "Cray receives it like a man making a note for later, which he is. Rossiter wants your reasoning in writing for morning conference, in the tone of a tailor measuring you for something. Down at the wharf, word gets round that the guvnor refused the haulier, and you are suddenly the only copper in London the picket will talk to.",
                "effects": {
                  "streets": 3,
                  "brass": -6
                },
                "goto": "docks_brazier",
                "delay": 1
              },
              {
                "label": "Ask him, pleasantly, what exactly is in the lorries",
                "result": "For one beat the charm goes somewhere else entirely. 'Pork,' says Mr Cray. 'Frozen. Danish.' He recovers beautifully and leaves cordially — and from the window you watch his drivers, on some signal, switch their engines off. Refrigerated boxes, motors dead, and not a drop of melt-water under one of them. Bream follows your eye. 'Warm pork, guv,' he says. 'Whatever next.'",
                "effects": {},
                "goto": "docks_manifest",
                "delay": 1
              },
              {
                "label": "Promise a 'review of the position' and get the phone down",
                "result": "Rossiter rings off unconvinced and Cray departs unswept, and for a long while nothing happens at all — which on this manor is the sound of something being arranged. The night gets on with getting worse.",
                "effects": {
                  "streets": -3,
                  "brass": -4
                },
                "goto": "docks_dawn",
                "delay": 2
              }
            ]
          },
          {
            "id": "docks_brazier",
            "title": "COCOA AND THE BRAZIER",
            "text": "At full strength the picket is less a mob than a parish: dockers three deep round the brazier, wives with greaseproof parcels, an accordion doing requests, and the Wimpy running relays of tea through the drizzle. Vic Parris, the union's district man, has arrived off the last bus to get his own wildcats back in the box before the national papers wake, and is discovering that nobody comes out for a sacked mate in order to be minuted back to work. 'They'll not listen to me, guvnor,' he says, sharing the shelter of the gatehouse. 'They'll listen to a fair {man}. God help the pair of us — tonight that appears to be you.' At the fire, Slade holds his tally book like a hymnal. Beyond the wire, Cray's drivers — hourly men with union cards of their own and no appetite for any of this — send across a delegate to ask if anyone can spare a light.",
            "choices": [
              {
                "label": "Round the brazier with the canteen urn — broker a dawn peace",
                "result": "Bream sends down the urn 'strictly against the cold', and over cocoa the shape of a peace assembles itself: Slade's case heard first thing Monday with Parris in the room, the picket down to a token six by Early Turn, the lorries to wait their turn at the day gate like everybody else. Nobody signs anything. Nobody has to. The accordion plays you out.",
                "effects": {
                  "streets": 9,
                  "brass": -5,
                  "relief": 4,
                  "dispatchUnits": 1,
                  "dispatchTurns": 3
                },
                "outcome": "Peace came up with the dawn at Thameshead Wharf — unsigned, unminuted, and honoured to the letter by every man who was never asked to put his name to it. Slade got his hearing, Parris got his wildcats home, the day gate opened on time, and the only paperwork the whole affair produced was a canteen chit for two gallons of cocoa. Upstairs called it going soft on a rabble. The manor called it policing, and remembered it.",
                "grade": "good",
                "sets": "dawn_peace"
              },
              {
                "label": "Stand back and give Parris his hour — union business first",
                "result": "Parris speaks well for a man being barracked in the language of the docks, but he is offering procedure and they want Ernie Slade's job back, and procedure never kept anybody warm. His hour empties like a glass. The wildcats stay out of the box, and the night hardens towards dawn.",
                "effects": {
                  "streets": -3
                },
                "goto": "docks_dawn",
                "delay": 2
              },
              {
                "label": "The tally book is the loose thread — put Hartle on it tonight",
                "result": "WPC Hartle sits on an upturned fish crate with the tally book and a torch while the picket, charmed to its boots, keeps her in tea. Every wrong weight is Cray Continental. Every one is manifested refrigerated. And every box beyond the wire stands bone dry with its motor off — which frozen pork, as three dockers immediately volunteer to depose, is not.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "goto": "docks_manifest",
                "delay": 1
              },
              {
                "label": "Withdraw to the nick — braziers burn out on their own",
                "result": "They don't; they get fed. Coal arrives by pram, then a soup arrangement, then a dartboard, and by the small hours the picket has a rota and the settled look of a village. Cray, ominously, has stopped ringing you altogether — which from a man with friends upstairs is not silence but dialling.",
                "effects": {
                  "streets": -7
                },
                "goto": "docks_dawn",
                "delay": 2
              }
            ]
          },
          {
            "id": "docks_manifest",
            "title": "LESS REFRIGERATED, MORE INTERESTING",
            "text": "It assembles on your desk like a hand of cards: Slade's tallies, Hartle's cross-checks, and the one detail every docker at that brazier will swear to — reefer boxes running a ton and a half light, bone dry, motors silent in weather that bites. The manifests say frozen Danish pork for the early markets. The collator says Cray's boxes come down from a bonded warehouse on the Clyde, booked for export — and export goods pay no duty, provided they actually leave the country. Sgt Bream sets down the cocoa with the wisdom of the ages: 'Pork wants cold, guv. Scotch only wants patience.' One wrinkle: half of Cray's queue really is pork — honest loads, honestly frozen, melt-water and all. The trick, as ever on this manor, is knowing which half. Meanwhile the picket line, without meaning to, has been doing Customs' work for it all night: nothing has left that gate since closing time.",
            "choices": [
              {
                "label": "Call in your marker with Customs and Excise — a rummage crew before the day gate opens",
                "result": "Your man arrives with a rummage crew and the quiet joy of his calling. The first box he chooses holds a courtesy layer of Danish pork over case upon case of bonded Scotch that left the Clyde, on paper, for Rotterdam. The picket watches the seals come off in church silence, then cheers like the Cup Final. Slade does not cheer. He checks the weight against his book, and nods.",
                "effects": {
                  "streets": 7,
                  "brass": 4,
                  "relief": 3,
                  "favours": -1
                },
                "outcome": "The lorries never needed to pass: Customs took the lot at the gate — Scotch, trailers, manifests, and in the fullness of time Mr Aldous Cray, whose friends upstairs all developed diary trouble the same week. The picket, having done the Crown's work by standing still, stood itself down with full honours, and Slade's tribunal now rests on a tally book the prosecution keeps borrowing. It cost you a marker you'd been saving for years. It bought you a manor that believes in you.",
                "grade": "good",
                "sets": "cray_manifest"
              },
              {
                "label": "Bolt-croppers at the gate — open a box yourself, in front of everybody",
                "result": "You pick the box Slade's book likes least and crop the seal before forty witnesses and one solicitor. Under a courtesy layer of Danish pork: bonded Scotch, stacked to the roof, bound on paper for Rotterdam and in practice for anywhere with a snug. The picket's cheer carries to the nick. The solicitor stops writing.",
                "effects": {
                  "streets": 8,
                  "brass": -6,
                  "relief": 4
                },
                "risk": {
                  "odds": 55,
                  "failResult": "The box you pick is pork to the back doors — honestly frozen, lawfully dull, steaming gently in the night air while Cray's solicitor takes the names of every officer present with terrible courtesy. Somewhere behind you a docker offers, kindly, that it was worth a go. The formal complaint reaches the Yard before the Early Turn does.",
                  "failEffects": {
                    "streets": -6,
                    "brass": -9
                  },
                  "failOutcome": "The box cropped before forty witnesses held honest Danish pork, gently steaming, while Cray's solicitor collected the name of every officer present with terrible courtesy. The Scotch rolled out by another gate, the strike folded for want of a villain, and the complaint reached the Yard before the Early Turn did.",
                  "failGrade": "poor"
                },
                "outcome": "Whisky under the pork, found by a duty officer with bolt-croppers and no warrant — the sort of policing that works precisely once, in front of exactly the right forty witnesses. Customs took the seizure over by first light and the strike folded along with the gate it no longer needed to hold. Upstairs cannot decide whether to discipline you or decorate you, and has settled, in the Met's grand tradition, for both.",
                "grade": "mixed"
              },
              {
                "label": "Show Cray the tally book — suggest his lorries develop engine trouble elsewhere",
                "result": "Cray reads two pages, closes the book, and thanks you for a most instructive evening. Before the brazier needs feeding again his lorries have gone — every box, honest pork and thirsty Scotch alike, threading away towards some gate with fewer scruples. 'You'll want for nothing, guvnor,' he says through the Jaguar window, and the worst of it is he means it.",
                "effects": {
                  "streets": -5,
                  "relief": -4,
                  "favours": 1
                },
                "outcome": "The lorries melted away, the picket stood down for want of an audience, and no cargo was ever examined by anybody. Ernie Slade stayed sacked. Aldous Cray now owes you a favour, and pays his debts the way weather pays farmers — abundantly, and never when it suits you. On the bad nights you'll tell yourself the gate stayed peaceful, and it did. That was never the question.",
                "grade": "poor"
              },
              {
                "label": "Minute it for the Fraud Squad's morning men",
                "result": "You write it up so beautifully it could be framed: tallies, weights, warehouse of origin, the lot. But bonded whisky is patient and Cray is patienter, and morning men, famously, arrive in the morning. The boxes at the gate settle down to wait you out.",
                "effects": {
                  "streets": -4,
                  "brass": 3
                },
                "goto": "docks_dawn",
                "delay": 2
              }
            ]
          },
          {
            "id": "docks_dawn",
            "title": "TOWARDS DAWN AT THE GATE",
            "text": "The night has dug in at Thameshead. The picket is twice the size and half the temperature, the accordion has gone home, and the brazier is down to its last pram-load of coal. Parris is hoarse. Slade stands where he stood at the start, tally book under his arm like a hymnal. Cray's queue has been joined by a second Jaguar containing a solicitor, and Rossiter has rung twice more, the second time not bothering with the pleasantries. At the wire, the picket captain and the hauliers' delegate are sharing the last of somebody's rum without quite meeting each other's eyes — both of them frozen, neither of them the villain of anything. Everything you might have done at closing time is still on offer towards dawn. At dawn prices.",
            "choices": [
              {
                "label": "The cocoa run, late — buy the peace at dawn prices",
                "result": "The urn goes down lukewarm and comes back empty, and the peace, when it finally assembles, is a thinner article than the one going spare at closing time: Slade's hearing 'considered', the picket down by half, the lorries released to the day gate with nobody the wiser about their cargo. Nobody signs anything. Nobody smiles either.",
                "effects": {
                  "streets": 5,
                  "brass": -7,
                  "relief": -4,
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "outcome": "A peace of sorts came up with the dawn — grudged on all sides and honoured out of exhaustion. The wharf went back, Slade's case went into the long grass of committees, and Cray's boxes rolled through the day gate unexamined, which is a sentence you will think about, later, more than once. The night's lesson, entered in no book: the same peace was on sale at closing time, cheaper.",
                "grade": "mixed"
              },
              {
                "label": "Sweep the gate — late, cold and mob-handed",
                "result": "The heavy mob against a frozen picket at first light is not a fight, it is a clearance, and everyone present will describe it with exactly that word. Three in the van, the brazier kicked into the dock, and the lorries through as the Early Turn arrives to watch in silence from the top of the road.",
                "effects": {
                  "streets": -10,
                  "brass": 6,
                  "relief": -9,
                  "arrests": 3,
                  "dispatchUnits": 3,
                  "dispatchTurns": 2
                },
                "outcome": "The gate was cleared towards dawn, at the hour when clearances look worst and photograph best. Cray's lorries left unexamined, three cold men were charged with obstruction, and the Chronicle's picture — a copper's boot and an overturned brazier — will outlive every officer in it. Rossiter's gratitude arrived by memo. The manor's answer will be arriving for years.",
                "grade": "poor"
              },
              {
                "label": "Spend the last marker: Customs at the gate before the Early Turn",
                "result": "Your man grumbles out of bed and arrives with the milk, rummage crew behind him, and the first box off Slade's list gives up its Scotch as the sun finds the cranes. The picket is too cold to cheer properly. It cheers anyway.",
                "effects": {
                  "streets": 4,
                  "brass": -3,
                  "relief": 3,
                  "favours": -1
                },
                "outcome": "Customs took Cray's Scotch at the gate with the Early Turn watching, so the lorries never passed and the strike folded standing up. It came late — the night had already banked its damage, and Slade's hearing owes more to the tribunal than to you — but the manor saw the wildcat vindicated and the haulier's manifest read out loud. A dear way to buy the right ending. Still the right ending.",
                "grade": "mixed"
              },
              {
                "label": "Hand the whole thing to the Early Turn with the tea",
                "result": "The Early Turn inspector listens to your handover the way a man listens to news of a bereavement — his own. Through the window the picket is singing again, thinly, and Cray's queue has begun, one by one, to reverse quietly out of the road towards gates unknown.",
                "effects": {
                  "streets": -8,
                  "brass": -6,
                  "relief": 3
                },
                "outcome": "The wildcat outlived your shift. Cray's boxes slipped away to a gate with fewer questions, Slade stayed sacked with his tally book still under his arm, and the peace at Thameshead became somebody else's to lose. The occurrence book shows, in your own hand, exactly when Thorne Street decided the whole thing would keep. It wouldn't, and it didn't.",
                "grade": "poor"
              }
            ]
          }
        ],
        "unresolvedOutcome": "The Thameshead wildcat was still burning at handover — brazier fed, gate shut, Cray's interesting cargo idling unexamined, and Ernie Slade sacked as ever. A peace nobody brokered is now the Early Turn's to lose, and the occurrence book knows exactly whose watch it was offered on."
      },
      {
        "id": "horse",
        "echoes": {
          "good": "THE MORNING AFTER \u2014 AGINCOURT PARADED AT MILFORD LANE THIS MORNING, GLEAMING, AS IF NOTHING HAD HAPPENED. MOUNTED BRANCH OWES THIS NICK SUGAR.",
          "mixed": "THE MORNING AFTER \u2014 THE CHRONICLE RUNS AGINCOURT JUDGING THE VEGETABLES ACROSS FIVE COLUMNS. MOUNTED BRANCH HAS FRAMED IT, PRIVATELY.",
          "poor": "THE MORNING AFTER \u2014 MOUNTED BRANCH RECOVERED THEIR OWN HORSE AND HAVE SAID SO, TO EVERYONE, INCLUDING THE COMMISSIONER'S OFFICE.",
          "unresolved": "THE MORNING AFTER \u2014 AGINCOURT STILL AT LARGE WITH THE DAIRY PONY. THE MILK IS LATE ACROSS THE MANOR, AND SO IS THE APOLOGY."
        },
        "title": "THE HORSE",
        "startTurn": 4,
        "stages": [
          {
            "id": "horse_gone",
            "title": "MOUNTED BRANCH — ONE GREY GELDING, MISSING",
            "text": "Sgt Bream puts his head round the door wearing the face he reserves for royalty and burst plumbing. Agincourt — eleven hundredweight of Mounted Branch grey with a service record longer than most sergeants' — has vanished from the Milford Lane stables. Gate open, straw disturbed, one nosebag missing. Inspector Cadby of Mounted Branch is at the front desk radiating cavalry fury and demanding discretion and results, in that order, while the station cat Regan takes one look at the proceedings and leaves through the hatch. Somewhere out in the fog is a horse who has carried the colour up the Mall, at large on your manor with an appetite.",
            "choices": [
              {
                "label": "Two crews out to quarter the ground, quiet as church",
                "result": "The pandas creep the backstreets at walking pace with their windows down, listening for hooves. PC Doyle reports the fog 'coming down like a fire curtain', which is Doyle's way of saying he'd rather be doing this in daylight.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "goto": "horse_sightings",
                "delay": 1
              },
              {
                "label": "Send WPC Hartle to read the stable yard before Cadby tramples it",
                "needsWpc": true,
                "result": "Hartle goes down with a torch and a tape measure and the particular calm of an officer who grew up around horses. Cadby objects to her on principle and is invited, politely, to hold the torch.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "goto": "horse_clue",
                "delay": 1
              },
              {
                "label": "Their horse, their gate — hand it back to Mounted Branch with compliments",
                "result": "Cadby receives the news like a man handed his own hat. Mounted Branch turn out in force and quarter your ground without once asking permission, which is a sentence you will shortly be rereading in report form.",
                "effects": {
                  "brass": -6,
                  "streets": -3
                },
                "outcome": "Mounted Branch found Agincourt themselves towards dawn, grazing the verge by the gasworks, and boxed him home without a word to Thorne Street. Their report — 'Security of Stabling, Milford Lane: Failings Observed' — reaches Commander Rossiter by morning with your nick's name in the second paragraph.",
                "grade": "poor"
              },
              {
                "label": "Log it and let him find his own way home — horses do",
                "result": "The occurrence book receives one line and the fog receives one horse. By the time the kettle has boiled twice, the front desk is taking sightings like a bookmaker.",
                "effects": {
                  "streets": -3
                },
                "goto": "horse_sightings",
                "delay": 2
              }
            ]
          },
          {
            "id": "horse_clue",
            "title": "WPC HARTLE READS THE YARD",
            "text": "Hartle reports back, notebook squared away. The gate was never forced: the latch was lifted by somebody who knew the trick of it and stands, on the evidence of the reach, no more than four feet tall. Sugar lumps trodden into the cobbles by the mounting block. One nosebag gone, and a line of small plimsoll prints leading off towards Fewter Street at a happy skip. Two further items for the pot: Meakin Salvage are rumoured to be settling a bet 'involving the Old Bill and livestock', and Bess — the dairy's float pony, two streets over — has been whinnying at the fog like a foghorn since the shift began. Cadby favours the scrapyard. Cadby would.",
            "choices": [
              {
                "label": "Put Hartle on the plimsoll prints and the sugar",
                "result": "Hartle follows the skip marks through the fog like a tracker, pausing at intervals to drop sugar lumps into an evidence bag she plainly regards as a formality.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "horse_girl",
                "delay": 1
              },
              {
                "label": "Spin Meakin Salvage over the bet",
                "result": "Old man Meakin, wounded to the soul at the suggestion, explains the bet concerned a greyhound and the Feathers' cellar steps and is in any case off. He then offers, unprompted, that one of his nephews saw 'a big grey feller' down by the towpath, standing very still.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 1,
                  "streets": 3,
                  "relief": -3
                },
                "goto": "horse_towpath",
                "delay": 1
              },
              {
                "label": "He'll be at the dairy mooning over Bess — wait him out there",
                "result": "You put your money on romance and wait for the dairy to telephone. The dairy does not telephone, because Bess and her float leave for the dawn rounds before it can, and Agincourt, it will turn out, has other appointments first.",
                "effects": {
                  "streets": -4
                },
                "goto": "horse_market",
                "delay": 2
              }
            ]
          },
          {
            "id": "horse_sightings",
            "title": "SIGHTINGS — A GREY IN THE FOG",
            "text": "The front desk has gone full turf accountant. Agincourt has been seen: in the doorway of Sudsy's launderette, steaming gently among the service washes; outside the Wimpy, drinking the fire bucket dry with the aplomb of a regular; and latest, on the towpath by Bagley's Wharf, 'looking at the water,' says the caller, 'like a man with regrets.' The Duke of Clarence reports him peering through the saloon window 'like he was barred once and remembers it.' Young Meech, the evening paper's stringer, has meanwhile taken up residence on the front bench composing headlines aloud — 'PHANTOM CHARGER TERRORISES BOROUGH' being, he concedes, a work in progress.",
            "choices": [
              {
                "label": "A crew to the towpath — no bells, no lights",
                "result": "PC Duffin proceeds at a crawl along the wharf road with his head out the window like a man crossing a minefield. The radio traffic is conducted entirely in whispers, which for B Relief is a first.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "horse_towpath",
                "delay": 1
              },
              {
                "label": "Square Meech — his editor owes you, and Meech owes his editor",
                "result": "One telephone call and Meech's masterpiece dies on the spike. In exchange for future considerations he throws in a fact for nothing: a little girl off Fewter Street has been begging carrot tops from his newsagent every evening for a month.",
                "effects": {
                  "favours": -1,
                  "brass": 3
                },
                "goto": "horse_girl",
                "delay": 1
              },
              {
                "label": "Eleven hundredweight of grey will keep till daylight",
                "result": "The sightings thicken with the fog. By the dead hour of the night he has been reported in three postal districts simultaneously, and Meech has moved on to composing the picture caption.",
                "effects": {
                  "streets": -5,
                  "brass": -3
                },
                "goto": "horse_market",
                "delay": 2
              }
            ]
          },
          {
            "id": "horse_towpath",
            "title": "THE TOWPATH — A GREY CONSIDERS THE WATER",
            "text": "There he is. Agincourt stands at the edge of the towpath by Bagley's Wharf, grey on grey in the fog, the missing nosebag lying empty on the stones beside him, looking at the black water like a man with regrets. He has carried the colour up the Mall; he has stood like masonry through jubilees and riots; now he watches the river as though it owes him money. A small and respectful crowd has collected along the wharf fence, and somewhere behind them a bicycle bell announces the press. One barge hooter, one wrong move, and eleven hundredweight of Crown property goes into the river — or through Chapel Yard at the trot.",
            "choices": [
              {
                "label": "Send for PC Whittle — two years with Mounted Branch before he saw sense",
                "result": "Whittle comes up the towpath at a stroll, says 'Evening, old son' as if resuming a conversation, and Agincourt's ears come round like signals dropping. The nosebag is refilled, the crowd is shooed, and two old colleagues start the long walk home.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2,
                  "relief": 3
                },
                "outcome": "Agincourt came home calm and unphotographed, walked through the fog to Milford Lane by PC Whittle — the one officer on the manor he trusts — the pair of them pausing once so the horse could inspect the launderette of his earlier acquaintance. Mounted Branch found him fed, watered and asleep in his stall, and could not find one word to say about it.",
                "grade": "good"
              },
              {
                "label": "Take the sugar from the canteen and walk out there yourself",
                "result": "He looks at you, looks at the water, and decides the sugar is the better argument. He takes it with the gravity of a bishop accepting a sherry and falls in beside you for the long walk home, and for one foggy half-mile you are, briefly, Mounted Branch.",
                "effects": {},
                "risk": {
                  "odds": 55,
                  "failResult": "A barge clears its throat off the wharf at the worst possible moment. Agincourt departs along the towpath at a trot that parts the crowd like the Red Sea — dignified, unstoppable, and bearing away towards Chapel Yard with the whole night's fog behind him.",
                  "failEffects": {
                    "streets": -5,
                    "relief": -3
                  },
                  "failGoto": "horse_market",
                  "failDelay": 1
                },
                "outcome": "Agincourt came home calm and unphotographed, walked through the fog to Milford Lane at the shoulder of a guvnor he had decided, on balance, to trust. Inspector Cadby said nothing, twice, which from Mounted Branch amounts to a citation.",
                "grade": "good"
              },
              {
                "label": "He's drinking, not drowning — let him get bored of the river",
                "result": "He gets bored of the river in the small hours, by which time he has followed the smell of greengrocery inland. The last witness to see him go says he moved 'with purpose, like a sergeant smelling bacon.'",
                "effects": {
                  "streets": -4,
                  "brass": -3
                },
                "goto": "horse_market",
                "delay": 1
              }
            ]
          },
          {
            "id": "horse_girl",
            "title": "SUGAR LUMPS — FEWTER STREET",
            "text": "The plimsoll prints end at the coal-yard gates behind Fewter Street, and so does the mystery. Maureen Meakin, nine years old and granddaughter to the entire scrapyard, sits on the wall in her school mac feeding Agincourt the last of a paper bag of sugar. She has been visiting him through the stable rails since the summer, she explains, because he looked lonely, and tonight she lifted the latch to take him to meet Bess from the dairy — only the fog came down, and they got lost, and he wouldn't be told. Agincourt, filling the coal yard like a battleship in a boating lake, has never looked less lost in his life. 'You needn't blame him,' says Maureen, with the Meakin jaw. 'It was my idea.'",
            "choices": [
              {
                "label": "Send for PC Whittle to walk him home, with Maureen seen to her gate first",
                "result": "Whittle arrives with the spare head-collar and greets Agincourt like a demobbed comrade. The procession forms up — horse, constable, and one small girl carrying the nosebag with both hands, escorted home first with full honours.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1,
                  "relief": 3
                },
                "outcome": "Agincourt came home calm and unphotographed, walked through the fog to Milford Lane by PC Whittle — the one officer he trusts — after seeing Miss Meakin to her door like a gentleman. Old man Meakin sent round a sack of carrots 'for the regiment' by way of settlement, and the stable gate now carries a bolt Maureen won't reach for two years at least.",
                "grade": "good",
                "sets": "agincourt_walked_home"
              },
              {
                "label": "She promised him Bess — let them say goodnight at the dairy first",
                "result": "You form up the smallest mounted escort in Met history and detour past the dairy, where Agincourt and Bess exchange the sort of look that gets public houses renamed. The detour costs the best of the darkness; towards dawn you are still three streets from Milford Lane, and the market men are setting up.",
                "effects": {
                  "streets": -3
                },
                "goto": "horse_market",
                "delay": 1
              },
              {
                "label": "Ring Milford Lane and let Mounted Branch collect their own",
                "result": "The horsebox arrives with Cadby up front wearing the expression of a man vindicated. Agincourt is boxed in front of Maureen, which nobody enjoys, and Cadby measures the coal-yard gate in a manner that bodes paperwork.",
                "effects": {
                  "brass": -5,
                  "relief": -3
                },
                "outcome": "Mounted Branch retrieved Agincourt themselves from a coal yard off Fewter Street, and Inspector Cadby's report — on the security of stabling at Milford Lane, 'and the divisional response generally' — reaches Commander Rossiter before your relief goes home. The horse was fine. The paperwork will outlive him.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "horse_market",
            "title": "TOWARDS DAWN — CHAPEL YARD MARKET",
            "text": "Towards dawn the fog thins over Chapel Yard Market to reveal the traders setting up around a Mounted Branch grey working down a line of cabbages with the air of a magistrate at a flower show. Bess's milk float stands abandoned mid-round so the two of them can commune over the winter greens; Nobby Hale is feeding Agincourt bruised apples 'to keep his strength up'; the barrow boys have taken to calling him 'the gaffer'. And young Meech is up a ladder screwing a flashbulb into his camera with the smile of a man watching his rent arrive. One photograph — that is all the evening paper needs — and everything about this becomes official.",
            "choices": [
              {
                "label": "Buy Meech's plate — the exclusive on the real story, later, in exchange",
                "result": "Meech comes down the ladder, hears the offer, and surrenders the plate with the reverence of a man trading a fiver for a tenner. Whittle appears through the thinning fog with a head-collar, and the market, to its everlasting credit, develops a collective blindness.",
                "effects": {
                  "favours": -1,
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "outcome": "Agincourt came home calm and unphotographed after all, walked out of Chapel Yard through the last of the fog by PC Whittle while forty stallholders studiously rearranged cabbages. Meech gets his exclusive on some future sinner, and Mounted Branch get their horse back fed to the gunwales and smelling faintly of apples, which they elect not to investigate.",
                "grade": "good"
              },
              {
                "label": "Let the borough have its moment — then walk him home through the cheers",
                "result": "The flashbulb catches Agincourt nose-deep in the marrows with one ear cocked to the crowd, and the market gives him the send-off normally reserved for royalty and relegated footballers. He leaves at the head of an escort of barrow boys, and Meech is already dictating the caption down the phone.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1,
                  "streets": 4,
                  "brass": -7,
                  "relief": 3
                },
                "outcome": "Agincourt was recovered towards dawn, photographed judging the vegetables at Chapel Yard Market's set-up — front page guaranteed, 'THE GAFFER PICKS HIS GREENS' already going to type. The borough loves it. The Yard does not, and Commander Rossiter's morning call opens with the words 'a circus, Inspector.'",
                "grade": "mixed",
                "sets": "agincourt_front_page"
              },
              {
                "label": "Stand well back and radio Mounted Branch to fetch their own",
                "result": "The horsebox noses through the stalls with Cadby up front, and Agincourt is retrieved by the book in front of the entire market, the flashbulb, and Bess. The crowd boos the horsebox. Meech photographs the booing.",
                "effects": {
                  "brass": -5,
                  "streets": -3
                },
                "outcome": "Mounted Branch retrieved Agincourt themselves from the middle of Chapel Yard Market, before a crowd and a camera, and Inspector Cadby's report on the security of stabling at Milford Lane — 'and the divisional response generally' — beat you to the Yard. The evening paper ran the booing. Nobody at Thorne Street comes out of the caption well.",
                "grade": "poor"
              }
            ]
          }
        ],
        "unresolvedOutcome": "Agincourt was still at large at first light, last seen sharing a nosebag with the dairy pony somewhere in the thinning fog. Mounted Branch found him within the hour, which was somehow worse, and the report on your stables security is already being typed."
      },
      {
        "id": "pools",
        "title": "THE POOLS WINNER",
        "startTurn": 3,
        "gradeFlags": { "good": "flag_pools_grateful" },
        "echoes": {
          "good": "THE MORNING AFTER — THE CHRONICLE RAN WILF MOTTRAM AT HIS GATE UNDER HOME SAFE. A CRATE OF LEMONADE ARRIVES FROM THE EAGLE WORKS, CARRIAGE PAID. BREAM IS RATIONING IT LIKE PLASMA.",
          "mixed": "THE MORNING AFTER — THE MOTTRAMS' CHEQUE CLEARED AND THE STREET PARTY RAN TO LUNCHTIME. THE CHRONICLE'S PICTURE HAD NO POLICE IN IT, WHICH UPSTAIRS IS CALLING MODESTY.",
          "poor": "THE MORNING AFTER — THE PICTURE THAT RAN WAS WILF MOTTRAM FRIGHTENED AT HIS OWN GATE. THE PRESS OFFICE WANTS A WORD ABOUT CROWD ARRANGEMENTS. BALACLAVA TERRACE WANTS THE BAND BACK.",
          "unresolved": "THE MORNING AFTER — THE POOLS MONEY STILL A RUMOUR IN A BISCUIT TIN, MR HERRING STILL IN THE WAITING ROOM, AND THE FRAYNES' CAR SEEN TWICE PAST NUMBER 11. BALACLAVA TERRACE ISN'T FINISHED."
        },
        "unresolvedOutcome": "The Mottrams' fortune was still a rumour in a biscuit tin at six — the street half party, half picket, the Fraynes unaccounted for, and Wilf checking padlocks at the Eagle works as though nothing had happened, because as far as anyone had managed to tell him, it hadn't. The day shift inherits the richest man on the manor, one collector asleep in the waiting room, and no plan.",
        "stages": [
          {
            "id": "pools_word",
            "title": "WORD IS OUT ON BALACLAVA TERRACE — THE POOLS HAVE COME UP",
            "text": "The desk takes three calls in ten minutes: the Chronicle, a woman claiming to be Wilf Mottram's sister from Rhyl, and finally Mrs Edie Mottram of 11 Balaclava Terrace, whispering with the lights off. The word is that Wilf's Treble Chance has come up — eight draws, the lot, a dividend the Chronicle man puts 'north of a hundred and eighty thousand pounds' in the tone of a man reporting a comet. Wilf himself is on nights at the Eagle Bottling Works and knows nothing about any of it. There are already nine people outside the house, two of them singing, one selling chips off a barrow. The chip man, at least, has a licence.",
            "choices": [
              {
                "label": "Two PCs to the door of number 11, and the street cleared politely.",
                "result": "Torchlight on Balaclava Terrace and the singing stops, out of respect or confusion. Mrs Mottram makes the PCs cocoa through the letterbox — she is not opening that door for anybody, and after forty years of Wilf's relations you can see her reasoning.",
                "effects": { "dispatchUnits": 2, "dispatchTurns": 2, "streets": -2, "brass": 2 },
                "goto": "pools_crowd",
                "delay": 1
              },
              {
                "label": "Ring the Chronicle and deny everything — costs nothing, buys an hour.",
                "result": "The night editor hears out your denial with the warm patience of a man holding tomorrow's front page. 'Course it's rubbish, Inspector. We're running it as rubbish. RUBBISH, SAYS LAW is the headline.' You have bought, on reflection, rather less than an hour.",
                "effects": {},
                "goto": "pools_crowd",
                "delay": 2
              },
              {
                "label": "Get the pools man out of bed — the coupon is the thing worth guarding.",
                "result": "The Consolidated Pools collector, a Mr Herring, is raised by telephone. He confirms nothing, denies nothing, and says he'll come to the nick directly with 'the paperwork' — which arrives an hour later in a Peek Frean's biscuit tin, carried with both arms.",
                "effects": {},
                "goto": "pools_agent",
                "delay": 1
              }
            ]
          },
          {
            "id": "pools_agent",
            "title": "MR HERRING AND THE BISCUIT TIN",
            "text": "Mr Herring sets the tin on the front desk and steps back as though it might go off. Inside: the coupon, Wilf's, eight draws, initialled and witnessed — worth, and Mr Herring says the figure the way other men name a ship that went down, one hundred and eighty-six thousand pounds. Consolidated's rules want it verified at the regional office by nine tomorrow; Mr Herring's Morris won't start; and half the manor now knows what's in the tin. Sgt Bream has already moved it off the desk on the grounds that the desk is for occurrences, and this is one.",
            "choices": [
              {
                "label": "Coupon into the property store, booked like evidence, receipt to Herring.",
                "result": "The tin goes into the property store between a stuffed pike and last month's seized fireworks, entered in the book as ONE (1) TIN, BISCUIT, CONTENTS DOCUMENTARY. Mr Herring sleeps in the waiting room with his hat over his eyes, a happy man relieved of command.",
                "effects": {},
                "goto": "pools_works",
                "delay": 1
              },
              {
                "label": "Run Herring and the tin to the regional office now — one PC, no lights.",
                "result": "The tin travels across the river like royalty in disguise. At the regional office a man in a cardigan counts the crosses twice and goes greyer with each pass. It is real. There is a telephone call to be made now, and only Thorne Street knows where Wilf actually is.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 2, "brass": 2 },
                "goto": "pools_works",
                "delay": 1
              }
            ]
          },
          {
            "id": "pools_crowd",
            "title": "BALACLAVA TERRACE GETS FESTIVE, THEN LESS SO",
            "text": "By the second editions the street outside number 11 is a party: an accordion, a rope of fairy lights run off next door's meter, a man selling photographs of Wilf that are in fact photographs of a different, better-looking man. Mrs Mottram's lights stay off. On the corner, keeping clear of the fairy lights, the Frayne brothers are watching the house with their hands in their pockets, and nobody sings near them. The whole business is one bottle away from a very long night.",
            "choices": [
              {
                "label": "Clear the street now — firm, loud and all at once.",
                "result": "Done with two whistles and the accordion confiscated for its own safety. The street empties in the good-natured way of a crowd with somewhere warmer to be, and the Fraynes leave last, unhurried, like men who have seen what they came to see.",
                "effects": { "dispatchUnits": 2, "dispatchTurns": 2 },
                "risk": {
                  "odds": 60,
                  "failResult": "The crowd is merry and will not be herded — the accordion strikes up again as a protest song, a barrow goes over, and in the confusion the corner empties. The Fraynes have gone, and not home.",
                  "failEffects": { "streets": -4 },
                  "failGoto": "pools_snatch"
                },
                "goto": "pools_works",
                "delay": 1
              },
              {
                "label": "Let it sing — lean on a lamppost and let the party tire itself out.",
                "result": "Policing by leaning. The accordion man plays until two, the chip barrow does the trade of its life, and the crowd polices itself the way a wedding does — noisily, with occasional weeping. The Fraynes, watched steadily from your side of the street, get bored first.",
                "effects": {},
                "goto": "pools_works",
                "delay": 2
              },
              {
                "label": "Move the Fraynes on — just the Fraynes, and let the party stand.",
                "result": "'Evening, Kenneth. Evening, Maurice. Long way from the arches.' The Fraynes agree pleasantly that it is, and go. Nobody believes any of it, least of all you. Somewhere behind the party, a back gate clicks.",
                "effects": {},
                "goto": "pools_snatch",
                "delay": 1
              }
            ]
          },
          {
            "id": "pools_works",
            "title": "TELLING WILF — NIGHTS AT THE EAGLE BOTTLING WORKS",
            "text": "Wilf Mottram is found on his two o'clock round of the Eagle Bottling Works, torch in hand, trying padlocks that have never once been other than locked. He is sixty-one, has done nights since the Coronation, and takes the news of one hundred and eighty-six thousand pounds the way he would take word of a broken pallet: 'Right. Who's told Edie?' Then he sits down quite suddenly on a crate of lemonade and asks if anyone has a mint. He will not leave before six — 'I'm paid to six' — and the works has one gate, one Wilf, and, as of tonight, one very good reason to visit.",
            "choices": [
              {
                "label": "Sit with him to six — the nick minds the gate tonight.",
                "result": "Wilf does his rounds with a PC for company, presenting each padlock like a medal. At four he says 'Edie always said check the coupon Thursdays' and goes quiet for a lap. At five he tries the last lock twice. Paid to six, worked to six.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 4, "relief": -2 },
                "goto": "pools_dawn",
                "delay": 2
              },
              {
                "label": "Leave him to his rounds — the fewer lights here, the safer he is.",
                "result": "The works stays dark and Wilf stays in it, the richest night watchman in England guarding lemonade with a torch. It has the logic of the manor about it: the safest place for a man is the one place nobody would believe he'd be.",
                "effects": {},
                "goto": "pools_dawn",
                "delay": 2
              },
              {
                "label": "Fetch Edie to him in the van — they hear it together or not at all.",
                "result": "Mrs Mottram crosses her own street under a PC's coat, past her own party, unrecognised. In the gatehouse of the Eagle works, by the light of a paraffin heater, Wilf tells his wife they are rich, and Edie says what she has said to forty years of Wilf's news: 'You'll want your tea, then.'",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 2, "relief": 2 },
                "goto": "pools_dawn",
                "delay": 1
              }
            ]
          },
          {
            "id": "pools_snatch",
            "title": "THE FRAYNES GO IN THE BACK OF NUMBER 11",
            "text": "The click of the back gate was Maurice Frayne, and Kenneth is at the mouth of the alley with the engine running. What they are after is anyone's guess — the coupon is nowhere near the house, but the Fraynes don't know that, and Mrs Mottram, who has stopped whispering, can be heard from the street explaining matters to Maurice through the scullery door in terms the accordion man is already setting to music. There is a short window in which this is a burglary in progress and not something worse.",
            "choices": [
              {
                "label": "Take the alley, both ends, now.",
                "result": "Torches at both ends and no ceremony. Maurice comes quietly; Kenneth reverses into a coal shed and surrenders to the coal. Two Fraynes in the van, the scullery door intact, and Mrs Mottram asking through the letterbox whether anyone wants cocoa. The street applauds like it's the pictures.",
                "effects": { "dispatchUnits": 2, "dispatchTurns": 2, "arrests": 2, "streets": 3 },
                "risk": {
                  "odds": 55,
                  "failResult": "Kenneth sees the torches and leans on the horn; Maurice comes over the wall like a salmon going upstream, and the pair are away through the arches — gone, empty-handed, with the whole street watching them run.",
                  "failEffects": { "streets": -3, "brass": -2 }
                },
                "goto": "pools_dawn",
                "delay": 1
              },
              {
                "label": "Talk Maurice out through the scullery door — Edie's half done it already.",
                "result": "You conduct the negotiation through a letterbox with Mrs Mottram as interpreter, a role she performs without mercy. Maurice wilts under the two voices, comes out backwards with his hands up, and asks to be arrested somewhere quieter. Kenneth, hearing every word of it, drives off alone.",
                "effects": { "arrests": 1, "brass": 2 },
                "goto": "pools_dawn",
                "delay": 1
              },
              {
                "label": "Stand off and let them find nothing — the coupon is miles away.",
                "result": "The Fraynes take the house apart softly and leave with a carriage clock they will be ashamed of by Tuesday. Word goes round by milk float that Thorne Street watched it happen, which is not quite true and entirely believed.",
                "effects": { "streets": -3 },
                "goto": "pools_dawn",
                "delay": 1
              }
            ]
          },
          {
            "id": "pools_dawn",
            "title": "SIX O'CLOCK ON BALACLAVA TERRACE",
            "text": "The night ends the way the borough's nights end, with milk floats. Wilf clocks off at six exactly, initials the book, and walks home into a street that starts applauding at the corner and does not stop. Mr Herring is on the doorstep with the tin. The Chronicle man is on the wall with a photographer. Somewhere close, a brass band that owes somebody a favour is assembling. Wilf stops at his own gate, surveys all of it, and turns to the nearest uniform for instructions, out of habit.",
            "choices": [
              {
                "label": "Walk him in yourself — the nick delivers its man to his own door.",
                "result": "Ten past six, and the guvnor walks the richest man on the manor the last thirty yards of his shift.",
                "effects": { "brass": 3, "relief": 2 },
                "outcome": "Wilf Mottram came home at ten past six with a police escort he never asked for and never needed — to a wife, a biscuit tin, and one hundred and eighty-six thousand pounds. The Chronicle's picture, Wilf at his gate with Edie in the doorway holding the teapot, ran under HOME SAFE, and for once the borough agreed with a headline.",
                "grade": "good"
              },
              {
                "label": "Keep uniforms out of the photograph — their morning, not ours.",
                "result": "You watch it from the corner, hands behind your back, professionally invisible.",
                "effects": {},
                "outcome": "Wilf and Edie had their morning to themselves, or as much of it as a street, a band and the Chronicle allowed. Thorne Street stayed out of the pictures, which upstairs calls modesty when it works and invisibility when it doesn't. The tin was opened at nine; the figure was real; the chip man came back for the lunchtime trade.",
                "grade": "mixed"
              },
              {
                "label": "Move the presentation into the works canteen — control it, dodge the press.",
                "result": "A quiet word with Mr Herring, a quieter one with the works manager, and the whole circus is steered off the doorstep.",
                "effects": {},
                "risk": {
                  "odds": 45,
                  "failResult": "The pools people will not budge — 'the doorstep photograph is traditional' — and the argument strands Wilf at his gate half an hour while the crowd thickens and a fainter goes into the hedge.",
                  "failEffects": { "streets": -3 },
                  "failOutcome": "The doorstep did for it: half six became seven, the crowd became a crush, the hedge claimed two fainters and a photographer, and the picture that ran was Wilf looking frightened at his own front gate. The money was real all the same; the morning was not what it should have been, and Balaclava Terrace blames the band.",
                  "failGrade": "poor"
                },
                "outcome": "The cheque changed hands in the canteen of the Eagle Bottling Works, between the tea urn and a wall of lemonade, with the night shift as witnesses and the press at the gate. Wilf shook every hand in the room, Edie held the tin, and the borough got its story anyway — it always does — but it got it warm.",
                "grade": "good"
              }
            ]
          }
        ]
      }
    ],
    "notices": [
      {
        "id": "notice_fog",
        "effect": "EVERY DISPATCH OUT HALF AN HOUR LONGER",
        "title": "Fog on the river",
        "text": "A proper pea-souper coming up off the reach by midnight, Division advises. Anything you send out is out the longer for it — allow an extra half hour on every job, and don't expect the vans to hurry.",
        "mods": { "dispatchExtra": 1 }
      },
      {
        "id": "notice_early_van",
        "good": true,
        "effect": "CELLS EMPTIED AT 0400",
        "title": "The van runs early",
        "text": "Bow Street's van is doing a double run tonight and will call at FOUR o'clock as well as six. Anything in the cells at four goes to court on the early run — book accordingly.",
        "mods": { "vanAt": 13 }
      },
      {
        "id": "notice_court_warning",
        "effect": "FIRST PC ON THE BOARD HELD UNTIL 0030",
        "title": "Warned for court",
        "text": "The first name on the board is warned for the Crown Court in the morning and is to spend the front of the night on the case papers: not to be used before half past midnight, by order of the Chief Superintendent.",
        "mods": { "seizeOne": 6 }
      },
      {
        "id": "notice_overtime_ban",
        "effect": "RELIEF FALLS 1 FASTER PER TURN AFTER 0300",
        "title": "Federation overtime ban",
        "text": "The Federation's work-to-rule begins at midnight. After three, the relief go home in their heads an hour before their boots do — patience will wear doubly thin in the small hours.",
        "mods": { "reliefLateExtra": 1 }
      },
      {
        "id": "notice_payday",
        "effect": "STREETS FALL 1 FASTER PER TURN, MIDNIGHT TO 0330",
        "title": "Payday on the docks",
        "text": "The docks paid out at five and the manor is drinking its wages. Expect the front of the night loud and the small hours worse — the streets will run down harder than usual until three.",
        "mods": { "streetsPeakExtra": 1 }
      },
      {
        "id": "notice_boiler",
        "good": true,
        "effect": "RELIEF +6 AT PARADE",
        "title": "The boiler is mended",
        "text": "The station boiler, dead since Whitsun, has been mended by a man from the Receiver's office who asked for nothing but tea. The nick is warm for the first time in living memory and the relief parade in shirtsleeves, morale visibly up.",
        "mods": { "reliefStart": 6 }
      },
      {
        "id": "notice_security_alert",
        "effect": "FIRST PC ON THE BOARD ON STATIC POINT UNTIL 0100",
        "title": "Security alert — the season we're in",
        "text": "Division's assessment sheet, read at parade without editorial: an Irish Republican Army Active Service Unit is believed operating south of the river, and static points on the telephone exchange and the gasworks are doubled until further notice. The first name on the board stands the exchange until one o'clock, with a torch, a whistle, and instructions that boil down to: be seen, stay awake, and telephone if the season arrives.",
        "mods": { "seizeOne": 7 }
      },
      {
        "id": "notice_roadworks",
        "effect": "EVERY DISPATCH OUT HALF AN HOUR LONGER",
        "title": "The High Street dug up",
        "text": "The Gas Board has opened a trench across the junction of High Street and Marsh Lane, and the diversion routes everything past the cemetery. Whatever you send anywhere goes the long way round, and comes back the same.",
        "mods": { "dispatchExtra": 1 }
      },
      {
        "id": "notice_bridge_shut",
        "effect": "EVERY DISPATCH OUT A FULL HOUR LONGER",
        "title": "The bridge is shut",
        "text": "The road bridge is closed overnight for inspection after a coal barge made its acquaintance on the afternoon tide. Everything south of the water is reached by the loop road only. Allow a full hour extra on every job, and warn the vans not to argue with the signage.",
        "mods": { "dispatchExtra": 2 }
      },
      {
        "id": "notice_panda_workshop",
        "effect": "EVERY DISPATCH OUT HALF AN HOUR LONGER",
        "title": "A panda in the workshop",
        "text": "One of the pandas is up on the ramp at the divisional workshop having its clutch seen to, the fitter having pronounced the word 'Tuesday' with some relish. Half the ground gets covered on foot tonight, and foot is slower.",
        "mods": { "dispatchExtra": 1 }
      },
      {
        "id": "notice_boxing_baths",
        "effect": "STREETS FALL 1 FASTER PER TURN, MIDNIGHT TO 0330",
        "title": "Boxing at the Baths",
        "text": "Fight night at the Public Baths: eight bouts, a disputed decision guaranteed, and the whole card turning out onto the pavement around half past eleven with strong views. The small hours will run hotter than usual.",
        "mods": { "streetsPeakExtra": 1 }
      },
      {
        "id": "notice_derby_eve",
        "effect": "STREETS FALL 2 FASTER PER TURN, MIDNIGHT TO 0330",
        "title": "Derby eve",
        "text": "The derby is tomorrow at three, and both ends of the argument are drinking on the manor tonight. Division advises that the pubs will not so much close as detonate. Expect the streets to run down hard until half three.",
        "mods": { "streetsPeakExtra": 2 }
      },
      {
        "id": "notice_fair_common",
        "effect": "STREETS FALL 1 FASTER PER TURN, MIDNIGHT TO 0330",
        "title": "Last night of the fair",
        "text": "The fair on the common strikes its tents tonight, which means the takings, the drink and every grievance of the week all leave the ground at the same hour. The waltzer men and the local lads have unfinished business from Wednesday.",
        "mods": { "streetsPeakExtra": 1 }
      },
      {
        "id": "notice_canteen_shut",
        "effect": "RELIEF FALLS 1 FASTER PER TURN AFTER 0300",
        "title": "Canteen condemned",
        "text": "The Health Inspector has condemned the canteen — the word 'ecosystem' appears in his report — and it is shut until further notice. No hot refs on the premises tonight. Men fed from a van in the yard grow philosophical by three and mutinous by four.",
        "mods": { "reliefLateExtra": 1 }
      },
      {
        "id": "notice_kit_inspection",
        "effect": "RELIEF FALLS 2 FASTER PER TURN AFTER 0300",
        "title": "Kit inspection at nine",
        "text": "The Chief Superintendent inspected kit at nine this morning, which had the whole relief up pressing tunics on what should have been their sleep. They parade correct to the last button and dead behind the eyes. The small hours will collect the debt.",
        "mods": { "reliefLateExtra": 2 }
      },
      {
        "id": "notice_photofit",
        "effect": "FIRST PC ON THE BOARD HELD UNTIL 2330",
        "title": "Sitting with the artist",
        "text": "The first name on the board witnessed Friday's snatch on the parade of shops and is warned to sit with the photofit artist from ten. The artist works at his own pace, which is geological. Not to be used before half past eleven.",
        "mods": { "seizeOne": 4 }
      },
      {
        "id": "notice_blood_run",
        "effect": "FIRST PC ON THE BOARD HELD UNTIL 0000",
        "title": "The blood run",
        "text": "The divisional blood donor session runs late tonight and Thorne Street's quota is one body: the first name on the board gives a pint at ten and sits with a biscuit until the nurse is satisfied, which by reputation is midnight.",
        "mods": { "seizeOne": 5 }
      },
      {
        "id": "notice_aid_central",
        "effect": "FIRST PC ON THE BOARD HELD UNTIL 0130",
        "title": "Aid to Central",
        "text": "Central has called for aid: a torchlight procession of some description is dispersing badly around the Embassy quarter. The first name on the board goes up on the coach and comes back when Central has finished with him — call it half past one.",
        "mods": { "seizeOne": 8 }
      },
      {
        "id": "notice_middle_van",
        "good": true,
        "effect": "CELLS EMPTIED AT 0230",
        "title": "A middle run",
        "text": "Bow Street's van is running a middle turn tonight to clear a backlog and will call at HALF PAST TWO. Anything in the cells goes on it. A rare mercy — book with confidence in the front half of the night.",
        "mods": { "vanAt": 10 }
      },
      {
        "id": "notice_pay_award",
        "good": true,
        "effect": "RELIEF +5 AT PARADE",
        "title": "The pay award",
        "text": "The Police Council settlement made the evening editions, and for once the arithmetic favours the boots. The relief parade having all read the same paragraph twice, and the word 'backdated' moves among them like a rumour of spring.",
        "mods": { "reliefStart": 5 }
      },
      {
        "id": "notice_darts_shield",
        "good": true,
        "effect": "RELIEF +7 AT PARADE",
        "title": "The darts shield comes home",
        "text": "Thorne Street's team took the divisional darts shield off Central last night, in Central's own canteen, in front of Central's own Commander. The shield is on the parade room wall, crooked, magnificent. Morale has not been higher since the boiler was last working.",
        "mods": { "reliefStart": 7 }
      },
      {
        "id": "notice_wedding_cake",
        "good": true,
        "effect": "RELIEF +6 AT PARADE",
        "title": "Cake in the parade room",
        "text": "One of the Early Turn married on Saturday, and by station custom the top tier but one stands in the parade room under a tea towel, defended by nobody. The relief book on with icing on their chinstraps and charity in their hearts.",
        "mods": { "reliefStart": 6 }
      },
      {
        "id": "notice_set_rain",
        "good": true,
        "effect": "STREETS +4 AT PARADE",
        "title": "Rain set in for the night",
        "text": "Steady, vertical, committed rain since teatime, forecast through to morning. Nothing empties a street corner like weather with intentions. The manor books on quiet, its villainy indoors watching the window like everybody else.",
        "mods": { "streetsStart": 4 }
      },
      {
        "id": "notice_palais_dark",
        "good": true,
        "effect": "STREETS +6 AT PARADE",
        "title": "The Palais is dark",
        "text": "The Palais is shut for rewiring after Saturday's incident with the glitter ball, and its Friday crowd has nowhere to be. Half the manor's regular grief starts in that queue or ends in it. Tonight the queue does not exist.",
        "mods": { "streetsStart": 6 }
      },
      {
        "id": "notice_big_fight",
        "good": true,
        "effect": "STREETS +3 AT PARADE",
        "title": "The big fight on the box",
        "text": "The heavyweight title fight is live from Las Vegas at eleven, and every set on the manor is warm. Villainy, like everyone else, has a corner it wants to see. Expect the streets quiet at least until somebody's telly lets them down.",
        "mods": { "streetsStart": 3 }
      },
      {
        "id": "notice_hollis_lifted",
        "good": true,
        "effect": "STREETS +6 AT PARADE",
        "title": "The Hollis firm lifted",
        "text": "The Regional Crime Squad took the Hollis brothers off the plot this afternoon, warrants and all. The manor's busiest firm is remanded in somebody else's cells for once, and the streets book on quieter than they've been since August.",
        "mods": { "streetsStart": 6 }
      }
    ],
    "meterEndings": {
      "streets": "By four o'clock this morning the manor had stopped pretending. The Duke of Clarence is minus its windows, three police vehicles are minus their hubcaps — some tea-leaf's finest hour, and on your ground — and a crowd outside the Wimpy Bar spent the small hours chanting, it is reported, on the subject of justice and scampi. Traffic Division would not come south of the canal. When the Commander asked you, at ten past five, precisely when you had lost control of your borough, you are recorded as consulting your watch and offering him 'October'. This office has checked. It was last night, and it was yours.",
      "brass": "Commander Rossiter attended your station at six o'clock in full uniform — an hour at which full uniform has only the one meaning — carrying a manila envelope it had taken your single night to fill. Words were used in that room which this office does not commit to paper twice; 'judgement' was among them, and 'the Commissioner's breakfast', at which meal the matter was in fact raised. Sergeant Bream took your keys, it is reported, with the tenderness of an undertaker, which is more feeling than the file shows you anywhere else. As you left the building the teleprinter was chattering again. You are said to have remarked that it was, at last, somebody else's problem. On that single point, Inspector, this office finds your judgement sound.",
      "relief": "At one o'clock Sergeant Bream reported a bad back, an article which twenty years of medical records show Sergeant Bream has never possessed. By three, eleven of your officers were off with a flu that spread by rota, and two more were on aid to a division nobody has since been able to name. You finished the night alone — front desk, radio, your own tea — entering a drunk and disorderly in the book in your own hand while the prisoner asked, reasonably in this office's view, whether anybody else worked there. The Early Turn found you at six, guarding an empty station. A relief is not equipment, Inspector: it does not wear out. It is spent. Last night it was spent by you."
    },
    "debriefs": [
      {
        "minAvg": 58,
        "title": "COMMENDATION",
        "text": "Six o'clock, and the tea tastes almost like tea. Commander Rossiter appears in person, which normally means a funeral, but this time he shakes your hand for a full second and says 'tidy night's work' as if the words cost money. There's talk of a mention in Orders. The Early Turn file in to find B Relief looking insufferably smug, and Sgt Bream informs them, at volume, that this is what proper coppering looks like. On your way out he calls you 'guv' with something perilously close to warmth. Go home. Sleep the sleep of the improbably vindicated."
      },
      {
        "minAvg": 0,
        "title": "A GRUDGING NOD",
        "text": "Dawn finds the nick intact and the paperwork merely alarming. The Superintendent skims the night's log, notes that every collar appears to have stuck, sniffs, and delivers the Met's highest working honour: 'Could've been worse.' The relief shuffle off to their beds with most of their limbs and some of their dignity. Sgt Bream leaves you the last digestive, which from Bream is a twenty-one-gun salute. You'll be back at ten tonight to do it all again, and honestly, you can think of worse ways to earn a pension. Just."
      }
    ],
    "quietChoices": {
      "relief": [
        {
          "label": "Brew up for the lads",
          "result": "Tea the colour of creosote, all round. Morale visibly improves."
        },
        {
          "label": "Send a body to the chippie while it's slack",
          "result": "Back inside ten minutes with five of chips and a rumour from the fryer worth more than the change. The parade room smells of vinegar and contentment."
        },
        {
          "label": "Let the lads get a card game going in the snooker room",
          "result": "Half an hour of cards for matchsticks. Bream wins with the serenity of a man who always wins, and the relief goes back out square with the world."
        },
        {
          "label": "Dig out the good biscuits — the ones kept in the safe",
          "result": "Garibaldis of evidential quality. Nothing is said, but the night improves at the exact speed of a tin going round the parade room."
        },
        {
          "label": "Take a screwdriver to the tea urn — it's been leaking since Tuesday",
          "result": "Twenty minutes of surgery and it runs hot enough to strip paint. For the rest of the night the relief treats you, quietly, like a faith healer."
        }
      ],
      "brass": [
        {
          "label": "Catch up on the paperwork",
          "result": "Two hours of overdue crime sheets done in thirty minutes. The Chief Inspector will never know how close it was."
        },
        {
          "label": "Get the occurrence book up to the minute, best hand",
          "result": "Every entry timed, initialled and ruled off. Somewhere at the Yard, an inspection that would have found fault next month now won't."
        },
        {
          "label": "Answer the Commander's memo from Tuesday — the one you've been dodging",
          "result": "Three drafts, one page, no hostages. It reads like a {man} with nothing to hide, which upstairs will find suspicious in the most reassuring way."
        },
        {
          "label": "Ring the Yard's night duty officer for a friendly word",
          "result": "Ten minutes of shop, one favour neither of you names, and Thorne Street's stock rises a point on the fifth floor without anything so vulgar as a request."
        },
        {
          "label": "Audit the property store against the ledger",
          "result": "Forty minutes among labelled string and other men's umbrellas, and it tallies — which, in a property store, is the stuff of legend and letters of appreciation."
        }
      ],
      "streets": [
        {
          "label": "Walk the ground yourself",
          "result": "You show the flag down the high street. Two scallywags change their plans for the evening."
        },
        {
          "label": "Take the area car round the manor at walking pace",
          "result": "Headlights off down the rough ends, window down, elbow out. By the second circuit the word is round that the guvnor's abroad, and three plans for the small hours quietly dissolve."
        },
        {
          "label": "Stand ten minutes outside the Feathers at closing",
          "result": "You say nothing, note nothing, and move nobody on. The pub empties like a church. It is the cheapest public order operation in the history of the Force."
        },
        {
          "label": "Rattle the padlocks down Corporation Row",
          "result": "Every chain gets a pull and every yard gate a shoulder. One is open that shouldn't be; it gets locked, and somebody's grubby little plan for two a.m. dies of it."
        },
        {
          "label": "Put the beat men on each other's grounds for an hour — fresh eyes",
          "result": "Fresh eyes on stale streets: inside the half hour a jemmied window that familiarity had walked past twice is found, boarded and booked."
        }
      ]
    },
    "quietTurns": [
      "Half an hour passes in which the only crime on the manor is Sgt Bream's pools coupon. He has Thorne Athletic down for an away win. You point out Thorne Athletic haven't won away since the Coronation. He licks his pencil and says that's exactly why they're due.",
      "Nothing on the printer. Nothing on the phones. The station cat, Regan, patrols the charge room with the unhurried menace of a guvnor doing rounds. He inspects the cells, finds them acceptable, and falls asleep on the lost property ledger. Nobody dares move him. Nobody has, since 1971.",
      "A quiet half hour, broken only by the discovery that someone has been at the biscuit fund. Sgt Bream opens an investigation with more rigour than he's shown any burglary this year. Three suspects, two shaky alibis, one custard cream unaccounted for. PC Duffin has form for this — two previous, both involving garibaldis. It will never come to trial.",
      "The only sound in the nick is the drunk in Cell Two working through the complete songbook of the music halls. He's not bad, actually. By the second chorus of 'Nellie Dean' the probationer is humming along, and Sgt Bream has to have a word with himself.",
      "A straight goer comes to the front desk to report a lost umbrella. It emerges, under gentle questioning, that he lost it in 1968. In Margate. He just happened to be passing and thought he'd ask. PC Duffin takes down the particulars anyway. It passes the time.",
      "The lights go out — the substation again — and the nick runs on candles for twenty minutes. It's oddly peaceful. The teleprinter sulks in the dark. Somebody produces a mouth organ; somebody else, with more authority, produces the word 'don't'. The lights return to a low groan of disappointment.",
      "CID have all gone home, or to wherever CID go, leaving their office locked, their bottom drawer more locked still, and a note on the door reading 'WOODEN-TOPS KEEP OUT'. The relief speculate quietly about the drawer. Scotch, says one. Evidence, says another. Sgt Bream says the two are not mutually exclusive, and closes the subject.",
      "Half an hour of nothing, so the canteen dartboard comes into play. House rules: nearest the bull picks who does the four o'clock calls. PC Duffin, a man who once missed the board and hit a radiator, is tonight throwing like an angel. Suspicion is general. There is loose talk of doing him on sus.",
      "Peace, of a kind. The probationer is totting up the property book and has arrived at a figure that cannot exist in decimal currency or any other. Sgt Bream converts it back into old money, gets a different impossible figure, and rules that the book is correct and reality mistaken.",
      "The radio goes so quiet you check it's on. Out there the fog has swallowed the manor whole, and presumably the villains with it. Panda 3 calls in just to hear a human voice. You tell them to proceed. They ask where. You tell them to use their imagination.",
      "Someone's wife has sent in a fruitcake, and for thirty blessed minutes the nick is united in a way the Home Office could never legislate. Even the drunk in Cell One gets a slice, on the grounds that it's Christmas somewhere. It isn't. It's November. Nobody checks.",
      "Quietest half hour of the night. PC Duffin licks his way through three books of Green Shield stamps at the front desk, saving, he confides, for a fondue set. Sgt Bream asks what a fondue is. Duffin doesn't know. He just knows he wants one.",
      "Nothing doing, so the relief takes on the Chronicle crossword as a body. Fourteen across: habitual offender, five letters. Everyone has a name for it, none of them fit, and two are actionable. Sgt Bream writes in MEAKIN anyway, the last two letters sharing a square.",
      "A wasp, in November, from nowhere anyone can name, takes an interest in the charge book. Work stops. PC Doyle stalks it the length of the counter with a rolled Police Gazette. It leaves by the crack it came in by, unnicked. The relief agree it had inside help.",
      "The new panda arrives from the distributors, and for half an hour the relief file out in twos to smell it. New rubber, warm vinyl, a heater that heats. PC Whittle sits in it without going anywhere. Sgt Bream predicts ruin by Christmas, and calls first go.",
      "The probationer takes his first turn on the switchboard and connects a lady reporting a prowler to the Wimpy, the Wimpy to Traffic Division, and Traffic Division to itself, twice. WPC Hartle watches with the serenity of a woman observing history. Nobody who mattered was on the line. Probably.",
      "Regan the station cat comes in through the yard window carrying half a kipper of unknown provenance and lays it on the duty rota with the air of a snout expecting payment. Sgt Bream books it into property, thinks better of that, and books it back out to Regan.",
      "In lost property, unclaimed since June: one banjo. PC Doyle can play it, in the sense that a man can fall downstairs. Three numbers in, a drunk bangs on his cell door demanding the first tune again or a solicitor. The banjo is ruled lost again, permanently.",
      "Somebody has started the canteen jigsaw again — a thousand pieces of Lake Windermere, short, by tradition, of two swans and most of a jetty. WPC Hartle does the sky alone, which is regarded with superstitious awe. The half hour dies quietly. Nobody has ever seen it finished. Nobody expects to.",
      "The front-office typewriter surrenders its letter E mid-shift. Sgt Bream rules that reports will manage without, and for half an hour the nick generates prose of a strange, granite dignity: PRISONR SOBR. ALL CORRCT. The Early Turn will assume a code and spend Monday breaking it.",
      "PC Duffin, studying for his sergeants' exam, asks the room to test him. Sgt Bream obliges with relish: define a highway. Duffin does, beautifully, word for word. Bream asks where that leaves the canal towpath. Duffin's answer occupies the rest of a very quiet half hour and settles nothing.",
      "A dead half hour, so WPC Hartle reads the relief their horoscopes. Sgt Corcoran, Taurus, is promised travel and an admirer, and looks alarmed by both. The drunk in Cell One asks for his: a stranger will bring news. On cue, the teleprinter prints one line of gibberish and stops.",
      "Half an hour of nothing, into which PC Whittle drops his theory that Cell Three is haunted — a sergeant, he's heard, from before the war, still doing his rounds. The relief scoff and thereafter go down to the cells in pairs. Regan won't go at all, which clinches it.",
      "Nothing moving anywhere on the manor, so Sgt Bream starts on his Christmas card list. At Thorne Street this is an annual judgment: he reads each name aloud, weighs the year against it, and crosses off anyone who has let him down. The relief listen in respectful silence. Two inspectors are crossed off this year; the chiropodist who sorted his feet out in March is added. There is no appeal."
    ],
    "ambient": [
      "LATE TURN HANDOVER NOTE READS ALL QUIET. LATE TURN HAD GONE BY THE TIME IT WASN'T",
      "KETTLE FOUND DESCALED. LATE TURN SUSPECTED OF KINDNESS. INQUIRIES CONTINUE",
      "PANDA 2 REQUESTS EARLY REFS FOR THE PURPOSE OF CHIPS. PERMISSION NEITHER GRANTED NOR REFUSED",
      "FOG NOW GENERAL SOUTH OF THE CANAL. PANDA 3 NAVIGATING BY MEMORY",
      "STREET LAMPS OUT AGAIN ON CHANDLERS WALK. GLC INFORMED. GLC UNMOVED",
      "LICENSEE OF THE DUKE OF CLARENCE DENIES AFTERS. LICENSEE HAS FORM FOR THIS. SINGING AUDIBLE FROM THE STREET",
      "DOG SECTION REPORT PRINCE DECLINING TO LEAVE THE VAN. NEGOTIATIONS CONTINUE",
      "CELL TWO HAS COMMENCED NELLIE DEAN. SECOND VERSE. ALL UNITS BRACE",
      "CID OUT ON OBBO. LOCATION WITHHELD. PUB SUSPECTED",
      "SECTION HOUSE REPORTS HOT WATER RESTORED. SCENES OF QUIET REJOICING",
      "YARD CIRCULAR RE STOLEN LORRYLOAD OF BROWN ALE. TEA-LEAVES UNTRACED. UNITS TO BE ALERT AND SOBER",
      "MINICAB OFFICE ON STATION PARADE PLAYING RADIO AT VOLUME DESCRIBED AS CRIMINAL. IT IS NOT",
      "GENTLEMAN AT FRONT COUNTER WISHES TO CONFESS BUT CANNOT REMEMBER TO WHAT. INVITED TO RETURN WHEN IT COMES TO HIM",
      "SWAN ON THE TOWPATH ADOPTING AN AGGRESSIVE POSTURE. SWAN POSITION UNCHANGED. OURS ADJUSTED",
      "MILK FLOAT FOUND ABANDONED ON TANNERS ROW, HANDBRAKE ON. MILKMAN UNACCOUNTED FOR",
      "ALHAMBRA LATE HOUSE EMPTIED WITHOUT INCIDENT. MANAGER DESCRIBES THIS AS A FIRST",
      "999 CALL RE DRAGON ON THE WANDLE PARK ALLOTMENTS. ON INVESTIGATION, A BONFIRE",
      "K DIVISION REQUEST RETURN OF THEIR LOUDHAILER. REQUEST NOTED. LOUDHAILER RETAINED",
      "PHONE BOX OUTSIDE THE WIMPY RINGING AGAIN. NOBODY IN ATTENDANCE. NOBODY EVER IS",
      "UNKNOWN HAND HAS CHALKED BILL IS A GRASS ON THE YARD WALL. BILL UNIDENTIFIED. INQUIRIES NOT PROCEEDING",
      "STATION CAT ABSENT FROM HIS POST. UNITS NOT TO APPROACH. HE KNOWS WHAT HE IS DOING",
      "NIGHT BAKERY ON BIDDER STREET VENTING SMELL OF FRESH BREAD OVER FOUR STREETS. CROWD FORMING. CROWD ORDERLY"
    ],
    "events": [
      {
        "id": "event_aid_west",
        "title": "EXPLOSION UP WEST — AID TO CENTRAL",
        "text": "The teleprinter rings its bell three times and goes to continuous send, which it only does for one kind of night. A device has gone off in a doorway off Piccadilly — no codeword, no warning worth the name. The first figures come the way first figures always do: wrong, then quietly revised. Central is stripping the divisions for cordon and casualty-bureau aid, and the coach is at the yard in ten minutes. The manor owes it two bodies, and it will pay.",
        "window": [
          3,
          10
        ],
        "choices": [
          {
            "label": "Two on the coach. Re-chalk the board. Carry on.",
            "result": "The coach goes with two of yours aboard and nobody says anything worth recording, because there is nothing to say that the teleprinter isn't already saying. The board is re-chalked shorter. For the rest of the night the printer runs the count from the West End in instalments, and every man left on the ground walks his beat listening to the dark a little harder than the dark deserves.",
            "effects": {
              "seizeCount": 2,
              "seizeTurns": 3,
              "relief": -2
            }
          }
        ]
      },
      {
        "id": "event_lt_lost_property",
        "title": "LOST PROPERTY — LONDON TRANSPORT, LAST CIRCLE TRAIN",
        "text": "London Transport's lost property man telephones from the depot with the night's inventory, which he reads in the tone of a man no longer capable of surprise: one Beefeater's full dress uniform, apparently genuine; one car battery, fully charged; one wedding cake, top tier only; and one funerary urn, engraved 'PERCY — AT LAST.' He is required by regulation to ask whether any of it is of interest to the police, and required by experience to hope that it is not. The urn, he adds, was sat upright in a window seat, facing out.",
        "window": [
          5,
          11
        ],
        "choices": [
          {
            "label": "Book the lot into the occurrence book and let Percy ride",
            "result": "You enter it all under 'found property, referred to London Transport,' which is the occurrence book's way of saying somebody else's marvels. The relief spend their refs arguing about the battery — you cannot carry a car battery by accident — and conclude, with the unanimity of tired men, that Percy is on his way to the seaside and travelling in style. The night feels briefly kinder.",
            "effects": {
              "relief": 3
            }
          }
        ]
      },
      {
        "id": "event_dog_section",
        "title": "K9 TASKED — DOG SECTION AND PRINCE, YARD SEARCH",
        "text": "A warehouse alarm on Corporation Row, a smashed skylight, and a good chance the man who did it is still in among the bins and the drums. It is precisely the job for four legs and a set of teeth, so the Dog Section is tasked over: PC Naismith and Prince, a German Shepherd of firm opinions and a distinguished record of not distinguishing between villains and helpful bystanders. They will find whoever is in that yard. They will also need one of your bodies to walk the perimeter and take the collar off Naismith's hands when Prince has made his introductions.",
        "window": [
          3,
          12
        ],
        "choices": [
          {
            "label": "Give Naismith a PC on the cordon and let Prince work.",
            "result": "Prince goes over the wall like rumour and produces, within ninety seconds and one torn trouser leg, a very still burglar who has discovered religion. Your PC does the paperwork and the walking; Naismith does the praising ('good lad, good LAD'); Prince does the sitting on the prisoner. A clean collar, a happy dog, and a manor down one warehouse job — at the price of a body for the duration.",
            "effects": {
              "seizeCount": 1,
              "seizeTurns": 2,
              "streets": 4,
              "brass": 2
            }
          }
        ]
      },
      {
        "id": "event_shed_load",
        "title": "SHED LOAD — CABBAGES, CANAL BRIDGE",
        "window": [
          1,
          5
        ],
        "text": "An articulated lorry bound for the market takes the canal bridge with more confidence than clearance and sheds eight tons of cabbage across both carriageways. The driver is unhurt, philosophical, and Belgian. Traffic is backing up past the gasworks, and the earliest of the market porters are already filling their coats — it isn't looting, they explain, it's gleaning.",
        "choices": [
          {
            "label": "One PC to direct traffic and guard the harvest.",
            "result": "Duffin or whoever draws it stands in the cabbage field waving lorries through until the council sweeper arrives. The gleaning continues at a respectful distance, and the manor eats well this week.",
            "effects": {
              "seizeCount": 1,
              "seizeTurns": 2,
              "streets": -2
            }
          }
        ]
      },
      {
        "id": "event_despatch_rider",
        "title": "DESPATCH RIDER — THE YARD DELIVERS EARLY",
        "window": [
          1,
          6
        ],
        "text": "A Yard motorcyclist in dripping oilskins delivers the forensic file Thorne Street has chased for three weeks — the one holding up two remands and a committal. He also brings, unasked, the gossip from the fifth floor, which is worth the signature alone. Somebody up there has moved your paperwork to the top of a pile, and the reason will present itself eventually.",
        "choices": [
          {
            "label": "Sign for it and stand the rider a mug before the road.",
            "result": "The file lands on the Chief Inspector's desk before his morning tea can go cold, three weeks early and beautifully complete. Upstairs notices. Upstairs always notices the easy wins.",
            "effects": {
              "brass": 4
            }
          }
        ]
      },
      {
        "id": "event_chimney_row",
        "title": "CHIMNEY FIRE — CADOGAN ROW",
        "window": [
          1,
          6
        ],
        "text": "Number eleven Cadogan Row is on fire in the gentlest available way: a chimney, unswept since rationing, has gone up with a roar and is throwing sparks over three gardens. The Brigade attend with an appliance and their tea. The householder, wrapped in an eiderdown, wishes it known she had the sweep booked for Thursday, and that this is exactly the sort of thing her sister will enjoy hearing about.",
        "choices": [
          {
            "label": "Note it in the book and let the Brigade earn their keep.",
            "result": "Out by half past, no damage beyond the soot and the dignity. The street stood in its dressing gowns for an hour, though, and the night feels slightly less governed than it did.",
            "effects": {
              "streets": -3
            }
          }
        ]
      },
      {
        "id": "event_brewery_horse",
        "title": "LOOSE HORSE — THE BREWERY DRAY",
        "window": [
          4,
          11
        ],
        "text": "Boxer, the brewery's remaining dray horse, has opened his own stable door — the head drayman concedes he has form for it — and is proceeding down the high street at a stately clop, stopping at his regular pubs in order. He is eighteen hands and utterly benign, but he is also following PC Whittle with intent, having correctly identified the smell of the mints in his tunic pocket.",
        "choices": [
          {
            "label": "Assign the horse an escort until the brewery wakes.",
            "result": "Whittle walks Boxer home by way of two pub yards and a fan club of night workers, surrendering the mints at the halfway mark under duress. The relief will retell it for a month, improving it each time.",
            "effects": {
              "seizeCount": 1,
              "seizeTurns": 2,
              "relief": 3,
              "streets": 1
            }
          }
        ]
      },
      {
        "id": "event_squad_borrow",
        "title": "FLYING SQUAD — THEY NEED YOUR AREA CAR",
        "window": [
          4,
          10
        ],
        "text": "Two Flying Squad men arrive at the yard at speed, having deposited their own car into a bollard on the far side of the bridge in circumstances they describe only as 'operational'. They require Tango Two and a driver who knows the manor, now, and they have the paperwork to make the word stick. Where they are going they do not say, but one of them is carrying a sledgehammer wrapped in a raincoat.",
        "choices": [
          {
            "label": "Give them the car and your best advanced driver.",
            "result": "Tango Two returns at four with the tank empty, mud to the windows and a dent nobody will explain — but the Squad man shakes hands at the yard gate, and the Sweeney's thanks, like their debts, are always eventually honoured.",
            "effects": {
              "seizeCount": 1,
              "seizeTurns": 3,
              "brass": 3
            }
          }
        ]
      },
      {
        "id": "event_remand_greenwich",
        "title": "THE DEPUTY CLERK RINGS — REMANDS TO GREENWICH",
        "window": [
          8,
          14
        ],
        "maxFreeCells": 2,
        "text": "A voice from the clerk's office, apologetic and up far too late: a scheduling accident at Greenwich has left the court there short of morning work, and they'll take one of your overnight remands at first light — the van is already out and can collect within the half hour. It is the administrative equivalent of a window opening in a locked room.",
        "choices": [
          {
            "label": "Sign one out to the Greenwich van with your blessing.",
            "result": "The van takes the quietest of your guests off into the drizzle, paperwork immaculate. A cell stands empty and airing, and Bream chalks the door with the tenderness of a man restocking a larder.",
            "effects": {
              "releaseCells": 1,
              "brass": -1
            }
          }
        ]
      },
      {
        "id": "event_gazette_stringer",
        "title": "FRONT OFFICE — THE GAZETTE'S MAN, NO APPOINTMENT",
        "window": [
          5,
          12
        ],
        "text": "The Gazette's night stringer is in the front office with his hat on the counter, working through the fiction that he was 'just passing'. He has heard — he declines to say where — that something is 'brewing on the manor', and he buys the desk PC a cup of the machine's brown liquid to prove his goodwill. He will write something either way; the only variable is how much of it will be invented.",
        "choices": [
          {
            "label": "Give him ten minutes and nothing quotable.",
            "result": "He gets a warm windowsill, two anecdotes fit for print and the firm impression that tonight is boring. What runs on Thursday is short, wrong in the safe directions, and spells the nick's name right. It could have been very much worse.",
            "effects": {
              "brass": -3,
              "relief": -1
            }
          }
        ]
      },
      {
        "id": "event_sally_army",
        "title": "THE SALVATION ARMY VAN — UNSCHEDULED HALT",
        "window": [
          9,
          15
        ],
        "text": "The Salvation Army tea van, returning from the docks run, pulls into the station yard 'to turn round' and stays, in the way of tea vans, forty minutes. Urn tea, proper sugar, and sausage rolls of unimpeachable quality are dispensed to whoever comes through the yard, with a tact that asks nothing and notices everything. The Army majoress on the hatch calls every officer 'dear' and Bream 'Sergeant', which he stands up straighter for.",
        "choices": [
          {
            "label": "Let the yard queue form. God's own refs break.",
            "result": "For half an hour the nick runs on sweet tea and pastry and the small mercy of being fed by somebody. The van pulls out with a full collection tin and the relief goes back to the night noticeably more human.",
            "effects": {
              "relief": 5
            }
          }
        ]
      },
      {
        "id": "event_jewellers_alarm",
        "title": "BELLS AGAIN — MARDLE & SON, HIGH STREET",
        "window": [
          2,
          9
        ],
        "text": "The alarm at Mardle & Son, jewellers, is ringing for the ninth time this quarter. Eight times it has been the wind, a lorry, or Mr Mardle's own cat, which lives inside overnight in defiance of the insurers. The ninth time is statistically the same and professionally unignorable — the one night it isn't attended is the one night it's real, and every villain on the manor knows the arithmetic as well as you do.",
        "choices": [
          {
            "label": "Attend it properly, ninth time or not.",
            "result": "It is the cat. It is always the cat. The attending PC logs 'premises secure, suspect furred' and Mr Mardle, rung at home, promises adjustments he will not make. The bell rings on for an hour, working on the manor's nerves like a dentist's drill.",
            "effects": {
              "seizeCount": 1,
              "seizeTurns": 1,
              "streets": -1,
              "relief": -2
            }
          }
        ]
      },
      {
        "id": "event_welsh_choir",
        "title": "COACH PARTY ADRIFT — MALE VOICE CHOIR",
        "window": [
          10,
          15
        ],
        "text": "A coach containing the Cwmdare & District Male Voice Choir, returning victorious from a competition at the Albert Hall, has followed a diversion into the manor and run out of both diesel and unanimity outside the nick. Forty-five Welshmen in blazers debate the correct road home in close harmony. Their conductor asks, with great courtesy, for directions, a telephone, and — sizing up the station yard with a professional eye — whether the acoustics are as good as they look.",
        "choices": [
          {
            "label": "Diesel from the pump, directions from Bream, one song for the yard.",
            "result": "They sing Myfanwy in the station yard at half past three in the morning, forty-five voices in the fog, and the night shift stands absolutely still for the length of it. The cells applaud. Even the drunk in three. Then the coach pulls out for Wales, flashing its lights, and the night is somehow easier to finish.",
            "effects": {
              "relief": 4,
              "streets": 1
            }
          }
        ]
      },
      {
        "id": "event_spg_hour",
        "title": "SIGNAL — S.P.G. TASKED TO THE MANOR",
        "text": "Three Transits of the Special Patrol Group are tasked to the borough for one hour — somebody upstairs owed somebody else a show of strength, and tonight you are the theatre. They decant at the market in matching haircuts and walk the high street in a formation that makes conversation die in doorways. Nobody south of the river so much as drops a chip paper. The villains, to a man, remember prior engagements elsewhere.",
        "window": [
          5,
          13
        ],
        "choices": [
          {
            "label": "Wave them through and enjoy the hour.",
            "result": "For sixty minutes the borough behaves like a postcard of itself. Then the Transits move off to petrify somebody else's borough, leaving streets so quiet you can hear Bream's kettle reaching temperature. The slags surface towards dawn, blinking, like men after an air raid.",
            "effects": {
              "streets": 6
            }
          }
        ]
      },
      {
        "id": "event_takeaway_misprint",
        "title": "FRONT DESK — THE GOLDEN PAVILION'S NEW NUMBER",
        "text": "The Golden Pavilion takeaway has taken its first-ever advertisement in the Gazette — FAST FOOD, FASTER DELIVERY — and the printers have set the telephone number one digit out. The digit makes it the nick's front desk. From ten o'clock the phone rings without mercy: a number 42 and chips, twice; beef curry, no mushrooms; a gentleman in Maitland Court who wants 'the usual'. Sgt Bream has begun taking the orders down in evidence handwriting and reading them back for confirmation.",
        "window": [
          2,
          10
        ],
        "choices": [
          {
            "label": "Let Bream run the switchboard his way.",
            "result": "By two a.m. Bream is recommending the sweet-and-sour to first-time callers and has talked a regular out of the prawns 'on grounds you'd thank me for'. The desk log is unusable, the proper line rang hot twice unanswered, and the Golden Pavilion — informed at last — sends round a carrier bag of gratitude that constitutes, it is agreed on all sides, refreshments and not a gratuity.",
            "effects": {
              "relief": -4,
              "streets": -2
            }
          }
        ]
      },
      {
        "id": "event_big_fight_telly",
        "title": "THE BIG FIGHT — MANOR INDOORS",
        "text": "The heavyweight from Bethnal Green is on the telly at half past the hour, fifteen rounds, live. The pubs fill and then, miraculously, empty — every villain, drunk and honest man in the borough is in front of a set somewhere, holding his breath in company. The high street stands as empty as Christmas morning. Even the Feathers has turned the jukebox off.",
        "window": [
          3,
          9
        ],
        "choices": [
          {
            "label": "Post the beats for chucking-out and enjoy the ceasefire.",
            "result": "He wins it on points and the streets spill out happy for once, punched out by proxy. Two hours of peace go on the clock, and the only incident logged is a gentleman on Chandlers Walk who shadow-boxed a pillar box and lost on a technicality.",
            "effects": {
              "streets": 5,
              "relief": 2
            }
          }
        ]
      },
      {
        "id": "event_gas_board_dig",
        "title": "GAS BOARD — EMERGENCY WORKS, THORNE STREET",
        "text": "At half past the hour the Gas Board arrives outside the nick with a lorry, a tent, four men and a pneumatic drill, and commences emergency works into the very road. Asked what the emergency is, the foreman consults his docket and reports, with dignity, that it doesn't give one. The drill goes through Night Duty like a dentist. Statements are now being taken at a shout, and the residents of the cells are, for once, sympathetic.",
        "window": [
          6,
          14
        ],
        "choices": [
          {
            "label": "Log the noise, lend them the urn, endure.",
            "result": "The drill stops at five, having found — the foreman is candid on this point — nothing. The hole is fenced off with the special permanence of temporary works, and B Relief has spent half a shift conversing like men on a carrier deck. The manor slept worse than the nick did.",
            "effects": {
              "relief": -4,
              "streets": -3
            }
          }
        ]
      },
      {
        "id": "event_cell_us",
        "title": "CELL FOUR U/S — SITTING TENANT",
        "text": "Bream reports cell four out of service on account of a pigeon. It has come in above the ventilator, built a nest of regulation feel, and defends the fitting like a dog. The last man lodged in there made a formal complaint about being watched. The station carpenter comes on with the Early Turn and not one minute before, and the RSPCA man on nights says, from experience, 'don't'.",
        "window": [
          2,
          11
        ],
        "minFreeCells": 1,
        "choices": [
          {
            "label": "Chalk it U/S in the book. The pigeon stays pending.",
            "result": "Cell four is chalked OUT OF SERVICE in Bream's largest handwriting, and the pigeon — named Nesbitt by the relief inside the half hour — is issued a caution it ignores. You are down a cell until the carpenter surfaces.",
            "effects": {
              "lockCells": 1,
              "lockTurns": 7,
              "relief": 2
            }
          }
        ]
      },
      {
        "id": "event_cell_door",
        "title": "CELL TWO U/S — THE DOOR",
        "text": "The defect in cell two's lock is discovered by its occupant, who is found in the corridor in his socks asking politely where the toilets are. He is a fair-minded man and walks himself back in, but the door now shuts the way a screen door shuts — with optimism. Until a locksmith can be summoned at civilised rates, cell two holds nobody the law would want held.",
        "window": [
          3,
          12
        ],
        "minFreeCells": 1,
        "choices": [
          {
            "label": "Move him along the row and chalk two U/S.",
            "result": "The occupant relocates with the good grace of a man upgrading, and cell two stands open like an argument for the defence. Bream wedges it with the 1962 duty ledger, which is finally of use to somebody.",
            "effects": {
              "lockCells": 1,
              "lockTurns": 5,
              "relief": 1
            }
          }
        ]
      },
      {
        "id": "event_cell_protest",
        "title": "CELL THREE U/S — A PROTEST",
        "text": "The Late Turn's last customer, before departing for court in the morning van's earlier cousin, registered his opinion of the constabulary across every surface of cell three in the manner traditionally described as a dirty protest. The Late Turn logged it, apologised to no one, and went home. The cleaner does not come until eight. The relief have inspected the doorway, as one inspects a war grave, and withdrawn.",
        "window": [
          1,
          8
        ],
        "minFreeCells": 1,
        "choices": [
          {
            "label": "Seal it, chalk it U/S, and put the kettle on for morale.",
            "result": "Cell three is closed pending what Bream's entry calls 'specialist attention', and a general agreement forms, without a word being spoken, that nobody will be nicked tonight who doesn't urgently deserve it. The kettle does heroic work.",
            "effects": {
              "lockCells": 1,
              "lockTurns": 8,
              "relief": -2
            }
          }
        ]
      },
      {
        "id": "event_sick_report",
        "title": "SICK REPORT — PC DUFFIN GOES HOME",
        "text": "Duffin is found sitting on the bench by his locker, grey as the charge-room walls, insisting he is fine in a voice that argues otherwise. Sgt Bream, father of five and diagnostician of long standing, pronounces it the proper flu and not the Friday variety. There is no arguing with the thermometer: Duffin goes home in a panda, sweating and apologising, and Night Duty is a body short until six.",
        "window": [
          3,
          9
        ],
        "choices": [
          {
            "label": "Send Duffin home. The book gets one line: sick, genuine.",
            "result": "He protests as far as the yard, then sleeps against the panda window before it clears the gate. The relief divide his beat between them without being asked, which is worth remembering next time they want something.",
            "effects": {
              "seizeCount": 1,
              "seizeTurns": 99,
              "relief": 2
            }
          }
        ]
      },
      {
        "id": "event_special_branch_wpc",
        "requiresWPC": true,
        "title": "SPECIAL BRANCH — THEY WANT WPC HARTLE",
        "text": "Two quiet men with warrant cards older than God and suits that don't crease. Special Branch need a woman officer tonight, for an operation they describe, in full, as 'an operation'. They want Hartle: plain clothes, no pocket book, back before dawn if it goes well, and no questions in either direction. She is already taking her epaulettes off; she has wanted a job like this since training school.",
        "window": [
          4,
          10
        ],
        "choices": [
          {
            "label": "Sign Hartle over to the funny people. No questions.",
            "result": "Hartle leaves through the yard in a borrowed coat, looking six inches taller. The quiet men nod once, which from Special Branch amounts to a testimonial dinner. Whatever it is, you will read about it sideways in a circular next spring.",
            "effects": {
              "seizeCount": 1,
              "seizeTurns": 4,
              "brass": 3
            }
          }
        ]
      },
      {
        "id": "event_urgent_assistance",
        "title": "URGENT ASSISTANCE — OFFICER DOWN, KELLER STREET",
        "text": "The one call that outranks everything: a D Division PC goes under a crowd outside the Feathers on Keller Street and his mate gets to the box long enough to shout urgent assistance. Every station that hears it sends whoever can run. Tonight you have someone to send, which is the only acceptable version of this story.",
        "window": [5, 12],
        "dismissIf": "noUnits",
        "dismissText": "At a quarter past the hour a D Division officer called urgent assistance from Keller Street, and Thorne Street — alone of four stations on the net — sent no one, because you had committed every officer you had and kept nothing back for the one call that is never refused. The officer concerned will recover. Your career will not. The Commissioner takes the view, which he is aware is old-fashioned, that a duty inspector who cannot answer URGENT ASSISTANCE has stopped being a police officer in any sense that interests him.",
        "choices": [
          {
            "label": "Send the nearest body at a dead run. No questions.",
            "result": "Doyle or whoever it is goes over the border flat out, stick drawn, and comes back an hour later with a torn tunic and a D Division sergeant's handshake. Nobody asks what it cost the manor to send him. That is the arrangement, and everyone on the net heard Thorne Street answer.",
            "effects": {
              "seizeCount": 1,
              "seizeTurns": 2,
              "brass": 3,
              "relief": 3
            }
          }
        ]
      },
      {
        "id": "event_remand_lodging",
        "title": "ORDER OF THE COURT — REMAND PRISONER FOR LODGING",
        "text": "A prison van pulls up unannounced with a Crown remand prisoner and a court order for overnight lodging: the cells at the Bailey are flooded a foot deep and somebody with a seal has decided Thorne Street has room. The order is lawful, the van driver is patient, and the prisoner, informatively, says nothing at all. You have a cell, so this is merely paperwork.",
        "window": [7, 13],
        "dismissIf": "noCells",
        "dismissText": "A Crown remand prisoner arrived at your station under a lawful order for overnight lodging, and was turned away at the door because every cell in your charge was already full and you had made no provision for the possibility. The van then toured the division for two hours, during which period the prisoner ceased to be in it. The Commissioner declines to describe in writing what it is to lose the Crown's prisoner from the back of a van outside one's own station; he was asked to do so by the Home Office this morning and it took some restraint.",
        "choices": [
          {
            "label": "Sign for him. Find a blanket and note the order number.",
            "result": "He goes in the end cell with two blankets and the order goes in the book, timed and countersigned. The van driver, who has been turned away from three stations tonight, shakes your hand like you've pulled him from a river.",
            "effects": {
              "arrests": 1,
              "brass": 4
            }
          }
        ]
      },
      {
        "id": "event_section_house_fire",
        "title": "PERSONS REPORTED — FIRE AT THE SECTION HOUSE",
        "text": "The section house on Milford Lane rings the front desk direct: smoke on the third-floor landing, persons reported, half of C Relief asleep up there off nights. The Brigade are coming but the Brigade do not know which doors hide sleeping policemen. A body who knows the building must go now, at a run, with the pass key.",
        "window": [10, 16],
        "dismissIf": "noUnits",
        "dismissText": "Fire took hold of the Milford Lane section house at a time when your board stood empty, and the officer who should have run the pass key up three flights was out on errands you had judged, one after another, to be worth the last man you had. C Relief got themselves out by the drainpipes, in nightclothes, in November, and were photographed doing it. The Commissioner has seen the photograph. So has the Home Secretary. So, this morning, has everyone in London who takes a paper.",
        "choices": [
          {
            "label": "Send a runner with the pass key — doors first, smoke after.",
            "result": "Whittle or whoever's nearest takes the pass key at a sprint and goes up the stairs banging doors like the wrath of God. C Relief file out grumbling into the drizzle; the smoke turns out to be a bin fire in the light-well. Nobody burned, everybody cold, one PC coughing and immortal in the section house forever.",
            "effects": {
              "seizeCount": 1,
              "seizeTurns": 2,
              "relief": 5,
              "streets": -2
            }
          }
        ]
      },
      {
        "id": "event_gale_warning",
        "title": "ALL STATIONS — MET OFFICE GALE WARNING",
        "window": [
          3,
          12
        ],
        "text": "Division relays the Met Office: severe gale up the estuary by two o'clock, gusting harder at the bends. That means slates in the road, hoardings on the move, every loose alarm bell on the manor giving voice, and the river doing its big music under the wharves. The beat men are advised to keep off the ladders and out from under the Odeon's letters.",
        "choices": [
          {
            "label": "Acknowledge — and mind the hoardings",
            "result": "The gale arrives on schedule and spends the small hours auditioning as crime: three alarms, one chimney, a hoarding through a windscreen, and the Gazette's placard for WEATHER CHAOS blown, satisfyingly, into the canal. The manor takes a battering no one can be nicked for.",
            "effects": {
              "streets": -2
            }
          }
        ]
      },
      {
        "id": "event_helmet_flagpole",
        "title": "SIGNAL — HELMET, POLYTECHNIC FLAGPOLE",
        "window": [
          2,
          8
        ],
        "text": "The Polytechnic's rag week opens its account: PC Duffin's helmet is flying from the college flagpole, hoisted to the masthead with proper ceremony and a note pinned to the halyard reading 'DONATIONS TO CHARITY, OFFICERS HALF PRICE.' Duffin, bare-headed at the gates, is being photographed by students and is bearing it, the beat man reports, 'like Nelson.'",
        "choices": [
          {
            "label": "Acknowledge — the halyard at dawn, dignity intact",
            "result": "The helmet is lowered at first light with honours by the students themselves, who have raised eleven pounds for the lifeboats on the strength of it. Duffin accepts its return at the gates, inspects it for damage, and shakes three hands. The relief will call him 'Admiral' until Christmas at the earliest.",
            "effects": {
              "relief": 1,
              "streets": -1
            }
          }
        ]
      },
      {
        "id": "event_bakery_rolls",
        "title": "SIGNAL — DOCKSIDE BAKERY, FIRST BATCH",
        "window": [
          11,
          16
        ],
        "text": "The Dockside Bakery's ovens have been going since three, and at the shift's low ebb the baker's boy arrives at the back door of the nick with a tray of Vienna rolls 'for the night watch, guv, no charge — his own idea.' They are so hot the tray has to be relayed hand to hand like a fire bucket. The smell reaches the cells, where it is received as a rumour of a better world.",
        "choices": [
          {
            "label": "Acknowledge — and send the tray back clean",
            "result": "The rolls go round the front office, the cells (regulations are silent on rolls), and the beat men as they book off their points. For ten minutes the nick smells of the good part of civilisation. The tray goes back scrubbed with a note from Bream: 'RECEIVED INTO EVIDENCE. EVIDENCE CONSUMED.'",
            "effects": {
              "relief": 2
            }
          }
        ]
      },
      {
        "id": "event_exchange_fault",
        "title": "ALL STATIONS — CHANDOS EXCHANGE FAULT",
        "window": [
          4,
          10
        ],
        "text": "The Chandos Walk exchange has developed a fault and the front-desk lines are dead — a silence so unusual that Bream keeps lifting the receiver to check, like a man prodding a tooth. Nine-nine-nine traffic is rerouted through Division, arriving late and garbled; the public are managing with the phone boxes, the boxes being, for once, the reliable end of the system.",
        "choices": [
          {
            "label": "Acknowledge — runners and the boxes till it's mended",
            "result": "For two hours the manor is policed at the speed of 1935: messages by panda, the beat men working their police boxes, and one urgent call brought in by a taxi driver who waives the fare 'seeing as it's official.' The GPO restore the lines before dawn and the desk phone immediately rings with a wrong number, restoring normality entire.",
            "effects": {
              "streets": -1,
              "brass": -1
            }
          }
        ]
      },
      {
        "id": "event_bangers_leftover",
        "title": "SIGNAL — FIREWORKS, MILFORD LANE BINS",
        "window": [
          2,
          7
        ],
        "text": "Guy Fawkes is nine days gone but the manor's boys have husbanded their arsenal: leftover bangers are going off in the bins down Milford Lane, each one phoned in by a different householder as 'shots.' The beat man attends, is shown the scorched bin, hears the culprits' boots receding over the back walls — and pockets, as evidence, a paper bag holding two dozen more with the labels of three different newsagents.",
        "choices": [
          {
            "label": "Acknowledge — log it as fireworks, ninth time tonight",
            "result": "The bangers die out by one o'clock as the arsenal exhausts itself, leaving the manor to distinguish, for the rest of the night, between cars backfiring and everything else. The confiscated bag sits on the front desk as a monument to November, and Bream is not above jumping when a coal settles in the grate.",
            "effects": {
              "streets": -1
            }
          }
        ]
      },
      {
        "id": "event_stray_dog_nick",
        "title": "SIGNAL — DOG, UNCLAIMED, FRONT OFFICE",
        "window": [
          6,
          13
        ],
        "text": "A mongrel of strong opinions and no collar walked into the front office at midnight, inspected the premises, and has appointed itself. It now lies across the public counter's draught with its chin on the charge-book ledge, vetting all comers. Bream, who has been feeding it corned beef and calling it 'Sergeant', maintains it is 'detained pending enquiries.' The enquiries, everyone understands, are not being pressed.",
        "choices": [
          {
            "label": "Acknowledge — detained pending enquiries",
            "result": "Sergeant passes the night on duty, growling once — at a man who turns out to be wanted in two divisions, a fact that enters station legend before the man enters the cells. The dog van is due at nine; the front office has until then to organise its defence, and has already started a fund.",
            "effects": {
              "relief": 2,
              "brass": -1
            }
          }
        ]
      },
      {
        "id": "event_commander_walk",
        "title": "ALL STATIONS — COMMANDER'S DAWN ROUNDS",
        "window": [
          10,
          15
        ],
        "text": "Word comes down the net in the tone reserved for weather and royalty: Commander Rossiter is walking his stations before six — no ceremony, no warning, 'as found.' The phrase 'as found' has already reached every front office in the division and set off a quiet epidemic of mopping. Thorne Street's charge room, as found, contains the night. The night will need squaring away.",
        "choices": [
          {
            "label": "Tell Bream — the mops come out",
            "result": "The nick is squared away to parade order in forty minutes flat: the tray filed, the cocoa mugs vanished, the cells' blankets folded to the regulation three creases by prisoners who catch the mood. Rossiter walks through at ten to six, says only 'carrying on,' and leaves. Bream exhales for the first time since the signal. The kettle resumes.",
            "effects": {
              "brass": 2,
              "relief": -1
            }
          }
        ]
      },
      {
        "id": "event_wage_packet",
        "title": "SIGNAL — FOUND PROPERTY, WAGE PACKET INTACT",
        "window": [
          3,
          11
        ],
        "text": "A pensioner named Mr Tuckwell presents himself at the desk with a wage packet found on the towpath: forty-two pounds, unopened, the name of a crane driver at the docks pencilled on the flap. He has walked it in a mile and a half in his slippers because 'a man's wages are a man's wages,' and he waits, holding his cap, while Bream counts it twice and enters it as the week's most restorative document.",
        "choices": [
          {
            "label": "Acknowledge — and see Mr Tuckwell home",
            "result": "The crane driver, traced by the docks' night office, arrives before two to shake Mr Tuckwell's hand for a full minute and press a pound on him, which is declined until it becomes two pints, which is not. The story is round the manor by morning and does it more good than a month of patrols: the towpath, it turns out, is paved with honest men. One, anyway.",
            "effects": {
              "streets": 2
            }
          }
        ]
      },
      {
        "id": "event_tea_wagon",
        "title": "SIGNAL — TEA WAGON AXLE, MARKET APPROACH",
        "window": [
          8,
          14
        ],
        "text": "The divisional tea wagon — the mobile canteen that meets the beat men at the market approach with tea and a bun at the shift's worst hour — has cracked an axle on the cobbles and stands dark and tilted like a monument to better nights. The crews' point of comfort is off. Word travels the beats faster than any signal all night, and morale, that delicate instrument, can be heard going flat from the front office.",
        "choices": [
          {
            "label": "Acknowledge — flasks and fortitude till the axle's done",
            "result": "The night divides into those who brought flasks and those now negotiating with them. The all-night caff extends unofficial credit to the uniform, the section house sends out a biscuit tin under escort, and the wagon's crew, marooned with their urn, dispense what's left standing at a heroic slant. The axle is promised for Thursday. The beats mourn.",
            "effects": {
              "relief": -2
            }
          }
        ]
      },
      {
        "id": "event_pocket_book",
        "title": "SIGNAL — POCKET BOOK MISSING, ENTRIES AND ALL",
        "window": [
          4,
          12
        ],
        "text": "Duffin presents himself at the desk grey as the blotter: his pocket book is gone — not mislaid, gone — last certain sighting two hours and four miles ago. In it are three weeks of entries, two of them due in court, every page countersigned by you. A pocket book is evidence, and a lost one is a disciplinary matter with a form all its own. The beat is being walked backwards, litter bin by litter bin, by a man reciting his own movements under his breath like a rosary.",
        "choices": [
          {
            "label": "Acknowledge — retrace every step, and nobody rings Complaints yet",
            "result": "It comes in at five o'clock with the gasworks night watchman, who found it by the towpath gate, kept it dry, and — he admits this freely — read it. 'Very neat, your man. Wednesday's a bit spicy.' Duffin has aged a decade in three hours and countersigns the found-property entry for his own pocket book with a hand that needs two goes. The court entries live. The form with its own number goes back in the drawer.",
            "effects": {
              "relief": -2,
              "brass": -1
            }
          }
        ]
      },
      {
        "id": "event_special_pring",
        "title": "VOLUNTEER — SPECIAL CONSTABLE REPORTS UNANNOUNCED",
        "text": "Deep in the shift, the front door admits Special Constable Maurice Pring — by day a senior ledger clerk at the Gas Board, tonight pressed, correct and entirely unannounced, with creases you could post a letter through. He carries his own whistle and a thermos with his blood group enamelled on the side: B POSITIVE, which is both a fact and, you suspect, a philosophy. He'd like to help.",
        "window": [
          4,
          15
        ],
        "choices": [
          {
            "label": "Sign him in.",
            "result": "Pring accepts a beat sheet like it's a sacrament and steps out into the night at regulation pace. Sgt Bream, visibly moved, opens the good tin of custard creams. For one night only, Thorne Street is up a man.",
            "effects": {
              "bonusUnits": 1,
              "relief": 4
            }
          }
        ]
      },
      {
        "id": "event_area_car_polac",
        "title": "POLAC — AREA CAR TANGO TWO VERSUS SKIP",
        "text": "Tango Two, pursuing nothing in particular down Ropemakers Row, meets a skip belonging to Meakin Salvage that was not there yesterday. Both crew step out without a scratch; the car does not. Two PCs are now lost to breath tests, statements, sketch plans and a garage sergeant who wants the skip's account of events in triplicate.",
        "window": [
          4,
          10
        ],
        "choices": [
          {
            "label": "Put it in the book.",
            "result": "The night's log gains its longest entry of the month. The skip is detained in every sense but the legal one, and the area car goes home on a lorry, which pleases nobody except Meakin.",
            "effects": {
              "seizeCount": 2,
              "seizeTurns": 3,
              "relief": -4
            }
          }
        ]
      },
      {
        "id": "event_commissioners_circular",
        "title": "TELEPRINTER — COMMISSIONER'S CIRCULAR, RETURN REQUIRED",
        "text": "The teleprinter clears its throat and delivers a Commissioner's Circular: all divisions will render a return of overtime worked, cells occupied and lessons learned, in triplicate, to reach the Yard by nine a.m. It is signed on behalf of a man who has been asleep for hours and addressed to men who will not be. Nobody can say what the lesson was.",
        "window": [
          5,
          11
        ],
        "choices": [
          {
            "label": "Noted. Carry on.",
            "result": "Sgt Bream surrenders his second-best biro to the cause. Upstairs will read one line in three and remember only whether it arrived late.",
            "effects": {
              "brass": -5
            }
          }
        ]
      },
      {
        "id": "event_a10_reopened",
        "title": "WORD FROM THE YARD — A10 BLOW THE DUST OFF",
        "text": "A friendly voice at the Yard rings on the quiet: A10 — anti-corruption — have reopened the Chapel Yard Market lorry job — the one from before your time, before most people's time, in which three crates of Scotch famously evaporated between the scene and the property store. Everyone concerned has since retired, emigrated or died. The file, regrettably, still names the nick.",
        "window": [
          3,
          9
        ],
        "choices": [
          {
            "label": "Noted. Say nothing.",
            "result": "You say nothing so thoroughly it ought to go in your pocket book. A10 move at the speed of continental drift, but they never stop, and they never lose a file twice.",
            "effects": {
              "brass": -6
            }
          }
        ]
      },
      {
        "id": "event_inspection_confirmed",
        "title": "RUMOUR CONFIRMED — STAFFING INSPECTION AT THE CHANGE",
        "text": "The canteen rumour is confirmed by teleprinter, which is how you know it's true: Commander Rossiter's staff officer will attend Thorne Street at the change of shifts to inspect establishment, deployment and 'general efficiency'. The word 'general' is doing a great deal of work. Sgt Bream begins hiding the pools coupon with the tenderness of a man burying a pet.",
        "window": [
          10,
          14
        ],
        "choices": [
          {
            "label": "Noted. Carry on.",
            "result": "The nick starts tidying itself the way a guilty man straightens his tie. Whatever the staff officer finds at dawn will be filed against your name, not his.",
            "effects": {
              "brass": -4
            }
          }
        ]
      },
      {
        "id": "event_water_main",
        "title": "WATER BOARD — MAIN GONE UNDER THE HIGH STREET",
        "text": "A Victorian water main under the high street retires without notice, lifting two paving slabs and putting a brown fountain up past the Alhambra's marquee. The Water Board promises a crew 'presently', which is Water Board for tomorrow. The high street closes itself, traffic backs down every side road on the patch, and the drunks come out to paddle.",
        "window": [
          2,
          8
        ],
        "choices": [
          {
            "label": "Put it in the book.",
            "result": "Cones are deployed with more optimism than authority. The fountain plays on, floodlit by the bingo hall, and somewhere a Water Board man sleeps the sleep of the truly unaccountable.",
            "effects": {
              "streets": -5
            }
          }
        ]
      },
      {
        "id": "event_power_cut",
        "title": "POWER CUT — SUBSTATION OUT, HALF THE BOROUGH DARK",
        "text": "The lights flicker once, politely, and half the ground goes out. The Electricity Board confirms a substation fault and offers no promises a working man could spend. Streetlamps die together, shop alarms either fall silent or all ring at once — which is worse — and the dark fills up with tea-leaves who can hardly believe their luck.",
        "window": [
          7,
          12
        ],
        "choices": [
          {
            "label": "Log it. Torches out.",
            "result": "Every torch in the station turns out to be flat, borrowed or Duffin's. The manor manages the dark the way it manages everything else: badly, and on the hurry-up.",
            "effects": {
              "streets": -6
            }
          }
        ]
      },
      {
        "id": "event_river_fog",
        "title": "WEATHER — FOG OFF THE RIVER, VISIBILITY NIL",
        "text": "Towards the small hours the river sends up a fog with real weight to it, an old-fashioned item that swallows streetlamps whole. Panda crews report they are navigating by pub smell. Anyone abroad in this either cannot get home or badly does not want to be seen, and the radio fills with men describing where they believe themselves to be.",
        "window": [
          9,
          15
        ],
        "choices": [
          {
            "label": "Noted. Dead slow all round.",
            "result": "The area car comes home at walking pace behind a PC on foot, like a Victorian funeral. Whatever the patch gets up to tonight, it gets up to it unwitnessed.",
            "effects": {
              "streets": -5
            }
          }
        ]
      },
      {
        "id": "event_wimpy_fryer",
        "title": "BRIGADE SHOUT — FRYER ALIGHT AT THE WIMPY",
        "text": "The Wimpy's fryer goes up with a theatrical whoomph and the brigade turn out two appliances for what is, in the end, a large chip pan. Nobody is hurt, but the whole late crowd is decanted onto the pavement mid-meal, furious and holding their buns, just as the Duke of Clarence empties. The two crowds meet like weather fronts.",
        "window": [
          1,
          5
        ],
        "choices": [
          {
            "label": "Noted. Carry on.",
            "result": "The brigade damp down the fryer and stay for the evidence. The crowd takes an age to drift, grazing on grievance, while the manager stands guard with a fish slice like a ceremonial sword.",
            "effects": {
              "streets": -4
            }
          }
        ]
      },
      {
        "id": "event_retired_skipper",
        "title": "FRONT DESK — RETIRED SKIPPER REPORTS FOR NOTHING",
        "text": "Retired station sergeant 'Tug' Willmott appears at the front counter with his own mug, boots bulled to a black mirror, and a face like a benediction. Couldn't sleep. Wondered if the desk wanted minding. Within the hour the occurrence book is being ruled off in copperplate and he has talked Sgt Bream out of two custard creams, a thing previously thought impossible.",
        "window": [
          3,
          9
        ],
        "choices": [
          {
            "label": "Put him in the visitors' book.",
            "result": "The front office runs like it's twenty years ago. Members of the public are handled so courteously that two apologise for existing and one withdraws his complaint on the spot.",
            "effects": {
              "relief": 3
            }
          }
        ]
      },
      {
        "id": "event_last_train",
        "title": "BRITISH RAIL — LAST TRAIN TERMINATED SHORT",
        "text": "British Rail, citing operating difficulties — a phrase no man has ever seen explained — terminates the last train two stops short and decants a full load of passengers onto your ground with no buses, no onward means and strong opinions. Among them: a stag party in matching rosettes, a darts team, and one man carrying a wardrobe.",
        "window": [
          3,
          7
        ],
        "choices": [
          {
            "label": "Noted. Carry on.",
            "result": "The taxi rank takes on the atmosphere of a lifeboat station. The man with the wardrobe sets off walking, and by dawn he will be another division's problem, which is the only mercy going.",
            "effects": {
              "streets": -4
            }
          }
        ]
      },
      {
        "id": "event_boiler_out",
        "title": "STATION DEFECT — BOILER OUT, NICK GOING COLD",
        "text": "The station boiler, coeval with the building and twice condemned, dies with a shudder felt through three floors. The Works Department's out-of-hours number rings somewhere nobody has ever been. By degrees the nick goes cold: greatcoats indoors, breath visible in the charge room, and Regan the station cat relocates with great dignity to the top of the teleprinter.",
        "window": [
          8,
          14
        ],
        "choices": [
          {
            "label": "Put it in the defects book.",
            "result": "The defects book receives its umpteenth entry on the boiler without surprise. The relief take refs in overcoats and the tea urn is promoted, by unanimous vote, to heating.",
            "effects": {
              "relief": -5
            }
          }
        ]
      },
      {
        "id": "event_bail_granted",
        "title": "FRONT DESK — BRIEF PRODUCES A MAGISTRATE",
        "text": "Four full cells, and somebody's brief has been busy: a magistrate is out of bed and on the telephone, granting bail from his own hallway in what is audibly a dressing gown, Mrs Magistrate enquiring after the hour somewhere behind him. One of tonight's guests is to walk, forthwith. The brief waits at the counter, hat in hand, wearing the smile of a man who knows exactly what time it is.",
        "window": [
          3,
          15
        ],
        "maxFreeCells": 1,
        "choices": [
          {
            "label": "Sign him out.",
            "result": "Bream rules off the charge sheet like a man signing a surrender. At the door your departing guest thanks the station for its hospitality, promises to recommend it to his friends, and steps out onto your streets — where his friends already are.",
            "effects": {
              "releaseCells": 1,
              "streets": -3
            }
          }
        ]
      },
      {
        "id": "event_release_on_high",
        "title": "TELEPHONE — RELEASE ORDERED, AUTHORITY UNSTATED",
        "text": "The telephone rings with a voice from somewhere above Commander Rossiter's head — how far above, the voice does not say, and you find you don't ask. One of tonight's prisoners is to be released. No charge, no explanation; a car is already on its way, and was on its way, you realise, before you answered. The voice thanks you for your cooperation in the past tense and rings off.",
        "window": [
          5,
          16
        ],
        "maxFreeCells": 1,
        "choices": [
          {
            "label": "Open the door.",
            "result": "The car arrives unmarked and unhurried, and your prisoner walks past the two PCs who took stitches bringing him in while their arrest report is still in the typewriter. Nobody rings back to tell you who you've obliged — which, you come to understand, is the whole arrangement.",
            "effects": {
              "releaseCells": 1,
              "relief": -3
            }
          }
        ]
      }
    ],
    "minisagas": [
      {
        "id": "mini_lodger",
        "title": "THE LODGER IN CELL FOUR",
        "startWindow": [3, 8],
        "stages": [
          {
            "id": "mini_lodger_1",
            "title": "SPECIAL BRANCH — A GUEST FOR THE NIGHT",
            "text": "A plain van in the yard at half past eleven, and DS Mullard of Special Branch at the wicket with two escorts who don't give names. In the van: a prisoner, lifted this evening in connection with the autumn campaign, wanted north for the morning convoy at six. Every fortified cell in central London is full, watched, or both. Mullard wants cell four until dawn, an escort on the door, and — he says it evenly, watching your face — no name in your book. 'He was never here, guvnor. That's the favour.'",
            "choices": [
              {
                "label": "Cell four is his till six — on Mullard's terms",
                "result": "The transfer takes ninety seconds and is done the way such things are done: quickly, quietly, and with everyone's eyes somewhere else. The book gains an entry reading PRISONER — IN TRANSIT — MET/SB, which is a name the way a fog is a wall. The escort takes the chair outside cell four and settles in like a man who has sat outside worse doors.",
                "effects": {
                  "arrests": 1,
                  "brass": 3,
                  "relief": -2
                },
                "goto": "mini_lodger_2",
                "delay": 1
              },
              {
                "label": "Take him — but this nick's book takes his name",
                "result": "Mullard looks at you for a long moment, then dictates the name in full, spelling it, in the tone of a man laying a card face up because he has been out-called. The entry goes in your hand, correct, and cell four gets its lodger. 'A nick that keeps its book,' he says, not entirely as a complaint.",
                "effects": {
                  "arrests": 1,
                  "brass": -1,
                  "relief": 2
                },
                "goto": "mini_lodger_2",
                "delay": 1
              },
              {
                "label": "Refuse — this nick isn't fortified and doesn't do ghosts",
                "result": "The refusal is given with reasons and taken without argument, which is somehow worse. The van doors close on the lodger nobody met, and the convoy problem drives away to become the fortress nick's problem after all.",
                "effects": {
                  "brass": -2,
                  "relief": 1
                },
                "outcome": "The van went north across the river to a nick with a steel door, which had room after all once the request came with a refusal behind it. The Yard noted Thorne Street's position without comment — twice, which is how the Yard comments.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "mini_lodger_2",
            "title": "THE NIGHT WATCH",
            "text": "The nick holds its breath around cell four. The escort refuses tea for the first hour and takes it by the third; the drunk in cell two has gone quiet out of what he later describes as professional respect; and the lodger himself makes no sound at all, which is its own kind of loud. At ten past three the front desk phone goes: a solicitor, very smooth, very unhurried, asking whether the station is holding 'a client of mine — I have the name here' — and the name he reads out is one that nobody, in any version of tonight, gave him.",
            "choices": [
              {
                "label": "No comment — log the call and get the trace running",
                "result": "The desk gives the caller nothing but courtesy, at length, while the GPO man works back down the exchanges. The number lands on a call box on Kilburn High Road, and Mullard receives the trace at five like a man being handed a present he had asked for and not expected.",
                "effects": {
                  "streets": 2,
                  "brass": 2
                },
                "outcome": "The convoy left at six on the dot with nothing waiting for it, and the call box on Kilburn High Road repaid a fortnight of Special Branch attention. Mullard's report records that Thorne Street 'held its tongue and its nerve', which upstairs reads as a commendation and downstairs reads as the plain truth.",
                "grade": "good"
              },
              {
                "label": "Confirm nothing — but wake Mullard at his hotel",
                "result": "Mullard arrives at four in yesterday's shirt, furious at being woken until he hears why, and then furious in a different direction entirely. The convoy is quietly re-timed while the manor sleeps.",
                "effects": {
                  "brass": 1,
                  "relief": -1
                },
                "outcome": "The convoy left an hour early by a different gate, and whatever the ten-past-three call was hoping to learn, it learned only that this nick answers telephones carefully. Nobody was ever charged with making it, which is the season all over: half the war was calls, and half the calls were fog.",
                "grade": "mixed"
              },
              {
                "label": "The overnight book is public record — read the entry out",
                "result": "The desk answers like a desk: the book is read as any caller may ask, entry by entry, in a voice trained on lost umbrellas. Whether the entry read MET/SB or read a name, the voice on the line thanks the station and rings off with what it came for — confirmation that somebody is here at all.",
                "effects": {
                  "brass": -5,
                  "relief": -1
                },
                "outcome": "At half past five a car sat at the end of the street with its lights off, counting. The convoy re-routed on Mullard's instinct and nothing followed it north — but Special Branch's report on the telephone call that got answered runs four pages, and Thorne Street's name is in the finding of every one of them.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_phonein",
        "title": "THE MIDNIGHT LINE",
        "startWindow": [6, 10],
        "stages": [
          {
            "id": "mini_phonein_1",
            "title": "LIVE ON RADIO MERIDIAN — A CALLER CONFESSES",
            "text": "Radio Meridian's all-night phone-in is on low in the switchboard room, as it is every night — Denny Vale, a voice like warm dripping, taking calls about damp, decimalisation and the state of the verges. At half past midnight a caller announcing himself as 'Maurice from the arches' confesses, live, to the Fairleigh Road burglary — October's, unsolved — and Vale, smelling a night's radio, keeps him talking. The switchboard girls have stopped putting calls through. Maurice has just mentioned the pantry window. The pantry window was never in any paper.",
            "choices": [
              {
                "label": "Ring the studio — keep him talking while the GPO trace runs",
                "result": "Vale takes the request off air with the composure of a man being handed the best programme of his career, and stretches Maurice like toffee: childhood, the arches, the weather in October. The GPO man works down the exchanges with his jacket off. Maurice, enjoying himself now, starts on his methods.",
                "effects": {},
                "goto": "mini_phonein_2",
                "delay": 1
              },
              {
                "label": "Send PC Whittle round to the studio for the board log",
                "result": "PC Whittle is admitted to Radio Meridian between records and stands in the control room reading the call log over an engineer's shoulder while, through the glass, Denny Vale interviews a burglar with the tenderness of a man landing a fish. The number is a call box. The call box is on the arches.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "goto": "mini_phonein_2",
                "delay": 1
              },
              {
                "label": "Every nick knows a Maurice — note it and let him talk",
                "result": "You listen with half an ear while Maurice, unencumbered by pursuit, confesses further to the Rotherhithe job of '71 and — warming through the small hours — to one in Glasgow he cannot have reached by any train yet built. Vale thanks him like a benefactor and plays 'Moon River'.",
                "effects": {},
                "outcome": "Maurice's night of confessions was filed under colourful, and most of it was. But the pantry window sits in the Fairleigh file like a splinter — a detail nobody invented, offered free at half past midnight to anyone listening, and nobody was listening who could use it. The job stays open.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "mini_phonein_2",
            "title": "MAURICE AT THE BRAZIER",
            "text": "Maurice is found at his place of business: night watchman at the railway arches, brazier, kettle, a wireless of his own wired to the mains by methods best not examined. He is seventy, mild as milk, and confesses to famous crimes as a hobby — he 'did' the Train Robbery on Vale's programme in 1969, by his own account, from this chair. But pressed gently on the pantry window he goes quiet, and then it comes out: he heard it at this brazier, from the man who did do Fairleigh Road, who talks too much when he's warm. Confessing it on the wireless, Maurice explains, 'felt like lending it out. I always give them back.'",
            "choices": [
              {
                "label": "Tea, no caution — and a name, for the honour of the brazier",
                "result": "The name is given the way old men give things that matter: slowly, with the mug held in both hands, and on the strict condition that nobody ever tells the man which fire he talked too much at. It checks against the Fairleigh file inside the hour.",
                "effects": {
                  "streets": 3,
                  "brass": 2
                },
                "outcome": "The Fairleigh Road job cleared quietly ten days later, on evidence assembled to point every direction but the arches. Maurice still confesses on the Midnight Line — strictly, by private arrangement with the desk, to crimes from before the war — and Denny Vale goes to his grave never knowing what he had on the line in October.",
                "grade": "good"
              },
              {
                "label": "Put him back on air to retract it, live, with Vale",
                "result": "The retraction is the finest radio of the year: Maurice, solemn as a bishop, un-confesses at length while Vale conducts him like an orchestra. Somewhere on the manor, one listener who knows exactly which details were true switches off his wireless very carefully, and begins to pack.",
                "effects": {
                  "relief": 2
                },
                "outcome": "Maurice retracted everything so beautifully that Radio Meridian made him a Thursday fixture — 'Maurice the Unreliable', nation's favourite. The man who really did Fairleigh Road left the manor within the week, unnicked but permanently unnerved, and the file stays open in the way of files that everyone understands to be closed.",
                "grade": "mixed"
              },
              {
                "label": "Charge him — wasting police time, on air or off it",
                "result": "The charge sheet says wasting police time, and the arithmetic is unarguable and the room is against it anyway. Maurice signs with his tongue between his teeth, apologises to the Force, the GPO and 'the listeners', and asks whether the brazier can be minded while he's away.",
                "effects": {
                  "arrests": 1,
                  "brass": 1,
                  "relief": -3
                },
                "outcome": "The bench gave Maurice a conditional discharge and its open sympathy, and Denny Vale gave the Force a full night of 'heavy-handed policing of the lonely' with the lines lit end to end. The switchboard girls kept the wireless off for a week in protest, which the nick noticed more than anything the bench said.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_pm_car",
        "title": "THE CAR FROM CHEQUERS",
        "startWindow": [8, 12],
        "stages": [
          {
            "id": "mini_pm_car_1",
            "title": "STEAM ON MARSH LANE — A ROVER IN TROUBLE",
            "text": "A black Rover limps onto Marsh Lane at half past one with steam off the bonnet and a Special Branch driver wearing the expression of a man composing his own transfer request. They are returning from Chequers. In the back, in a Gannex mackintosh, with a pipe and two red boxes, is the Prime Minister. The detective beside him wants four things, in order: no names on any air, no public house, somewhere warm, and a fitter — and he wants them in the tone of a man who has read your personnel file on the way here.",
            "choices": [
              {
                "label": "The nick's fitter is on nights — bring the Rover into the yard",
                "result": "The Rover comes into the station yard under its own steam, just, and the fitter — dragged from the pit beneath the spare panda — looks under the bonnet, says 'hoses' with contempt, and sets to. The Prime Minister is shown into the parade room, where Bream, rising, decides against every available form of words and settles for 'evening, sir. Kettle's on.'",
                "effects": {},
                "goto": "mini_pm_car_2",
                "delay": 1
              },
              {
                "label": "Panda escort to the all-night garage on the main road",
                "result": "The Rover follows the panda out of the manor at a wounded crawl, and the handover at the garage forecourt is accomplished in ninety seconds of nobody using any names. The garage man, wiping his hands, watches the tail lights and says 'that was him, wasn't it' to nobody, and gets no answer he needs.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "outcome": "The car was mended on the main road and gone by three, and the manor's part in the evening was a nine-minute escort that appears in no log under any accurate description. The garage man dines out on it to this day, and is believed by no one, which the detective would consider the system working.",
                "grade": "mixed"
              },
              {
                "label": "Strictly correct — ring the Yard and await instructions",
                "result": "The Yard is telephoned, and the Yard — magnificently — convenes. Forty minutes of referred decisions later, the instruction arrives to do precisely what any desk sergeant would have done at half past one, while the Prime Minister waits in a cooling car on Marsh Lane reading his boxes by torch.",
                "effects": {
                  "brass": 2,
                  "relief": -1
                },
                "outcome": "Procedure was followed to the letter and the letter took forty minutes, and the Prime Minister's thanks, when the convoy finally rolled, had frost on it. The Yard's log shows a model response. The detective's private log, it may be assumed, shows something else, filed under this nick's name.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "mini_pm_car_2",
            "title": "THE PARADE ROOM, HALF PAST TWO",
            "text": "The Prime Minister of the United Kingdom is in the parade room with a mug of station cocoa, the red boxes on the counter under Sgt Bream's personal guard — a guard maintained largely by volume of custard cream — and the pipe going. He is asking the relief about pensions, the docks, and whether the boiler always does that, and getting franker answers than he has had in a month of Cabinet. The fitter reckons twenty more minutes. Outside somewhere, the Chronicle's stringer is night-walking his usual streets.",
            "choices": [
              {
                "label": "Keep the room easy — no photographs, one story each, sir",
                "result": "The parade room does the manor proud: nobody performs, nobody asks for anything, and the Prime Minister hears about the boiler, the overtime ban and Nesbitt the cell-four pigeon in exact, unvarnished order. When the fitter puts his head in and says 'she'll do', there is a general and genuine regret.",
                "effects": {
                  "relief": 4,
                  "brass": 2
                },
                "outcome": "The Rover rolled at three with the Prime Minister waving his pipe from the window, and the occurrence book carries, in a guest hand between a lost dog and a noisy party, the entry 'a well-run house'. A case of HP sauce arrived on Tuesday, unattributed. Bream has framed nothing, and moved the entry's page to the front of the book.",
                "grade": "good"
              },
              {
                "label": "Empty the parade room — the fewer who ever knew, the better",
                "result": "The relief is found urgent business at the far end of the building, and the Prime Minister reads his boxes alone in a swept room with his cocoa going cold, guarded by two men and a silence. It is correct. It is bloodless. He does not ask about the boiler, and nobody gets to tell him.",
                "effects": {
                  "brass": 2,
                  "relief": -2
                },
                "outcome": "The breakdown was handled without a ripple and without a witness, and the Prime Minister left a station he had never quite been in. The detective's report commends the discretion. The relief, done out of the story of their careers by their own guvnor, commend nothing, and the parade room has a draught in it now that nobody can find.",
                "grade": "mixed"
              },
              {
                "label": "Tip the Chronicle quietly — Thorne Street deserves the page",
                "result": "The stringer arrives at a fast walk with his collar up and gets one frame through the yard gate — the Rover, the fitter's legs, and a silhouette with a pipe — before the detective's hand arrives on the lens with the finality of weather. The look the detective then gives you is entered in no book and forgotten by no one present.",
                "effects": {
                  "brass": -4
                },
                "outcome": "The picture never ran — the plate was surrendered before the stringer reached his bicycle — but the attempt travelled upward at the speed of anger. No 10's displeasure arrived before the morning papers did, the detective's report names the leak as 'local, and at rank', and the file it sits in is the kind that is never closed, merely consulted.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_wrestler",
        "title": "THE VILLAIN OF THE EMPIRE ROOMS",
        "startWindow": [3, 7],
        "stages": [
          {
            "id": "mini_wrestler_1",
            "title": "SIEGE — PHONE BOX, MARSH LANE",
            "text": "The wrestling bill at the Empire Rooms has turned out, and its villain — the Streatham Spoiler, masked, twenty stone, the most hated man on the circuit — is besieged in the phone box on Marsh Lane by some forty pensioners with umbrellas and strong views on what he did to Young Tommy Lawler in the third fall. The Spoiler has wedged the door with his boot and is pretending to make a call. The chanting is organised. The glass, for the moment, is holding.",
            "choices": [
              {
                "label": "Send PC Duffin to bring him out through the crowd",
                "result": "PC Duffin parts the pensioners with the professional serenity of a man who has policed football, and reaches the box. Through the glass, the most feared man in British wrestling mouths the words 'is it safe?'",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 1 },
                "goto": "mini_wrestler_2",
                "delay": 1
              },
              {
                "label": "Ring the Empire Rooms — the promoter can collect his villain",
                "result": "The promoter arrives with the Spoiler's overcoat, assesses the crowd with a professional eye, and — fatally — starts selling signed photographs off the bonnet of his Zodiac. The siege becomes a queue, which is worse for nobody except the Spoiler, who is still in the box.",
                "effects": { "brass": -1, "relief": 1 },
                "outcome": "The promoter got his villain back at half past midnight, four pounds up on photographs. The Spoiler was smuggled out under a car rug, and the pensioners went home having had, by every account, the best night of the autumn.",
                "grade": "mixed"
              },
              {
                "label": "Let them chant it out — they're seventy if they're a day",
                "result": "Seventy, and organised. The umbrellas start on the glass inside ten minutes, conducted by a lady in a rain hood who fought at fixtures the Spoiler has only read about. Two panes go before the beat man wades in.",
                "effects": { "streets": -3 },
                "outcome": "The box lost two panes and its directory, and the Post Office invoice arrived addressed to the officer in charge of the night, which was taken upstairs to mean you. The Spoiler escaped over the allotments, masked, at a surprising pace.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_wrestler_2",
            "title": "THE UNMASKING",
            "text": "Duffin delivers him to the nick for his own safety, and out of the mask the Streatham Spoiler is Clifford Bezant, who teaches Sunday school in Penge and says 'excuse me' to the furniture. The mask sits on the front desk between you like a seized weapon. His one request, made with both hands around the station tea: the crowd must never learn who he is. Not for his sake — 'half of them are my mum's friends. They'd be so disappointed it's only me.' The Empire Rooms van calls at three.",
            "choices": [
              {
                "label": "Tea in the back office till the van comes — the mask stays on",
                "result": "Clifford waits out the night among the lost property, mask on for the look of the thing, and is smuggled aboard the van at three. Before he goes he signs the occurrence book 'THE STREATHAM SPOILER' in immaculate Sunday-school copperplate.",
                "effects": { "relief": 3 },
                "outcome": "The villain of the Empire Rooms left Thorne Street unbeaten and unidentified, and the signature in the occurrence book is now shown to visitors. Mrs Bezant's friends remain, as her son wished, perfectly and happily deceived.",
                "grade": "good"
              },
              {
                "label": "Walk him out the front unmasked — nobody will know him",
                "result": "Nobody knows him for eleven yards. Then a voice from the bus stop says 'Clifford Bezant, does your MOTHER know?' and the most hated man in British wrestling is marched home by the ear, twenty stone of him, by a lady of four foot eleven.",
                "effects": { "streets": 1, "relief": -1 },
                "outcome": "The Spoiler was unmasked on the pavement outside Thorne Street by his mum's neighbour, and retired from villainy within the month. The circuit lost its best-hated man; Penge Sunday school gained a legend it can never be told about.",
                "grade": "mixed"
              },
              {
                "label": "Book him — technically he incited that crowd",
                "result": "You charge the victim of the siege with causing it, a construction Bream writes down very slowly, twice, to give you time to hear it. Clifford accepts the charge sheet politely and asks whether the mask counts as evidence or property.",
                "effects": { "brass": 2, "relief": -3 },
                "outcome": "The case reached a magistrate who had been at ringside for the third fall and dismissed it in four minutes, observing that if theatre were incitement the Old Vic would be in Wandsworth. The clerk asked the defendant for an autograph. The Force did not shine.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_safe",
        "title": "THE SAFE ON THE FORESHORE",
        "startWindow": [8, 12],
        "stages": [
          {
            "id": "mini_safe_1",
            "title": "LOW TIDE — BELOW THE BRIDGE",
            "text": "The tide is out and a safe is in: half-buried in the mud below the bridge, door upmost, dropped from the parapet by somebody who had finished with it. Two mudlarking kids found it and reported it in exchange for a look inside when it opens, terms they negotiated at the front desk like men. The stencil on the door reads J. LOWRIE & SONS — whose premises were done over in the summer, a job that never cleared. The tide turns at half past four.",
            "choices": [
              {
                "label": "Send PC Whittle and a mate down with ropes before the water",
                "result": "Planks, rope, a block borrowed from the wharf, and language that carries to both banks. The safe comes up the steps an inch at a time, streaming mud, with the two kids supervising from the wall like clerks of works.",
                "effects": { "dispatchUnits": 2, "dispatchTurns": 1 },
                "goto": "mini_safe_2",
                "delay": 1
              },
              {
                "label": "Ring Thames Division — the foreshore is their manor",
                "result": "Wapping arrive by launch with proper tackle and unbearable competence, raise the safe in forty minutes, and take it away on the tide. Their sergeant thanks Thorne Street for 'the shout' in the tone of a man accepting a caddie's advice.",
                "effects": { "brass": -3 },
                "outcome": "The Lowrie safe was raised by Thames Division and cleared a summer robbery — all of which reads very well in Wapping's figures. Thorne Street's part in it survives as one line: 'informed by land station.'",
                "grade": "mixed"
              },
              {
                "label": "Mark the spot — the river's kept it this long",
                "result": "A crate is upturned over the safe and a note weighted on top, which on this foreshore is the legal equivalent of leaving a pie on a windowsill. The kids watch you do it with open disbelief and say nothing, loudly.",
                "effects": { "streets": -2 },
                "outcome": "By morning tide the foreshore held one crate, one note, and a safe-shaped hole. Whoever came back for it brought a lorry and left no prints but tyre marks, and the summer job stays uncleared with an added paragraph.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_safe_2",
            "title": "THE OPENING",
            "text": "The safe stands dripping in the station yard, and old Mr Lowrie — fetched from his bed, arrived in dressing gown and homburg — still carries the key on his watch chain 'out of spite'. It turns. Inside: river water, the summer's wage envelopes slit and empty, and at the bottom, wrapped in oilcloth by somebody with a sense of occasion, a house brick and a note in grease pencil: HARD LUCK ALBIE. The blag, it appears, was Albie Sorrell's — and somebody had it off him before he could spend it.",
            "choices": [
              {
                "label": "Book the lot — the note goes to the collator's index",
                "result": "Envelopes, brick and note are logged, photographed and carded. The collator, receiving the note, holds it to the light like a jeweller and says 'now THAT is a grease pencil I know', which is the happiest anyone has seen him since the Coronation.",
                "effects": { "streets": 3, "brass": 2 },
                "outcome": "The note tied the Lowrie job to Albie Sorrell and the grease pencil to the man who crossed him, and the collator's index gained a card it had waited two years for. Nobody is nicked yet. Everybody, as Bream puts it, is pencilled in.",
                "grade": "good"
              },
              {
                "label": "Give Lowrie his safe back with the Force's condolences",
                "result": "Mr Lowrie receives the empty safe the way men of his generation receive bad news: one nod, no comment, homburg straightened. He has it carted home at his own expense and, reports say, plants geraniums in it out of contempt.",
                "effects": { "relief": 2 },
                "outcome": "The safe ended its career as a planter in a Lowrie garden, door open to show the manor what it thought of villainy. The note went in the file; the file went in the cabinet; the summer job sleeps on, fractionally better documented.",
                "grade": "mixed"
              },
              {
                "label": "Let it slip in the Feathers that Albie was had",
                "result": "The word goes in at nine and is common knowledge by last orders, improving in the telling — by closing, the brick has become a kipper and the note a poem. Somewhere across the manor, a firm holds an unscheduled meeting.",
                "effects": { "streets": 3, "brass": -3 },
                "outcome": "By Friday two firms weren't speaking and a third was laughing, which kept villainy busy with villainy for a fortnight. But the pub knew the nick's fingerprints when it saw them, and a snout who liked quiet arrangements has stopped returning calls.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_pirate",
        "title": "RADIO GLORIA",
        "startWindow": [4, 9],
        "stages": [
          {
            "id": "mini_pirate_1",
            "title": "INTERFERENCE — THE GPO DETECTOR VAN",
            "text": "A GPO detector van is parked on Eldon Road with its loop aerial turning, and its operator is at the front desk with a bearing, a clipboard and a grievance. A pirate transmitter somewhere on the Peabody roofs — 'Radio Gloria', by its own announcement — has been broadcasting since midnight: soul records, and dedications. 'To Vera at the biscuit factory, from you-know-who.' 'To the lads on the early boats.' The GPO man wants a raid tonight. Both your switchboard girls, it should be said, have it on.",
            "choices": [
              {
                "label": "Send PC Doyle up through the Peabody stairwells alone",
                "result": "PC Doyle goes up quietly with the GPO man's bearing and his own ears, following the music through the drying lofts. The signal is coming, he reports from a stairhead phone, from somewhere that smells of valve heat and Brasso.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 1 },
                "goto": "mini_pirate_2",
                "delay": 1
              },
              {
                "label": "It plays till the engineers triangulate it properly",
                "result": "The GPO man writes down the word 'obstruction' where you can see him do it. Radio Gloria, unmolested, dedicates the next record 'to the boys in blue at Thorne Street, working late' — which empties the parade room onto the yard steps to listen.",
                "effects": { "brass": -3, "relief": 2 },
                "outcome": "Radio Gloria signed off at four with 'Night Train' and a promise to return, and the GPO man's report named Thorne Street twice, neither time warmly. The relief hummed all week. Upstairs did not.",
                "grade": "mixed"
              },
              {
                "label": "Give the GPO man two PCs and full ceremony",
                "result": "The raid goes up the stairwells with torches and procedure and finds a warm valve amplifier, a chalked arrow pointing the wrong way, and no Gloria. Somebody on a switchboard somewhere, the GPO man says, looking at the wall in the general direction of yours, tipped the station off.",
                "effects": { "dispatchUnits": 2, "dispatchTurns": 1, "brass": -3, "streets": -1 },
                "outcome": "The full-ceremony raid took two officers up six floors to seize one warm valve and the word LEAK, which the GPO man used in writing. Radio Gloria was back inside a week on a different roof, with a new jingle about detector vans.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_pirate_2",
            "title": "THE MAN BEHIND GLORIA",
            "text": "Doyle follows a cable through the drying loft to the lift-motor room: two turntables on a tea chest, a biscuit tin of 45s filed by feeling, a transmitter built from a wartime signals manual — and Lionel Onslow, postman, headphones round his neck, caught mid-dedication. It takes one question to get the lot: Gloria runs the launderette on Corporation Row. Every 'you-know-who' for a year has been him. He has never once signed his name to it, and the record halfway to the turntable, he confirms miserably, is her favourite.",
            "choices": [
              {
                "label": "Seize the set, lose the paperwork, and send him to the launderette in person",
                "result": "The transmitter comes down the stairs in three polite pieces and the biscuit tin stays with its owner. Doyle's parting advice, delivered as procedure, is that dedications work better said to the face, and Lionel writes it down like a caution.",
                "effects": { "relief": 3 },
                "outcome": "The GPO got its clean frequency and never learned the call sign's name. The banns of Lionel Onslow and Gloria Meade were read at St Saviour's inside the month, and somewhere in a biscuit tin there is a record with both their names on the sleeve.",
                "grade": "good"
              },
              {
                "label": "Let the last record play out, then take the lot in",
                "result": "'Night Train' goes out over the manor at full strength, once, while a constable of the Metropolitan Police holds the motor-room door and watches the aerial wire sing. Then the set is seized, formally, and Lionel carries it down himself, like a coffin bearer.",
                "effects": { "brass": 2, "relief": -1 },
                "outcome": "Radio Gloria closed with its best record and a clean seizure sheet, which satisfied the GPO and nobody else. Gloria at the launderette never learned who you-know-who was — though she kept the wireless tuned to the dead frequency for a while, just in case.",
                "grade": "mixed"
              },
              {
                "label": "Hand him to the GPO man, set and all",
                "result": "The GPO man takes possession of Lionel, the transmitter and the biscuit tin with the satisfaction of a man completing a set, and itemises the 45s singly on the seizure sheet, which takes until dawn and feels like it.",
                "effects": { "brass": 3, "relief": -3 },
                "outcome": "Lionel Onslow was fined forty pounds and lost his records to the Crown. The dedications stopped dead, and at the launderette on Corporation Row, Gloria still wonders — aloud, to customers — whatever happened to you-know-who.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_signs",
        "title": "THE APOSTROPHE MAN",
        "startWindow": [5, 10],
        "stages": [
          {
            "id": "mini_signs_1",
            "title": "OVERNIGHT CORRECTIONS — HIGH STREET",
            "text": "For three nights somebody has been correcting the manor by ladder. The fishmonger's FRESH PLAICE DAILY'S has lost its apostrophe; the council's PEDESTRIAN'S CROSSING has been made lawful; the Odeon's COMMITMENT, misspelt since March, has quietly gained its second M in matching gold. The work is beautiful and completely illegal. Tonight the beat man reports a ladder against the Gas Board hoarding and a figure at the top, painting by torchlight, with a spirit level.",
            "choices": [
              {
                "label": "Send PC Duffin to invite him down for a chat",
                "result": "PC Duffin steadies the ladder, which wins him goodwill, and waits for the letter to be finished, which wins him more. The figure descends backwards at a craftsman's pace, wiping the brush, and asks Duffin to be careful of the wet E.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 1 },
                "goto": "mini_signs_2",
                "delay": 1
              },
              {
                "label": "Let him finish — he's improving the place",
                "result": "The beat man stands easy while the Gas Board's DIG'S IN PROGRESS is restored to sense, then gives the ladder a nod as it folds. By breakfast the hoarding is grammatical and nobody official can prove how.",
                "effects": { "streets": 2, "brass": -2 },
                "outcome": "The manor's signs got a little truer all month, and the Gas Board's letter of complaint about 'unauthorised improvement' was read aloud at parade to general satisfaction. Somewhere a ladder waits. The Force, officially, saw nothing.",
                "grade": "mixed"
              },
              {
                "label": "Lights on him — criminal damage in progress",
                "result": "Pinned in the headlamps, the figure finishes the serif — finishes it — caps the tin, and descends with the dignity of a man leaving a royal box. He is nicked at the foot of his own ladder and asks only that somebody bring the spirit level in as well; it was his father's.",
                "effects": { "arrests": 1, "brass": 2, "relief": -2 },
                "outcome": "One elderly signwriter spent the night in the cells for painting an apostrophe out of a fishmonger's lie, and the charge sheet — 'damage', where every witness said 'repair' — embarrassed everyone it touched. The Gas Board, alone in London, was satisfied.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_signs_2",
            "title": "THE MAN WITH THE SPIRIT LEVEL",
            "text": "He is Mr Pomfret, signwriter, retired, forty-one years at the trade — 'I did the fascias for half this street in 1938, and I won't stand at a bus stop and watch them go out spelt wrong.' His corrections, the beat man admits, are better than the originals. In his satchel, in draughtsman's pencil, is a list of remaining offences ranked by severity. The final entry, underlined twice, is the painted board outside Thorne Street nick, where NOTICE'S ARE POSTED DAILY has stood uncorrected for two years.",
            "choices": [
              {
                "label": "Commission him: the station board, by daylight, signed",
                "result": "Mr Pomfret returns at ten the next morning with his ladder, his father's spirit level, and a suit for working in, and repaints the board while two PCs hold the pavement. He signs the bottom corner, small, the way he was taught: POMFRET FECIT.",
                "effects": { "brass": 2, "relief": 3 },
                "outcome": "The board outside Thorne Street is now the best-lettered thing in the division, admired at the Commander's inspection at some length. The list in the satchel is being worked through legitimately, one shopkeeper at a time, at trade rates. Grammar has won.",
                "grade": "good"
              },
              {
                "label": "Confiscate the list and mislay the ladder till morning",
                "result": "The list goes in a drawer and the ladder goes behind the property store, both 'pending enquiries', and Mr Pomfret walks home under a caution phrased so gently it could be framed. The wet E on the hoarding dries perfect and unpunished.",
                "effects": { "relief": 1 },
                "outcome": "The corrections stopped, mostly, and the manor's signage holds at its current level of dishonesty. The list sits in the drawer where Bream consults it privately, and once a month something on the High Street gets quietly truer overnight anyway.",
                "grade": "mixed"
              },
              {
                "label": "Charge him — the Gas Board insists on its pound of paint",
                "result": "The papers go through because a hoarding is property and paint is damage and the law has no box marked BUT IT WAS WRONG BEFORE. Mr Pomfret pleads guilty with the satchel on his knees and corrects the charge sheet's punctuation while waiting.",
                "effects": { "arrests": 1, "brass": 1, "relief": -3 },
                "outcome": "The magistrate examined the photographs of the hoarding before and after, asked the Gas Board's solicitor who the Force ought to charge for the original, and gave Mr Pomfret an absolute discharge and his spirit level back. The Gas Board's costs were not awarded.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_window",
        "title": "THE WEEPING WINDOW",
        "startWindow": [6, 11],
        "stages": [
          {
            "id": "mini_window_1",
            "title": "CROWD — CONVENT OF ST CLARE",
            "text": "Word has gone round the small hours the way only this kind of word goes: the east window of the convent chapel on Chapel Yard is weeping. By two there are forty people at the railings with candles, prams and a flask economy, and more arriving. The sisters are divided — the older ones are for blessing the crowd, and Sister Verity, who keeps the accounts, is for fetching a builder. Chapel Yard was not built for forty people, and it certainly wasn't built for eighty.",
            "choices": [
              {
                "label": "Send PC Whittle up a ladder with Sister Verity's torch",
                "result": "PC Whittle and Sister Verity proceed up the scaffold side of the chapel with a torch and a notebook, watched from below in total silence by forty candles. Twice the crowd sighs as one, which does nothing for anyone's footing.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 1 },
                "goto": "mini_window_2",
                "delay": 1
              },
              {
                "label": "Police the candles, mind the prams, let the night decide",
                "result": "The beat man walks the railings keeping flame and pram apart, and the crowd, finding itself neither moved on nor encouraged, settles into hymn-singing of considerable quality. The sopranos are from the biscuit factory choir and it shows.",
                "effects": { "streets": -1, "relief": 1 },
                "outcome": "The crowd sang until the rain came at four and then went home damp and content, having seen either a miracle or a very good night out. The window wept or didn't, according to who you ask; the Force, present throughout, took no position.",
                "grade": "mixed"
              },
              {
                "label": "Disperse them — forty naked flames at two in the morning",
                "result": "Moving on the devout is a manoeuvre with no winning formation, and it is not won tonight. The crowd goes, slowly, in the manner of people who intend to write letters — and three separate ladies inform the beat man that they will pray for him, in a tone that makes it a threat.",
                "effects": { "streets": 2, "relief": -3 },
                "outcome": "Chapel Yard was cleared by half past two and filled again by nine, twice the size, with a Chronicle photographer. The letters, when they came, went to the Commander, the Cardinal and the Queen, in that order.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_window_2",
            "title": "THE GLAZIER'S VERDICT",
            "text": "Whittle reports from the scaffold, notebook first: a cracked gutter above the east gable is feeding a hairline channel behind the leading, and when the chapel boiler heats after midnight the condensation runs — down one fissure, out at the Virgin's cheek, twice nightly, regular as a timetable. Sister Verity closes her own notebook with the words 'a builder, then.' Below, the crowd has begun 'Abide With Me'. Somebody must now decide what, if anything, gets announced from the steps.",
            "choices": [
              {
                "label": "The plain truth from the steps, gutter and all",
                "result": "You give it to them straight: a gutter, a crack, the boiler's timing. There is a silence, then a voice from the back — 'the singing was nice though' — and general agreement, and the crowd disperses in good order, some of it visibly relieved, one or two staying to finish the hymn anyway.",
                "effects": { "streets": 3 },
                "outcome": "The Chronicle ran MIRACLE EXPLAINED; SINGING CONTINUES ANYWAY, which everyone concerned could live with. The convent got its gutter mended by a roofer who refused payment, and Sister Verity sent the nick a receipt marked 'for honesty'.",
                "grade": "good"
              },
              {
                "label": "Let the sisters announce it their own way, at Lauds",
                "result": "The Force says nothing and the convent says it at dawn, in the convent's own language, which contrives to contain a gutter, the grace of ordinary things, and no retraction of anything. The crowd thins gently over three nights, like a tide going out.",
                "effects": { "relief": 2 },
                "outcome": "The weeping window closed its run quietly under management, no announcement from the state required. A few still come on cold nights when the boiler runs long, and Sister Verity lets them stand there, on the grounds that the singing does no harm.",
                "grade": "mixed"
              },
              {
                "label": "Announce nothing — crowds thin, faith is free",
                "result": "Nothing is said, and nature abhors nothing said. By the following midnight the crowd is two hundred, a man is selling toffee apples at the railings, and a coach party from Luton has arrived with folding chairs. Chapel Yard is now, administratively speaking, a venue.",
                "effects": { "streets": -4 },
                "outcome": "The silence lasted two nights and cost four constables a week of crowd duty, one pickpocket a good harvest, and the convent its peace at Lauds. When the gutter was finally announced it was somehow the Force's fault, and nobody could say exactly why, only that it was.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_club",
        "title": "THE CHRISTMAS CLUB",
        "startWindow": [3, 8],
        "stages": [
          {
            "id": "mini_club_1",
            "title": "MISSING — THE CLUB TREASURER",
            "text": "A deputation is at the desk, led by Mrs Grigson, who has views. The Bell & Compass Christmas Club pays out on Saturday — four hundred pounds, the whole street's Christmas, geese and bicycles and a wedding dress — and its treasurer, Arthur Cottle, has not been seen since Thursday. Milk on his step, curtains shut, and the club book wherever he is. Nobody wants to say the word so Mrs Grigson says it for them: 'absconded'. Bream, privately, has known Arthur Cottle thirty years and doubts he could abscond from a bus queue.",
            "choices": [
              {
                "label": "Send PC Doyle round with the spare-key neighbour",
                "result": "PC Doyle collects the neighbour and the key. There is a light on in Cottle's kitchen, the neighbour reports as they walk, that has been on since Thursday, and a shape at the table that moves when knocked for and doesn't answer.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 1 },
                "goto": "mini_club_2",
                "delay": 1
              },
              {
                "label": "Circulate his description to the night cars",
                "result": "The description goes out — sixty-one, grey mackintosh, walks with a list to port since the docks — and the deputation is sent home with a promise and no adjectives. The night cars turn him up by six: at his sister's in Leyton, with the club book on his knees.",
                "effects": { "brass": 1 },
                "outcome": "Arthur Cottle was found at his sister's in Leyton with the book intact and his nerve gone, and was returned before Saturday. The deputation was told only that he'd been 'traced', and where was withheld — on the grounds, Bream ruled, that Leyton is punishment enough.",
                "grade": "mixed"
              },
              {
                "label": "He's a grown man till Saturday — particulars only",
                "result": "Particulars are taken at dictation speed while Mrs Grigson watches the pen like a hawk watching a vole. The deputation leaves unsatisfied, and the street spends Friday saying the word Mrs Grigson brought them over every fence on it.",
                "effects": { "streets": -3 },
                "outcome": "Saturday came, the queue formed at the Bell & Compass, and no treasurer. The club was paid out on Monday instead — the delay's whole story never caught up with the rumour, and the street's Christmas ran on credit and grievance for a week it didn't need to.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_club_2",
            "title": "THE MAN AT THE KITCHEN TABLE",
            "text": "Doyle finds Arthur Cottle at his own kitchen table behind three days of drawn curtains, unshaved, the club book open before him at a page he has read a hundred times. He is not fled and he has not spent the Christmas fund. He is four pounds short — four pounds, lost on one weak afternoon at the bookmaker's in October and hidden since under Post Office interest arithmetic that won't come right. Three hundred and ninety-six pounds sits untouched in the tin. He would rather have died, he says, and it isn't a figure of speech, than face the queue on Saturday four pounds light.",
            "choices": [
              {
                "label": "Four pounds is findable — the whist-night solution",
                "result": "A word at the Bell & Compass and the landlord tops the tin from the whist float, on terms — Cottle keeps the book till Saturday, pays out to the penny, and resigns at the annual meeting 'on his health', with the club's thanks minuted. Nobody outside four men and one kitchen ever learns the arithmetic.",
                "effects": { "relief": 4 },
                "outcome": "The Christmas Club paid out to the farthing on Saturday morning and Arthur Cottle shook every hand in the queue. He resigned in January as agreed, was voted a presentation clock by members who never knew what for, and has not passed the bookmaker's door since.",
                "grade": "good"
              },
              {
                "label": "March him to the deputation, book open — he owns it",
                "result": "Cottle stands in the Bell & Compass saloon bar and says the whole of it — the afternoon, the four pounds, the three days behind the curtains — to a room gone quiet as a vestry. Mrs Grigson hears him out to the end, and then, awfully, says nothing at all.",
                "effects": { "streets": 1, "relief": -1 },
                "outcome": "The truth stood up in the saloon bar and was, in time, forgiven — at the rate the street forgives, which is slowly and with reference back. The club paid out whole, minus four pounds made up round the room in silence, coin by coin, which was mercy of the durable kind.",
                "grade": "mixed"
              },
              {
                "label": "Four pounds embezzled is embezzlement — charge sheet",
                "result": "The word 'embezzlement' is typed above the figure 'four pounds' and both survive to the charge sheet, which Bream reads twice and hands back without comment. Cottle signs everything put in front of him with the relief of a man who has stopped waiting for the knock.",
                "effects": { "arrests": 1, "brass": 2, "relief": -4 },
                "outcome": "The bench heard 'four pounds', looked at the prosecution for a long moment, and gave a conditional discharge to a broken man whose fund was intact to within the price of a goose. The street's Christmas was paid out by the Bell's landlord under a new book, and Thorne Street's name was mud in it till spring.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_marrow",
        "title": "THE CHRYSANTHEMUM WAR",
        "startWindow": [2, 6],
        "stages": [
          {
            "id": "mini_marrow_1",
            "title": "TORCHLIGHT — THE ALLOTMENTS",
            "text": "The horticultural society's late show is at ten tomorrow in the church hall, and the front desk has Harold Gubbins, seventy-three, in his overcoat over his pyjamas, reporting a torch moving on the allotments. Specifically: on HIS plot, among HIS chrysanthemums, the ones entered in tomorrow's classes. More specifically still: it will be Cyril Nokes, with whom he has been at war since 1947 over a boundary and a woman, in that order, both long gone. The certainty of a man who has hated tidily for thirty years is a kind of evidence in itself.",
            "choices": [
              {
                "label": "Send PC Duffin over the allotment gate, quietly",
                "result": "PC Duffin goes over the gate without the hinge squeak every plot-holder knows, and works down the cinder path by starlight. The torch is three plots in, low to the ground, moving with the unhurried pattern of a man doing something he has done many times before.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 1 },
                "goto": "mini_marrow_2",
                "delay": 1
              },
              {
                "label": "One slow pass with the blue light — scare it off",
                "result": "The area car breathes past the allotment gates once, lit, at walking pace, and the torch goes out like a held breath. Nothing further moves. In the morning, the only evidence is a pair of dropped secateurs by the water butt — good ones, which Gubbins impounds and later has framed.",
                "effects": { "streets": 1 },
                "outcome": "The intruder was frightened off unidentified, the chrysanthemums took the cup, and the framed secateurs hang in Gubbins's shed labelled EXHIBIT A — the feud's finest trophy since the disputed fence of 1947. Nokes, asked at the show about his missing secateurs, replied that he'd never owned a pair, which everyone present enjoyed enormously.",
                "grade": "mixed"
              },
              {
                "label": "They're both seventy — it will keep till morning",
                "result": "Mr Gubbins is sent home with an assurance and goes, at the pace of a man composing a letter to somebody about something. The allotments keep their own counsel till first light, which is when the shouting starts.",
                "effects": { "streets": -2, "relief": -1 },
                "outcome": "By morning three blooms in Gubbins's cold frame were off at the neck, cut clean, and the show ran on an atmosphere you could have entered in the classes. Gubbins accused Nokes across the trestles; Nokes, oddly, looked less triumphant than winded; and the society's minutes record 'scenes'.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_marrow_2",
            "title": "THE MAN AMONG THE CHRYSANTHEMUMS",
            "text": "Duffin's torch finds Cyril Nokes on his knees in Harold Gubbins's chrysanthemums — not cutting them. Fleecing them. There is a frost warning out, and Nokes is working down the row with newspaper and twine, hooding his enemy's blooms against the cold with the tenderness of a man tucking in grandchildren. It comes out in a whisper, because sound carries on allotments: he has done this for years. Every frost since '68. 'If frost takes his blooms, what have I beaten? I'll have him fair, at the bench, at his best. Don't you tell him, son. It'd kill the both of us.'",
            "choices": [
              {
                "label": "Keep his secret — walk him home the long way round",
                "result": "Duffin sees the last three blooms hooded, holds the torch for the twine, and walks Nokes home by the towpath where nobody's curtains twitch. The occurrence book, consulted in the morning, contains one entry for the allotments: 'all correct'.",
                "effects": { "relief": 3 },
                "outcome": "Gubbins took the cup at ten with blooms that survived the frost by a miracle he put down to breeding, and Nokes took second and told him the judging was bent, and the feud continued in excellent health — maintained, as it has been for years, by the only man who understands what it's for.",
                "grade": "good"
              },
              {
                "label": "Wake Gubbins — let him see it with his own eyes",
                "result": "Gubbins arrives in overcoat and pyjamas, prepared for triumph, and stands at his own plot watching his enemy of thirty years hood his chrysanthemums against the frost. Neither man says anything. Nokes finishes the row because leaving it half done would be shoddy, and the three of them stand there in the cold, at a loss.",
                "effects": { "streets": 1, "relief": -1 },
                "outcome": "The feud, shown its own engine, wobbled badly. At the show they were seen sharing a flask by the trophy table, looking lost, and the society's president said it was like watching two countries run out of history. The cup went to a newcomer from the flats, unopposed.",
                "grade": "mixed"
              },
              {
                "label": "Found on enclosed premises at night — proper entry, proper channels",
                "result": "The entry is made — Nokes, C., found on another's plot at 0300, no offences disclosed, advised — and proper channels do what proper channels do: the allotment secretary, who is also on the parish council, reads it by Tuesday, misreads it by Wednesday, and the version that reaches the church hall has secateurs in it.",
                "effects": { "streets": -1, "relief": -2 },
                "outcome": "NOKES CAUGHT AT GUBBINS'S BLOOMS ran round the manor in the wrong key, and no correction caught it. Nokes was asked to stand down from the society committee; he never told them what he was actually doing, because that would have been worse; and the frost, three nights later, took the lot.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_bride",
        "title": "THE MORNING BRIDE",
        "startWindow": [4, 8],
        "stages": [
          {
            "id": "mini_bride_1",
            "title": "CALLER AT THE DESK — MISS DENT",
            "text": "Miss Sandra Dent is at the front desk in curlers and her mother's good coat, and she is to be married at eleven this morning at St Saviour's. The complication is in your cells: Barry Prewett, groom, lifted by the Late Turn drunk and disorderly at the end of his stag night, having attempted to conduct the traffic on the High Street with a chip fork. She has the ring in her coat pocket for safekeeping, and she would like to know, with terrible calm, what precisely it takes.",
            "choices": [
              {
                "label": "Fetch Barry up to the wicket for two minutes",
                "result": "Barry arrives at the wicket blinking, one eye blacked, borrowed suit beyond rescue, and stands to attention the way only a man four hours off the drink can. Sandra looks at him for a long time without blinking at all.",
                "effects": { "relief": 2 },
                "goto": "mini_bride_2",
                "delay": 1
              },
              {
                "label": "Bail him now — the paperwork is routine",
                "result": "The bail form takes eleven minutes and Sandra watches every one of them signed. Barry is released into custody considerably stricter than yours, and the desk agrees the wedding is now his safest option.",
                "effects": { "brass": -2, "relief": 3 },
                "outcome": "Barry Prewett was bailed at one in the morning and married at eleven, black eye and all. The photographs will explain themselves for a generation.",
                "grade": "good"
              },
              {
                "label": "He stays till the morning van, same as anyone",
                "result": "You explain the position. Sandra thanks you in a voice that lowers the temperature of the front office by several degrees, and leaves. Bream, without looking up, begins quietly checking the calendar for the date of your retirement.",
                "effects": { "brass": 2, "relief": -3 },
                "outcome": "The groom went to court with the drunks at six and the bride went to church with her uncle standing by. The wedding held — a fact nobody at Thorne Street is permitted to take credit for.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_bride_2",
            "title": "TWO MINUTES AT THE WICKET",
            "text": "The two minutes are up and neither of them has used the second one. Barry has apologised once, fully, in the manner of a man reading his own charge sheet. Sandra has taken the ring out of her pocket and is holding it in her open palm — not offering, not withdrawing, just letting it sit there under the desk lamp where everyone can consider it. Bream has found paperwork that keeps him within earshot.",
            "choices": [
              {
                "label": "Bail him into her custody — she signs the book",
                "result": "Sandra signs for Barry the way a woman signs for a parcel she intends to have words with, and steers him out by the elbow. Bream enters it as 'released to a responsible person', and for once the book understates it.",
                "effects": { "relief": 4 },
                "outcome": "The groom was signed out by the bride like lost property and married on time. The desk kept the charge sheet as a souvenir; the marriage, by all reports, keeps the peace better than the Force does.",
                "grade": "good"
              },
              {
                "label": "Let them talk, then back down he goes till six",
                "result": "They get their conversation, quiet and complete, through the wicket. Barry goes back down straighter than he came up, and Sandra leaves the ring with the desk 'to give him at six, if he's earned it'. Bream accepts the commission gravely.",
                "effects": { "brass": 2 },
                "outcome": "Barry rode the morning van, was bailed at eight, and made the church at five to eleven by way of his best man's motorbike. The ring, handed over by Sgt Bream at six sharp, arrived before he did.",
                "grade": "mixed"
              },
              {
                "label": "Time's up — send her home to the church",
                "result": "You close the wicket on the pair of them mid-sentence. Sandra puts the ring back in her pocket with a click the whole front office hears, and the door takes a long time to swing shut behind her.",
                "effects": { "relief": -4 },
                "outcome": "The wedding went ahead at eleven with the groom arriving from a cell and the bride arriving from a police station, and the story of the closed wicket arrived before either of them. Thorne Street was not toasted at the reception.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_float",
        "title": "THE FOUR O'CLOCK FLOAT",
        "startWindow": [9, 12],
        "stages": [
          {
            "id": "mini_float_1",
            "title": "MILK FLOAT PROCEEDING — CORPORATION ROW",
            "text": "Panda 3 reports a milk float proceeding along Corporation Row at a stately walking pace, lights off, crates full, at an hour when no dairy in London is delivering. The yard padlock at Meadowcroft Dairies has been cut with care and hung back on its hasp. The driver is identified at a distance: Wilf Askey, twenty-two years on this round, made redundant in the spring when the dairy went over to the big vans. He is in full uniform, and he is leaving pints on the steps where his customers used to be.",
            "choices": [
              {
                "label": "Follow him at a distance — let him finish the street",
                "result": "The panda falls in behind at four miles an hour, headlights off, in what the crew will later describe as the slowest pursuit in the history of the Metropolitan Police. Wilf delivers the whole of Corporation Row without once looking back.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 1 },
                "goto": "mini_float_2",
                "delay": 1
              },
              {
                "label": "Stop the float now, quietly",
                "result": "Wilf pulls up at the kerb when asked, sets the handbrake out of habit, and surrenders the keys like a man handing over a commission. He asks only that somebody take the pints in off the steps before the schoolkids have them.",
                "effects": { "streets": 2, "relief": -2 },
                "outcome": "The float went back to the yard and Wilf Askey went home on foot, still in uniform. The pints were recovered from eleven doorsteps by a PC with a crate, watched from several windows by people who remembered their milkman.",
                "grade": "mixed"
              },
              {
                "label": "Ring the dairy manager out of bed for a decision",
                "result": "The manager arrives in a car coat over pyjamas, inventories his own milk by torchlight, and uses the phrase 'taking and driving away' four times with rising enthusiasm. Wilf stands by the float and says nothing at all.",
                "effects": { "brass": 2, "relief": -4 },
                "outcome": "The dairy pressed for charges and got them, itemised down to the last pint. The magistrate, reading that a man had broken into his old job to do it for nothing, imposed the smallest fine available to him and said so.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_float_2",
            "title": "END OF THE ROUND",
            "text": "The round ends where it always ended: the last door on Corporation Row, Mrs Pargeter's, who took one gold-top daily for thirty years and died in June. Wilf leaves the pint anyway, squares it on the step with two fingers, and stands back the way a man stands back from a grave. Then he returns to the float, sits at the wheel, and waits — he has known the panda was behind him since the first corner.",
            "choices": [
              {
                "label": "Walk him back to the yard and square the dairy at eight",
                "result": "Wilf drives the float home with a police escort and hangs the cut padlock on the office door with a note of apology in a milkman's copperplate. At eight you put it to the manager as a stores matter, not a criminal one, and watch him decide to be a human being.",
                "effects": { "relief": 4 },
                "outcome": "The dairy took Wilf Askey back two mornings a week 'for the awkward rounds', which is dairy for an apology. The occurrence book records one padlock, cut and returned, and says nothing whatever about the pint on Mrs Pargeter's step.",
                "grade": "good"
              },
              {
                "label": "Float booked as found property; Wilf walks home",
                "result": "The float is entered in the book as 'found, Corporation Row, engine warm' — which is true as far as it goes, and goes no further by arrangement. Wilf is halfway home before the paperwork is finished, and the yard has its float back by five.",
                "effects": { "brass": -2, "relief": 2 },
                "outcome": "Nothing on paper connects Wilf Askey to the four o'clock round, though every household on Corporation Row could give evidence from behind their curtains. The dairy counted its crates, found them right to the pint, and let it lie.",
                "grade": "mixed"
              },
              {
                "label": "Nick him — taking and driving away is what it is",
                "result": "Wilf offers his wrists over the steering wheel, which is not how anyone wanted this to go, and asks whether he might finish setting the handbrake first. The arrest report will read like a eulogy whoever types it.",
                "effects": { "arrests": 1, "brass": 2, "relief": -4 },
                "outcome": "Wilf Askey was charged with taking a milk float to deliver milk, a sentence the court clerk read out twice to be sure of it. The bench gave him a conditional discharge and the public gallery gave the prosecution a look it has not recovered from.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_bells",
        "title": "THE NIGHT BELLS",
        "startWindow": [6, 10],
        "stages": [
          {
            "id": "mini_bells_1",
            "title": "ST SAVIOUR'S — BELLS AT TWO",
            "text": "The bells of St Saviour's are going at two in the morning — not a toll, a full peal, rung by somebody who knows the work. There is a light in the ringing chamber and a bicycle at the porch, identified by the beat man as the verger's. The switchboard has taken eleven complaints, one congratulation, and a call from a gentleman on Chapel Yard asking, in a steady voice, whether it is the Russians.",
            "choices": [
              {
                "label": "Send PC Doyle up the tower",
                "result": "PC Doyle proceeds to the church and is admitted by a door that was never locked. The bells continue overhead, unhurried, working through the changes like a man saying something he has waited a year to say.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 1 },
                "goto": "mini_bells_2",
                "delay": 1
              },
              {
                "label": "Ring the vicarage — the Church can mind its own tower",
                "result": "The vicar takes the news like a man who has had it before, says 'ah — that will be Mr Harbottle' in a voice from which all surprise has long departed, and goes up the tower himself in cassock and pyjamas. The bells stop twenty minutes later, gently, finishing the change first.",
                "effects": { "brass": 1, "relief": 1 },
                "outcome": "The Church retrieved its own verger from its own tower, which is how the vicar preferred it. What was said between them stayed up among the bells; the parish magazine will report 'maintenance'.",
                "grade": "mixed"
              },
              {
                "label": "Let them ring — a church bell is a licensed nuisance",
                "result": "The peal runs another full hour. The switchboard log grows to thirty-one calls, the gentleman from Chapel Yard rings back to say that if it is the Russians they are taking their time, and the manor lies awake as one body.",
                "effects": { "streets": -3, "relief": -1 },
                "outcome": "The bells rang until half past three and the complaints rang until Tuesday. The Chronicle gave it a paragraph — 'MYSTERY PEAL BAFFLES POLICE' — which upstairs read with the emphasis on the last word.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_bells_2",
            "title": "THE MAN AT THE ROPES",
            "text": "PC Doyle reports from the tower: the ringer is Mr Harbottle, the verger, alone at the ropes and working through a full peal single-handed, which cannot be done, and which he is doing. His wife died a year ago tonight. She was a ringer — she taught him — and he could not sleep, and, as he explains without stopping, 'she liked the bells rung properly, and there's nobody left to ring them with.' He has four changes left.",
            "choices": [
              {
                "label": "Take a rope — see him through the last changes",
                "result": "Doyle, who rang as a boy in Norfolk and never mentioned it on a form, takes the second rope. The last four changes go out over the manor rung by a widower and a policeman, and are, by the account of everyone still awake, the best of the night.",
                "effects": { "relief": 4 },
                "outcome": "The peal finished properly, two ropes, as it was taught. Mr Harbottle wheeled his bicycle home escorted by a constable and shook hands at the gate. The switchboard complaints were filed under a single word: resolved.",
                "grade": "good"
              },
              {
                "label": "Bring him down gently — tea at the nick till morning",
                "result": "The bells stop mid-change, which every ringer in the borough will notice and forgive. Mr Harbottle comes down with his coat over his arm and drinks station tea in the front office until first light, telling Bream about his wife, who once rang in seven counties in a single day.",
                "effects": { "relief": 2 },
                "outcome": "The verger spent the anniversary in the warmth of the front office instead of alone in a cold tower, which was likely the better place for him — though the peal stays unfinished, and he knows it.",
                "grade": "mixed"
              },
              {
                "label": "Caution him for the nuisance — eleven calls is eleven calls",
                "result": "Doyle delivers the caution at your order, up in the chamber, to a man holding a rope's end with both hands. Mr Harbottle accepts it with complete courtesy, asks that the complaints be conveyed his apologies, and comes down leaving the peal broken off mid-change.",
                "effects": { "brass": 2, "relief": -3 },
                "outcome": "The nuisance was formally cautioned and formally logged, and the tower went dark. The vicar's letter to the Commander was three pages, hand-delivered, and used the word 'grief' in every paragraph.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_pyjama",
        "title": "THE PYJAMA MAN",
        "startWindow": [5, 9],
        "stages": [
          {
            "id": "mini_pyjama_1",
            "title": "MARSH LANE — MAN IN PYJAMAS",
            "text": "The beat man reports a gentleman proceeding along Marsh Lane in striped pyjamas and one slipper, walking with tremendous purpose and checking a wristwatch he is not wearing. He is Mr Skelton of Eldon Road, fast asleep — a sleepwalker, known for it since the war — and by his heading he is going to work: the print works on Keller Street, which moved to Watford in 1971. The beat man's grandmother held it was fatal to wake them, and the beat man is taking no chances with either of them.",
            "choices": [
              {
                "label": "Send PC Whittle to walk him gently home",
                "result": "PC Whittle falls in beside him and steers by the shoulder, a degree at a time, the way you'd bring a ship about. Mr Skelton accepts the escort without waking, and twice says 'morning, Ernie' to nobody the Force can identify.",
                "effects": { "dispatchUnits": 1, "dispatchTurns": 1 },
                "goto": "mini_pyjama_2",
                "delay": 1
              },
              {
                "label": "Wake him now, on the pavement",
                "result": "He comes to all at once under a lamppost, swings on pure fright, misses, and apologises to the lamppost, the beat man, and the Metropolitan Police in that order. He is then obliged to walk home awake, in pyjamas, past the Feathers as it empties.",
                "effects": { "streets": 1, "relief": -1 },
                "outcome": "Mr Skelton got home awake, mortified, and frozen, and has crossed the road from every policeman he has seen since. The beat man maintains his grandmother was right and it could have gone very much worse.",
                "grade": "mixed"
              },
              {
                "label": "Follow at ten yards and see where the night takes him",
                "result": "The night takes him two miles, to the gates of a print works that has been a carpet warehouse for four years. He stands before them with his empty wrist raised, clocking in at a works that isn't there, and the beat man watches from ten yards with his own watch in his hand.",
                "effects": { "streets": -2 },
                "outcome": "Mr Skelton stood at the old gates until the cold woke him, and walked home four miles in one slipper. Mrs Skelton, who had been ringing round the hospitals since two, has registered her opinion of the Force's ten yards, and it is on file.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_pyjama_2",
            "title": "THE FRONT DOOR",
            "text": "Mrs Skelton has the front door open before Whittle can knock and the kettle already on — this is not, her face explains, the first time. 'He goes when they change the clocks,' she says, taking delivery of her husband by the elbow, 'or when there's bad news at the docks.' The docks laid off forty men yesterday. Mr Skelton, still asleep on his own doorstep, says 'morning, Ernie' once more, with feeling. Ernie, it emerges, was foreman of the print works. He died in 1969.",
            "choices": [
              {
                "label": "See him tucked in, and nothing in the book but 'escort'",
                "result": "Mr Skelton goes up his own stairs asleep, guided like a barge into a lock. Mrs Skelton stands Whittle a cup of tea in the kitchen and tells him about the print works, the war, and Ernie, who once walked her husband home the same way in 1944.",
                "effects": { "relief": 3 },
                "outcome": "The book says 'gentleman escorted home, Marsh Lane, no further action', and the kettle said the rest. Mrs Skelton sends the nick a tin of shortbread at Christmas now, addressed to 'the young man who steers'.",
                "grade": "good"
              },
              {
                "label": "Suggest the doctor in the morning — put it in writing",
                "result": "You have Whittle leave a note recommending Dr Prosser be consulted, which Mrs Skelton receives the way wives receive written advice about their own husbands: politely, at arm's length, filed behind the clock with the insurance.",
                "effects": { "brass": 2, "relief": -1 },
                "outcome": "The note went behind the clock and Mr Skelton went to Dr Prosser anyway, a fortnight on, at his wife's timing rather than the Force's. He walks less now the docks have settled. The paperwork, for once, did no harm.",
                "grade": "mixed"
              },
              {
                "label": "Log it as found wandering — proper channels, ambulance and all",
                "result": "Proper channels arrive with a blue light and wake half of Eldon Road, curtain by curtain. Mr Skelton comes to in his own front garden surrounded by uniforms, which is a hard way to learn where you've been, and Mrs Skelton's kettle goes cold unpoured.",
                "effects": { "brass": 1, "relief": -3 },
                "outcome": "The ambulance men, having driven across the borough at four in the morning, assessed the patient as 'asleep', wrote it down, and left. Eldon Road talked of nothing else for a week, and none of it kindly about the blue light.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_lostboy",
        "title": "THE BOY AT THE DESK",
        "startWindow": [
          2,
          4
        ],
        "stages": [
          {
            "id": "mini_lostboy_1",
            "title": "SMALL CALLER — FRONT DESK",
            "text": "Closing time, and the front desk has a customer who can barely see over it: Colin Etchells, aged seven and a half, mackintosh buttoned wrong, reporting his dad missing. His mum's on nights at the biscuit factory and he woke to an empty house. Bream issues cocoa and the property-book stool; Regan takes up guard duty on his lap. His father, the desk agrees privately, is in the Duke of Clarence, and knows precisely where he is.",
            "choices": [
              {
                "label": "Send Whittle down the Clarence for the father",
                "result": "Whittle departs at a dignified pace. On the stool, Colin gives his statement in full: his dad's name, his dad's darts team, and the fact that Regan is heavier than she looks.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "goto": "mini_lostboy_2",
                "delay": 1
              },
              {
                "label": "Ring his mum out of the biscuit factory",
                "result": "Mrs Etchells arrives inside the half hour, still in her hairnet, thanks the desk with terrifying politeness, and sets course for the Clarence holding Colin's hand like a warrant.",
                "effects": {
                  "relief": 3
                },
                "outcome": "Colin went home under proper escort and his father came home under fire. The desk agreed the correct authority had been notified.",
                "grade": "good"
              },
              {
                "label": "He's not lost, son — send him home with directions",
                "result": "He goes, mackintosh still buttoned wrong. Regan follows him as far as the corner, which is further than you did. Bream says nothing at all, at length.",
                "effects": {
                  "relief": -4
                },
                "outcome": "The boy walked home alone to an empty house and the front office spent the rest of the night not mentioning it. The cocoa tin stays shut on your account.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_lostboy_2",
            "title": "ONE FOUND FATHER",
            "text": "Whittle returns steering Ted Etchells, docker, four pints down and not lost — he has known exactly where he was all evening; it is his son's whereabouts that have winded him. Colin is asleep on the property-book stool, cocoa half finished, Regan on sentry duty in his lap. Etchells stands in the middle of the front office, cap in both hands, and asks, very quietly, that nobody wake the boy just yet.",
            "choices": [
              {
                "label": "Let him carry the boy home — no lecture, no paper",
                "result": "Etchells lifts his son like a crate marked FRAGILE. Colin half wakes at the door, says 'found him', and goes back under. Bream enters it in the book as property restored to owner.",
                "effects": {
                  "relief": 3
                },
                "outcome": "One father recovered, one boy carried home asleep, and nothing on paper but Bream's entry: 'property restored to owner.' Some nights the job pays in kind.",
                "grade": "good"
              },
              {
                "label": "Quiet word first — the boy crossed the manor alone at closing",
                "result": "You give him the route his son walked, street by street. Etchells takes it like a man taking a punch he agrees with, and says he'll be stopping at the one pint Fridays, which everyone present chooses to believe.",
                "effects": {
                  "streets": 3
                },
                "outcome": "The father got the geography of what his boy did and took it standing. He'll keep to the one pint for a month, maybe two, and the month counts.",
                "grade": "mixed"
              },
              {
                "label": "Dress him down at volume, in front of the desk",
                "result": "You do it by the book and above it. Etchells stands and takes it; Colin wakes for the last third and watches. Father and son leave in silence, both fully awake now.",
                "effects": {
                  "streets": 3,
                  "relief": -3
                },
                "outcome": "The lecture was accurate, deserved, and heard by exactly one small witness too many. The walk home will be quiet, and not the good kind of quiet.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_chipvan",
        "venue": "alhambra",
        "title": "THE COD WAR",
        "startWindow": [
          2,
          6
        ],
        "stages": [
          {
            "id": "mini_chipvan_1",
            "title": "GLASS ON THE FORECOURT — ALHAMBRA",
            "text": "Jackpot night, and the queue outside the Alhambra is a battlefield's audience. Two chip vans hold the forecourt: The Codfather, prop. Alf Chubb, and Stavros's, prop. Stavros. The pitch war has escalated from sixpence off cod to a headlight gone on each van, and both proprietors now stand guard with the long chip forks. The queue, eating better and cheaper with every round, sees no reason for police involvement whatsoever.",
            "choices": [
              {
                "label": "Move both vans on — the queue can go hungry",
                "result": "The vans depart in convoy, exchanging gestures the length of the high street, and set up again nose to tail outside the Wimpy, whose manager is on the blower before either range is lit.",
                "effects": {
                  "streets": 3
                },
                "outcome": "The forecourt was cleared and the Cod War merely relocated, one street west with the front line intact. The bingo queue went in hungry and remembers whose fault that is.",
                "grade": "mixed"
              },
              {
                "label": "Summit at the hatches — you'll preside",
                "result": "You stand equidistant between the two hatches like a referee at a title fight. Both men begin talking at once; the queue, sensing a long bout, settles in with its chips.",
                "effects": {},
                "goto": "mini_chipvan_2",
                "delay": 1
              },
              {
                "label": "Nick whoever did the headlights",
                "result": "Enquiries take four minutes: the tyre lever is under The Codfather's counter, still smelling of vinegar, and Chubb comes quietly. Stavros, sole trader by appointment, has his prices up before the van doors shut.",
                "effects": {
                  "streets": 3,
                  "arrests": 1,
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "outcome": "Alf Chubb got a cell and Stavros got a monopoly, which the queue is paying for at tuppence extra the bag. Half a feud solved is a feud rearranged.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "mini_chipvan_2",
            "title": "SUMMIT AT THE HATCHES",
            "text": "Terms are tabled across two counters while the caller's warm-up drifts through the Alhambra doors. Chubb wants jackpot nights; Stavros wants jackpot nights; both cite seniority going back to the Coronation. The headlights, each insists, were the other's provocation. The queue has appointed itself the gallery and boos weak proposals. Somewhere behind you a dabber observes that the fish is better at Stavros's but the batter's better at Chubb's, which silences both hatches entirely.",
            "choices": [
              {
                "label": "Broker the Treaty of the Alhambra — alternate jackpot nights, each pays the other's headlight",
                "result": "Signed in biro on a chip wrapper and witnessed by the bingo caller. Both hatches offer you a free cod; you decline both, which both men respect and neither forgets.",
                "effects": {
                  "streets": 4,
                  "favours": 1
                },
                "outcome": "The Treaty of the Alhambra: alternate jackpot nights, headlights made mutual, order restored at the cost of one biro. The chip wrapper goes in the occurrence book, greasy and binding.",
                "grade": "good"
              },
              {
                "label": "Let the market decide — but any more glass and both pitches are gone",
                "result": "Competition resumes on portion size. By the small hours a bag of chips is down to thruppence, both men are ruining each other with dignity, and the relief eats like aldermen.",
                "effects": {
                  "streets": -3,
                  "relief": 3
                },
                "outcome": "No treaty, one warning, and a price war the whole manor is enjoying at the proprietors' expense. It cannot last, and it won't, but nobody starves meanwhile.",
                "grade": "mixed"
              },
              {
                "label": "Rule for Chubb — The Codfather was there first",
                "result": "You award the pitch on seniority. Stavros goes with terrible dignity, pausing only to tell the queue, in two languages, precisely what the Old Bill's judgement is worth these days.",
                "effects": {
                  "streets": -4
                },
                "outcome": "You picked a side in the Cod War, and the losing side has cousins on every street of the manor. Chubb's prices were up before the doors opened.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_streaker",
        "venue": "alhambra",
        "title": "THE THORNE STREET FLASH",
        "startWindow": [
          3,
          7
        ],
        "stages": [
          {
            "id": "mini_streaker_1",
            "title": "MALE, FAST, SEASONAL — ALHAMBRA QUEUE",
            "text": "Jackpot night at the Alhambra, the queue three deep past the Wimpy, and the Flash is out: Malcolm Bidmead, of the gas board Monday to Friday, streaker of this parish since the '71 season. Two passes so far — the queue scored the first a seven, the second a six, with deductions for the bobble hat. He is fast, he is seasonal, and WPC Hartle has already drawn the big towels from the property store.",
            "choices": [
              {
                "label": "Hartle and Doyle to his usual finish — the bus shelter — with towels",
                "result": "The Flash always finishes at the bus shelter by the Wimpy; he is a creature of habit in everything but trousers. Hartle and Doyle take up position like slip fielders.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 1
                },
                "goto": "mini_streaker_2",
                "delay": 1
              },
              {
                "label": "Let him run — it's November, he'll not manage a third",
                "result": "He manages a third. The queue awards a nine — a career best, wind assisted — and he vanishes into the fog to wherever the Flash goes, which in four seasons nobody has ever established.",
                "effects": {
                  "streets": -3,
                  "relief": 3
                },
                "outcome": "Three passes, a season's best nine, and nothing in the book. The queue filed in happy and the Flash retired undefeated into the fog, until the jackpot rolls over again.",
                "grade": "mixed"
              },
              {
                "label": "Nick him mid-pass, if anyone can",
                "result": "Doyle's dive is scored a four by the queue. It's Whittle who brings him down, throwing a towel like a matador's cape to the biggest cheer the forecourt has heard since the Snowball.",
                "effects": {
                  "streets": 3,
                  "relief": -3,
                  "arrests": 1,
                  "dispatchUnits": 1,
                  "dispatchTurns": 1
                },
                "outcome": "One streaker collared, attire entered in the charge book as 'bobble hat, plimsolls'. The queue booed the arrest and gave the tackle a four, which Doyle disputes.",
                "grade": "mixed"
              }
            ]
          },
          {
            "id": "mini_streaker_2",
            "title": "THE FINISH LINE",
            "text": "He comes in at the bus shelter exactly on schedule and takes the towels the way a marathon man takes the tape — gratefully, at speed. Wrapped in three of them with Hartle's tea in both hands, Malcolm Bidmead is revealed as a mild, blue-lipped man who discusses his own performance in the third person. The manageress wants nothing pressed so long as he's gone before the doors open. The queue's final verdict: an eight.",
            "choices": [
              {
                "label": "Wrap him, warm him, walk him home — season's over",
                "result": "He goes home in two towels and Doyle's spare greatcoat, pausing at his gate to announce his retirement, effective immediately, same as last year and the year before that.",
                "effects": {
                  "relief": 3
                },
                "outcome": "The Flash retired for the fourth consecutive season and went home warm. Nothing on paper, the towels back in the property store by dawn, and when the jackpot brings him out again everyone will pretend surprise.",
                "grade": "good"
              },
              {
                "label": "Formal caution, here, at the shelter",
                "result": "He takes the caution with great solemnity, standing to attention in his towels, and asks whether conditions — the wind was against him on the second pass — will be noted in mitigation.",
                "effects": {
                  "streets": 3
                },
                "outcome": "One caution, administered to a man in three towels at a bus shelter. It will deter him until roughly the next jackpot, but the forms are straight and the doors opened on time.",
                "grade": "mixed"
              },
              {
                "label": "Charge him — let the bench sort the Flash out",
                "result": "The charge book gains an entry the relief will frame. His defence, he says mildly, will be calling the queue — all of it — as character witnesses, with scorecards.",
                "effects": {
                  "brass": -4,
                  "arrests": 1
                },
                "outcome": "Charged, bailed, and bound for a hearing where forty dabbers will rate his effort under oath. The bench will be unamused, then amused, then unamused about being amused, all of it at your expense.",
                "grade": "poor"
              }
            ]
          }
        ]
      },
      {
        "id": "mini_pigeons",
        "title": "FORTY BIRDS OVER PEABODY",
        "startWindow": [
          5,
          9
        ],
        "stages": [
          {
            "id": "mini_pigeons_1",
            "title": "LOFTS OPEN — PEABODY ROOF",
            "text": "Every loft on the Peabody roof stands open and forty racing pigeons are gone or circling the chimney pots in the dark. Old Mr Sopwith, fifty years a fancier, is down in the yard in his vest, calling each bird by name. No latch is forced and no wire cut; whoever opened the doors, Doyle observes, the birds weren't frightened of them. Which shortens the list to people the loft knows.",
            "choices": [
              {
                "label": "Coat over his shoulders, cocoa in his hands — the birds know their way home",
                "result": "A neighbour brings the coat; you bring the cocoa argument. Sopwith won't come in, but he sits, and towards dawn the first bird drops onto the loft board like a returning opinion.",
                "effects": {
                  "streets": -3
                },
                "outcome": "Thirty-eight of forty home by first light, the last two expected on their own schedule. Who opened the doors stays a question the roof keeps to itself.",
                "grade": "mixed"
              },
              {
                "label": "Put Whittle on the roof — whoever opened the doors will come back to close them",
                "result": "Whittle settles behind a chimney stack with his collar up, commanding a view of forty empty lofts and, below, one old man in a vest refusing all offers of a cardigan.",
                "effects": {
                  "dispatchUnits": 1,
                  "dispatchTurns": 2
                },
                "goto": "mini_pigeons_2",
                "delay": 2
              },
              {
                "label": "Circulate a description to the neighbouring nicks",
                "result": "The teleprinter takes 'forty racing pigeons, various, some circling' without comment. Three divisions ring back within the hour reporting sightings of birds, general, and one duty officer asks if Thorne Street is quite well.",
                "effects": {
                  "brass": -3
                },
                "outcome": "The description went out to four divisions and came back as comedy. The birds, unmoved by the machinery of the Metropolitan Police, made their own arrangements.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "mini_pigeons_2",
            "title": "FIRST BIRD BACK",
            "text": "Towards dawn the birds start dropping onto the loft boards, and Whittle's radio murmurs: someone's come up. Barry Sopwith, fifteen, the grandson who feeds them every morning, is moving down the row latching doors with a tin of corn under his arm. His granddad had said the birds must go — the doctor's verdict on the roof stairs — so the boy let them choose. The birds, knowing nothing of doctors, came home.",
            "choices": [
              {
                "label": "Stand Whittle down — let the boy tell his granddad himself",
                "result": "Whittle comes down unseen, and the boy, in the end, goes down to the yard on his own. By full light the two Sopwiths are up at the lofts counting birds in together and saying nothing much, which in that family is a full account.",
                "effects": {
                  "relief": 3
                },
                "outcome": "No crime recorded, one confession made privately at the foot of the loft stairs, and two Sopwiths counting forty birds home together. The doctor's verdict on the stairs is under review.",
                "grade": "good"
              },
              {
                "label": "Bring the pair together in the yard — official, but quiet",
                "result": "You lay it out low, with the neighbours' curtains twitching on three landings. The old man looks at the boy for a long time, and then at the sky, where his answer is circling.",
                "effects": {
                  "streets": 3
                },
                "outcome": "The truth arrived officially, witnessed by every curtain on the block. It landed where it needed to, but the yard heard it before the family had finished with it.",
                "grade": "mixed"
              },
              {
                "label": "Book him — forty lofts is forty counts of something",
                "result": "Barry goes in the juvenile book while his granddad stands at the desk refusing, three times, to make a complaint. Without one the file dies by breakfast; some other things take longer.",
                "effects": {
                  "streets": 3,
                  "relief": -4,
                  "arrests": 1
                },
                "outcome": "One fifteen-year-old booked over pigeons his granddad wouldn't complain about. The paperwork was dead by morning, and Sunday dinners at the Sopwiths' will be quiet for a season.",
                "grade": "poor"
              }
            ]
          }
        ]
      }
    ]
  };
});
