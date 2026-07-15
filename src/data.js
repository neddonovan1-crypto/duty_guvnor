/* Duty Guvnor — game content: incident cards, storylines, endings, flavour.
 * All characters and places are fictitious. */
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
        "text": "PC Whittle radios in from Ropemakers Row: a maroon Rover P6 parked across the loading bay of Feldman's fruit depot, blocking the night lorries. The registration comes back to His Honour Mr Justice Marchbanks. Ropemakers Row has exactly one establishment open at this hour, and it isn't a legal bookshop — it's Renée's, second floor, red lampshade. The depot foreman wants the car shifted, the drivers are leaning on their horns, and Whittle asks, with unbearable innocence, whether he should knock.",
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
            "result": "The lorries roll, the red lampshade glows on, and a High Court judge now owes Thorne Street a kindness he'll pretend not to remember. Justice is blind, but she knows exactly where her car went.",
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
        ]
      },
      {
        "id": "vice_valhalla_clip",
        "title": "COMPLAINT — THE VALHALLA CLUB, GREEK COURT",
        "text": "A Norwegian ship's engineer named Olav presents himself at the front desk, damp and furious. The Valhalla Club in Greek Court has relieved him of forty-two pounds for two glasses of warm lemonade and twenty minutes of conversation with a lady called Miss Tania, who vanished the moment the bill arrived, along with the door. The Valhalla is run by Maltese Freddie, who considers himself a friend of the station. Olav's ship sails at six and he wants his money or, he says, 'the Viking solution.'",
        "choices": [
          {
            "label": "Raid the Valhalla, book the doorman and the till",
            "result": "Two collars, a till full of funny money, and Miss Tania out the fire escape in her stockinged feet. Maltese Freddie sends word he is 'disappointed,' which from Freddie is practically a summons.",
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
            "result": "Olav drinks the tea, calls you something unrepeatable in two languages, and heads back towards Greek Court with a docker's hook in his belt. Whatever the Viking solution is, it'll be on the morning sheet.",
            "effects": {
              "streets": -6,
              "relief": 2
            }
          }
        ]
      },
      {
        "id": "vice_actor_railings",
        "title": "MALE IN COSTUME — VICTORY THEATRE REAR",
        "text": "The panda calls in a delicate one from behind the Victory Theatre: Sir Gervase Holt, the knighted classical actor, handcuffed to the railings in full Marie Antoinette costume, wig listing badly to port. He explains with tremendous diction that it is research for an experimental piece and that the cast party 'rather got away from him.' The handcuff keys have gone home with somebody called Bunny. A photographer from the Sunday Mercury is asleep in a doorway thirty yards off — for now.",
        "choices": [
          {
            "label": "Bolt-croppers, blanket, and drive Sir Gervase home",
            "result": "Sir Gervase is freed, wrapped, and delivered to Kensington reciting Lear at the dashboard. The relief note in the log, sourly, that they are now a taxi service for the aristocracy of pretending.",
            "effects": {
              "brass": 4,
              "relief": -3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          },
          {
            "label": "Book him drunk and disorderly, wig and all",
            "result": "The custody record reads 'occupation: knight of the realm; attire: French queen (deceased).' The relief will dine out on it for a decade; the Yard will dine on you by Tuesday.",
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
        ]
      },
      {
        "id": "vice_launderette_vicar",
        "title": "BREAK-IN (RETRACTED) — SUDSY'S LAUNDERETTE",
        "text": "The keyholder of Sudsy's launderette on Chandos Walk reports intruders, rings back to retract, then rings a third time in tears. The intruders are the Reverend Clifford Pring of St Aldhelm's and Mrs Dorothy Feaver, chair of the flower rota, discovered among the service washes with a bottle of communion wine and every machine running for warmth. The keyholder wants the broken lock paid for. Mrs Feaver's husband drives the borough's only tow truck. The Reverend keeps saying it is not what it resembles.",
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
            "label": "Book the pair for breaking and entering",
            "result": "Two cells, one clergyman, and a flower-rota chairwoman demanding her telephone call. By Sunday the pulpit stands empty and the borough's only tow truck attends your pandas dead last.",
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
        ]
      },
      {
        "id": "vice_clutterbuck_blackmail",
        "title": "BLACKMAIL — SIR DENIS CLUTTERBUCK, AT THE DESK",
        "text": "Sir Denis Clutterbuck, of Clutterbuck & Sons department store ('Everything For The Home Since 1888'), arrives at the desk at midnight holding a note demanding five hundred pounds by Sunday or 'the photographs go to your wife, your board and the Drapers' Gazette.' He will not say what the photographs show, only that they were taken at 'a private evening of a theatrical nature.' He wants police protection, total discretion, and no paperwork whatsoever — in that order.",
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
            "result": "Sunday yields one blackmailer: the doorman of the private evening in question, still wearing his epaulettes. The photographs, seized as evidence, confirm that 'theatrical' was doing heroic work in that sentence.",
            "effects": {
              "streets": 6,
              "brass": 3,
              "relief": -4,
              "arrests": 1,
              "dispatchUnits": 2,
              "dispatchTurns": 3
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
        ]
      },
      {
        "id": "vice_achilles_club",
        "title": "AFFRAY — THE ACHILLES CLUB, CADOGAN ROW",
        "text": "The night porter of the Achilles Club telephones in a whisper. General Sir Redvers Coote (retired) and Mr Hector Prowse, proprietor of the Daily Meteor, have come to blows over a baccarat debt in the smoking room — where, the porter admits before he can stop himself, there is a baccarat table, a croupier and a cash box. The club secretary comes on the line offering 'the committee's fullest cooperation' in a voice that means precisely the opposite.",
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
            "result": "PC Gorse takes statements in longhand for two hours, during which the table folds itself away and every witness develops amnesia and gout. He returns with no evidence and a very good cigar.",
            "effects": {
              "streets": 1,
              "brass": -3,
              "relief": 4,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          }
        ]
      },
      {
        "id": "vice_estelle_suite14",
        "title": "TELEPHONE — MADAME ESTELLE, RE: A LOCKED DOOR",
        "text": "Madame Estelle of the Cavendish Escort Agency ('Companionship For The Discerning') rings the back line she isn't supposed to have. One of her ladies is in Suite 14 of the Hotel Splendide with a client who has declined to pay, locked himself in the bathroom, and begun singing hymns. Estelle mentions, delicately, that the gentleman does the birdwatching programme on the television, and that she has always been so very helpful to Thorne Street with her little pieces of information.",
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
            "label": "Raid the agency's books while she's distracted",
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
        ]
      },
      {
        "id": "vice_stage_door_chalmers",
        "title": "DISTURBANCE — STAGE DOOR, REGAL VARIETIES",
        "text": "The house manager of the Regal Varieties rings in a lather. Tommy 'Cheeky' Chalmers, the family comedian off the wireless, is barricaded in dressing room three with Miss Yvette DuBarry of the dancing DuBarrys, while Mrs Chalmers stands at the stage door with a rolling pin and a growing, appreciative crowd. Second house goes up in forty minutes and Cheeky is top of the bill. The crowd has started a chant.",
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
        ]
      },
      {
        "id": "vice_turkish_baths",
        "title": "AFTER HOURS — IMPERIAL TURKISH BATHS, VESTRY ST",
        "text": "The night attendant at the Imperial Turkish Baths rings in, hopeful of overtime. Locked in the steam room after hours: a rear admiral, the borough's chief fire officer, an alderman, and two hostesses from the Pink Flamingo, together with a crate of champagne and a gramophone. All five are wearing towels and expressions of civic innocence. The rear admiral has twice said the words 'do you know who I am,' which the attendant wrote down, in case.",
        "choices": [
          {
            "label": "Every name in the occurrence book",
            "result": "Five names, two occupations listed as 'dance instructress,' and an alderman asking if this could possibly wait until after the by-election. The attendant gets his overtime; you get a memo headed PRIVATE AND CONFIDENTIAL by Monday.",
            "effects": {
              "streets": 4,
              "brass": -9,
              "relief": 3
            }
          },
          {
            "label": "Escort the dignitaries home, towels and all",
            "result": "Three pillars of the establishment go home in a panda car wearing towels and one fire-brigade greatcoat between them. The relief drive in total silence, which will cost you more than words would.",
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
        ]
      },
      {
        "id": "vice_film_evening",
        "title": "PRIVATE FILM EVENING — CROWN & SCEPTRE",
        "text": "PC Dodds, off duty and unfortunate, reports that the Chamber of Trade's 'Gentlemen's Film Evening' upstairs at the Crown & Sceptre is not, as billed on the door, highlights of the Ideal Home Exhibition. The projectionist is Mr Purley the undertaker; the films came from Denmark in a lorry belonging to the landlord's brother; and the front row contains both magistrates who sign Thorne Street's warrants. Dodds would like guidance on whether, officially, he saw anything.",
        "choices": [
          {
            "label": "Raid it: seize films, projector and Mr Purley",
            "result": "Mr Purley comes quietly, as befits his trade. Both magistrates leave by the gents' window, and every warrant you send up the road for the next year will be read very, very slowly.",
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
            "label": "Confiscate the films as evidence, no arrests",
            "result": "The reels are booked in as evidence and, by an administrative miracle, screened for continuity purposes at the Section House on Tuesday. Morale has not stood higher since the 1966 World Cup.",
            "effects": {
              "streets": 2,
              "brass": -4,
              "relief": 8,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          }
        ]
      },
      {
        "id": "gang_market",
        "title": "PROTECTION — CHAPEL YARD MARKET",
        "text": "Sgt Bream puts his head round the door with a deputation from Chapel Yard Market: three stallholders and Cyril Pocock of the Amalgamated Street Traders' Federation. Somebody is collecting 'insurance' — two large gentlemen in a Ford Zodiac, a pound a pitch — and this month's third accidental brazier fire has just claimed Nobby Hale's chestnut stall. Pocock wants action tonight. The gentlemen in the Zodiac, word is, drink with Tommy Rice's firm.",
        "choices": [
          {
            "label": "Mount an obbo from the tea stall",
            "result": "Two PCs spend half the night disguised as porters, developing a taste for whelks. The Zodiac clocks them inside an hour but takes its collecting elsewhere — which is, technically, a result.",
            "effects": {
              "streets": 6,
              "dispatchUnits": 2,
              "dispatchTurns": 3
            }
          },
          {
            "label": "Have a quiet word with Tommy Rice",
            "result": "Tommy swears blind it isn't his firm, which means it is, and the collections stop by Tuesday. Nothing on paper — which is rather the point, and rather the problem.",
            "effects": {
              "streets": 4,
              "brass": -4
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
        ]
      },
      {
        "id": "gang_wages_van",
        "title": "ARMED BLAG — WAGES VAN, IRONMONGER LANE",
        "text": "The teleprinter chatters: Security Express van done over outside Pargeter's Tool Works, Ironmonger Lane — Friday wages gone, shooters shown, one guard's helmet dented with his own clipboard. Three men away in a Mark 2 Jaguar towards the Westway. It's the third wages blag this month across three divisions, and the Yard's morning conference will want to know what Thorne Street did about it while the tyres were still warm.",
        "choices": [
          {
            "label": "Flood the ground — roadblocks on every arterial",
            "result": "You net two minicabs, a milk float and an actuary with no explanation for his evening. The Jag turns up burnt out in Perivale — someone else's division, which is the main thing.",
            "effects": {
              "streets": 7,
              "relief": -5,
              "dispatchUnits": 3,
              "dispatchTurns": 2
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
        ]
      },
      {
        "id": "gang_scrapyard",
        "title": "AFFRAY — BAGLEY'S WHARF SCRAPYARD",
        "text": "The front desk rings up: the Meakin brothers and the Sturrock boys are settling ownership of three tons of ecclesiastical lead at Bagley's Wharf scrapyard, using shovels. Old man Meakin is up in a crane bucket shouting genealogy; a Sturrock has set fire to something ceremonial. A crowd is gathering along the wharf fence and an enterprising soul is selling toffee apples. The lead, incidentally, matches the roof St Aidan's lost on Wednesday.",
        "choices": [
          {
            "label": "Send the van, nick the ringleaders of both clans",
            "result": "Three bodies in the cells by midnight, each giving his name as 'Meakin'. The Sturrocks send round a crate of brown ale for the relief, which you confiscate as far as your office.",
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
            "result": "By two a.m. both families retire to Casualty in convoy, satisfied. The lead has vanished during the proceedings, along with, mysteriously, the weighbridge.",
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
        ]
      },
      {
        "id": "gang_longfirm",
        "title": "SUSPECT VEHICLES — WINGATE & DAUGHTERS (WHOLESALE)",
        "text": "A night watchman rings in: lorries loading out of Wingate & Daughters, Wholesale Fancy Goods, Corn Exchange Road — at two in the morning. The firm has traded eight months on immaculate credit: cuckoo clocks, electric blankets, four hundred gross of Christmas crackers, all ordered, all paid for promptly. Until this week. Now the warehouse is emptying into unmarked Bedfords, which is exactly what a long firm looks like on its very last night.",
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
            "result": "Fourteen registrations, twelve of them false plates. The Fraud Squad call it the first useful thing uniform has given them since the war, which they intend as a compliment.",
            "effects": {
              "streets": 2,
              "brass": 3,
              "dispatchUnits": 1,
              "dispatchTurns": 1
            }
          }
        ]
      },
      {
        "id": "gang_snout",
        "title": "INFORMANT — 'CHALKY' VESTA, PRICE ON REQUEST",
        "text": "Chalky Vesta materialises in the back yard, smelling of rum and pickled eggs, with the air of a man holding aces. He knows who's setting up the Post Office job in Delamere Street — names, dates, the inside man. His price: twenty quid from the informants' fund, which is empty until Monday, or alternatively you could see your way to losing his brother's careless-driving summons. Chalky is prepared to wait. The Post Office job isn't.",
        "choices": [
          {
            "label": "Pay him from your own pocket",
            "result": "Twenty quid lighter, you get names that check out beautifully. If A10 ever ask, it was a win on the dogs at Harringay.",
            "effects": {
              "streets": 7,
              "brass": -3
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
            "result": "Chalky shrugs and sells it to a crime reporter instead. Tuesday's front page covers the Delamere Street job at length, with quotes from 'police sources' who were plainly not you.",
            "effects": {
              "streets": -6
            }
          }
        ]
      },
      {
        "id": "gang_salmon",
        "title": "HIJACK — 2,000 TINS OF RED SALMON",
        "text": "A Pelham's Provisions lorry is hijacked at the lights on Garrick Way, the driver overpowered by a man he can only describe as 'enormous'. The cargo: two thousand tins of Ocean Monarch Finest Red Salmon, bound for the Co-op. By one a.m. half the pubs in the borough have salmon sandwiches on, the Feathers is advertising 'Salmon Suppers', and Sgt Bream has become strangely evasive on the subject of the canteen.",
        "choices": [
          {
            "label": "Raid the Bricklayer's Arms cellar",
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
        ]
      },
      {
        "id": "gang_wigs",
        "title": "HIJACK — CONSIGNMENT OF NOVELTY WIGS",
        "text": "The teleprinter again: three thousand novelty wigs — Vikings, judicial perukes, a gross of 'Lady Godivas' — lifted from a lay-by on the North Circular, en route to Bagshawe's Christmas grotto. By midnight the borough's nightlife has gone fancy-dress. Two drunks in perukes are fighting outside the Mecca ballroom, and the only witness to a handbag snatch on Verity Street can describe the culprit solely as 'a Viking'.",
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
        ]
      },
      {
        "id": "gang_homecoming",
        "title": "GATHERING OF FACES — WATERMAN'S REST PH",
        "text": "Word from the collator: Albie Fenn, out of Parkhurst on Tuesday after nine years, is holding court in the saloon of the Waterman's Rest. Pints lined up along the piano, envelopes travelling one way, and every face in the borough queueing to pay respects like it's a coronation. It is either the richest gathering of criminal intelligence since the Yard's Christmas do, or the planning meeting for something you'll be reading about in the evening paper.",
        "choices": [
          {
            "label": "Walk in alone and pay your respects",
            "result": "Albie stands you a light ale and pronounces you 'a gentleman copper of the old school'. You learn three useful things and one thing about a Commander you'd have paid not to.",
            "effects": {
              "streets": 3,
              "brass": -4,
              "relief": 2
            }
          },
          {
            "label": "Plain-clothes PC on the corner table all night",
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
        ]
      },
      {
        "id": "gang_sweeney",
        "title": "FLYING SQUAD — REQUEST TO BORROW PRISONER",
        "text": "Two Flying Squad officers arrive at three a.m. in camel coats and a bronze Granada, radiating aftershave and entitlement. They would like to 'borrow' Georgie Platt from your cells — just for a drive, so he can point out a slaughter where certain proceeds are resting. No paperwork, obviously; paperwork frightens the horses. Georgie is your prisoner, on your custody record, and whatever happens on that drive will be wearing your signature.",
        "choices": [
          {
            "label": "Hand him over and sign nothing",
            "result": "Georgie returns at six with mud on his shoes and a sudden enthusiasm for cooperation. Should the custody record ever come up in court, it will come up holding your hand.",
            "effects": {
              "streets": 5,
              "brass": -7
            }
          },
          {
            "label": "Production order or nothing — by the book",
            "result": "The Squad men leave calling you a 'uniform-carrier', which from them is nearly an honour. Whatever's in the slaughter will be in Marbella by Monday, but your record is immaculate.",
            "effects": {
              "streets": -4,
              "brass": 4,
              "relief": 2
            }
          },
          {
            "label": "Send Sgt Bream along as official escort",
            "result": "Bream rides in the back between two camel coats, memorising everything. Two shotguns recovered, and everyone's paperwork agrees — the night's one authentic miracle.",
            "effects": {
              "streets": 6,
              "brass": -3,
              "dispatchUnits": 1,
              "dispatchTurns": 2
            }
          }
        ]
      },
      {
        "id": "gang_alibi",
        "title": "VOLUNTARY SURRENDER — D. MARSH, SOBER",
        "text": "Dennis 'the Deacon' Marsh presents himself at the front counter at 11.40, breathes gin at Sgt Corcoran with theatrical effort, and formally demands to be arrested for being drunk and disorderly. He is sober as a churchwarden and twice as smug. Somewhere across London tonight, something is being blagged, and Dennis would very much like a custody record proving he was nowhere near it.",
        "choices": [
          {
            "label": "Refuse him — he's stone-cold sober",
            "result": "Corcoran turfs him out with a ceremony the relief will re-enact for weeks. When the Garrard Row telex lands at four, Dennis's brief subpoenas Corcoran to swear his client was refused custody while sober — which, infuriatingly, he was.",
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
            "label": "Ring round the divisions — something's on tonight",
            "result": "Four duty officers thank you; a fifth says 'we know, it's ours' and hangs up. When the flag goes up in D Division, Thorne Street at least smells of roses.",
            "effects": {
              "streets": -2,
              "brass": 4
            }
          }
        ]
      },
      {
        "id": "grime_clarence_chuckout",
        "title": "DISTURBANCE — DUKE OF CLARENCE PH",
        "text": "Closing time, and the landlord of the Duke of Clarence is on the blower in a whisper. A retirement do for Mick the Brick — twenty years an honest villain of the wrestling ring — has declined to acknowledge the bell. Forty guests, a turn booked for midnight that the landlord won't specify over the phone, and the guest of honour has the cellarman in what witnesses describe as an affectionate headlock. The brewery's area manager, unfortunately, is among the guests.",
        "choices": [
          {
            "label": "Send two PCs to call time properly",
            "result": "The pub empties in twenty minutes, though PC Tench's helmet is retrieved from Mick's head only after a signed photograph is negotiated.",
            "effects": {
              "streets": 5,
              "relief": -4,
              "dispatchUnits": 2,
              "dispatchTurns": 2
            }
          },
          {
            "label": "Suggest the landlord declare a private function",
            "result": "Peace on the street and forty happy drinkers behind drawn curtains — until the licensing sergeant's snout, who was refused entry on the door, writes it all down.",
            "effects": {
              "streets": -3,
              "brass": -4
            }
          },
          {
            "label": "Call in your favour with Mick's promoter",
            "result": "One phone call and the promoter arrives to remind Mick about next Saturday at the Fairfield Halls; the do ends with autographs all round and the cellarman released with full honours.",
            "effects": {
              "streets": 4,
              "relief": 2,
              "favours": -1
            }
          }
        ]
      },
      {
        "id": "grime_callow_domestic",
        "title": "DOMESTIC — CALLOW COURT, FLAT 9",
        "text": "Mrs Prewitt of Callow Court reports the Ellams at it again in Flat 9 — crockery airborne, language 'unchristian', third Friday running. Last time your officers attended, both Ellams turned on them as one, and PC Grimble still carries the mark of a Coronation mug. Mrs Prewitt mainly wants the shouting stopped before the epilogue comes on, but she is threatening to ring the Commissioner personally, whose home number she claims to have.",
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
            "label": "Send PC Otley alone — he has a way with couples",
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
            "result": "Peace descends at 11.40 when the Ellams run out of crockery; Mrs Prewitt begins composing her letter to the Commissioner in longhand.",
            "effects": {
              "streets": -5,
              "brass": -2
            }
          },
          {
            "label": "Nick the pair of them",
            "result": "They continue the argument through the cell wall in a sort of Morse; the custody sergeant applies for a transfer.",
            "effects": {
              "streets": 5,
              "brass": -3,
              "relief": -2,
              "arrests": 2,
              "dispatchUnits": 2,
              "dispatchTurns": 1
            }
          }
        ]
      },
      {
        "id": "grime_sleepwalking_pensioner",
        "title": "MALE DIRECTING TRAFFIC — HORSEFERRY LANE JCT",
        "text": "The beat man reports a gentleman in pyjamas, dressing gown and one slipper directing traffic at the Horseferry Lane junction. He is, on inspection, fast asleep. He is also, on inspection, doing it better than the lights, which have been stuck on amber since Tuesday. A bus inspector has lodged a complaint; three minicab drivers have lodged compliments. Neighbours identify him as Mr Albert Munce, 78, formerly of the Royal Corps of Military Police.",
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
            "result": "He wakes in Cell 3 convinced he has died and been posted somewhere warm; the custody sergeant does not correct him as quickly as he might.",
            "effects": {
              "streets": 1,
              "brass": -5,
              "relief": -3,
              "arrests": 1
            }
          }
        ]
      },
      {
        "id": "grime_lost_coach",
        "title": "COACH PARTY, LOST — FRONT OFFICE",
        "text": "Fog thickening off the river, and a 42-seater from the Pontardulais Ladies' Chapel Guild has been circling the borough since ten in search of a Bayswater hotel. The driver has given up and parked outside the nick. The Guild are now in your front office singing 'Bread of Heaven' in four-part harmony, and the desk sergeant reports his ears going and his resolve with them. The driver is asking, man to man, for a miracle.",
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
        ]
      },
      {
        "id": "grime_greyhound_loose",
        "title": "GREYHOUND LOOSE — HIGH STREET",
        "text": "Wandle Park dog track on the line: Marvellous Boy, second favourite for tomorrow's November Guineas, has cleared the rails mid-race and is proceeding along the High Street at a steady forty. A butcher reports the loss of a tray of chops; a gentleman outside the Feathers reports being overtaken by 'a ghost'. The track manager mentions, delicately, that the syndicate who own the dog are men who remember a kindness.",
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
            "result": "The dog is back in his kennel by two and nothing is written down; a man rings shortly after to say the guvnor of Thorne Street has friends at the track now.",
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
            "result": "The dryer-kicker proves to be the attendant's husband; she asks, through the door, whether you could possibly keep him until Tuesday.",
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
        ]
      },
      {
        "id": "grime_crane_protest",
        "title": "MALE ALOFT — MELDON STREET CRANE",
        "text": "A man is sixty feet up the crane on the Meldon Street redevelopment and declines to come down. Not a jumper — he has taken up sandwiches, a flask, and a placard reading NOT TILL DORIS APOLOGISES. He is Ronnie Futtock, pigeon fancier; Doris is his partner in the loft, who sold his champion bird, Emperor of Peckham, to a man from Luton. The site watchman wants him down before the day shift, and the crane driver wants his cab back.",
        "choices": [
          {
            "label": "Send a PC up to talk him down",
            "result": "PC Nash climbs sixty feet in a November wind, shares the flask, and descends two hours later with Ronnie and some strongly held views on pigeon ethics.",
            "effects": {
              "streets": 3,
              "relief": -4,
              "dispatchUnits": 1,
              "dispatchTurns": 3
            }
          },
          {
            "label": "Get Doris out of bed and up to the site",
            "result": "Doris arrives in curlers and apologises at parade-ground volume; Ronnie descends to scattered applause, whereupon both attempt to press charges against the other.",
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
            "label": "Ask the fire brigade to fetch him",
            "result": "The brigade obliges with a turntable ladder and a certain amount of theatre; their Station Officer's invoice arrives Monday, addressed 'Dear Constabulary, again'.",
            "effects": {
              "streets": 4,
              "brass": -5
            }
          }
        ]
      },
      {
        "id": "grime_power_cut",
        "title": "POWER CUT — TRENCH STREET GRID",
        "text": "Half the borough drops dark at 11.20 — the Trench Street substation has 'had a wobble', per an Electricity Board man who is in Croydon and not hurrying. The Regal Bingo Hall has three hundred patrons frozen mid-house, each convinced the numbers will be called falsely in the dark. Off-licence alarm bells are ringing across the grid, and several parties are already out with torches whose interest in the darkness is strictly professional.",
        "choices": [
          {
            "label": "Flood the dark streets with every spare man",
            "result": "Nothing gets looted, though the beat men return frozen solid; PC Tench swears the Regal's caller kept going from memory, in the dark, and was never once wrong.",
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
            "result": "The lights return at 1.05 to reveal a lightly redistributed borough; three window grilles are gone entirely, along with the windows.",
            "effects": {
              "streets": -8
            }
          }
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
            "label": "Find out who lifted it from Purbright's window",
            "result": "PC Otley finds the window out and two apprentice glaziers responsible, on a dare; one is nicked, the other legs it into the fog still holding the doll's bonnet.",
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
            "result": "The Juvenile Bureau attends at 3 am to take custody of a doll; the resulting paperwork develops a life of its own, which is more than can be said for the infant.",
            "effects": {
              "brass": -7
            }
          }
        ]
      },
      {
        "id": "grime_phone_box",
        "title": "CRIMINAL DAMAGE IN PROGRESS — GAS LANE PHONE BOX",
        "text": "The phone box on Gas Lane has been swallowing shillings all week, and tonight it bit the wrong man. Harry Trigg, docker, has fed it four bob trying to ring his wife, received nothing but the pips, and is now dismantling the instrument methodically with a wheel brace, cheered on by a queue of previous victims. The GPO engineer cannot attend before Monday. The pips, witnesses agree, had sounded sarcastic.",
        "choices": [
          {
            "label": "Nick Trigg for criminal damage",
            "result": "He comes quietly on the understanding that you will also be charging the phone box; the queue boos your PC all the way to the car.",
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
        ]
      },
      {
        "id": "station_expenses_quarmby",
        "title": "EXPENSES — DS QUARMBY, CID",
        "text": "Divisional accounts have returned the CID expenses ledger with red ink right through it. DS Quarmby has claimed £14.50 for 'refreshments with informant' at the Golden Grill Steak House three nights running — one of which he spent on leave in Clacton. He fills your doorway, smelling of panatellas, and explains that his snout Manchester Freddie 'won't talk on an empty stomach.' The ledger needs a duty officer's signature by midnight. Yours.",
        "choices": [
          {
            "label": "Sign it and ask no questions",
            "result": "Quarmby winks and says you're 'in the book.' Should A10 ever read that book, you will be a chapter.",
            "effects": {
              "brass": -6,
              "relief": 2,
              "favours": 1
            }
          },
          {
            "label": "Query it, up the line to Division",
            "result": "Accounts are delighted; CID stop sharing tips with uniform, and the borough's villains enjoy a run of luck nobody can explain.",
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
        ]
      },
      {
        "id": "station_tea_fund",
        "title": "AUDIT — B RELIEF TEA FUND",
        "text": "Sgt Bream, treasurer of the tea fund since Suez, reports it £3.72 short. Suspicion has settled on PC Duffin, last man seen with the biscuit-tin key and first man seen with a new car radio. Half the relief want blood; the other half note that Bream's arithmetic once made a whip-round come out at minus elevenpence. The tin sits on your desk, accusingly empty but for a single Rich Tea.",
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
        ]
      },
      {
        "id": "station_spot_visit",
        "title": "RUMOUR — SPOT VISIT, CH SUPT MOLLAND",
        "text": "A friendly clerk at Division telephones, whispering. Chief Superintendent Molland is minded to make a 'surprise visit to a station on the ground' tonight. Thorne Street's charge room hasn't seen a mop since the last power cut but one, the noticeboard advertises a darts night from 1973, and somebody has chalked a study of the Commander on the parade-room board that is, whatever else you can say about it, a good likeness.",
        "choices": [
          {
            "label": "Turn out two PCs to scrub the nick",
            "result": "The nick gleams like a new whistle. Molland never comes, and the borough spends two hours burgling itself in peace.",
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
            "result": "Cricklewood, as it happens. You now owe the clerk a bottle of Bell's, which is how the clerk's cellar got started.",
            "effects": {
              "favours": -1,
              "brass": 3
            }
          }
        ]
      },
      {
        "id": "station_helmet_gosling",
        "title": "PROPERTY — LOSS OF HELMET, PC GOSLING (THIRD)",
        "text": "Probationer PC Gosling stands bare-headed before your desk for the third time since August. This helmet went over the wall of the Eldon Road lido during 'a pursuit' he declines to describe in any detail. A third loss report goes on his record at Division — and, in a quieter way, on yours. From the corridor, the station sergeant silently mouths the words 'bin him.'",
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
        ]
      },
      {
        "id": "station_fed_grievance",
        "title": "GRIEVANCE — FEDERATION REP, PC LATCH",
        "text": "PC Latch, Federation representative and the station's leading barrack-room lawyer, presents a grievance in triplicate: refreshment breaks cut short contrary to regulation, and the October-issue boots 'an industrial injury pending.' He has quotations. He has precedents. He has, if you let him begin, the whole of your night. The relief watch from the parade room to see whether their guvnor takes boots seriously.",
        "choices": [
          {
            "label": "Hear him out in full, minute every word",
            "result": "Two hours on the tensile properties of boot leather. The relief are touched; the borough, unsupervised, makes its own arrangements.",
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
        ]
      },
      {
        "id": "station_collator_index",
        "title": "SICK ABSENCE — COLLATOR, PC PURBRIGHT",
        "text": "PC Purbright, collator, has run the local intelligence index out of shoeboxes and memory since 1961, and tonight he is off sick with his chest. CID want the card on the Maunder brothers' lorry firm within the hour. The only map of the boxes is inside Purbright's head, and the temporary clerk has already alphabetised one drawer — destroying a filing system based, as far as anyone can establish, on grudges.",
        "choices": [
          {
            "label": "Send a PC round to Purbright's with grapes",
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
            "result": "CID mutter about uniform obstruction all the way back upstairs. The Maunder brothers, unaware of any of this, have an excellent week.",
            "effects": {
              "streets": -5,
              "brass": -2
            }
          }
        ]
      },
      {
        "id": "station_poach_hartree",
        "title": "TRANSFER REQUEST — PC HARTREE TO A RELIEF",
        "text": "Inspector Voss of A Relief, a man who smiles like a filing cabinet, has applied for PC Hartree — your best thief-taker, divisional record-holder for arrests before refreshments — to join his early turn 'for career development.' Hartree hasn't been asked. Voss has had the forms typed in advance. The parade room has gone quiet, waiting to learn whether their guvnor fights for his own.",
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
        ]
      },
      {
        "id": "station_canteen_pies",
        "title": "PUBLIC HEALTH — CANTEEN STEAK AND KIDNEY",
        "text": "Three of the relief are down with stomach trouble after the canteen's Friday steak-and-kidney pie, and the whisper is that tonight's batch came off the same tray. Mrs Ogboddy, canteen manageress for twenty-two years, stands guard over her hot cabinet defying anyone to say the word 'kidney' with implication. The Environmental Health man is one phone call away; so, unfortunately, is Mrs Ogboddy's memory, which forgets nothing.",
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
        ]
      },
      {
        "id": "station_a10_visit",
        "title": "VISITORS — A10, FRONT OFFICE",
        "text": "Two men in raincoats too clean for the weather are at the front desk asking for the duty officer. A10 — complaints — making 'routine enquiries' into an allegation from a minicab tout that someone on B Relief takes a drink to overlook the rank on Balcombe Lane. They want the duty book, the pocket books, and a quiet room with a kettle. The station has already gone silent without being asked.",
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
        ]
      },
      {
        "id": "station_section_house",
        "title": "TELEPHONE — MRS CADWALLADER, SECTION HOUSE",
        "text": "Mrs Cadwallader, who runs the Section House with the warmth of a Victorian iceberg, is on the line. PC Warlow has, she reports, been entertaining 'a young lady' contrary to house rules, frying bacon after ten, and — she saves the gravest for last — moving her hallway aspidistra. Unless he is dealt with tonight she will telephone the Superintendent at home, and she has done it before.",
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
            "text": "Sgt Bream puts his head round the door wearing the smile of a man whose pools numbers have come up. The early relief has banged up Gerald Ffoulkes-Hume MP, Parliamentary Under-Secretary at Prices and Consumer Protection, found in the public convenience off Marsh Lane in the company of a working girl called Rita. He is now in cell 3 demanding the Home Secretary through the hatch. It is Friday night, the pubs are still open, and he is occupying one of your six cells.",
            "choices": [
              {
                "label": "Charge him like any other punter",
                "result": "The charge sheet is typed in respectful silence, then Bream reads it aloud twice for pleasure. Upstairs, telephones begin to ring and do not stop.",
                "effects": {
                  "streets": 5,
                  "brass": -12,
                  "relief": 7
                },
                "outcome": "You charged a serving minister over an incident in a public convenience. The borough approves, the Yard does not, and Monday's Hansard will be lively."
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
                "outcome": "You handed the Honourable Member up to the Yard, gift-wrapped, at the price of a favour you'll miss come the next inquiry."
              },
              {
                "label": "Let him stew — you've a shift to run",
                "result": "Bream serves the Member cocoa in the station's worst mug and calls him 'sunshine'. Word of who's in cell 3, meanwhile, is already halfway to Fleet Street.",
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
            "text": "Rita Doyle — occupation 'model', currently the most sensible person in the building — gives her account with the brisk economy of a witness who has done this before. He offered her three pounds and then cried; she was mainly worried he'd catch his death on the tiles. Then the useful bit: a bloke with a camera has been loitering by the railings opposite since before midnight, and he isn't there for the architecture. Cell 3, meanwhile, wishes to know whether the Home Secretary has been informed.",
            "choices": [
              {
                "label": "Take her statement and charge him properly",
                "result": "Rita signs a statement so clear it could be framed and hung. Bream types the charge sheet with two fingers and total joy.",
                "effects": {
                  "streets": 4,
                  "brass": -11,
                  "relief": 7
                },
                "outcome": "Charged on Rita Doyle's immaculate evidence: a minister undone by the one honest witness in the borough."
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
                "result": "Rita departs with her fee, her dignity and your telephone number 'in case anything wants straightening'. Somewhere a custody record acquires a small hole.",
                "effects": {
                  "favours": 1,
                  "brass": -4
                },
                "goto": "mp_stringer",
                "delay": 2
              },
              {
                "label": "Put her back downstairs and press on",
                "result": "Rita goes back down shaking her head at the state of management these days. She told you one useful thing tonight, and you have just ignored it.",
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
            "text": "Dennis Clegg, stringer for the Sunday Mercury, is at the front desk buying teas for the area car crew and asking, lightly, whether it's true you have a 'well-spoken gentleman guest' tonight. His camera is in the Cortina outside; his deadline is the four a.m. first edition. In cell 3 the Honourable Member has moved on from the Home Secretary to demanding his club secretary, and Bream has begun charging the lads 2p a look, 3p with commentary.",
            "choices": [
              {
                "label": "Charge the MP now, in plain sight",
                "result": "Clegg gets his story the honest way: read out of the charge book. 'Lovely,' he says. 'Both barrels, then.' The Yard will read it over breakfast.",
                "effects": {
                  "streets": 5,
                  "brass": -13,
                  "relief": 8
                },
                "outcome": "Charged in front of the press — brave, correct, and career-limiting, in roughly that order."
              },
              {
                "label": "Remind Clegg about his drink-drive matter, still pending",
                "result": "Clegg goes pale, remembers an urgent appointment, and leaves the camera in the Cortina all the way home. Grubby, but the front desk is quiet again.",
                "effects": {
                  "brass": -2
                },
                "goto": "mp_yardcall",
                "delay": 1
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
            "text": "Commander Askew of the Yard on the line, using the voice senior officers keep for career advice. 'Nobody wants a circus, Inspector. The gentleman leaves quietly, nothing on paper, and certain people remember you fondly.' Through the floor you can hear the gentleman in question singing the Eton Boating Song. Bream has stopped grinning: it is chucking-out time on a Friday, cell 3 is prime real estate, and the Honourable Member is still in it.",
            "choices": [
              {
                "label": "Side door, quiet word, no charge sheet",
                "result": "At half past three a Daimler collects the Honourable Member from the yard, and the night's paperwork develops a tasteful gap. Bream hands you the unused charge sheet without a word, which is worse than words.",
                "effects": {
                  "brass": 8,
                  "relief": -8,
                  "streets": -3
                },
                "outcome": "The Honourable Member left by the side door and officially the evening never happened. The Commander remembers you fondly; your relief remembers you differently."
              },
              {
                "label": "Charge him anyway — let Askew choke on it",
                "result": "There is a silence on the line you could park a bus in. 'Your funeral, Inspector,' says Askew, and the click echoes.",
                "effects": {
                  "brass": -14,
                  "relief": 9,
                  "streets": 5
                },
                "outcome": "You charged him with the Yard listening in. Correct in law, magnificent in the canteen, fatal on the fifth floor."
              },
              {
                "label": "Send him up to the Yard with a bow on",
                "result": "You call in your marker with the Commander's clerk: a car, two silent men, a receipt. The Member leaves under someone else's authority, which is the whole point.",
                "effects": {
                  "favours": -1,
                  "brass": 4
                },
                "outcome": "Handed upward on a favour: the Yard owns the problem now, and you own one fewer favour."
              },
              {
                "label": "Tell Askew you'll ring him back",
                "result": "Commanders are not rung back; commanders ring. The next call about the Honourable Member won't be a call at all — it'll be headlights in the yard.",
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
            "text": "The Honourable Member is back in cell 3 with gravel on his knees, having re-entered the nick at a speed unbecoming to a member of Her Majesty's Government. Dennis Clegg now owns a photograph of a junior minister leaving a police station by the side door at three in the morning, and the Sunday Mercury's night desk is on the line, offering you the chance to 'clarify matters' before the first edition goes to bed at four. Bream, loyally, suggests shooting the messenger.",
            "choices": [
              {
                "label": "Charge him and hand the Mercury the facts",
                "result": "'MINISTER CHARGED' at least has the virtue of being true. Clegg buys the whole desk teas; the Yard's press office wakes up screaming.",
                "effects": {
                  "brass": -13,
                  "streets": 4,
                  "relief": 5
                },
                "outcome": "Charged after the flashbulb, so the Yard got the scandal and none of the credit. Honesty arrived, as usual, slightly late."
              },
              {
                "label": "Deny everything and get him gone anyway",
                "result": "The Daimler makes it away on the second attempt. MIDNIGHT MYSTERY OF MINISTER, page one, above a photograph the Yard's inquiry will describe as 'regrettably crisp'.",
                "effects": {
                  "brass": -10,
                  "relief": -6,
                  "streets": -4
                },
                "outcome": "He got away and the picture ran anyway. The inquiry will find nobody to blame, and then it will find you."
              },
              {
                "label": "Ring the Yard and hand them the whole parcel",
                "result": "Your marker buys you two rubber-heeled gentlemen who collect the Member, the negatives conversation, and the blame. You are left holding the cocoa mug.",
                "effects": {
                  "favours": -1,
                  "brass": 3
                },
                "outcome": "The Yard swallowed the mess — minister, photographs and all — for the price of a favour and most of your pride."
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
            "text": "Three a.m. A grey Rover P6 idles in the yard and two men stand at the desk showing warrant cards a shade too fast to read. The one calling himself Mr Todd wants the Honourable Member, the custody record, Rita's statement and the visitors' book, and has brought no paperwork whatsoever — paperwork, he explains pleasantly, being rather the point. Bream looks at you the way a man looks at his guvnor when history is being decided at the front desk.",
            "choices": [
              {
                "label": "Hand over the lot, take the receipt you'll never get",
                "result": "The Rover leaves heavier than it arrived. By dawn cell 3 has never been occupied, and the night, officially, was quiet.",
                "effects": {
                  "brass": 5,
                  "relief": -9,
                  "streets": -3
                },
                "outcome": "Special Branch — if that's who they were — took the Member and the paper trail. Officially your shift was uneventful, which is somehow the most frightening word available."
              },
              {
                "label": "No paperwork, no prisoner — dig in",
                "result": "You make Mr Todd fill out a Form 62 at the front desk while the relief watch in reverent silence. He does it, eventually, in handwriting like barbed wire.",
                "effects": {
                  "brass": -9,
                  "relief": 10,
                  "streets": 2
                },
                "outcome": "You made Special Branch queue at the desk and sign for their minister like everyone else. The relief will dine out on it for years; you may be dining alone."
              },
              {
                "label": "One call to your own man at the Yard",
                "result": "Ten minutes of murmured telephone diplomacy and the Rover departs empty, Mr Todd wearing the look of a man overruled from above. The Member goes upstairs by arrangement, with paperwork.",
                "effects": {
                  "favours": -1,
                  "brass": 3,
                  "relief": 4
                },
                "outcome": "You trumped Special Branch with a better contact: the mess went upstairs with the forms filled in, costing one favour and Mr Todd's undying enmity."
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
            "text": "Sgt Bream puts his head round the door with the air of a man reporting a UFO. The Trattoria Bella Ferrovia on Calthorpe Street has been seized mid-service by the Circolo Anarchico 'Ettore Malaspina' (London Section) — seven Italian anarchists who have declared a free commune, are feeding the supper queue for nothing, and are issuing communiqués through the tannoy of a borrowed ice-cream van. Signor Bonetti, the owner, weeps on the pavement in his apron. 'The diners won't be rescued, guv,' says Bream. 'Apparently the food's come on no end.'",
            "choices": [
              {
                "label": "Send a panda round for a proper look",
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
                "result": "You log it under 'civil matter'. Bonetti weeps harder, and somewhere in the November dark an ice-cream van clears its throat.",
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
            "text": "PC Doyle's report, read to the office over cocoa: seven anarchists under one Ennio Scarlatti, known as Il Professore, currently wearing Bonetti's second-best apron. Red-and-black bunting over the specials board. The till drawer stands open, full of IOUs addressed 'to History'. Forty diners refuse rescue on the grounds that the saltimbocca has never been better, the ice-cream van is rehearsing Communiqué No. 4, and a queue is forming in the drizzle. Bonetti has stopped weeping and started shouting figures at anyone in uniform.",
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
                "result": "Two anarchists nicked, five out the kitchen window, and a diner writes to the Standard about the ruination of his zabaglione. The relief spend an hour picking bunting off their tunics.",
                "effects": {
                  "dispatchUnits": 2,
                  "dispatchTurns": 2,
                  "arrests": 2,
                  "streets": 8,
                  "brass": -3,
                  "relief": -5
                },
                "outcome": "The Trattoria commune fell to the heavy mob mid-dessert — order restored, zabaglione avenged, two anarchists singing in the cells till breakfast."
              },
              {
                "label": "Ring the town hall — get Voss, the food inspector, out of his bed",
                "result": "It costs you the marker from the drains business, but Mr Voss agrees to attend with clipboard and thermometer. He sounds almost eager.",
                "effects": {
                  "favours": -1
                },
                "goto": "tratt_inspector",
                "delay": 1
              },
              {
                "label": "Let them simmer overnight — revolutions hate a Saturday",
                "result": "By closing time the queue is round the block and the communiqués have moved on to the subject of policing.",
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
            "text": "The borrowed ice-cream van has found its voice. Communiqué No. 9 — property is theft, but the veal is liberated — rolls down Calthorpe Street through the chimes of 'O Sole Mio'. The free-food queue now stretches past the Duke of Clarence, whose landlord is livid at the competition, and a young man from the Standard is buying the anarchists' life stories in halves of lager. Bonetti has chained himself to his own drainpipe in protest at being locked out of his own protest.",
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
                "result": "Three in the van, the van's chimes jammed on 'O Sole Mio', and a photograph of PC Renwick wrestling a stockpot destined for Monday's front page.",
                "effects": {
                  "dispatchUnits": 3,
                  "dispatchTurns": 2,
                  "arrests": 3,
                  "streets": 9,
                  "brass": -4,
                  "relief": -6
                },
                "outcome": "B Relief stormed the Trattoria to the tune of 'O Sole Mio' — three collars, one stockpot casualty, and a press photo the Commander keeps mentioning."
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
            "text": "The dining room falls silent as you enter alone, hat under arm. Scarlatti clears a table himself, pours two grappas, and states his position: the commune is eternal, the people are fed, and Bonetti was watering the house red anyway. Forty diners pretend not to listen. The grappa, annoyingly, is excellent. Behind you a PC breathes on the window. One wrong word and this becomes a siege; one right one and everybody is home by two.",
            "choices": [
              {
                "label": "Shake on it: one last free service, gone by dawn, and nobody writes anything down",
                "result": "Scarlatti weeps, embraces you, and comps you the veal. By dawn the commune is a rumour and the washing-up, miraculously, is done.",
                "effects": {
                  "streets": 8,
                  "brass": -3,
                  "relief": 6
                },
                "outcome": "The guvnor talked the anarchists out over grappa — no arrests, no paperwork, and a rumour upstairs that he toasted the revolution twice."
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
                "result": "Il Professore goes quietly, beaming — martyrdom was always Plan A. The remaining six barricade the kitchen and start printing pamphlets on the meat slicer.",
                "effects": {
                  "arrests": 1,
                  "brass": 3,
                  "streets": -3
                },
                "goto": "tratt_standoff",
                "delay": 1
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
                "outcome": "The commune fell not to the truncheon but to the clipboard — Mr Voss condemned the stockpot and seven anarchists left singing, beaten by Regulation 16."
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
                "result": "Two who won't budge are nicked for obstructing an environmental health officer — a first for the borough, possibly for jurisprudence. The custody sergeant demands to know how to spell 'stockpot'.",
                "effects": {
                  "arrests": 2,
                  "streets": 6,
                  "brass": 3,
                  "relief": -4
                },
                "outcome": "Bureaucracy and the boot combined: Voss condemned the kitchen while two anarchists went in the book for obstructing his thermometer."
              }
            ]
          },
          {
            "id": "tratt_standoff",
            "title": "The Siege of the Bella Ferrovia",
            "text": "Full house. Red-and-black flags on the roof, a bedsheet banner reading TUTTO PER TUTTI misspelt in Bonetti's own paint, and the Yard has rung twice to ask why an ice-cream van is broadcasting anarchism on the Commander's manor. Bonetti, freed from his drainpipe, is giving the Standard an interview on the theme of betrayal. Inside: seven anarchists and forty contented diners who have just asked for the cheese course. It ends tonight, guvnor, one way or another.",
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
                "outcome": "The siege of the Bella Ferrovia ended with the heavy mob in the flock wallpaper — streets quiet, three in the cells, and the Commander framing entirely the wrong photograph."
              },
              {
                "label": "Walk in alone, hands in pockets, and hear their terms",
                "result": "They leave at four, with a signed letter on station notepaper praising the borough's revolutionary spirit. You will be hearing about that letter for the rest of your service.",
                "effects": {
                  "streets": 5,
                  "brass": -8,
                  "relief": 3
                },
                "outcome": "The guvnor talked the siege down solo — anarchists gone by four a.m., and a letter of surrender the Yard insists on calling a letter of endorsement."
              },
              {
                "label": "Cordon it off and let the wine run out",
                "result": "The relief play cards in the vans while the commune sings itself hoarse. It ends Tuesday, when the grappa does — C Relief's problem, and the borough knows it.",
                "effects": {
                  "streets": -9,
                  "brass": -4,
                  "relief": 4
                },
                "outcome": "The commune outlasted the shift and folded on Tuesday when the cellar ran dry — nobody hurt, nobody impressed, everybody fed."
              }
            ]
          }
        ],
        "unresolvedOutcome": "The Bella Ferrovia was still flying red-and-black at six a.m., serving liberated breakfasts — noted, in writing, by the Commander."
      }
    ],
    "meterEndings": {
      "streets": "By four in the morning the borough has stopped pretending. The Duke of Clarence is minus its windows, three pandas are minus their hubcaps, and a crowd outside the Wimpy is chanting something about justice and scampi. Traffic Division won't come south of the canal. The Commander rings at ten past five to ask, in the tone of a man reading your headstone, precisely when you lost control of your ground. You check your watch. Hard to say, sir. October?",
      "brass": "The summons comes at six sharp: Commander Rossiter, in full uniform at that hour, which is never good, holding a manila envelope, which is worse. Words are used like 'judgement' and 'the Commissioner's breakfast'. You are suspended from duty pending an inquiry into, as far as you can tell, everything. Sgt Bream takes your keys with the tenderness of an undertaker. On the way out, the teleprinter starts chattering again. For the first time all night, it's somebody else's problem.",
      "relief": "It starts with Sgt Bream reporting a bad back, a thing Sgt Bream has never possessed. By three there are eleven officers off with a flu that spreads by rota. The Section House phone rings out. You end the night alone: manning the front desk, answering the radio, making your own tea, booking in a drunk who asks, reasonably, whether anyone else works here. The day relief find you at six, guarding an empty nick like the last soldier of a war nobody declared."
    },
    "debriefs": [
      {
        "minAvg": 65,
        "title": "COMMENDATION",
        "text": "Six o'clock, and the tea tastes almost like tea. Commander Rossiter appears in person, which normally means a funeral, but this time he shakes your hand for a full second and says 'tidy night's work' as if the words cost money. There's talk of a mention in Orders. The day relief file in to find B Relief looking insufferably smug, and Sgt Bream informs them, at volume, that this is what policing looks like. Go home. Sleep the sleep of the improbably vindicated."
      },
      {
        "minAvg": 50,
        "title": "A GRUDGING NOD",
        "text": "Dawn finds the nick intact and the paperwork merely alarming. The Superintendent skims the night's occurrence book, sniffs, and delivers the Met's highest working honour: 'Could've been worse.' The relief shuffle off to their beds with most of their limbs and some of their dignity. Sgt Bream leaves you the last digestive, which from Bream is a twenty-one-gun salute. You'll be back at ten tonight to do it all again, and honestly, you can think of worse ways to earn a pension. Just."
      },
      {
        "minAvg": 32,
        "title": "QUESTIONS WILL BE ASKED",
        "text": "Six a.m. arrives like a bailiff. The nick is still standing, technically, in the way that certain condemned buildings are still standing. The Superintendent wants a written report by Monday on four separate matters, two of which you'd hoped he hadn't heard about. The day relief inspect the wreckage of the front office in respectful silence, the way people look at car crashes. The tea urn has burnt out. So, very nearly, have you. Home. Bath. Say nothing to anyone."
      },
      {
        "minAvg": 0,
        "title": "STILL BREATHING",
        "text": "You survived, in the sense that you are still upright and answering to your own name. The occurrence book reads like the fall of a small republic. There is a smell in Cell Three that science has yet to classify, a panda car missing in the loosest sense of the word, and a probationer who may never speak again. The day relief step over the debris without comment. Drink your tea. It's cold. Everything, this morning, is cold."
      }
    ],
    "quietTurns": [
      "Half an hour passes in which the only crime is Sgt Bream's pools coupon. He has Thorne Athletic down for an away win. You point out Thorne Athletic haven't won away since the Coronation. He licks his pencil and says that's exactly why they're due.",
      "Nothing on the printer. Nothing on the phones. The station cat, Regan, patrols the charge room with the unhurried menace of a governor doing rounds. He inspects the cells, finds them acceptable, and falls asleep on the lost property ledger. Nobody dares move him. Nobody has, since 1971.",
      "A quiet half hour, broken only by the discovery that someone has been at the biscuit fund. Sgt Bream opens an investigation with more rigour than he's shown any burglary this year. Three suspects, no alibis, one custard cream unaccounted for. It will never come to trial.",
      "The only sound in the nick is the gentleman in Cell Two working through the complete songbook of the music halls. He's not bad, actually. By the second chorus of 'Nellie Dean' the probationer is humming along, and Sgt Bream has to have a word with himself.",
      "A man comes to the front desk to report a lost umbrella. It emerges, under gentle questioning, that he lost it in 1968. In Margate. He just happened to be passing and thought he'd ask. PC Duffin takes down the particulars anyway. It passes the time.",
      "The lights go out — the substation again — and the nick runs on candles for twenty minutes. It's oddly peaceful. The teleprinter sulks in the dark. Somebody produces a mouth organ; somebody else, with more authority, produces the word 'don't'. The lights return to a low groan of disappointment.",
      "CID have all gone home, or to wherever CID go, leaving their office locked and their bottom drawer more locked still. The relief speculate quietly about its contents. Scotch, says one. Evidence, says another. Sgt Bream says the two are not mutually exclusive, and closes the subject.",
      "Half an hour of nothing, so the canteen dartboard comes into play. House rules: nearest the bull picks who does the four o'clock calls. PC Duffin, a man who once missed the board and hit a radiator, is tonight throwing like an angel. Suspicion is general.",
      "Peace, of a kind. The probationer is totting up the property book and has arrived at a figure that cannot exist in decimal currency or any other. Sgt Bream converts it back into old money, gets a different impossible figure, and rules that the book is correct and reality mistaken.",
      "The radio goes so quiet you check it's on. Out there the fog has swallowed the borough whole, and presumably the villains with it. Panda 3 calls in just to hear a human voice. You tell them to proceed. They ask where. You tell them to use their imagination.",
      "Someone's wife has sent in a fruitcake, and for thirty blessed minutes the nick is united in a way the Home Office could never legislate. Even the drunk in Cell One gets a slice, on the grounds that it's Christmas somewhere. It isn't. It's November. Nobody checks.",
      "Quietest half hour of the night. PC Duffin licks his way through three books of Green Shield stamps at the front desk, saving, he confides, for a fondue set. Sgt Bream asks what a fondue is. Duffin doesn't know. He just knows he wants one."
    ],
    "ambient": [
      "PANDA 2 REQUESTS PERMISSION TO STOP FOR CHIPS. PERMISSION NEITHER GRANTED NOR REFUSED",
      "FOG NOW GENERAL SOUTH OF THE CANAL. PANDA 3 NAVIGATING BY MEMORY",
      "STREET LAMPS OUT AGAIN ON CHANDLERS WALK. GLC INFORMED. GLC UNMOVED",
      "LICENSEE OF THE DUKE OF CLARENCE DENIES AFTERS. SINGING AUDIBLE FROM THE STREET",
      "DOG SECTION REPORT PRINCE DECLINING TO LEAVE THE VAN. NEGOTIATIONS CONTINUE",
      "CELL TWO HAS COMMENCED NELLIE DEAN. SECOND VERSE. ALL UNITS BRACE",
      "CID OUT ON OBBO. LOCATION WITHHELD. PUB SUSPECTED",
      "SECTION HOUSE REPORTS HOT WATER RESTORED. SCENES OF QUIET REJOICING",
      "YARD CIRCULAR RE STOLEN LORRYLOAD OF BROWN ALE. UNITS TO BE ALERT AND SOBER",
      "MINICAB OFFICE ON STATION PARADE PLAYING RADIO AT VOLUME DESCRIBED AS CRIMINAL. IT IS NOT"
    ]
  };
});
