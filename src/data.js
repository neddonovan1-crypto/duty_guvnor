/* Duty Guvnor — game content: incident cards, marquee sagas, mini-sagas,
 * chance events, endings, flavour. All characters and places are fictitious. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DATA = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
    "cards": [
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
            "label": "Send a PC to wait and escort His Honour home",
            "result": "PC Hume stands in the drizzle for ninety minutes practising his salute. His Honour finally emerges, says 'officer' like it's a species of insect, and departs without one word of thanks.",
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
            }
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
        "window": [
          1,
          12
        ]
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
        "window": [
          3,
          14
        ]
      },
      {
        "id": "vice_launderette_vicar",
        "title": "BREAK-IN (RETRACTED) — SUDSY'S LAUNDERETTE",
        "text": "The keyholder of Sudsy's launderette on Chandos Walk reports intruders, rings back to retract, then rings a third time in tears. The tea-leaves in question are the Reverend Clifford Pring of St Aldhelm's and Mrs Dorothy Feaver, chair of the flower rota, discovered among the service washes with a bottle of communion wine and every machine running for warmth. The keyholder wants the broken lock paid for. Mrs Feaver's husband drives the borough's only tow truck. The Reverend keeps saying it is not what it resembles.",
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
            "label": "Send one PC to take statements very slowly",
            "result": "PC Gorse takes statements in longhand for two hours, during which the table folds itself away and every witness develops amnesia and gout. He returns with nothing for the charge sheet and a very good cigar.",
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
        "title": "TELEPHONE — MADAME ESTELLE, RE: A LOCKED DOOR",
        "text": "Madame Estelle of the Cavendish Escort Agency ('Companionship For The Discerning') rings the back line she isn't supposed to have. One of her ladies is in Suite 14 of the Hotel Splendide with a client who has declined to pay, locked himself in the bathroom, and begun singing hymns. Estelle mentions, delicately, that the gentleman does the birdwatching programme on the television, and that she has always been so very helpful to Thorne Street with her little pieces of information — which is true; she is the best snout on the manor, and knows it.",
        "choices": [
          {
            "label": "Send a unit to resolve Suite 14 quietly",
            "result": "PC Latham talks the birdwatcher out through the door with the promise of a taxi and total amnesia. Estelle is grateful, the Splendide is grateful, and somewhere a nightjar documentary continues unclouded.",
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
              "failResult": "The Mark 2 meets your Westway block doing eighty and doesn't stop — a panda loses a wing, PC Tench loses his footing into the ditch, and the shooters wave on the way past. The Yard's morning conference hears that Thorne Street had them and let them through, which is truer than you'd like.",
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
            "result": "You divide the lead like Solomon and old Meakin pronounces you 'a fair man, for filth'. He owes you one now, which is worth considerably more than the lead.",
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
        "text": "Word from the collator: Albie Fenn, out of Parkhurst on Tuesday after a nine-stretch, is holding court in the saloon of the Waterman's Rest. Pints lined up along the piano, envelopes travelling one way, and every face on the manor queueing to pay respects like it's a coronation. It is either the richest gathering of criminal intelligence since the Yard's Christmas do, or the planning meeting for something you'll be reading about in the evening paper.",
        "choices": [
          {
            "label": "Walk in alone and pay your respects",
            "result": "Albie stands you a light ale and pronounces you 'a gentleman copper of the old school'. You learn three useful things and one thing about a Commander you'd have paid not to.",
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
            "label": "Plant a plain-clothes PC at the corner table",
            "result": "PC Tunstall nurses one half of mild for four hours and fills a notebook with who paid, who bowed and who didn't. The collator declares it the finest night's work since 1971.",
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
            "label": "Send two PCs to call time properly",
            "result": "The pub empties in twenty minutes, though PC Tench's helmet comes off Mick's head only after a signed photograph has been negotiated.",
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
        "text": "Mrs Prewitt of Callow Court reports the Ellams at it again in Flat 9 — crockery airborne, language 'unchristian', third Friday running. A weary one of long standing: last time you sent men up, both Ellams turned on them as one, and PC Grimble still carries the mark of a Coronation mug. Mrs Prewitt mainly wants the shouting stopped before the epilogue comes on, though she is threatening to ring the Commissioner personally, whose home number she claims to have.",
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
            "label": "Send PC Otley up alone — he has a way with couples",
            "result": "Otley makes tea, admires the surviving crockery, and has them reminiscing about their wedding by half past. He does this every month and it never takes.",
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
        "title": "MALE DIRECTING TRAFFIC — HORSEFERRY LANE JCT",
        "text": "The beat man calls in a gentleman in pyjamas, dressing gown and one slipper directing traffic at the Horseferry Lane junction. He is, on inspection, fast asleep. He is also, on inspection, doing it better than the lights, which have been stuck on amber since Tuesday. A bus inspector has lodged a complaint; three minicab drivers have lodged compliments. Neighbours name him as Mr Albert Munce, 78, formerly of the Royal Corps of Military Police.",
        "choices": [
          {
            "label": "Have him steered gently home",
            "result": "PC Widgeon guides him home by the elbow; Mr Munce salutes the wardrobe, disciplines the coat stand for slovenliness, and returns to bed still asleep.",
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
        "text": "Fog thickening off the river, and a 42-seater from the Pontardulais Ladies' Chapel Guild has been circling the borough since ten in search of a Bayswater hotel. The driver has given up and parked outside the nick. The Guild are now in your front office singing 'Bread of Heaven' in four-part harmony, and the skipper on the desk reports his ears going and his resolve with them. The driver is asking, man to man, for a miracle.",
        "choices": [
          {
            "label": "Give them a panda escort to Bayswater",
            "result": "PC Nash leads the coach through the fog at walking pace and is presented on arrival with a commemorative tea towel and three verses of blessing.",
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
            "result": "Marvellous Boy is cornered in the bus depot at half one and surrenders in exchange for the remaining chops, dignity intact on both sides.",
            "effects": {
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
        "title": "AFFRAY — WASHERAMA LAUNDERETTE, BIDDER ST",
        "text": "The Washerama on Bidder Street. A service-wash mix-up has delivered Mr Kosky's shirts to Mrs Dunkley and Mrs Dunkley's unmentionables to Mr Kosky, and neither will surrender the other's washing until their own is produced. The attendant has locked herself in the back with the soap. Somebody has now put a boot through a tumble dryer, and a crowd is gathering — the Washerama being, in November, the warmest room on the street.",
        "choices": [
          {
            "label": "Send a PC to arbitrate the exchange",
            "result": "PC Widgeon conducts the handover across the folding table like a border prisoner swap; both parties leave dissatisfied, which in laundry matters counts as justice.",
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
        "title": "MALE ALOFT — MELDON STREET CRANE",
        "text": "A man is sixty feet up the crane on the Meldon Street redevelopment and declines to come down. Not a jumper — he has taken up sandwiches, a flask, and a placard reading NOT TILL DORIS APOLOGISES. He is Ronnie Futtock, pigeon fancier; Doris is his partner in the loft, who sold his champion bird, Emperor of Peckham, to a man from Luton. The site watchman wants him down before the day shift clocks on, and the crane driver wants his cab back.",
        "choices": [
          {
            "label": "Send a PC up to talk him down",
            "result": "PC Nash climbs sixty feet in a November wind, shares the flask, and comes down two hours later with Ronnie and some strongly held views on pigeon ethics.",
            "effects": {
              "streets": 3,
              "relief": -4,
              "dispatchUnits": 1,
              "dispatchTurns": 3
            },
            "risk": {
              "odds": 60,
              "failResult": "PC Nash gets forty feet up before the November wind takes his helmet, his nerve and most of his vocabulary, and now there are two men up the crane, neither coming down. The brigade's turntable ladder collects them both at dawn in front of the day shift, the Chronicle's photographer, and an invoice addressed 'Dear Constabulary, again.'",
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
            "result": "He is still there at dawn, waving to the day shift; the Chronicle runs the picture under LOCAL MAN TAKES STAND, MANAGEMENT BAFFLED.",
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
            "result": "Nothing gets looted, though the beat men come back frozen solid; PC Tench swears the Regal's caller kept going from memory, in the dark, and was never once wrong.",
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
            "result": "PC Otley finds the window gone and two apprentice glaziers responsible, on a dare; one is nicked, the other has it away on his toes into the fog, still holding the doll's bonnet.",
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
        "window": [
          1,
          10
        ]
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
            "label": "Have the coin box opened and everyone refunded",
            "result": "PC Widgeon liberates the coin drawer with Trigg's own wheel brace and refunds the queue to general applause; the GPO's Monday man reports a robbery.",
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
            "result": "Peace is restored for the price of a decent lunch. Word travels upstairs that B Relief's guvnor settles theft out of petty cash — and downstairs that he's a soft touch.",
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
        "window": [
          1,
          11
        ]
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
        "title": "PROPERTY — LOSS OF HELMET, PC GOSLING (THIRD)",
        "text": "Probationer PC Gosling stands bare-headed before your desk for the third time since August. This helmet went over the wall of the Eldon Road lido during 'a pursuit' — of whom or what he declines to say, though somebody plainly had it away on his toes. A third loss report goes on his record at Division — and, in a quieter way, on yours. From the corridor, the station sergeant silently mouths the words 'bin him.'",
        "choices": [
          {
            "label": "Send a PC to fish it out of the lido",
            "result": "PC Hartree returns with the helmet, a shopping trolley and a second helmet, German, that nobody wants to discuss. Gosling is pathetically grateful.",
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
        "text": "PC Latch, Federation representative and the station's leading barrack-room lawyer, presents a grievance in triplicate: refs cut short contrary to regulation, and the October-issue boots 'an industrial injury pending.' He has quotations. He has precedents. He has, if you let him begin, the whole of your night. The relief watch from the parade room to see whether their guvnor takes boots seriously.",
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
        "window": [
          1,
          10
        ]
      },
      {
        "id": "station_collator_index",
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
        "title": "TRANSFER REQUEST — PC HARTREE TO A RELIEF",
        "text": "Inspector Voss of A Relief, a man who smiles like a filing cabinet, has applied for PC Hartree — your best thief-taker, divisional record-holder for collars before refs — to join his early turn 'for career development.' Hartree hasn't been asked. Voss has had the forms typed in advance. The parade room has gone quiet, waiting to learn whether their guvnor fights for his own.",
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
        "window": [
          1,
          9
        ]
      },
      {
        "id": "station_a10_visit",
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
        "title": "TELEPHONE — MRS CADWALLADER, SECTION HOUSE",
        "text": "Mrs Cadwallader, who runs the section house with the warmth of a Victorian iceberg, is on the phone. PC Warlow has, she reports, been entertaining 'a young lady' contrary to house rules, frying bacon after ten, and — she saves the gravest for last — moving her hallway aspidistra. Unless he is dealt with tonight she will telephone the Superintendent at home, and she has done it before.",
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
            "label": "He's contained. Day turn's problem",
            "result": "Peel passes the night in dairy, at considerable cost to dairy. The area supervisor arrives at six, finds him asleep in a nest of flattened cereal boxes, and asks in writing why the police were told and did nothing. The day relief inherit the prisoner and the letter.",
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
            "result": "At ten past eleven a figure ascends; at quarter past it descends considerably faster, into Doyle and a dustbin. A clerk from the insurance office opposite, with binoculars and an explanation nobody requests twice. Charged, and the Section House sleeps. The relief take it as proof the guvnor looks after his own.",
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
            "result": "The eighteen pounds reappears on Perretti's counter at half one, wrapped in greaseproof, the pickled onions untouched as a point of honour. Kenny presents himself at nine, scrubbed, in his court blazer. The day turn get the collar and you keep your cells — but arrangements like that get remembered in the wrong ledgers too.",
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
        "text": "Beacon Dairies' floats whine out of the Jubilee Street depot at the tail of the night, straight into everything the shift hasn't tidied: glass across Verity Street, the tobacconist's door standing open, a gentleman asleep in the dairy's own crate stack, and what roundsman Sidney Grout calls 'a commotion, ongoing' outside the Duke of Clarence. The roundsmen ring it all in from phone boxes, conscientious to a man, and the whole manor is suddenly being inventoried at eight miles an hour.",
        "choices": [
          {
            "label": "Sweep the round ahead of the floats — everything you've got left",
            "result": "The pandas leapfrog the floats street by street, sweeping glass and steering sleepers homeward, and the manor gets a fast dusting before the light finds it. Day turn inherit a patch so tidy they suspect it.",
            "effects": {
              "streets": 8,
              "relief": -5,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Take Grout's list, fix the worst, book the rest for day turn",
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
            "result": "The relief get their last hour by the radiator while the manor is inventoried at eight miles an hour by men in white coats. The day inspector reads the dairy's list at parade with pauses in all the worst places.",
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
            "label": "Note it for day turn — Perce isn't sure, and it's nearly light",
            "result": "Day turn find the door on the latch and Sillitoe where he had lain since the small hours — alive, concussed, and colder than another hour's waiting had any business making him. The book records when Perce reported it and when anybody went, and the space between the two entries is yours to keep.",
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
        "id": "follow_halloran_collects",
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
        "id": "mp",
        "title": "THE HONOURABLE MEMBER",
        "startTurn": 2,
        "stages": [
          {
            "id": "mp_cell3",
            "title": "PRISONER IN CELL 3 — THE HONOURABLE MEMBER",
            "text": "Sgt Bream puts his head round the door wearing the smile of a man whose pools numbers have come up. The early relief has banged up Gerald Ffoulkes-Hume MP, Parliamentary Under-Secretary at Prices and Consumer Protection, captured in the public convenience off Marsh Lane in the company of a working girl called Rita. He is now in cell 3 demanding the Home Secretary through the hatch. It is Friday night, the pubs are still open, and he is occupying one of your six cells. 'Griefy one, guv,' says Bream, with the air of a connoisseur.",
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
            "text": "Rita Doyle — occupation 'model', currently the most sensible person in the building — gives her account with the brisk economy of a witness who has done this before. He offered her three quid and then cried; she was mainly worried he'd catch his death on the tiles. Then the useful bit: a bloke with a camera has been keeping watch by the railings opposite since before chucking-out time, and he isn't there for the architecture. Cell 3, meanwhile, wishes to know whether the Home Secretary has been informed.",
            "choices": [
              {
                "label": "Take her statement and charge him properly",
                "result": "Rita signs a statement so clear it could be framed and hung. Bream types the charge sheet with two fingers and total joy.",
                "effects": {
                  "streets": 4,
                  "brass": -11,
                  "relief": 7
                },
                "outcome": "Charged on Rita Doyle's immaculate evidence: a minister undone by the one straight goer in the borough.",
                "grade": "good"
              },
              {
                "label": "Send a PC to move the camera merchant along",
                "result": "PC Wisbey strolls over and takes a professional interest in the man's tripod. Dennis Clegg of the Sunday Mercury withdraws to the Blue Star café, filmless and sulking.",
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
        "unresolvedOutcome": "Gerald Ffoulkes-Hume MP was still in Cell 3 when the day relief arrived — a problem you have now bequeathed, with compliments, to somebody else’s career."
      },
      {
        "id": "tratt",
        "title": "The Trattoria",
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
                "label": "Get the town hall on the blower — Voss, the food inspector, out of his bed",
                "result": "It costs you the marker from the drains business, but Mr Voss agrees to attend with clipboard and thermometer. He sounds almost eager.",
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
                "result": "Three captured, the van's chimes jammed on 'O Sole Mio', and a photograph of PC Renwick wrestling a stockpot destined for Monday's front page.",
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
                "label": "Ring the town hall — time Mr Voss earned his pension",
                "result": "You burn the marker from the drains business. Voss arrives in bicycle clips and a dressing-gown collar, radiating quiet menace.",
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
                "outcome": "The guvnor talked the anarchists out over grappa — no arrests, no paperwork, and a rumour upstairs that he toasted the revolution twice.",
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
            "text": "Mr Voss of the borough environmental health department stands in the Trattoria doorway with a clipboard, a probe thermometer and the moral certainty of a man who has closed pie stalls in three boroughs. The anarchists, braced for truncheons, have no doctrine for him. He has already noted an unlagged pipe, an uncovered stockpot and a cat. Scarlatti attempts to explain that hygiene regulations are an instrument of the state. Voss agrees, pleasantly, and clicks his pen.",
            "choices": [
              {
                "label": "Let Voss off the leash",
                "result": "Condemned under Regulation 16: the commune cannot lawfully feed the people, and an anarchist who poisons the people is merely a caterer. They withdraw under protest, singing. Voss stays behind to measure the fridge.",
                "effects": {
                  "streets": 7,
                  "brass": 4,
                  "relief": 3
                },
                "outcome": "The commune fell not to the truncheon but to the clipboard — Mr Voss condemned the stockpot and seven anarchists left singing, beaten by Regulation 16.",
                "grade": "good"
              },
              {
                "label": "Ask Voss to hold off till office hours — it seems excessive at 1 a.m.",
                "result": "Voss departs, wounded, pocketing his thermometer like a duelling pistol. The tannoy declares victory over 'the sanitary arm of capital'.",
                "effects": {
                  "streets": -5
                },
                "goto": "tratt_standoff",
                "delay": 2
              },
              {
                "label": "March the seven out under escort while Voss reads the charges",
                "result": "Two who won't budge are nicked for obstructing an environmental health officer — a first for the borough, possibly for jurisprudence. The station sergeant demands to know how to spell 'stockpot' before he'll have it in the charge book.",
                "effects": {
                  "arrests": 2,
                  "streets": 6,
                  "brass": 3,
                  "relief": -4
                },
                "outcome": "Bureaucracy and the boot combined: Voss condemned the kitchen while two anarchists went in the book for obstructing his thermometer.",
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
        "title": "THE CODEWORD",
        "startTurn": 10,
        "stages": [
          {
            "id": "ira_call",
            "title": "THE CODEWORD",
            "text": "The blower goes at the front desk and Sgt Bream's face does something you have never seen it do. A muffled voice, male, gave a codeword — a proper one, or near enough — and one sentence: the Alhambra Bingo Hall, high street. Tonight is the Alhambra's All-Night Charity Marathon: three hundred pensioners locked in with their books until dawn, the Snowball standing at £470. Bream has written the time in the occurrence book in a very steady hand. It is half past two. The line is dead.",
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
                "result": "Three crews roll. If it's real you were right; if it's not, you're the man who stopped the Snowball. Both careers are survivable. Only one of them sleeps.",
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
                "label": "Flag it for the day relief and stand your people down",
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
        "unresolvedOutcome": "The Alhambra question was still open when the day relief took over — the codeword unverified, the hall unsearched, and the occurrence book showing, in Sgt Bream's very steady hand, exactly when Thorne Street knew."
      },
      {
        "id": "brown",
        "title": "THE BROWN ENVELOPE",
        "startTurn": 3,
        "stages": [
          {
            "id": "brown_raid",
            "title": "ADULT LITERATURE AND MARINE CHARTS",
            "text": "The van comes back from the bookshop raid heavier than the warrant strictly covers: eleven boxes of stock, one till, and a ledger — names, dates, amounts, monthly. Some of the names are warrant numbers. PC Whittle, nineteen and helpful, read two pages aloud in his best court voice before anyone thought to stop him. Sgt Bream has gone very quiet over his custard creams, and a quiet Bream is a barometer falling. Somewhere across the river, you would swear, a telephone has already started ringing.",
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
                "outcome": "The ledger went back under Soho's floorboards and the monthly collections never missed a beat. Upstairs was grateful the way people are grateful to a man who didn't make a smell — and your name went on a quiet list of officers who can be relied upon to look away.",
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
                "delay": 2
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
            "title": "BUREAUCRACY AS ARMOUR",
            "text": "Sgt Bream produces the property register the way other men produce a family Bible. His position, delivered between custard creams: once a thing is entered — page numbered, description recorded, two initials against every line — it cannot quietly stop existing, because the book would show the hole. It is the dullest protection known to policing and the only kind Halloran's sort can't charm. It will take most of what's left of the night, and it wants doing before anybody else comes to 'pop back'.",
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
            "text": "Halloran again, deep in the shift, minus the top layer of charm. On your desk he sets a brown envelope, fat as a Sunday sermon — 'the squad's whip-round, guvnor, for a colleague under strain' — and beside it, delivered like a weather forecast, the observation that pensions are delicate instruments, that discipline boards can be slow, and that he'd hate to see a man your age start again in security work. The envelope sits there. Rain ticks on the window. Regan has left the room.",
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
            "text": "The guard around that ledger is now a rumour. Bream has found fresh scratches round the property store lock; a page of the duplicate occurrence book has gone for a stroll; across the road a Granada idles with its wipers going, though the rain has stopped. Whittle keeps finding reasons to stand near your office. Whatever you are going to do about the dirty squad's ledger wants doing before the day relief arrives with its unfamiliar faces and its innocent questions about the safe.",
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
                "result": "You go in alone, hat under your arm, and the snug goes quiet the way a courtroom does. Tommy Legge is a big man drinking a small mild. He looks you over and says, 'Sit down, Inspector. You'll be the man with a train problem.'",
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
                "outcome": "Perhaps two hundred made the train. The rest bedded into the back streets like shrapnel, and the day relief will be finding them for a week — in lock-ups, snooker halls and one allotment shed. The Commander's note asks what, precisely, was the plan. It is a fair question.",
                "grade": "poor"
              }
            ]
          },
          {
            "id": "football_horses",
            "title": "GIFT HORSES",
            "text": "British Rail cancels the promised relief train again, with regrets, and promises another, without conviction. The Clarence is under siege from the inside, and the locals outside the Wimpy now number sixty and have found a flag. Then the blower goes: Commander Rossiter, silky, offering Mounted Branch — six horses, on your ground within the half hour. The strings arrive in the same breath: the request must be logged as yours, in writing, which in the Yard's dialect means a Duty Inspector confessing his manor got away from him.",
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
                "outcome": "The high street was retaken shop by shop, and the cost is written in helmets, windows and overtime — six cells full, two officers on the sick list, and the chip barrow a total loss. Rossiter's memo calls it 'a firm response to disorder', which everyone understands to mean 'never again'.",
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
        "unresolvedOutcome": "Four hundred Northgate supporters greeted the dawn on your high street, still waiting for a train British Rail now denies ever existed; the day relief inherited them one chorus at a time."
      },
      {
        "id": "absconder",
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
                "label": "Enter it in the book and bequeath him to the day relief",
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
        "id": "royal",
        "title": "THE VISIT",
        "startTurn": 3,
        "stages": [
          {
            "id": "royal_teleprinter",
            "title": "TELEPRINTER — ROYALTY EXPECTED",
            "text": "The teleprinter clears its throat and delivers it in capitals: at first light a Minor Royal's convoy will proceed down the high street to open the new sorting office extension, and the Yard requires the route 'presentable by end of shift'. Between here and that sentence stand the Duke of Clarence's overspill, a smouldering scrap fire on Meakin's yard, three hundred yards of bunting nobody ordered, and a bedsheet over the Alhambra reading THE POST BELONGS TO THE PEOPLE. Commander Rossiter has already telephoned twice. Sgt Bream fetches the good clipboard.",
            "choices": [
              {
                "label": "Turn out both pandas and start clearing the route now",
                "result": "Doyle and Whittle take a panda each and divide the half-mile between them like brothers dividing a will. The first reports come back inside the hour, none of them encouraging.",
                "effects": {
                  "relief": -3,
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "goto": "royal_route",
                "delay": 1
              },
              {
                "label": "Walk the route yourself with Bream and the clipboard",
                "result": "You and Bream pace the half-mile like undertakers measuring a difficult client. The list runs to two pages, one column headed POLICE MATTERS and the other ACTS OF GOD.",
                "effects": {},
                "goto": "royal_route",
                "delay": 1
              },
              {
                "label": "Ring Rossiter back and suggest, gently, a different street",
                "result": "Rossiter receives the suggestion the way a bishop receives a limerick. 'The route is settled, Inspector. Routes are not unsettled by boroughs.' He will telephone again; he always telephones again.",
                "effects": {
                  "brass": -4
                },
                "goto": "royal_rossiter",
                "delay": 1
              },
              {
                "label": "First light is half a shift away — it can keep",
                "result": "The flimsy goes under the tea mug and the shift returns to its proper business. Out on the high street the borough, unsupervised and feeling festive, begins improving things.",
                "effects": {
                  "streets": -3
                },
                "goto": "royal_shambles",
                "delay": 3
              }
            ]
          },
          {
            "id": "royal_route",
            "title": "THE STATE OF THE ROUTE",
            "text": "The survey, as compiled: the Clarence has disgorged Mick the Brick's darts presentation onto the pavement, where it has become a choir; Meakin's fire is 'under control' in the sense that Meakin is watching it from a deckchair; the bunting runs three hundred yards in colours belonging to no known nation, and nobody on the street will say who ordered it. Rossiter telephones a third time to ask how the route looks. Bream, covering the mouthpiece, asks how you would like it to look.",
            "choices": [
              {
                "label": "Task every spare body — fire out, drinkers home, street swept",
                "result": "The brigade damps Meakin's fire while Meakin bills them for water damage, and the choir is folded gently into the night. By the small hours the route is halfway respectable and the relief wear the look of men redecorating a condemned house.",
                "effects": {
                  "streets": 4,
                  "relief": -5,
                  "dispatchUnits": 3,
                  "dispatchTurns": 2
                },
                "goto": "royal_banner",
                "delay": 1
              },
              {
                "label": "Lean on the landlord and old Meakin personally — old names, old debts",
                "result": "The Clarence calls last orders for the second, legally binding time, and Meakin agrees to sit on his fire 'as a favour to the Crown, which has never done me one'. Progress, of a sort a review board would call irregular.",
                "effects": {
                  "streets": 2,
                  "brass": -3
                },
                "goto": "royal_banner",
                "delay": 2
              },
              {
                "label": "The fire's low and drunks disperse on their own. Bunting can wait",
                "result": "The fire is low the way a fuse is low. By the time anyone looks again, the Clarence's overspill has adopted the bunting as regimental colours and Meakin has fed his deckchair to the flames for warmth.",
                "effects": {
                  "streets": -4
                },
                "goto": "royal_shambles",
                "delay": 2
              }
            ]
          },
          {
            "id": "royal_banner",
            "title": "THE BEDSHEET QUESTION",
            "text": "PC Duffin's enquiries establish that the bunting was ordered by no council office, no chamber of trade and no living soul; it is best understood as a rumour with string through it. The bedsheet is another matter: it has been rehung, higher, from the Alhambra Bingo Hall's parapet, and now reads NO CROWNS ON OUR STREET. WPC Hartle puts the anarchist cell at three, one of whom is having cocoa fetched down by his mother. The sky has not started to pale yet, but it is thinking about it.",
            "choices": [
              {
                "label": "Ring the Chronicle's editor — he owes you over his boy's TDA that never made the charge sheet",
                "result": "The editor grumbles about the freedom of the press, then sends the delivery van and three strong lads, the freedom of the press never having really been about bunting. Three hundred yards come down before the milk floats are out, and the front page will show a ribbon, some scissors, and nothing else.",
                "effects": {
                  "favours": -1,
                  "streets": 3
                },
                "goto": "royal_dawn",
                "delay": 3
              },
              {
                "label": "Send Doyle and Whittle over the Alhambra roof after the bedsheet",
                "result": "Doyle goes up the fire escape with his lamp in his teeth and the bedsheet comes down folded, like washing. The anarchists, outraged, announce they will be writing a letter.",
                "effects": {
                  "streets": 3,
                  "dispatchUnits": 2,
                  "dispatchTurns": 1
                },
                "risk": {
                  "odds": 55,
                  "failResult": "Whittle loses the parapet in the dark and rides the bedsheet down through the bingo hall's canopy, bringing banner, guttering and half the letters of ALHAMBRA with him. The three anarchists get the photograph of their careers.",
                  "failEffects": {
                    "streets": -5,
                    "relief": -4
                  }
                },
                "goto": "royal_dawn",
                "delay": 2
              },
              {
                "label": "Three anarchists and some string — hardly the Angry Brigade. Day turn's problem",
                "result": "By the small hours the bedsheet has been joined by a second, ruder one, and the bunting has been restrung across the route at pantomime height. The day turn, you recall too late, comes on after the convoy.",
                "effects": {
                  "brass": -4
                },
                "goto": "royal_shambles",
                "delay": 1
              }
            ]
          },
          {
            "id": "royal_rossiter",
            "title": "ROSSITER, AGAIN",
            "text": "Commander Rossiter's calls now arrive on the half-hour, each opening with 'I shan't keep you' and none keeping its word. The Yard wishes to be reassured; a Royalty Protection inspector will drive the route towards dawn, and what that inspector reports, says Rossiter, 'will follow us both about, Inspector, like weather'. Regan the station cat is asleep on the teleprinter, which has learned nothing. The telephone, replaced in its cradle, begins to ring again.",
            "choices": [
              {
                "label": "Give him your word the route will stand inspection",
                "result": "'Your word,' Rossiter repeats, in the tone of a man accepting a cheque from a stranger. It is on the record now, both of you know it, and first light will audit it.",
                "effects": {
                  "brass": 3
                },
                "goto": "royal_dawn",
                "delay": 3
              },
              {
                "label": "Recommend the diversion now — Corporation Row is wider, duller and clean",
                "result": "You say the word 'flexibility' several times, and Rossiter, who has spent all night waiting for somebody else to say it, agrees at once. The convoy will proceed by Corporation Row, which has nothing worth opening and nobody awake to wave.",
                "effects": {
                  "brass": 5,
                  "streets": -6
                },
                "outcome": "The route was changed on your say-so: the Yard's morning saved, and the borough informed, politely, that it wasn't fit to be waved at.",
                "grade": "mixed"
              },
              {
                "label": "Ring the guvnor at Hallam Street — he can spare a serial, and you'll owe him",
                "result": "Hallam Street sends six sleepy PCs on the strict understanding that it never happened and that you owe their guvnor a night like this one in return. The route acquires uniforms at reassuring intervals.",
                "effects": {
                  "favours": -1,
                  "streets": 3
                },
                "goto": "royal_dawn",
                "delay": 2
              },
              {
                "label": "Tell him it's in hand and get off the line",
                "result": "'In hand' satisfies Rossiter for exactly one cycle of the teleprinter. Out on the route, matters use the interval productively.",
                "effects": {},
                "goto": "royal_shambles",
                "delay": 1
              }
            ]
          },
          {
            "id": "royal_shambles",
            "title": "THE BOROUGH IMPROVES ITSELF",
            "text": "Neglect has compounded, at interest. Meakin's fire has found a mattress and a second wind; the Clarence's overspill, refused re-entry, has occupied the Wimpy and is delivering Mick the Brick's retirement speeches through the window; the bunting now crosses the route at head height in loops a drum-horse couldn't pass; and there are three bedsheets, one of them, Hartle reports, 'quite well argued'. Rossiter's calls arrive every twenty minutes. Over the sorting office, the sky has begun, unhelpfully, to hint.",
            "choices": [
              {
                "label": "Everything you have — brigade, brooms and both pandas till first light",
                "result": "The relief work the half-mile like men bailing a ship, which is what it is. The fire dies, the bunting comes down in armfuls, and the Wimpy is restored to its rightful custodians. Nobody sings.",
                "effects": {
                  "streets": 5,
                  "relief": -7,
                  "dispatchUnits": 3,
                  "dispatchTurns": 3
                },
                "goto": "royal_dawn",
                "delay": 2
              },
              {
                "label": "Lift the ringleaders — Mick the Brick, old Meakin and the bedsheet's author",
                "result": "Three bodies in the cells: a wrestler, a scrap man and an anarchist whose mother follows the van the whole way in her dressing gown. The street goes quiet the way a room does when the interesting people leave.",
                "effects": {
                  "streets": 3,
                  "brass": -4,
                  "relief": -2,
                  "arrests": 3,
                  "dispatchUnits": 2,
                  "dispatchTurns": 1
                },
                "goto": "royal_dawn",
                "delay": 2
              },
              {
                "label": "It's past saving by one relief. Stand by for first light and answer for it",
                "result": "You stop pretending the night can be reversed and start drafting explanations, which come easier. The borough, sensing victory, sends up a small firework.",
                "effects": {
                  "streets": -3
                },
                "goto": "royal_dawn",
                "delay": 1
              }
            ]
          },
          {
            "id": "royal_dawn",
            "title": "FIRST LIGHT — THE CONVOY",
            "text": "Towards dawn the sky goes the colour of wet slate and the Royalty Protection inspector's Rover noses onto the high street, wipers ticking like a metronome of judgment. Somewhere across the river, a Minor Royal is being decanted into a car with a small flag on it. Rossiter is on the line, live, breathing. The route is what it is now; all that remains to choose is what you tell the Yard, and how straight your back is when you say it.",
            "choices": [
              {
                "label": "Line the route — every officer turned out, boots blacked, Bream at the salute",
                "result": "The convoy proceeds past scrubbed kerbstones and a Wimpy whose lights, for once, do it credit. A gloved hand rises at the window; Bream holds his salute until the tail-car has turned, then pronounces it, quietly, the finest thing the nick has ever wasted.",
                "effects": {
                  "streets": 5,
                  "brass": 8,
                  "relief": -4,
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "outcome": "The convoy passed down a clean, quiet, faintly astonished high street, and nobody at the Yard ever mentioned it — which, for triumphs of this kind, is the highest honour going.",
                "grade": "good",
                "sets": "royal_triumph"
              },
              {
                "label": "Ring Rossiter — recommend the diversion, now, while a convoy can still be turned",
                "result": "The convoy swings down Corporation Row past one startled milkman, and the sorting office is opened from the side entrance in under four minutes. Rossiter's relief comes down the line like escaping gas; on the high street, the bunting flaps at nobody.",
                "effects": {
                  "brass": 4,
                  "streets": -6
                },
                "outcome": "Diverted at the last practical moment on your own recommendation: the Yard's face saved, the borough's nose put out of joint, and Corporation Row dining out on it for a decade.",
                "grade": "mixed",
                "sets": "royal_snubbed"
              },
              {
                "label": "Let them come. The borough is what it is, and it's theirs too",
                "result": "The convoy slows past Meakin's smoulder, and the Clarence choir, moved by the occasion, offers a verse. A gloved hand, to its lasting credit, waves back at the bedsheet; the Royalty Protection inspector writes one word in his notebook, and it is not 'presentable'.",
                "effects": {
                  "streets": -4,
                  "brass": -12,
                  "relief": 3
                },
                "outcome": "The Minor Royal met the borough as it really is — smoke, string, bedsheet and choir — and the Yard's inquiry intends to meet you the same way.",
                "grade": "poor"
              }
            ]
          }
        ],
        "unresolvedOutcome": "First light found the question still open: the convoy came anyway, down whatever the night had left of the high street, and the Yard's account of what it found is being typed, slowly, on the fifth floor."
      },
      {
        "id": "souper",
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
                "result": "Renwick and Duffin go up among the chimney pots with one flask between them and orders to freeze quietly. If the artist means to finish the terrace, he will finish it into the arms of the Metropolitan Police.",
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
                "result": "The Row is sealed at both ends and the rooftops sown with cold policemen. Towards the turn of the night Renwick signals from a chimney stack that the fog is moving in a way fog doesn't.",
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
            "text": "There. Two torch flashes off Renwick's chimney stack: a figure on the roofline of the end house, moving through the fog with the unhurried tread of a man in his own workshop. Below, the Row is sealed. Above, there is nothing between him and the river but wet slate, forty chimneys, and whichever officers you are prepared to put over a parapet in a pea-souper. Doyle has found a trapdoor and is holding it open like a question. The torch beam dies at six feet, the slates are greased with fog, and somewhere ahead of you a skylight, softly, ceases to be locked.",
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
                "sets": "rooftop_legend"
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
        "unresolvedOutcome": "The fog outlasted the shift and so did the artist — four safes open along Cadogan Row, the photographs still face-down, and the Gull installed at the front desk when the day relief arrived, offering his professional opinion to anyone in uniform."
      },
      {
        "id": "docks",
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
                "delay": 2
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
            "text": "At full strength the picket is less a mob than a parish: dockers three deep round the brazier, wives with greaseproof parcels, an accordion doing requests, and the Wimpy running relays of tea through the drizzle. Vic Parris, the union's district man, has arrived off the last bus to get his own wildcats back in the box before the national papers wake, and is discovering that nobody comes out for a sacked mate in order to be minuted back to work. 'They'll not listen to me, guvnor,' he says, sharing the shelter of the gatehouse. 'They'll listen to a fair man. God help the pair of us — tonight that appears to be you.' At the fire, Slade holds his tally book like a hymnal. Beyond the wire, Cray's drivers — hourly men with union cards of their own and no appetite for any of this — send across a delegate to ask if anyone can spare a light.",
            "choices": [
              {
                "label": "Round the brazier with the canteen urn — broker a dawn peace",
                "result": "Bream sends down the urn 'strictly against the cold', and over cocoa the shape of a peace assembles itself: Slade's case heard first thing Monday with Parris in the room, the picket down to a token six by day shift, the lorries to wait their turn at the day gate like everybody else. Nobody signs anything. Nobody has to. The accordion plays you out.",
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
                  "failResult": "The box you pick is pork to the back doors — honestly frozen, lawfully dull, steaming gently in the night air while Cray's solicitor takes the names of every officer present with terrible courtesy. Somewhere behind you a docker offers, kindly, that it was worth a go. The formal complaint reaches the Yard before the day shift does.",
                  "failEffects": {
                    "streets": -6,
                    "brass": -9
                  },
                  "failOutcome": "The box cropped before forty witnesses held honest Danish pork, gently steaming, while Cray's solicitor collected the name of every officer present with terrible courtesy. The Scotch rolled out by another gate, the strike folded for want of a villain, and the complaint reached the Yard before the day shift did.",
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
                "result": "The heavy mob against a frozen picket at first light is not a fight, it is a clearance, and everyone present will describe it with exactly that word. Three in the van, the brazier kicked into the dock, and the lorries through as the day shift arrives to watch in silence from the top of the road.",
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
                "label": "Spend the last marker: Customs at the gate before the day shift",
                "result": "Your man grumbles out of bed and arrives with the milk, rummage crew behind him, and the first box off Slade's list gives up its Scotch as the sun finds the cranes. The picket is too cold to cheer properly. It cheers anyway.",
                "effects": {
                  "streets": 4,
                  "brass": -3,
                  "relief": 3,
                  "favours": -1
                },
                "outcome": "Customs took Cray's Scotch at the gate with the day shift watching, so the lorries never passed and the strike folded standing up. It came late — the night had already banked its damage, and Slade's hearing owes more to the tribunal than to you — but the manor saw the wildcat vindicated and the haulier's manifest read out loud. A dear way to buy the right ending. Still the right ending.",
                "grade": "mixed"
              },
              {
                "label": "Hand the whole thing to the day relief with the tea",
                "result": "The day relief inspector listens to your handover the way a man listens to news of a bereavement — his own. Through the window the picket is singing again, thinly, and Cray's queue has begun, one by one, to reverse quietly out of the road towards gates unknown.",
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
        "unresolvedOutcome": "The Thameshead wildcat was still burning at handover — brazier fed, gate shut, Cray's interesting cargo idling unexamined, and Ernie Slade sacked as ever. A peace nobody brokered is now the day relief's to lose, and the occurrence book knows exactly whose watch it was offered on."
      },
      {
        "id": "horse",
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
                "result": "The pandas creep the manor at walking pace with their windows down, listening for hooves. PC Doyle reports the fog 'coming down like a fire curtain', which is Doyle's way of saying he'd rather be doing this in daylight.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 2
                },
                "goto": "horse_sightings",
                "delay": 1
              },
              {
                "label": "Send WPC Hartle to read the stable yard before Cadby tramples it",
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
                "result": "Cadby receives the news like a man handed his own hat. Mounted Branch turn out in force and quarter your manor without once asking permission, which is a sentence you will shortly be rereading in report form.",
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
      }
    ],
    "meterEndings": {
      "streets": "By four in the morning the manor has stopped pretending. The Duke of Clarence is minus its windows, three pandas are minus their hubcaps — some tea-leaf's finest hour — and a crowd outside the Wimpy is chanting something about justice and scampi. Traffic Division won't come south of the canal. The Commander rings at ten past five to ask, in the tone of a man reading your headstone, precisely when you lost control of your ground. You check your watch. Hard to say, sir. October?",
      "brass": "The summons comes at six sharp: Commander Rossiter, in full uniform at that hour, which is never good, holding a manila envelope, which is worse. Words are used like 'judgement' and 'the Commissioner's breakfast'. You are suspended from duty pending an inquiry into, as far as you can tell, everything. Twenty years in the Job, and it ends with Sgt Bream taking your keys with the tenderness of an undertaker. On the way out of the nick, the teleprinter starts chattering again. For the first time all night, it's somebody else's problem.",
      "relief": "It starts with Sgt Bream reporting a bad back, a thing Sgt Bream has never possessed. By three there are eleven officers off with a flu that spreads by rota, and two more allegedly on aid to a division nobody can name. The Section House phone rings out. You end the night alone: manning the front desk, answering the radio, brewing your own tea, entering a D and D in the book while the drunk asks, reasonably, whether anyone else works here. The day relief find you at six, guarding an empty nick like the last soldier of a war nobody declared."
    },
    "debriefs": [
      {
        "minAvg": 58,
        "title": "COMMENDATION",
        "text": "Six o'clock, and the tea tastes almost like tea. Commander Rossiter appears in person, which normally means a funeral, but this time he shakes your hand for a full second and says 'tidy night's work' as if the words cost money. There's talk of a mention in Orders. The day relief file in to find B Relief looking insufferably smug, and Sgt Bream informs them, at volume, that this is what proper coppering looks like. On your way out he calls you 'guv' with something perilously close to warmth. Go home. Sleep the sleep of the improbably vindicated."
      },
      {
        "minAvg": 45,
        "title": "A GRUDGING NOD",
        "text": "Dawn finds the nick intact and the paperwork merely alarming. The Superintendent skims the night's log, notes that every collar appears to have stuck, sniffs, and delivers the Met's highest working honour: 'Could've been worse.' The relief shuffle off to their beds with most of their limbs and some of their dignity. Sgt Bream leaves you the last digestive, which from Bream is a twenty-one-gun salute. You'll be back at ten tonight to do it all again, and honestly, you can think of worse ways to earn a pension. Just."
      },
      {
        "minAvg": 30,
        "title": "QUESTIONS WILL BE ASKED",
        "text": "Six a.m. arrives like a bailiff. The nick is still standing, technically, in the way that certain condemned buildings are still standing. The Superintendent wants a written report by Monday on four separate matters, two of which you'd hoped he hadn't heard about; somebody's brief has already rung up about a third. The day relief inspect the wreckage of the front office in respectful silence, the way people look at car crashes. The tea urn has burnt out. So, very nearly, have you. Home. Bath. Say nothing to anyone."
      },
      {
        "minAvg": 0,
        "title": "STILL BREATHING",
        "text": "You survived, in the sense that you are still upright and answering to your own name. The occurrence book reads like the fall of a small republic. There is a smell in Cell Three that science has yet to classify, a panda car missing in the loosest sense of the word — the early turn are already booking it as a TDA — and a probationer who may never speak again. The day relief step over the debris without comment. Drink your tea. It's cold. Everything, this morning, is cold."
      }
    ],
    "quietTurns": [
      "Half an hour passes in which the only crime on the manor is Sgt Bream's pools coupon. He has Thorne Athletic down for an away win. You point out Thorne Athletic haven't won away since the Coronation. He licks his pencil and says that's exactly why they're due.",
      "Nothing on the printer. Nothing on the phones. The station cat, Regan, patrols the charge room with the unhurried menace of a guvnor doing rounds. He inspects the cells, finds them acceptable, and falls asleep on the lost property ledger. Nobody dares move him. Nobody has, since 1971.",
      "A quiet half hour, broken only by the discovery that someone has been at the biscuit fund. Sgt Bream opens an investigation with more rigour than he's shown any burglary this year. Three suspects, two slaggy alibis, one custard cream unaccounted for. PC Duffin has form for this — two previous, both involving garibaldis. It will never come to trial.",
      "The only sound in the nick is the D and D in Cell Two working through the complete songbook of the music halls. He's not bad, actually. By the second chorus of 'Nellie Dean' the probationer is humming along, and Sgt Bream has to have a word with himself.",
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
      "The front-office typewriter surrenders its letter E mid-shift. Sgt Bream rules that reports will manage without, and for half an hour the nick generates prose of a strange, granite dignity: PRISONR SOBR. ALL CORRCT. The day relief will assume a code and spend Monday breaking it.",
      "PC Duffin, studying for his sergeants' exam, asks the room to test him. Sgt Bream obliges with relish: define a highway. Duffin does, beautifully, word for word. Bream asks where that leaves the canal towpath. Duffin's answer occupies the rest of a very quiet half hour and settles nothing.",
      "A dead half hour, so WPC Hartle reads the relief their horoscopes. Sgt Corcoran, Taurus, is promised travel and an admirer, and looks alarmed by both. The drunk in Cell One asks for his: a stranger will bring news. On cue, the teleprinter prints one line of gibberish and stops.",
      "Half an hour of nothing, into which PC Whittle drops his theory that Cell Three is haunted — a sergeant, he's heard, from before the war, still doing his rounds. The relief scoff and thereafter go down to the cells in pairs. Regan won't go at all, which clinches it.",
      "Sgt Bream begins his Christmas card list, a document of judgment more than greeting. Names go on; more come off. The relief listen to the verdicts in respectful silence, like next of kin. Two inspectors gone, one chiropodist added. Nobody asks what the chiropodist did. Nobody needs to."
    ],
    "ambient": [
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
        "id": "event_special_pring",
        "title": "VOLUNTEER — SPECIAL CONSTABLE REPORTS UNANNOUNCED",
        "text": "Deep in the shift, the front door admits Special Constable Maurice Pring — by day a senior ledger clerk at the Gas Board, tonight pressed, correct and entirely unannounced, with creases you could post a letter through. He carries his own whistle and a thermos with his blood group enamelled on the side: B POSITIVE, which is both a fact and, you suspect, a philosophy. He'd like to help.",
        "window": [
          6,
          12
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
        "maxFreeCells": 0,
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
        "maxFreeCells": 0,
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
