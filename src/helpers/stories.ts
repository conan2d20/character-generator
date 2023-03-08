import {Caste} from './castes';
import {character} from '../common/character';

class StoryModel {
    name: string;
    description: string;
    trait: string;
    roll: number;

    constructor(name: string, desc: string, trait: string, roll: number) {
        this.name = name;
        this.description = desc;
        this.trait = trait;
        this.roll = roll;
    }
}

class StoryViewModel extends StoryModel {
    id: number;

    constructor(id: number, base: StoryModel) {
        super(base.name, base.description, base.trait, base.roll);
        this.id = id;
    }
}

export class Stories {
    private _stories: { [id: number]: StoryModel[] } = {
        [Caste.Crafter]: [
            new StoryModel(
                "Exalted Mark",
                "Your mark has been added to the roll of honor in your local town. This was likely a political decision, as you’d only just passed from apprenticeship to tradesman. You were quite naive when you were invested, but now that you’ve had time to ponder the matter, you think you know who was behind it. Who are they, what motives did they have, and do you deserve to be among the invested?",
                "Suspicious",
                3),
            new StoryModel(
                "Gifted Mark",
                "Your mark is that of your grandfather. A mark proudly passed on to all his apprentices to show that they conform to the family tradition. There is a problem, though. Having witnessed the many wondrous designs and creations of your kin, you suspect you are unworthy to use the mark. It started before the old man died, when he criticized your work, and his stern words become a shadow in the back of your mind. What was his criticism, and do you still use the mark?",
                "Unworthy",
                6),
            new StoryModel(
                "The Quiet Hours of Peace",
                "Your apprenticeship fell in a lull between wars between neighboring powers. Though you still had hours of drudgery in which to learn your trade, making weapons was low on the list of priorities. You had to work such craftsmanship out for yourself. Your first self-made blade was balanced poorly and its edge was fragile, but you needed it and you were unwilling to steal a blade. Why did you need the blade, and did it serve its purpose?",
                "Secret Past",
                10),
            new StoryModel(
                "Pressed for War",
                "Your apprenticeship came to you as siege engines fired over the bulwarks of your city and shattered the walls and roofs within. The blacksmiths made weapons and armor constantly, and often enough you were handed a box of scrap metal and told “get to it.” After ten days, you’d done more work than most journeymen and produced some quality work, despite the pressures outside. What was your greatest creation from that time? What came of it?",
                "Envious Peers",
                14),
            new StoryModel(
                "Too Many Closed Mines",
                "You passed your apprenticeship, but only barely so. Ore was rare and mines were largely worked out. You had to scavenge with some of your fellow apprentices to try and find enough ore to work with. When you finally found some, a gang or prospectors tried to steal it from you. What happened? Did you get enough metal to achieve the journeyman rank, or did you have to look elsewhere?",
                "Criminal Past",
                17),
            new StoryModel(
                "Sundered Mark",
                "You have caused dire offense to the guild of your home town, and now your family’s mark has been stricken from memory. Where it once hung, the mark has been scraped clean, filled in, and painted over. Very few examples of your craft remain, and folk will only buy your wares at a significant discount. While you can still earn your way performing your craft, it is only because of what few friends will still stand by you. How did you earn the ire of the guild, and who can you still count on?",
                "Cast Aside",
                20)
        ],
        [Caste.EscapedSerfSlave]: [
            new StoryModel(
                "A Band of Brothers, Living Free",
                "Whether by your own hand or the will of another, you were freed, alone in the world. You found others like yourself, and formed a band. Through scavenging, work, and even theft, you supported one another, hidden within a ruined building on the fringe of society. Then something brought it to an end. Who betrayed your band? What, or who, were the guards looking for? Why do your former friends mistrust you?",
                "Regrets",
                3),
            new StoryModel(
                "Hidden Far from Noble Sight",
                "Suddenly they died and you were alone. You could go anywhere, do anything. You took their money and spent every penny, constantly on the move. Then you found it: a perfect home, far from suspicious eyes. That home is gone now, just a memory that makes you smile. Where was that home, and what made it so special?",
                "Fond Memories",
                6),
            new StoryModel(
                "One of the Multitudes",
                "Thousands of laborers toiled in the site as your master brought forth his vision. Conditions were cruel and many times you tasted the lash. As if a miracle, the call came. As the uprising spread through the camp, with dozens of others you won your escape. Did you fight your oppressors valiantly, or did you slink away like a cur?",
                "Marked by the Pit",
                10),
            new StoryModel(
                "Under the Eyes of the Masters",
                "They know you have escaped and they know where you have run. Perhaps they bide their time, or perhaps you are not worth the cost of retrieval. Still you know the strange one from the blackened tower has spies that watch your every step. Why is the strange one so interested in you?",
                "Stalked like Prey",
                14),
            new StoryModel(
                "Hunted by Your Master",
                "Your former master never forgot the indignity of your escape. Now with estate in ruins, she lives only for vengeance. Who is she and why does she hate you so much?",
                "Nemesis",
                17),
            new StoryModel(
                "Hunted by the Law",
                "They’re on your track, crashing through taverns and looking in the alleys. Perhaps you committed the crime and it was worth it. Perhaps you are unjustly tormented. Either way a trail of suffering follows in your wake. Whose suffering do you regret the most and what will you do to put them at ease?",
                "Hunted!",
                20)
        ],
        [Caste.Farmer]: [
            new StoryModel(
                "Blessed Harvests",
                "You remember fondly how hard work made the ground spill its bounty and how the seasons seemed to be fair. You remember the fellowship of your loved ones. Where are they now?",
                "Family",
                3),
            new StoryModel(
                "Ample for Winter",
                "Every day brought a small hardship that made you strong. The ground was hard in summer and slush in winter, yet when the stores had to be opened there was always enough barley for a strong drink and plenty of food. Looking back, you scarcely remember the people of your village. Should you return, they would scarce remember you. Perhaps there is someone there worth returning to see. Do you even remember that person’s name?",
                "Lost Love",
                6),
            new StoryModel(
                "Winter in the Balance",
                "It was a struggle every year. The lord took plenty for his knights, leaving little for the common folk. Sometimes you ate, while other times you simply drank snow water and slept as the wolves howled. You remember no beauty in that bleak place — only the torments of the thieving knights. One knight in particular took pleasure in the hardship he inflicted. If you meet him again, will you take revenge? Why?",
                "Vengeance",
                10),
            new StoryModel(
                "Meager Soup and Angry Eyes",
                "Even the protectors of your village went hungry, and when they did, everyone suffered. Raids were planned on other villages, but you never saw any of the food they brought back. The only way to survive was by poaching, but the game was scarce and you had to keep your kills to yourself. Eventually, you were found out and the angry eyes of the villagers were terrible to behold. Were you punished, and did you ever redeem yourself?",
                "Traitor",
                14),
            new StoryModel(
                "Not a Spare Bean",
                "You remember seeing the warrior die. He simply stopped and fell, his armor clattering on the stony ground. He had come to take taxes for the fifth time, but there was no food or other wealth to be had. When he learned he could take nothing from you and your kin, he just stopped, as if his soul had given up, onwards to some other place of plenitude. The horse was short work for the butcher and you were sent south to find someone to buy the man’s sword. Did you find a buyer? Did you take the profits home?",
                "Trusted or Traitor",
                17),
            new StoryModel(
                "Famine",
                "When the crops were gone, you ate the beasts of the forest. Then you killed and shared the beasts that worked your fields. As water became a luxury, some in your village looked at the soft flesh of the masters and contemplated a different type of prey. As the knife sunk deep into the land-owner’s agent, rain began to fall. You looked on in horror, as desperation revealed its ugliest side. You were forced to ask yourself the hardest question. How hungry were you?",
                "Cannibal",
                20)
        ],
        [Caste.Herder]: [
            new StoryModel(
                "A Heavy Lambing Season",
                "You scarcely remember the work, but you’ll never forget the noise. An endless chorus of bleats, swearing, and the wet sounds of butchery. When the season was over, you were rich enough to afford comforts your forbearers had never indulged in. What did you get a taste for, and does it tempt you still?",
                "Exotic Tastes",
                3),
            new StoryModel(
                "Nights of Sweet Silence",
                "You remember the hills where you rested, sandwiched between the grasses and scented herbs of the wild. The days were tender and the nights were long. You spent more time at play than at work, and gained memories that still lighten your heart, even in leaner years. Of these, what is your fondest memory?",
                "Hedonist",
                6),
            new StoryModel(
                "Howls in the Night",
                "Wolves were only an occasional threat, but tell that to your aunt. She was determined to make you a masterful wolf hunter, even if she had to beat the lessons into you. Despite all the training, you only remember hearing howls once. Your aunt woke you quietly and with you went into the forest, brandishing fire and steel. When you emerged into daylight, she seemed a hundred years older and you never slept properly again. What dreams haunt you still?",
                "Nightmares",
                10),
            new StoryModel(
                "A Decimated Herd",
                "The illness left many dead in its wake. Superstition had its way, and even more of the herd were sacrificed to save the healthy. When the plague had passed, only one in five lived. The herd was doomed. Your cattle master drove the remainder to town, where they were slaughtered and the money divided amongst you. In the morning, you found him hanged with a lock of his wife’s hair still woven around his fingers. Just the night before he had seemed so wise. What was the last thing he said to you?",
                "Survivor",
                14),
            new StoryModel(
                "Wolves Amongst the Flock",
                "It was only natural in the hard winter that the wolves would find you. At first, they were the nuisance they had always been, but as the snows grew deeper the tracks got larger. Somewhere in the forest, a great wolf was gathering a pack larger than any seen before. Foresters would go in gangs to gather firewood, but you quickly found yourself lost. In the snow while carrying a bundle of wet branches, you saw it and looked into its eyes. To this day those eyes haunt you. What did you see and why did it let you live?",
                "Compassionate",
                17),
            new StoryModel(
                "Raiders",
                "First there was nothing but thin trails of smoke, off in the distance. Soon there was the report of laughter, carried as if on the wind. In hushed tones, the old men of your village whispered a word that carried with it a weight of dread… “Raiders!” The fences were surrounded with traps and the able-bodied in your village were set as guards. On the third night the raiders struck. Half the herd was stolen and fifteen were placed upon the pyre. Finally, it was time for the young to speak and your voice joined many. What did you do, and what was the cost?",
                "Vengeful",
                20)
        ],
        [Caste.Merchant]: [
            new StoryModel(
                "Extravagant Profits",
                "There was only ever celebration in your grandfather’s house. Granted a monopoly long ago, he sold his goods for a handsome price, and his competitors had no recourse when his soldiers confiscated or taxed their goods on the road to town. You were a noble in all but name, but it did not last. Now the old man is dead and the monopolies returned to the prince who increases the taxation on your properties, to ruinous amounts. While he was alive, the old man had a motto that governed all his business dealings. What was that motto, and do you agree with it?",
                "Ostentatious",
                3),
            new StoryModel(
                "Profits from the Town",
                "While working in your aunt’s home you got to see many wealthy visitors stop by and broker purchases. You were young enough that they didn’t pay you much mind unless you were serving wine. Consequently, you learned a great deal that the visitors didn’t want your aunt to know. A generous woman, she always made sure you were rewarded whenever a significant deal was brokered. What was your biggest score, and did the customer ever find out?",
                "Spy",
                6),
            new StoryModel(
                "Profits from the Road",
                "It seemed like you were always on the move. Taking goods from one town, trading them for goods in the next, pocketing some coin along the way. Spending the coin on some cheap wine, and then moving on. It was easy to become embittered about your cousins, living it up in the city while you plied your way through the expanses on dangerous caravan routes. Still, it’s not like you didn’t have adventures or see amazing sights. What was the most amazing thing you have ever seen?",
                "Well-traveled",
                10),
            new StoryModel(
                "The Lash of Taxation",
                "Your local lord had grandiose dreams and a mind to have the merchants within his lands pay for them. You learned that sometimes a merchant needs to be have two cargoes: one to be seen, and one to pay for the trip. You also witnessed firsthand what happens to smugglers. Who did you see suffering at the hands of the lord’s soldiers?",
                "Witness to Brutality",
                14),
            new StoryModel(
                "Hard-won Profits",
                "When you were young, a bandit lord took to plundering your family’s caravans. At first, mercenaries were hired, but they deserted and joined the bandits in their plunder. Then, soldiers were borrowed from the king but the taxes on that service were exorbitant. You spoke up and offered a plan that made half your family revile you and the rest love you. What was your plan, and why was it so effective?",
                "Divided Family",
                17),
            new StoryModel(
                "Ruin",
                "Your family had been making profits and living well. You were not one of the most powerful families but you had enough long-lasting ties that your future seemed secure. Over the course of one banquet, all this changed. Your uncle offended one of the more powerful courtiers, and the courtier made it his mission to destroy your family. By the time the courtier was done, your family’s name was in ruin. The king granted your rivals monopolies that blocked your goods from entry to the larger cities, and bandits harassed your caravans. When the fire took your family’s estate, you were left thoroughly dispossessed. Now that you’ve started to rise, you must consider your options. What vengeance, if any, will you take upon the courtier? How will you escape his wrath?",
                "Vengeful",
                20)
        ],
        [Caste.Outcast]: [
            new StoryModel(
                "The Charity of Honest Men",
                "While you might not be the most pathetic of the beggars, in a time of need a charitable man of means gave food and shelter enough to survive. What had enfeebled you, and who was your benefactor?",
                "Honor Debt",
                3),
            new StoryModel(
                "The Charity of Pompous Priests",
                "As a display of piety, a priest took you in and read to you boring sermons, hour after hour. While you stayed with the priest, you saw many treasures and ate scraps that at any other table would be the height of dining. Did you take anything from the priest’s home, and is your theft known?",
                "Thief!",
                6),
            new StoryModel(
                "Food and Rough Liquor",
                "The rabble of your shanty might not have had much, but it was shared with cheer and many fond (if humble) memories were made. Now this shanty is no more. What befell its inhabitants? Did any survive?",
                "Fond Regrets",
                10),
            new StoryModel(
                "One of the Rabble",
                "There were hundreds squabbling over food in the shadows of the lord’s fealty. Betrayal was a part of life, but you never expected it from your fellow outcasts. Who betrayed you, and why do you still feel the sting of the betrayal?",
                "Betrayed",
                14),
            new StoryModel(
                "Shunned Even by Lepers",
                "There was a time you were doing well for one of the ragged, but then something happened. You barely remember how or why it happened, but it marked you as surely as if it were branded upon your face. Why do the beggars spit at your shadow? Are there any that remember you with kindness?",
                "Cursed",
                17),
            new StoryModel(
                "Hunted by the Law",
                "They’re on your track, crashing through taverns and looking in the alleys you used to haunt. Perhaps you committed the crime and it was worth it. Perhaps you are unjustly persecuted. Either way, a trail of suffering follows in your wake. Whose suffering do you regret the most and what will you do to put them at ease?",
                "Hunted!",
                20)
        ],
        [Caste.PettyNobility]: [
            new StoryModel(
                "Guest of a Greater Name",
                "At a young age, you piqued the attentions of one of the great nobles within your land. Their expectations were impossible to meet, but the training they offered you was second to none. While much of the training was typical, some of it was bizarre, to say the least. What strange knowledge did this notable personage seek to impart to you?",
                "Chosen",
                3),
            new StoryModel(
                "Guest of a Rival",
                "You spent your childhood in the care of a political rival. You wanted for nothing, but there was an air of constant threat that made it hard for you to relax and thrive. One night, you wandered the halls and witnessed three warriors speaking in hushed tones about your host, your family’s rival. What did you hear, and what did you do about it?",
                "Conspiracy",
                6),
            new StoryModel(
                "Left to Your Own Devices",
                "Your home was a dull one, where little was expected of you. You could come and go as you saw fit. While others in your family suffered the responsibilities of your caste, you were free to pursue talents that a proper tutor might have deemed unsuitable. What did you get up to when no one was watching?",
                "Adventurous",
                10),
            new StoryModel(
                "Exile to the Estates",
                "You didn’t think it would happen, but your parents decided that enough was enough, and sent you from the estate and holdings you had been raised within. Banished from civilization to miserable estates, you spent many years impoverished, abandoned by your family. What, if anything, did you do to provoke this banishment? Was it just? Did you ever make amends?",
                "Cast Aside",
                14),
            new StoryModel(
                "Scandal",
                "Had they caught you in time you might have escaped with mere banishment. Instead, intervention came too late, and you brought scandal down upon your family, besmirching their good name to all within your sphere. Bribes were paid, and the offense was put behind you, but other nobles know what happened, and often speak ill of you behind your back. What was the scandal?",
                "Mocking Peers",
                17),
            new StoryModel(
                "Blood Feud",
                "The insult is deep. So deep that blood may not settle the debt it has incurred. Though the one who gave offense was banished, theirs was merely the most egregious of the insults and accusations heaped upon you and yours. There is only one solution: a blood feud. It matters not whether it was called by your enemies or your allies. The only things that matter are who your enemies are, and who will survive?",
                "Feud",
                20)
        ],
        [Caste.Priesthood]: [
            new StoryModel(
                "A Time of Feasting and Merriment",
                "Your time as a novice has been quite unremarkable, but for you it’s been a time of exposure to wise sages, great scholars, peace, and prosperity. Simply being in the presence of the gifted has taught you many things. Primary amongst these is that even the gifted have moments of doubt or disgrace. You have even come to the aid of one of your land’s more gifted artists. What aid did they require, and how did you help? Have they repaid the favor?",
                "Patronage",
                3),
            new StoryModel(
                "Beneficial Omens",
                "Your birth was marked by strange omens, and your induction was conducted at a time when the stars were at their peak. Members of your order speak about you in hushed tones, worried about the meaning of so many omens surrounding your entry into their ranks. Occasionally, members of your order will come to you with strange tests and tasks, seeking answers to questions they will not share with you. What was your strangest task? Did you complete it, and were there any notable omens during its completion?",
                "Demanding Peers",
                6),
            new StoryModel(
                "A Place in Need of Guidance",
                "You rode into town with your master and two others, to bring the teachings of your god to the disbelievers. Your reception was met with indifference, but over time you established a small shrine and some of the curious became worshipers. As offerings became more frequent, you drew the attention of a local noble, who threatened your shrine should he not be paid off. Your master refused to pay, and the consequences were dire. What happened to your shrine? What happened to the noble who set into motion its downfall?",
                "Shrine Guardian",
                10),
            new StoryModel(
                "Intolerant Potentates",
                "You didn’t join your faith with battle in mind, but your potentates were wrathful in the extreme and soon all your order wore blades. Your battlefield was in the streets, and many fell to your blade. You tried to be merciful when you could afford it, and deep within the home of one of your faith’s enemies, you found someone who could be brought to your faith. Did you help this person escape, or were you prevented somehow? What became of this potential follower?",
                "Righteous Disobediance",
                14),
            new StoryModel(
                "Ill Omens",
                "Your birth was marked by strange omens, and immediately after your induction into the priesthood, the high priest died in his sleep, without any prior illness. Members of your order mutter that you are the last survivor of the ceremony, and that ill fortune follows in your wake. Occasionally, members of your order will come to you, sending you miles away on seemingly needless, sometimes dangerous errands. What was your most perilous task? Did you complete it, and how many died during its completion?",
                "Cursed",
                17),
            new StoryModel(
                "Forced Penance",
                "Whatever offense was committed, you didn’t do it. Somehow you were blamed, and another bore witness against you, falsely. You tried to explain this when you were accused, but the high priest did not care. Your penance was brief, but unduly harsh. What were you accused of? What was the penance? Do you know who incriminated you? Do you plot revenge?",
                "Criminal Past",
                20)
        ],
        [Caste.Warrior]: [
            new StoryModel(
                "Decisive Victory",
                "The war saw you fight in many battles, gaining glory as you survived. Then the final clash came. You leapt to the front, proud of your place in the vanguard. Horses cried in pain as arrows rained down, and through the blood and smoke of the field you saw your opportunity. The charge was long and the fight short but when you presented your captains with the banner you had claimed, they proclaimed you one of the day’s chosen champions. You were cared for by your lord’s own servants and presented to him at the feast afterward. What valor had you accomplished? What words did he have for you?",
                "Valorous",
                3),
            new StoryModel(
                "Glorious Battle",
                "The battle began with your numbers few. The bulk of your force was a day away and would be tired from the march. You knew yourselves dead, but you had to hold out so that the warriors would stand an even chance against the horde. The fight was brutal. The corpses of horses, soldiers, and other makeshift barricades piled up in front of your line, turning the fight from massed battle to deadly skirmish. Fully half of your number was slain, but you gave better than you got and it was them that routed. When the rest of your army emerged from the forest road, they found boys turned into veterans. Your company was promoted to guard the sunrise flank and those who survived became strong friends. How do you mark your membership in this august company?",
                "Veteran",
                6),
            new StoryModel(
                "Idle Hours Guarding Open Gates",
                "Your gate was the main gate for your settlement. You saw all who would come through. While there was little trouble, you saw many strange and varied travelers. One day you saw three riders come close to the settlement gates. They halted, spat at the ground, and rode back the way they came. Do you remember anything about these strangers? Did you find out why they did not enter?",
                "Cursed",
                10),
            new StoryModel(
                "Idle Hours Guarding Cold Walls",
                "Your home was less-than-inviting to strangers. Most were greeted with spear-points and sling-stones. Soon the word spread and few travelers made the journey. You spent many hours drinking swill and rolling dice for petty coin. Eventually even these pursuits grew stale and you were forced to find your own entertainments. How did you survive the boredom? What pursuits did you engage in?",
                "Hedonist",
                14),
            new StoryModel(
                "Blood-soaked Endevour",
                "While the vanguard gained the glories, you were treading the ground they swept, preventing the enemy from encirclement, stomping the injured into the mud. As the day turned to evening and the light began to shift, the scope of the massacre became clear. Your army had swept through the enemy and carved deep into their encampment. The bodies of servants and children littered the ground. Seeking to profit from the battle, you searched the nearby tents and left, knowing the enemy would never truly recover. What loot did you gather and whose hand did you prize it from?",
                "Greed",
                17),
            new StoryModel(
                "Disastrous Battle",
                "Your armies were evenly matched and the battle a stalemate ‘til the third hour, when the heavens opened with torrential rainfall, centered upon your forces. The ground turned to a thick black swamp and their archers, outside the rain’s course, could fire unmolested. The wind carried their arrows into your ranks and soon there wasn’t a soldier left unmarked. Only a very few limped away from the battle, and none made it home. How did you escape?",
                "Coward",
                20)
        ],
        [Caste.Outlaw]: [
            new StoryModel(
                "Nobility in All But Name",
                "How did you end up like this exactly? Less than a generation ago, your family was wealthy and respected, simply waiting to be awarded the land and title which would have officially elevated them to the aristocracy.And then it all vanished.The money, the acclaim, the servants, the houses, and the bright and glorious future.Now all you have is a gnawing hunger in your belly and a chip on your shoulder. Unsurprisingly, where you live now, your accent, and your mannerisms mark you as a former member of the detested elite.You are alone — you learned your trade the hard way, and only recently have you fallen in with a group you might call friends. Your loyalty to your fellow player characters is absolute and unyielding but, where anyone else is concerned, you might be something of a liability.",
                "Isolated",
                3),
            new StoryModel(
                "With Overflowing Pockets",
                "Too much money and too little sense. That might have been your family’s motto.Money was easy to come by — clever trading, greasing the right palms and, of course, not being averse to stealing and killing when required — and you made the most of it.It made you popular, but it also drew attention.The kind of attention that can help a young thief on his way to fame and glory, and the kind that can result in a young body swinging slowly from a gibbet.It really isn’t easy to tell which is most likely; what is easy to guess is that people are going to be coming to you for loans whenever they need it.A slow week in the thieving world is likely to see a host of foreigners suddenly claiming a deep and abiding friendship with you and your family. You might be able to call in some of these favors in the future — but people are quick to forget.Anyway, now you’re trying to make it on your own.What makes you think you can rely on the family money?",
                "Bedeviled With Requests",
                6),
            new StoryModel(
                "Honor Is Key",
                "Honor and reputation is everything. It always has been. You would never step away from a challenge, and this led you into some unfortunate situations — you’ve got a network of scars all over you and a number of tales which end bloodily as a result.You also have, however, a reputation and a standing amongst thieves which, if not yet entirely secured upon your own merit, has the authenticity of a long- earned family guarantee.That’s the thing with intergenerational thievery; it’s not as though you are likely to suddenly betray the principles you were raised with. You understand the way things are done and why they are done that way. Yes, maybe sometimes they may seem imperfect, but these are traditions for a reason. You know them, you’ve learned them and by Bel’s keen ears, you’ll uphold them. It’s honor, after all.",
                "Known and Respected",
                10),
            new StoryModel(
                "A Family of No Standing",
                "Someone in your family talked. Sometime in the past they offered someone up in exchange for their own life. People remember. It wasn’t you that made that choice — and maybe you never would — but the memory lingers in close - knit communities like those of thieves. You’ve been allowed into the fold but there are still whispers when you pass by. There are still those who openly curse your family’s name. Your mates would never do so — they know you and your loyalty to them — but those voices still whisper.",
                "Mistrusted",
                14),
            new StoryModel(
                "A Victim of Justice",
                "They caught you. They made sure that everyone knew they caught you.Your skin is permanently scarred with the mark of your failure and their triumph. The thick, black weals rising from your flesh bears that most accusatory of epithets: thief. Of course, you are a thief and damn the gods themselves if they think you’ll be ashamed of that fact, but still... it doesn’t help to advertise in this business. And now, no matter how many successful heists you manage to pull off, no matter how wealthy you become, the mark of your failure will never leave you.None of your family bore this mark.You have failed in a way that they did not.Now you must succeed as greatly as you once failed.",
                "Branded",
                17),
            new StoryModel(
                "An Example Must Be Made",
                "The problem with coming from a lineage of thieves is that sometimes you don’t get a say in the crimes you’re held responsible for. And that’s what’s happened to you, pursued by those who accuse you for a crime you did not commit. Or maybe you actually did it. It honestly doesn’t matter.Your name is the same, your reputation identical to those who took part. Vengeance is coming.And it’s going to get you if you aren’t smart.It’s faster and more dangerous than the implacable men and women on your trail.Start running... you’ve got a long way to go yet.",
                "Hunted",
                20)
        ],
        [Caste.Barbaric]: [
            new StoryModel(
                "Born on a Battlefield",
                "You were born on a battlefield, your mother taking part in a fight that involved all the able-bodied men and women of your village. The cause of the strife has been forgotten, but you emerged onto the earth with the clangor of blades and the screams of the dying, baptized into a world of strife and glory.",
                "Born to Battle",
                3),
            new StoryModel(
                "Rite of Passage",
                "Your village demands that all its youths participate in a challenge, to show your worth and to earn a place among your peers. You faced the challenge and excelled beyond any measure. Perhaps you wrestled a bull to a standstill, or you hunted down a great beast with only scavenged weapons. Your kin-folk still tall about your deed. What was it?",
                "Famed Among Peers",
                6),
            new StoryModel(
                "The Broken Branch",
                "When the king called for your village and clan to come to his aid, your elders refused, stating some ancient grudge, some point of honor, or some other reason to refuse such service. This was taken as disloyalty, and since then your village is shunned by others. What was the call, and why was it refused?",
                "Loss of Favor",
                10),
            new StoryModel(
                "Scattered Kin",
                "Something happened that broke your family apart, whether a falling-out between your elders, a fight between kins-folk, or some other strife, but it sent your parents and siblings to the four corners, joining what other clans and villages would have them. What happened? Where did you end up, and do you want to return? Is there vengeance to be had?",
                "Landless",
                14),
            new StoryModel(
                "Bound by Honor",
                "One of your parents, whether father or mother, was exiled due to some point of honor, some matter where they were expected to behave one way but would not do so. You grew up with this hanging over your head. What was this issue, and do you share your parent’s feeling on the matter?",
                "Never Bow Your Head",
                17),
            new StoryModel(
                "Too Small a Home",
                "Inspired by the tales told by the bards and those few wanderers who came through your village, you eventually realized that your home was too quiet, too humdrum, too small to contain your appetite for adventure. You gathered your things and set forth with few farewells. Perhaps you’ll return, some day, but not soon.",
                "Restless Heart",
                20),
        ],
        [Caste.LawSpeaker]: [
            new StoryModel(
                "Touched by the Gods",
                "The words of the gods, baneful or benevolent, came clearly through your forebear’s mouth, administering justice and counsel to highborn and peasant alike, ensuring confidence amongst all who heard it. As a child, you heard praise heaped on this relative, but there was much you saw that made you think it may be mistaken. Was this a divine gift, or merely arrogance mixed with common sense?",
                "Inspired",
                3),
            new StoryModel(
                "The Scale of Justice",
                "As the law-speaker, your mother has always had a reputation for being fair and impartial in the matter of the law, inspiring great trust from across the land. Aggrieved parties came from far and wide to hear the judgment of your mother, and all left content. You have had much to live up to, and the pressure for such counsel fell upon you at an early age. What happened? Why were you called upon to interpret the law?",
                "Retribution",
                6),
            new StoryModel(
                "An Unworthy Noble",
                "The leader of your community was generally fair and well liked, but in one particular case showed disfavor to one of his subjects. This subject was in the right, but was not popular, showing minor disrespect for traditions. In response, the leader’s treatment was unfair and ultimately defied the law. Your family was brought in to adjudicate. How was this resolved?",
                "Trial and Betrayal",
                10),
            new StoryModel(
                "No One Above the Law",
                "A famed noble, wealthy above all others, brought prosperity to your community, whether through trade, raiding, or gold inherited from forebears. The favored son of this noble performed a grave misdeed upon a free commoner, one who was of no worth. Voices within the community cry for justice, while others claim that the accusation is false. Who is guilty in this matter, and how did your family rule?",
                "Sacrifice",
                14),
            new StoryModel(
                "Harsh Judgement",
                "Though the decision was a fair one, some single judgment your father made caused hardship to your community, and from this they have not recovered. He was warned beforehand, and wrestled with the consequences, but in the end, he held the law above all else, and innocents suffered. What was the decision? Was he right to make it?",
                "No Mercy",
                17),
            new StoryModel(
                "Abuse of Power",
                "It is rare that a law-speaker’s word be questioned, but this was such a case. After a decision was made, another uninvolved party spoke up, accusing your mother of ill-faith, of using her role as law-speaker for personal gain and acting with bias. She denied this breach of her oath, but something about the accusation stirred some memory that had not sat right. What was it? Did you say anything? What was the outcome?",
                "A Divided Land",
                20),
        ],
        [Caste.Renegade]: [
            new StoryModel(
                "Worshipper of Another God",
                "Whether you are a Cimmerian who embraced the worship of Mitra, a Nordheimer who believes in a god other than Ymir, or a Hyperborean who worships one of the strange old gods of the prior inhabitants of your land, your religious believes made you an outsider to your people. Why did you choose this path? What has it cost you?",
                "Heretical Beliefs",
                3),
            new StoryModel(
                "Blood Feud",
                "One of your grandparents was driven from his home, an unyielding part of a blood-feud between kin that could not be resolved. Perhaps blood was shed, or harsh words were said that could never be undone. Whichever the case, your grandparent was unwelcome in his place of birth, and sought a new life elsewhere. What drove him from his home? Who was in the wrong? Does it matter to you?",
                "Kin-Strife",
                6),
            new StoryModel(
                "Unjustly Accused",
                "Long ago, your mother was falsely accused of a crime by a member of a powerful and influential family, and for that, your family and kin have always been looked upon with disfavor and resentment, begrudgingly acknowledged but never loved. What was the crime? Was she guilty? Why would she stay?",
                "Nemesis",
                10),
            new StoryModel(
                "Nothing to Return To",
                "Either your grandparents or your parents claim that there is nothing left of the place of their birth, and have never spoken of it, including its exact location. You have gleaned that there was bad blood, some sort of terrible act committed, but you received no answer when you asked about it. Now that you are older and capable of following your own path, does this mystery appeal to you?",
                "Alone in the World",
                14),
            new StoryModel(
                "The Path of Vengeance",
                "Some great wrong was done your family, either singled out directly or as part of a larger group, and they left their community in protest, living in exile and brooding over the past. They spoke of a time of retribution, and hinted that you would be their instrument. What happened, and how did they prepare you as their act of vengeance? Will you do what is asked of you?",
                "Retribution",
                17),
            new StoryModel(
                "No Home but the Road",
                "Nothing drove your family out of their home, but nothing held them there particularly. For one reason or another, you have always known movement, your family relocating after a few years, finding a new home in new communities or in the wild, then starting over periodically. Is it wanderlust that drove this? What were they seeking, or trying to avoid?",
                "Wanderlust",
                20),
        ],
        [Caste.Skald]: [
            new StoryModel(
                "The Ear of the Chieftain",
                "You have earned the favor of your community’s leader, and are always welcome in the hall or court, where you have become privy to many events and matters far above your station. You heard something that you should not have, and it might put your life in danger. Leaving your comfortable home seemed the only course of action. What did you hear?",
                "Privileged",
                3),
            new StoryModel(
                "Words on the Wind",
                "You could have remained in court for as long as you’d like, but the ballads grew ever more stale and you grew tired of reciting the same sagas in the same fashion, to an audience that lacked imagination. Starved for newness, you struck out and put your home at your back, seeking new inspiration in the world at large.",
                "Yearning Mind",
                6),
            new StoryModel(
                "Always a Guest, Never at Home",
                "Whether wanderlust or a simple restlessness of spirit, you have never felt at home. Your grandparents and your parents before you were the same, possessing a wandering spirit and an insatiable need to see everything, to experience all that you can. Where would you feel at home? Does such a place exist?",
                "Restless Spirit",
                10),
            new StoryModel(
                "A Poor Host",
                "Though it is always the custom to show courtesy to a bard, both as an envoy and an entertainer, you somehow met with rudeness when you presented yourself at the door of the leader of a particular community. Hospitality was begrudgingly offered, and you were shown little deference. How did you react, and why was this the case?",
                "Rough Custom",
                14),
            new StoryModel(
                "Sweet Words to Bitter Ears",
                "Despite your skill with words and song, you somehow managed to earn the ire of a host, and found yourself unwelcome. Perhaps some idle jest or story struck closer to the mark than you intended, or perhaps you were simply unaware of a past grievance. You were shown rough courtesy, then none at all. Who was this noble and what did you say?",
                "Truth Be Told",
                17),
            new StoryModel(
                "A Tale Ill-told",
                "There was something to a particular saga that enraged your host, and he all but attacked you outright when you told it. Only the intervention of others prevented bloodshed, and you were told it would be best you left immediately. You are not certain, but you may even be followed by his henchmen. What was the tale and why did it strike so dearly?",
                "Harbinger",
                20),
        ],
        [Caste.BornSoldier]: [
            new StoryModel(
                "Count the Dead",
                "The dead were heaped upon the horizon like a hill of flesh. You were but a child as you watched the mercenaries strip them of valuables, pry out gold teeth from still living men, and joke about the brutality of war. Death walks beside you, a constant companion. The world is an anvil, and character is either forged or broken on its iron. Yours was never broken.",
                "Witness to Brutality",
                3),
            new StoryModel(
                "The Early Deaths",
                "Your father, your mother, or both were killed in battle. Perhaps you watched them die. Perhaps you merely saw their corpses borne back to the camp on their shields. Either way, you remember well the army which slew them. In time, you will take tenfold violence upon them in recompense.",
                "Vengeful",
                6),
            new StoryModel(
                "The Promotion of the Fool",
                "The ranks of an army have fools and men of honor. Often, it is the fool who is promoted or, more likely, given command by circumstances of noble birth. Few such men or women are fit to lead, yet they are an ever-present threat on every field of battle. The enemy is oft not half as dangerous as the idiot who leads you. In knowing this, you’ve become a realist. That alone saved your life on more than one occasion.",
                "Realist",
                10),
            new StoryModel(
                "We Few...",
                "Women and men become dog-brothers and sword-sisters when blood is spilled together. This bond becomes particularly strong with those who war for a living. You cannot count the times another soldier saved your life, or you theirs. These are bonds and, if honored, reward the soul who keeps them... in this world or the next.",
                "Bond",
                14),
            new StoryModel(
                "The Killing Blow",
                "You may have hesitated that first time, but now it is second nature to you. An enemy which gives no quarter shall receive none either. A wounded enemy is nothing but a burden, lest they have intelligence. Thus, even a reparable wound is not treated in the field. Men are killed where they lie, their brains pierced by the merciful, their agonies drawn out by the cruel. Kill them and be done with it, you say. Sparing an enemy’s life puts no coins in your pouch.",
                "No Mercy",
                17),
            new StoryModel(
                "In These Bodies, I Hide",
                "Your company was decimated. You alone survived, but you had to do so through the most gruesome of means. You pretended to be dead, laying among your brothers and sisters while their bodies were rudely stripped of any valuables. The enemy stayed that night in your camp, and you spent more than a day laying in the festering pile of corpses as the flies gathered and the carrion birds feasted. When the enemy left, the birds that fed on your friends fed you. You walked out of that hellish site, the last and only survivor.",
                "Survival",
                20),
        ],
        [Caste.ChildOfCampFollowers]: [
            new StoryModel(
                "The Open Road",
                "The road is home. You do not remember ever having a permanent residence, but simply the next camp. The revelry of the drunken mercenaries and harlots sung you to sleep. A boot in the ribs knocked you awake. When lucky, you rode on a wagon. When not, you trod along with the others. Yet, for all that, you have seen much of the world and would not trade it for a stable life. You have seen the Scarlet Citadel jutting over the moody Khorshemish nightscape, and slept in the deserts of the zuagir beneath the canopy of fiery jeweled stars.",
                "Well-traveled",
                3),
            new StoryModel(
                "Children Are Seen and Not Heard",
                "Camp followers and mercenaries alike find children get in the way. If you were quiet, you learned something. In fact, the company commander once caught you listening in on his plans for the morning’s battle. At first, his lieutenants raised their hand to you, but he bade them to stay punishment. Instead, the captain had you infiltrate the camp followers of the rival mercenary company. No one noticed you, but you got wind of the enemy’s plans and, on the morning of the battle, they were slaughtered. Keeping your mouth shut and eyes open has its advantages.",
                "Spy",
                6),
            new StoryModel(
                "Deprivations of the Poor",
                "By pulling up your tunic, you could easily count your ribs after those long months with hardly a bite to eat. The mercenaries had not warred in some while, and the camp followers subsisted on meager food stores, then the horses. Some died, but not you. You stole a scrap of bread here, a rotten apple there, and made friends with a mercenary, tending his armor for him, in return for the remnant meat left behind on the hambones they cooked in the great fires. This deprivation happened more than once, but it did not wreck you. Instead, it made you stronger.",
                "Survivor",
                10),
            new StoryModel(
                "The Law of Possession",
                "If they cannot prove you stole it, then it is yours. You learned that the hard way when another child in the camp took your luck-stone, a rude marble you found on a dead gambler who was knifed in the night for cheating. You got it back. Then, you realized that there were things others had which you, too, could take. The law of the camps says whoever holds it owns it… more or less. The mercenaries who steal from each other get hung. In the camps, punishment for theft isn’t nearly as merciful, but it’s much harder to get caught. Being generous never did anyone any good, did it?",
                "Selfish",
                14),
            new StoryModel(
                "Harsh Punishment",
                "“This is somewhere between civilization and barbarism, child,” your master said as he whipped you. It was for your own good. If you cannot learn the trade, you shouldn’t be apprenticed. Kind words do not hold in the mind as long as the scars on the back from the lash. You’ve grown to the level of master, and understand discipline is the foundation on which craft is built.",
                "Disciplined",
                17),
            new StoryModel(
                "The Cat",
                "A white cat, hidden in the pouch of a dead man along the road. The mercenary that found it cast it aside. A dog can hunt, suss out game, but a cat has no practical purpose. The others trudged by it as it eyed them pleadingly from the mud. You picked it up, rescued it. You cannot say why. You fed the cat from your meager food and, one night, when a scout from an enemy army slipped into the ranks of the camp followers, he started slitting throats and looting. Your throat would have been next, if it hadn’t been for your cat who yelped, scratched the man in the eye, and woke you. Your dagger found his heart as if guided by unseen hands. Sometimes, it pays to be merciful.",
                "Merciful",
                20),
        ],

        [Caste.Corsair]: [
            new StoryModel(
                "Child of the Chieftain",
                "Your mother was chieftain of your village, and you were always expected to take a role amidst her corsairs. You were trained in the fighting arts, and you took your place in the corsair fleet as soon as you were able, rising within its ranks as befits your lineage. But something happened, and now  you cannot count on your parent’s name.What happened? Why are you not the captain of your own corsair vessel?",
                "Humbled Pride",
                3),
            new StoryModel(
                "Famous Ancestor",
                "Back in your family history was a heroic or particularly fearsome corsair, of whom stories are still told. Perhaps you take after him in some fashion, or perhaps you are nothing like him and have spent your life trying to distinguish yourself from his legendary status. Who was this figure, and what was he known for?",
                "Shadow of the Past",
                6),
            new StoryModel(
                "From Poisoned Waters",
                "You were found in a basket, floating down the poisonous Zarkheba River in Kush, which is feared by most. Though this was an ill omen to many, the corsair captain took you aboard and adopted you. You grew up on a corsair galley, and your first steps were upon its decks. The mystery of your birth and abandonment haunt you, though. Have you taken any steps to learn who you are, and where you came from?",
                "Mysterious Origin",
                10),
            new StoryModel(
                "Left to Vengeance",
                "Your village was destroyed by corsairs when you were but a child, and your people enslaved to the last man, woman, and child… but for you. When you were an infant your mother hid you beneath the floor-slats of your home as the corsairs struck, and your cries were unheard amidst the screams of the dying. Relatives found you and nurtured you, and when you were old enough to be told, you learned the truth of your birth. What decision did you make?",
                "Calculating",
                14),
            new StoryModel(
                "Steps of the Elder",
                "One of your older siblings — or a particularly beloved aunt or uncle — was a corsair for your chieftain. Her name was spoken of with respect amidst the other corsairs, and many felt that this relative would eventually take control of the corsairs and become the chief. This was not to pass, and one day you awoke to learn she had been slain, her head set upon a spear outside the chieftain’s hut. From that day on, your family’s name was besmirched, and you found no place in the galleys of your village. What did you do then?",
                "Suffer No Sight",
                17),
            new StoryModel(
                "Storm-wracked",
                "The folk of your village still speak of the Great Storm, the one that destroyed your village, shattering huts and walls, waves rushing over the coast and sweeping away hundreds of your kinsfolk and neighbors. That storm left you an orphan. You had little left but the sea, and with the few galleys remaining, you and the survivors set to sea as raiders, preying upon others more fortunate than you. Now you have set aside that life, but for what?",
                "Catastrophe",
                20),
        ],
        [Caste.Fisher]: [
            new StoryModel(
                "Bitter Rivalry",
                "Your family’s fishing business was among the most prosperous in the village, town, or city you dwelled in, each catch yielding more and better than the prior ones. Your family grew wealthy and you grew up thinking that this bounty would continue forever. Then one day, your family’s rivals struck, chopping nets and sails and setting fire to your fishing boats. Your family was ruined, and you lost everything. You now fish for the benefit of some other, and you think back of those bygone days of plenitude. What will you do about it, should you learn who was responsible?",
                "Betrayed",
                3),
            new StoryModel(
                "Empty Nets",
                "Something happened that caused your source of income to become scarce. It does not matter the reason — whether some strange and terrible tide killed the fish you harvested, or they were fished to extinction — the result is that your once-laden nets drew back empty time and again, and you could no longer ply your trade. Now you have left your home, seeking your fortune on other waters. Was there something unnatural about the scarcity? What was it? More importantly, what will you do now?",
                "Hard Times",
                6),
            new StoryModel(
                "Lost at Sea",
                "You grew up fishing alongside your family-members, continuing a generations-long tradition. One day, though, your beloved father’s boat did not return. You spent long days waiting at the shore, looking up and down the coastline, and venturing out into the waters yourself in search of him, but found nothing. What happened to him? Did you ever find out? What did you do next?",
                "Missing Kin",
                10),
            new StoryModel(
                "Returned to Ruin",
                "It was a fishing voyage like any other, miles and miles from the coast because that is where the best catch could be found. Your vessel full of the sea’s bounty, you returned homeward. The first sign of trouble was the long trail of smoke wafting from the location of your village, and as you drew near you saw that the beautiful and familiar village of your birth was but fire-blacked ruin. There were far too few bodies, however, and you realized that most had been taken, likely by a slave ship. Who took them? What do you plan to do about it?",
                "Without a Home",
                14),
            new StoryModel(
                "Sailing to the Horizon",
                "There was nothing especially tragic about your childhood and youth, and you did not suffer any calamity, no major and dramatic incident that steeled you for the future. And such was the problem. Instead, after too many long hours spent dragging fish from the sea, splicing ropes, repairing nets, and returning home after long hours stinking of fish, you decided you’d had enough. You stole a small boat and set off, as far from home as you could go, and sold it for hard coin. Will you return to the sea, and if so, under what terms?",
                "Seeker",
                17),
            new StoryModel(
                "Too Big a Fish",
                "Though you returned to your village barely alive, washed ashore like a half-drowned rat, no one in your village believed you when you told them what had happened. You and your family were fishing when your net caught something… something big. You pulled at it, and it pulled back. As you sought to cut yourselves free, it rose to the surface, dwarfing your boat with its vast and horrible bulk. You were lucky to be thrown free, the screech of the hull as it bowed and broke filling your ears. What was that terror from the deep? What would you do should you face it again?",
                "Dark Waters",
                20),
        ],
        [Caste.Marine]: [
            new StoryModel(
                "Betrayed by Your Captain",
                "You once served your ruler with zeal, joining the ranks of your homeland’s navy when you were of age. Your training, though filled with strict discipline and hard drilling, transformed you into a marine — a seaborne fighter, the deck your battlefield. Your captain, however, was not so loyal. She sold you out to enemies of your country, whether another navy, privateers, or pirates! Without the chance to fight, your ship surrendered, and you and your fellow marines were captured. Why did your captain sell you out? How did you escape? What do you plan next?",
                "Distrust",
                3),
            new StoryModel(
                "Keelhauled",
                "Your offense, however severe, did not merit the punishment you received: keelhauling. Your hands were tied to one line, your feet to another, and you were dragged beneath your ship’s keel, suffering terribly as barnacles and rough wood scraped at your flesh, your lungs filled with water, and your limbs were wrenched with terrible force. You recovered, however, the fire of hate burning within your breast as your savaged flesh mended. Driven from the navy, now you are free to do as you will. Are you relieved enough to be alive and free, or does the thought of vengeance haunt your every thought?",
                "Suffered an Ordeal",
                6),
            new StoryModel(
                "Mutineer",
                "You entered the navy with the best of intentions, but it became clear as you sailed on that your captain was not worthy of the title. Overly harsh discipline, outbursts of rage, inexplicable orders, brutal punishment, and forced hardship visited upon the entire crew caused morale to plummet. The officers and crew conspired against the captain. Now you find yourself without a ship. Did you support the captain, or stand with the crew? What part did you play? Was the mutiny successful, or was it quashed by the loyalists?",
                "Outlaw of the Sea",
                10),
            new StoryModel(
                "No Honest Path",
                "Your stint in your homeland’s navy was spent in loyal service, and you fought valiantly alongside your captain and crew in the defense of your country. But something put an end to that — whether your own actions caused you to lose your rank or you were captured and set free in a foreign land — you are unable to return to the navy. Your training was that of a marine. Life as a merchant guard did not appeal to you, but the life of an outlaw of the sea holds plenty of promise.",
                "Nothing Left to Lose",
                14),
            new StoryModel(
                "The Short Walk or the Pirate Road",
                "Your career as a marine consisted of many years of uneventful sailing and military drilling, practicing armed combat at sea to no avail.Your first encounter with pirates marked the end of your naval service, when your ship was overpowered by a fleet of the blackguards. They captured you and your fellow marines, giving you a choice to join or die. Then they executed your captain and the officers as examples. Some of your companions refused to join the pirate ranks, but you chose wisely. Now there is no turning back.",
                "Forced into Piracy",
                17),
            new StoryModel(
                "Survivor",
                "During a great sea-battle, your ship was rammed by another, and its hull was breached. As your vessel took on water, you and your fellow marines were forced into the sea, where you were at the mercy of the enemy. They fired arrows aplenty at you, eventually giving up and leaving you to the sharks while the ships of your own nation retreated, leaving you for dead. You were one of the few who survived, clinging to a section of your vessel’s hull. A pirate vessel sighted you, and it was amongst these rogues that you found mercy. Now, at night, memories of that horrific battle play over and again in your memory.",
                "Left to Die",
                20),
        ],
        [Caste.Sailor]: [
            new StoryModel(
                "Crimson Sails",
                "Your stint as a sailor was relatively uneventful, long days of shipboard life immersed in the day-to-day tasks of keeping a ship functioning. You saw much of the coastline of your own land and others, and you imagined that you’d do this until you were no longer able. Then one day, the crimson sails of a ship of the Red Brotherhood appeared off your vessel’s bow, and you fled. The faster ship caught yours, and your captain and crew surrendered your cargo. The pirates demanded your ship, and you saw that your only chance for survival was to throw in with their lot. Now you serve on the same ship, but under a pirate captain and flag. Will you remain? Do you consider yourself a pirate now, or will you escape when given the chance?",
                "Caught Up into Piracy",
                3),
            new StoryModel(
                "Dishonest Company",
                "Enlisting to serve on a merchant vessel, you quickly grew used to the routine and the occasional danger. You trusted your fellow sailors and you did what you were told. The pay was adequate, and you got to see the world. Unbeknownst to you, though, enough of your fellow crewmembers were unsatisfied with their lot, and on one voyage they chose to seize the ship, killing the captain and claiming the goods onboard as their own. Now crewing a stolen vessel full of trade goods, you went from being an honest sailor to a pirate. Is this the life you want? What will you do?",
                "Framed",
                6),
            new StoryModel(
                "Dragooned",
                "Frequently, sailors such as yourself put to shore between voyages, residing in cheap dockside taverns and inns, or with kin when you are in a home port. This downtime is generally quite dull, marked by drunkenness and labor, getting the vessel shipshape for the next journey. You either went to sleep in the wrong place, or you were waylaid while walking through town, and the next thing you knew, you were on a pirate ship at sea, dragooned into service. Your new captain told you to serve or to get swimming. You had little doubt that the latter would be difficult with a slit throat.",
                "Unwilling",
                10),
            new StoryModel(
                "Kidnapped!",
                "Many children grow up hearing stories of piracy on the Western Ocean, and your childhood was spent listening to such tales, told by relatives who had set to sea. The names of famous pirates and their dastardly acts thrilled you, and though you would likely serve as a common sailor, you craved a life of adventure and even infamy. Then one day, on land, you encountered a landing craft full of these very sorts. They captured you, and eventually made you one of their own.",
                "A Pirate's Life",
                14),
            new StoryModel(
                "Swept Overboard",
                "A common sailor, your life was turned upside-down when you were swept overboard during a particularly fierce storm. You do not know if your ship and its crew perished, and you spent long days floating, clinging to a barrel that went overboard with you. Spotting a small, barren island, you made your way there and lasted for a few days, near starvation, before discovering that it was a pirate refuge. Faced with remaining on the island to perish or join the pirates’ ranks, you chose the latter, and have not looked back. However, your thoughts often drift back to that time.",
                "Marooned",
                17),
            new StoryModel(
                "Turned to Piracy",
                "Rare is it that someone sets out to become a pirate, and your case was no exception. Your family were sailors, and your early life was spent sailing and serving on merchant or fishing vessels. Something happened, however, that set you on the path of the reaver, a life of outlawry at sea. Was it misfortune, some unplanned event that forced you to piracy, or did you make a choice that forced your hand?",
                "The Sea is My Home",
                20),
        ],
        [Caste.Trader]: [
            new StoryModel(
                "Captured and Set Adrift",
                "The greatest threat to trade on the open sea is, of course, piracy, an eventuality that most must contend with. And like all eventualities, it was your turn, as you and your crew faced a black-sailed marauder across the seas. You fled, and it gave chase, pulling upside you and using grapnels to fix you in place. Your captain — if it was not you — did not want to give up the fully laden hold of trade goods, and ordered the crew to fight back. Though the pirates were fewer in number, you were no match for their ferocity, and soon they had seized control your ship. Did you fight until you were downed, or surrender early? Did the pirates take your ship and maroon you, or did they leave your ship and merely abscond with the cargo? Were you taken prisoner, ransomed later, or did you join their own ranks and become a pirate?",
                "Hard Choice",
                3),
            new StoryModel(
                "Crew Became Cargo",
                "Though the slave trade is not the most noble of professions, it is nonetheless tolerated in most kingdoms, and is treated like any other business. Some ships and captains define themselves as slave traders, while yours was one of those who merely transports slave traders and their wares to and fro, without taking on any of the responsibility of capturing slaves, or the soulless task of selling them on the market. A new contract with a slave trader your captain was unfamiliar with took you to a meeting with a much larger slave vessel, and fate turned against you when that ship seized yours, crew and all slaves onboard, to fill their own slave hold. How did you escape? What happened to your own ship?",
                "Betrayed",
                6),
            new StoryModel(
                "Driven into Destitution",
                "Life was good as a merchant trader. You and your crew lived comfortably, shares between captain and crew were distributed equitably, and your captain (if it was not you) steered you clear of most pirates and rough weather. It was, sadly, your peers that presented the greatest danger — rival merchant houses allied against yours — who used political leverage to enact usurious taxes, undercutting prices, and even bullying to drive your ship’s owner out of business, unable to purchase new trade goods or even offload them at a profit. One day, the tax collectors came to seize your boat. Some of her crew gave up, while others attempted to take it and sail away, presumably to embrace a life of piracy. What did you do?",
                "Beggared",
                10),
            new StoryModel(
                "It Walked the Decks",
                "This trade trip was like any other, transporting a variety of trade goods — copra, mirrors, silks, oil, weapons, slaves, and some other bulk cargo — on a known route along the Western coast to a known harbor, to deal with known merchants and vendors. Something on this voyage, however, was different, with strange and horrific occurrences each night at sea. Sailors went missing, presumably overboard; slaves were murdered bloodily in their chains without witnesses; and the weather and very creatures of sky and sea behaved unnaturally. Then one night, a suspicious captain and crew set a trap for the thing that haunted the ship’s deck, and the events after are a bloody, cacophonous nightmare. What was it that caused such horror? What happened next? How did you survive? Did it?",
                "Haunted",
                14),
            new StoryModel(
                "Mutineered!",
                "Trade by sea is generally a lucrative career for all concerned, but on your own vessel, the division of wealth between captain and crew was perhaps not all that it could be. Clandestine meetings in the dead of night and whispers between resentful sailors were all it took to turn a trading ship into a boiling kettle. When it came to the confrontation between the “miserly” captain and crew, which side were you on? Did it come to bloodshed, or more traditionally, with the losing side set adrift in a rowboat? Were you on that boat? What happened to the cargo?",
                "Past Betrayal",
                17),
            new StoryModel(
                "Restless Natives",
                "You were either captain or a crewmember of a trade ship bold enough to sail down past Kush to the less civilized of the Black Kingdoms, or up to the north and trade amongst the Picts. Such daring served you and your company well enough, for a time. Eventually, one of these trade voyages went poorly and your ship was seized, her crew scattered and either killed, captured as slaves, or escaped to make the long and dangerous route home. You were lucky enough to survive, but how did you make it to safety? Are any of your fellow crewmembers alive?",
                "Savage Pursuit",
                20),
        ],
        [Caste.HorseNomad]: [
            new StoryModel(
                "Crossed a Wasteland",
                "Across the desert on an errand far and away from your people’s camp, you and your kin were ambushed by raiders who feathered you with arrows from afar, then rode you down with sabers. You were the only survivor — even your mount died beneath you. The raiders left you for dead. Miles from any allies, you had to strike back on your own, spending five days crossing the steppes, braving heat, exhaustion, exposure, and worse. You made it home, and word of your accomplishment spread to the other horse nomads.",
                "Indefatigable",
                3),
            new StoryModel(
                "Death on Four Legs",
                "For horse nomads, locked into a mutually beneficial cycle of existence with your mounts, the worst thing that can happen is to permanently lose your horses, and your camp suffered exactly such a loss. Disease struck. Whether spread from a newly captured horse, or contracted from contaminated water, the result was the same: the horses of your camp all sickened and died, leaving little of use but their hides. Without horses, your camp dissolved, its members fading into nearby villages or joining other tribes.",
                "Hardened",
                6),
            new StoryModel(
                "Sirocco",
                "No one saw it coming. When you camped, a mysterious sand storm — a sirocco — blew in with apocalyptic force and tore your village apart. How long it lasted, you will never know, but long hours of howling winds, shifting sands, and grit enough to scrape skin from flesh devastated your village. As it roared in elemental fury, you dug in and waited it out, hearing the distant cries of your people. When it was over, tents were scattered to the four winds, horses and people were dead, and there was little to do but start over.",
                "Survivor",
                10),
            new StoryModel(
                "Hunted by the Agha",
                "To make a show of his authority, the regional governor of one of Turan’s territories — the agha — embarked on a campaign to eradicate the horse nomads adjacent to his domain. Whether Zuagir, kozak, or others, yours was one of the tribes selected for extermination. To this end, he directed thousands of Turanian soldiers and horsemen against your people. You barely survived, but it took long years of desperate living and whittled your tribe to only a few. Your hatred for the agha burns like the merciless desert sun.",
                "Hunted",
                14),
            new StoryModel(
                "Tempted by Civilization",
                "Though birthed and raised among the horse nomads, you were no stranger to civilization, though you knew it only from afar. That changed when you and a handful of nomads from your camp visited a nearby trade city at the edge of the steppes. Such sights, smells, sounds, and experiences you had! In those brief days, you discovered you had a taste for the exotic sensations that civilized life brought you. With the meager amount of coin you possessed, you indulged your every whim… losing yourself in delights unknown to the steppes. Your return to the camp showed your life in an unfavorable light, and eventually you chose to seek adventure and experience rather than merely survive.",
                "Civilized Tastes",
                17),
            new StoryModel(
                "Red Moon",
                "Some call it a hunter’s moon and claim it is an omen for good fortune and hunting, but for your camp, it was a herald of the end. The night the red moon rose and cast a crimson pall across the steppes, something strange and terrible happened. Sister turned against brother, mother against child, children against parents, and animals went mad with fear; in that grisly night, the rocky sands ran red with blood. The wan sunlight broke across the steppes to a scene of horror, an entire village slain by its own people, with only a few infants remaining, crying as flies buzzed amidst the dead. You were one of the few survivors, and grew up amidst another nomad tribe that found you and took you in.",
                "Haunted",
                20)
        ],
        [Caste.HunterGatherer]: [
            new StoryModel(
                "Driven Across the Steppes",
                "Whether by nomads or the merciless waves of soldiers bent on ridding the steppes of your people, your tribe was forced to break camp almost daily, barely enough time to allow for foraging or hunting. Your food and water reserves were depleted to their dregs. Exhausted and demoralized, your camp turned against those who harried you, and were slaughtered almost to a man. Except for you, and now you smolder with resentment, mixed with guilt that you were spared.",
                "Cautious",
                3),
            new StoryModel(
                "Famine",
                "Though you ranged far and wide when hunting and searching for edible plants, your territory became increasingly and inexplicably desolate, wildlife growing scarce, plants desiccating and dying, and water holes drying up. Every day became desperate with the effort to find enough food and water to sustain yourselves, and many of your people did not survive. Rival camps became vicious, and skirmishes over the most meager of resources cost your people dearly. Eventually, you outlasted the famine, but your camp’s morale was broken.",
                "Resolute",
                6),
            new StoryModel(
                "Hunters Became Hunted",
                "To this day, you are not sure what it was exactly — a clawed creature that sometimes walked on two legs, sometimes on four — but it was large and hungry, savage, and hunted by night. It struck repeatedly, killing your animals and even braving the camp itself, silently slaying your kinsfolk as they slept, despite precautions. When your people fought back, they died, and it escaped in the tumult and the darkness. It followed you across the steppes, until one night it suddenly stopped. What was it? What was it looking for?",
                "Suspicious",
                10),
            new StoryModel(
                "The Lurker in the Hills",
                "When you were young, your people camped in the rocky foothills beyond your normal territory. One day, you wandered wide to forage for plants and water, and discovered a deep cavern, concealed within the terrain. You crept into it, realizing that it was not entirely natural — it had been shaped by hands other than human. Most disturbing were the clawed footprints upon the sandy floor. You fled back to your camp, keeping your discovery to yourself, and that night awoke to screams. You were told that several people of the village were missing, and the clawed footprints that came out of the hills and into your camp could not be mistaken. A handful of warriors went to bring your stolen kin back: none returned. Rather than waste more lives, your people left, never to venture into the foothills again.",
                "Remorseful",
                14),
            new StoryModel(
                "Searching the Wasteland",
                "Your camp’s hetman was driven by something, some inexplicable desire to keep you moving, to keep seeking for a better location, somewhere safer, or where game and plants were more plentiful. The fatigue from this restless wandering, this seeking without an apparent destination, drove the adults and hunters to a reckoning, the hetman’s loyalists fighting bloodily with those who desired a respite. In the end, a truce was agreed upon, and the movement paused, but it was clear that nothing would be the same again.",
                "Wanderlust",
                17),
            new StoryModel(
                "Sundered Peace",
                "Though nomadic, your camp was nonetheless willing to stay for longer periods, should the resources in the area permit. You thought it the case when you discovered an oasis in the middle of the wasteland, a supply of fresh water, and by extension, a beacon for wildlife. The days of plenitude were dashed when another tribe arrived at the oasis and sought to claim it for their own. Your hetman and elders were willing to share the camp with them, but they would not have it. One night, knives were drawn and blood was let, and the leaders of your village were slain. In the morning, the oasis was theirs, your people denied access, and you were forced away, to wander and eventually to dissolve into other camps and desert towns.",
                "Betrayed",
                20)
        ],
        [Caste.Clanfolk]: [
            new StoryModel(
                "Betrayed by the King",
                "It was a time of unrest in your homeland, and the bickering clan chiefs continued to cause the regional government trouble. A truce was offered — a time to negotiate a settlement for peace — but the clan chiefs were all murdered as a statement to the clans that their rebellion would not be tolerated. Since then, the unrest has grown, and the clans plot their revenge.",
                "Suspicious",
                3),
            new StoryModel(
                "Family Scandal",
                "Whether a birth out of wedlock with an embarrassing lineage, a duel at a time of peace, or some other controversial action, your family’s status within the clan was marked with scandal, and all your family bears that stigma, deservedly or otherwise.",
                "Tarnished Reputation",
                6),
            new StoryModel(
                "Feud Within the Clan",
                "It could have been a sibling, a parent, or another close to you, but someone within your immediate family drew the enmity of another within the clan. Whatever the issue, it would not be dropped, and could not be easily resolved. This has made all clan gatherings tense, all other families waiting to see if violence erupts between your family and the other.",
                "Troublesome",
                10),
            new StoryModel(
                "Fragile Alliance",
                "Not too long ago the clans were at war with one another, petty grievances and past slights overruling common sense and any sense of unity. One of your parents ended that, convincing all the clan chiefs to put aside their differences and confront their common foe, whether the Picts, Cimmerians, or even from one of the civilized countries of the dreaming west. This alliance, though, is perilous, and your every action back in your homeland was made with a fear that it might cause an upset to plunge your entire region into conflict again.",
                "Diplomatic",
                14),
            new StoryModel(
                "Uprising",
                "In recent years, the clans came together to resist the influx of those who would seek to colonize and govern, parceling away your clan’s land to regional barons and dukes, enforcing their own laws upon your people. The uprising was brutal, and much blood was shed. Did your clan join with the rebellion, or did they choose to remain neutral? Why?",
                "Quick-tempered",
                17),
            new StoryModel(
                "War of the Clans",
                "Some galvanizing incident caused the clans of your homeland to wage war against one another, grouping according to common goals but forsaking sometimes even the ties of blood and family. What was this event that brought about such strife? What was your part in it, if any?",
                "Fractious Past",
                20)
        ],
        [Caste.Pioneer]: [
            new StoryModel(
                "A Baron's Gift",
                "Your family — either parents or grandparents — were given the land you settled upon by a baron back in your original homeland to the south, a gift for some favor or service. Arriving, your family discovered that the land itself had already been settled, and the baron’s forces rudely cleared it for your arrival. The other folk nearby remember how that land was taken from one of their own, and they are resentful.",
                "Unwelcome",
                3),
            new StoryModel(
                "Disease and Despair",
                "The settlement you and your family dwelt in was prosperous and relatively safe, and would have continued indefinitely had disease not struck: some ghastly illness born out of the dark, wet forests surrounding you. In short order, all of those you knew were infected, dying so fast that burning was the only way to deal with their corpses. Eventually, only you were left, spared the ravages of the disease.",
                "Haunted by Loss",
                6),
            new StoryModel(
                "Homestead Massacre",
                "You thought that the farm you had built was safe, but it only existed at the sufferance of others. When you returned from gathering supplies in one of the nearby trading posts, you saw an ominous pillar of smoke marking the location of your homestead. You raced home, and discovered tragedy, your family murdered by savages, your home set afire. Was everyone killed? Do you know who performed this atrocity?",
                "Orphaned",
                10),
            new StoryModel(
                "Nothing Behind You",
                "Growing up in the dreaming west, you and your family endured poverty and hardship. You left the pitiless cities and sought a better place to dwell, where hard work would be rewarded in kind. Though your childhood on the frontier has been rough and at times even more perilous than city life, you nonetheless thrive in a way you could not have done prior.",
                "Desperate",
                14),
            new StoryModel(
                "Settlement in the Wind",
                "You and your parents built a home in the wilderness, carving it out of the trees, an oasis in the middle of a forest dark and primeval. Life was a struggle, every day fraught with peril from the Picts, from bandits, as well as wild animals. In the end, though, your efforts were not enough. The harder you pushed into the wilderness, the more viciously it pushed back, and eventually you could not continue. You left, and sought company in larger settlements along the frontier.",
                "Self-sufficient",
                17),
            new StoryModel(
                "Wagon Train",
                "From one of the southern kingdoms you came, a group of pioneers, banded together for support, bringing all you had on wagons and wains. You remember what it was like to leave the cities and venture into the countryside, eventually seeing stone-paved roads turn to dirt, which became the merest suggestion of trails through untouched wilderness. You settled near one another, sharing resources and trading with each other, but something happened that took you away from that. What was it?",
                "Driven",
                20),
        ],
        [Caste.Soldier]: [
            new StoryModel(
                "Born to the Garrison",
                "Your father was a soldier in one of the border outposts, your mother the daughter of a farmer or merchant from the surrounding settlement. She barely knew him, and you never did, though when he was killed in a raid she grieved nonetheless. The garrison soldiers recognized your origin, and gave your mother work supporting them. They treated you with some small degree of rough kindness, and you grew up with them as your teachers and mentors, until you were of an age to join their ranks, albeit briefly.",
                "Common by Birth",
                3),
            new StoryModel(
                "Death or the Frontier",
                "The military never seemed to suit you for one reason or another. Perhaps it was the rigid discipline, the monotony, conflict with your commanding officer, or some other intolerable factor. Whatever the case, you managed to break the rules so egregiously that your commander offered you a choice: death or the frontier. You chose the latter, and were sent to join the garrison at some border fort where you could be forgotten until the end of your service. Now you wonder if you made the right choice...",
                "Exiled to the Border",
                6),
            new StoryModel(
                "Foundling",
                "One morning when the soldiers opened the gate to the border fort they guarded, they discovered you, an infant child, wrapped in a rough-spun blanket, sleeping quietly. Somehow, fortunately, you had not cried out, else you would likely have drawn the attention of predators nearby. Seeing this as good fortune, the soldiers found a home for you within the garrison. When you came of age, the captain of the guards came to visit, bearing a gift: an item found within the blanket that swaddled you, the only clue as to your parents’ identities. What was that item?",
                "Raised by the Camp",
                10),
            new StoryModel(
                "A Noble Guard",
                "You were part of the household guard, sworn to serve a noble’s estate in your original homeland. The noble was sent into exile in the frontier, and you followed, finding yourself the target of scorn and derision from the peasants your leader now ruled over. This station came to a sudden and violent end, and you were released from your service. Now you have no master and no source of income, and you must seek your own path in this frontier. What will you do?",
                "Household Retainer",
                14),
            new StoryModel(
                "A Station Too Far",
                "When you enlisted in the army of your homeland, you thought you’d be sent to patrol the border or used to help quell internal rebellions between fractious nobles. Instead, you found yourself sent along with the rest of your company to the frontier, a post at the edge of civilized society, facing Picts, Cimmerians, or Hyperborean savages.",
                "Far from Home",
                17),
            new StoryModel(
                "The Wild Beyond",
                "Disgusted by the cramped city streets and squalor of the capital city, and the degeneracy of the so-called “civilized” people you were forced to defend, you chose to join the forces that patrolled the frontier, a place you found liberating. So enticing was this freedom that you quickly extricated yourself from your posting and struck out on your own. You are a deserter, marked for imprisonment or death if your fellow soldiers find you.",
                "Deserter",
                20),
        ],
        [Caste.ChieftainsScion]: [
            new StoryModel(
                "A Taste of Scholarship",
                "You were taught to read in a foreign tongue by a merchant or prisoner of your tribe. Since then, your intellect searches for a whetstone for honing. Was the Cataclysm an accident or planned in the stars long in advance? You ponder such things on the lonely roads of the worlds, but do not worry about them overly much, for the span of one’s life is a brief season. You aim to consume the experiences of many cultures and points of view. You are bound only to yourself and the road ever before you, whether visible or not.",
                "Patronage",
                3),
            new StoryModel(
                "Fought an Empire",
                "Beyond the internecine wars between Ghuli tribes, some foreign power or another tried every so often to ‘tame’ your land. They always fail, but in so doing, they drew your attention. You proved yourself in battle against an empire’s supposed best. Now, you want to see what other empires offer in the way of civilization. This might be interesting, at least for a while. Besides, knowing their tactics could make you a chief at home.",
                "Witness to Brutality",
                6),
            new StoryModel(
                "Lost in the Wild",
                "You were lost in the wild as child for many days. You do not remember how you survived. Now, you wander, trusting some compass within or some path drawn by your god, to guide you wherever it is you are supposed to be. Perhaps, you dismiss such notions of the ‘supposed’ and instead believe in the inherent chaos of the world. ",
                "Survivor",
                10),
            new StoryModel(
                "Passing Entertainers",
                "Caravans of foreigners come through your territory regularly, with the permission of the council. Mostly, they sell shiny trinkets of no use to anyone living in the hills of the Himelians; but one day a harlequin show arrived, filled with strange folk, mysterious and alluring, enacting more tales than the elders of your village ever told you. From that point you were enraptured. You had to see these worlds they spoke of and partake of life outside the hills.",
                "Exotic Tastes",
                14),
            new StoryModel(
                "Poisoned!",
                "A rival family poisoned you, vying for the seat of the chief, your parent. You survived when, by all rights, you should have died. This made you wonder why. You decided you needed to see something of the world before you took on your parent’s position and, possibly, find those who tried to kill you, as they were cast from Ghulistan when their treachery was found out.",
                "Suspicious",
                17),
            new StoryModel(
                "Visions of War",
                "Your dreams are plagued with images of war, but not war like you’ve seen before. In these dreams, savages from the West clash with Hyrkanians from the East before another Cataclysm rocks the world. These dreams plague you, eat into your mind like a Hyrkanian death worm. Some inescapable fate lies at the end of this age, which you fear comes soon. If you do not see the world now, it will not be there to see later",
                "Nemesis",
                20),
        ],
        [Caste.HereditaryScholar]: [
            new StoryModel(
                "A Trip to Carcosa",
                "While investigating the pacts forged in the Outer Dark by those who came before you, you found a tear in reality. Through it, you gazed into another world. A woman in yellow... a queen. A lake the color of emerald with a tint of corrosion under a strange moon. In the darkness, things you could not name whispered of gods older than time. All the secrets lay across that lake, in the city whose name you somehow knew was Carcosa. You must find your way back.",
                "Cursed",
                3),
            new StoryModel(
                "Discovery of Old Kosalan Technology",
                "You found something imbued with magic which, upon further research, you learned was a different kind of magic, based in science from Old Kosala. This opened new worlds of possibility for you. However, books could only tell you so much and soon you’d exhausted both archives and sages. You had to search for more of this science based on the few clues you knew. When you find it, what will you do?",
                "Adventurous",
                6),
            new StoryModel(
                "Homunculi",
                "You master swears he created life in his laboratory. He found the secret after a lifetime of research. Obsessed, he spent every waking moment trying to conjure life from nothingness. When he did, he’d made a horror. He won’t speak of what he created or what happened to it. He burned all his notes. Now, you’ve become obsessed with his story. What if you, too, could conjure life from naught but mind and sorcery?",
                "Nightmares",
                10),
            new StoryModel(
                "Time's Arrow",
                "You know that time flows in more than one direction. You know that the same stream can be entered twice. You know that the forward momentum of age and change are illusions. There is immortality in this knowledge, if only you could codify and master it. What would you do if you had the ability to move anywhere in time? What would you alter? What would you ruin?",
                "Fond Regrets",
                14),
            new StoryModel(
                "The Witch Woman in the Woods",
                "On one of your first wanderings, you came upon a witch in the woods. The old crone lived in a strange hut, decorated within with the cleaned skulls of men and women. “You would join them,” she said, “…but not yet.” You left, jarred by the experience but wanting to know more. Why didn’t you kill her? She posed no threat, and yet your hand could not move. Why could you not find your way back? Later, you discovered the woman you met was a figure of myth within your homeland. The world is full of such legends and you will find them. You will find them and use them, because you know — more than you know the beating of your own heart — that she did not lie. Your skull will adorn the walls of her hut if you do not find her before she finds you.",
                "Cursed",
                17),
            new StoryModel(
                "The Wyrm Turned",
                "Experimenting with chemical concoctions was your life’s work, until you ingested one of your own elixirs. What it did was change the world for you. Up became down, the truth behind reality was yours to see, if only for a moment. Then the curtains closed. You haven’t been able to replicate the chemical, but you believe it showed you a place more real than this world. You want to go there again.",
                "Conspiracy",
                20),
        ],
        [Caste.HorseClans]: [
            new StoryModel(
                "Born Under a Bad Sign",
                "The shaman warned against your birth. Your parents should by all rights have killed you and sent you to the place for those that are of no use to Erlik. What sign it was does not matter. What matters is that you grew up unwanted, fodder for other children’s jokes and devoid of parental love. You were a constant reminder of Erlik’s disappointment. Eventually you left. Whether you seek to heap glory upon yourself for Erlik or to avenge yourself on your people, your path takes you away from the open steppe.",
                "Cursed",
                3),
            new StoryModel(
                "Clan Feud",
                "A bitter feud between your family or your clan weighs heavy on your soul. Perhaps you left to ease that burden or to find a means outside your homeland to redress it. Either way, you have killed and seen killed your own people, and feel little the better for it. The might of your bloodline is in death, true, but what good can Erlik’s warriors be in the next Cataclysm if they fight only each other?",
                "Feud",
                6),
            new StoryModel(
                "Exiled",
                "Your clan has laws and you violated them or were accused of doing so. Whatever the reason, you were exiled and now wander the world as a loner, apart from your people. Perhaps one day, you can return home, though you doubt it. Instead, you must find new purpose in the world, beneath the same blanket of stars, but on very different bedding than before.",
                "Righteous Disobedience",
                10),
            new StoryModel(
                "Failed Ambition",
                "The warring clans needed a leader among them. You saw this from an early age, but every attempt you’ve made to create lasting truces between the clans has failed. The warlike nature of your people is simply untamable, at least for now. In the wider world, empires rise and flourish on less strength than your people have before adulthood. Perhaps among the civilized folk you may learn the ways of diplomacy and unite your clans into an army the likes of which the world has never seen. The thundering hooves of the hordes will then trample over all the jeweled mantles of the Earth.",
                "Fond Regrets",
                14),
            new StoryModel(
                "Survived a Plague",
                "There are many deaths your god visits upon his people, but not all succumb to them. You lived through a horrific plague that killed many of your kin. Afterward, you were blessed by the death god. You have purpose in this life, or Erlik would have taken you as the fever swelled and the boils spread. What is that purpose? ",
                "Survivor",
                17),
            new StoryModel(
                "Vision of Erlik",
                "At a young age, you received a vision of Erlik. Perhaps it was while waking. Perhaps it was in a dream. If you did not become a shaman, this vision likely set you on the road of the wanderer. Erlik has a destiny for you, one you cannot yet decipher. Out there, in the unknown beyond Hyrkania, you are sure to find it.",
                "Chosen",
                20),
        ],
        [Caste.LandedGentry]: [
            new StoryModel(
                "Became Sudden Heir Apparent",
                "Your elder sibling died, or was perhaps banished, and you became the heir apparent. You did not plan this life. Yours was to be a lesser spectacle, free of the deep responsibility of rule. Now, your mother or father expects you to take the crown after them. Are you prepared? Are you willing? What did you do when you learned this was to be your fate?",
                "Conflicted",
                3),
            new StoryModel(
                "The Second Child",
                "You were never going to ascend to the title of your father, for others were in front of you. Were you fine with this or jealous? Perhaps you were sent away to a temple of Mitra or sent into combat. Perhaps you did nothing much at all and enjoyed a very easy life? What ambitions of your own do you have? Do you desire to rule and, if so, how far will you go to do so?",
                "Desultory",
                6),
            new StoryModel(
                "Long Standing Feud",
                "Your family has an old rival. Perhaps you are both vying for the favor of the ruler of your kingdom. Maybe one of your ancestors aggrieved one of theirs and the matter has never been forgotten. Royal blood is old and so are the emotions which charge it. This other family, this enemy, may have done nothing to you personally, yet you were raised to hate them. Do you relish that anger or wonder about its justification?",
                "Sworn Enemy",
                10),
            new StoryModel(
                "Blessed by the King or Queen",
                "Your family found sudden favor from the ruler of the kingdom. Perhaps you were given control of a prestigious piece of important land. Or you may have helped win a war. You might even have saved the ruler’s life. Whatever the reason, your family name was suddenly lifted to prominence and influence. This made you proud but caused jealousy and resentment in other families. Where do you stand now? What does the ruler expect of you, and who are your new enemies?",
                "Pride",
                14),
            new StoryModel(
                "Dishonored in Court",
                "Someone smeared you. It may have been publicly or through the vines of vicious rumors. In either case, it spread through court like wildfire. Your name was stained, tainted. Will you set things right? Were you guilty of what transpired to bring your name so low? Did you tough it out or leave? Where does your name stand now, and what does your family think of you?",
                "Shamed",
                17),
            new StoryModel(
                "Arranged Marriage",
                "It is a common story in this age—you were arranged to be married by your parents. The union was intended to bolster influence, solidify power, or make up for having a title but little money left. You had no say in this matter. Did you go through with it? If so, are you married now? Perhaps you fled, turning your back on your noble lineage and took to the life of an adventurer. If so, is there something that brings you back now?",
                "Constrained",
                20),
        ],
        [Caste.Estateless]: [
            new StoryModel(
                "Recently Knighted",
                "Your knighthood is fresh. How it came about is up to you, but you are not used to the rank. By the same coin, the ranks of the elite are not used to you. You must learn etiquette and the strange world of noble rumor and politics. It is a much different world from whence you came. Will it suit you?",
                "Fresh",
                3),
            new StoryModel(
                "Lost Your Family Estate",
                "Even noble families fall on hard times. Gambling debts, bad investments, the wrath of the ruler, all these can lead to the loss of an estate and, sometimes, all the families money. You have a title but nothing to back it up. Did you and your family stay in your homeland, knowing the other nobles looked down upon you? Or did you leave, and set up in a new kingdom? Perhaps you even betrayed your old liege to gain a new estate with an enemy",
                "Regret",
                6),
            new StoryModel(
                "Given Rank by the King for Valor",
                "You proved your worth as the best people of the age do—on the field of combat. From lower beginnings, your prowess with the blade, or tactics, or raw courage set you apart. In time, you became knighted, perhaps even given a higher title. You are in a world where martial skill matters far less than before. Do your peers respect you, or do they see you as a curiosity, a rude soldier who pleased the king?",
                "Courageous",
                10),
            new StoryModel(
                "Bought Your Title",
                "Titles can be bought. You were not granted an estate with the title, but you might build that in time. When the kingdom needs money for new roads, or churches, men and women of means appear and provide “donations.” These donations usually turn into titles. Clearly you wanted the title. What do you want next?",
                "Ambitious",
                14),
            new StoryModel(
                "Poitainian Knight",
                "Born to a proud line of noble warriors, you lived by a code since youth. You squired to one above you in rank and eventually took the name Sir or Dame after completing your training. You are one of the finest soldiers in the west, but also one of the best mannered, most selfless, and known for fidelity and honor",
                "Traditional",
                17),
            new StoryModel(
                "Nemedian Scholar",
                "A scholar in any other kingdom would have value but not rank. The Nemedian scholars, however, have title. They don’t own land, but they are treated as nobles, so does Nemedia respect knowledge and history. In return for this privilege, you dedicate your life to learning and recording. History is your prime guide in all things. This age will end, even Nemedia will end. It is up to you to preserve it for all time.",
                "Well-Schooled",
                20),
        ],
        [Caste.Laborers]: [
            new StoryModel(
                "Plenty of Work",
                "Whether you were a basket maker, a dye maker, a warehouse worker, a porter, a cutter of stone, a rower, someone who moved stone blocks, or whatever, you always found work and learned a solid work ethic. You understand the value of work, and of keeping busy. Laziness and idleness frustrate you. You also understand the value of your Renown as a solid worker all can depend on to be there when needed, and of doing the work that is necessary. Do you value the same in others? Do you hold yourself superior to those born to a life of luxury, or those who take advantage of the system to do as little as possible?",
                "Survivor",
                3),
            new StoryModel(
                "Typically, Unemployed",
                "Either due to bad finances, poor planning on the part of the priests, or just your own unreliable work habits, you found yourself constantly unemployed. You may have a reputation for being unreliable, or maybe you no longer trust the plans of others, but at the end of the day you know how to get what you need to survive another day. Why were you unemployed so much? Do you blame yourself or others? Do you make excuses, or are you embarrassed? ",
                "Solid Work Ethic",
                6),
            new StoryModel(
                "The Corvée",
                "As a form of taxation, the government can draft workers if there is not enough for work, often farm labor, used for building monuments and temples. This system of forced labor is called the corvée. Evading the corvée puts one’s family at risk of punishment. Entire families become sacrifices to Father Set for one member refusing the corvée. Men and women alike are eligible for the corvée at the government’s discretion. Your family became conscripted corvée. Did you go? Did your family go? If not, how did you avoid the punishment?",
                "Obedient to Authority",
                10),
            new StoryModel(
                "Work Has Its Risks",
                "When the job was dangerous, you wanted it. Haul stones into a crocodile-infested canal to build the foundation for a bridge? It’ll have to do. You can wrestle crocodiles, drive off hippopotami or giant scorpions, ascend to the pinnacles of monuments to clean the statue or polish its shine, hang upside down from a rafter to apply a little paint or gilding to a tomb painting or temple wall, or agree to clean out the pen of a Son of Set. If it’s a dangerous job, you want it. If it pays extra, you want it more. Do you enjoy the thrill, or do you just know it sets you apart from the common laborer? Do you do it for the extra pay or do you do it because you love it? ",
                "Thrill-Seeker",
                14),
            new StoryModel(
                "Too Much Death",
                "You’ve seen too much death and dismemberment in your labors. Perhaps you saw someone crushed by a falling block of stone or eaten by a crocodile while working near the water. Maybe scaffolding collapsed or someone plummeted off a monument. Whatever it was, it has instilled a sense of caution in you. You know you are replaceable, as everyone who dies on the job is. No one cares for your safety, so you need to care for your own. Who died? How did it affect you? Do you also look toward the safety of others, or just for your own survival? ",
                "Cautious",
                17),
            new StoryModel(
                "Chosen as a Phyle Priest",
                "Your acceptance into the phyle priesthood brought immense honor to your family and set you upon the true path to power in Stygia. Though the hours of study and discipline were arduous, you nonetheless learned much about the true nature of your home country and its state religion. Before you were a teen you were hardened to death, having seen many sacrificed to the serpents that haunt the halls of your temple. What made you leave the temple? Do you still honor the worship of Old Set, or are you a heretic, keeping your skepticism a secret, lest you face death at the serpents’ sharp teeth. ",
                "Minor Title",
                18),
            new StoryModel(
                "Apprenticed as a Scribe",
                "As a child, your cleverness and diligence were noticed, or perhaps your parents bought your way into an apprenticeship, thinking that this training would put you on a path into the bureaucracy or even the priesthood. Growing up as a scribe-in-training, you spent your early years doing the drudgework the role required, from cleaning the archives and scriptorium to making fresh brushes and scraping papyrus for re-use. When you were finally copying and transcribing ancient documents, you began to pay attention to them. Did what you read inspire you to seek a new path, or did you come across something that filled your soul with terror? ",
                "Ambitious",
                19),
            new StoryModel(
                "Conscripted",
                "The military conscripted you for an action or two where they required infantry fodder, and not enough warriors were at hand. You gained some rudimentary skills in combat and taught discipline. Did you go back to the work force after your conscription was over or did you stay in the military to free yourself of a life of hard labor? Did you resent conscription into the military or did you relish the opportunity?",
                "Disciplined",
                20),
        ],
        [Caste.Scribes]: [
            new StoryModel(
                "Surrounded by Death",
                "Your father was a scribe and you were born to be a scribe, going into the school at the age of seven with many of your friends. Many of those friends, including your best friend, did not graduate. The priests dragged them to the altars of Set to be sacrificed. You were not at the top of your class and nearly did not make the grade as it was. You understand all too well the price of failure and you are always worried. How have these deaths affected you? How do you face failure now? Are you afraid to take tasks that might result in failure or do you play it safe and only perform activities you know you can handle?",
                "Nervous",
                3),
            new StoryModel(
                "Militaty Duty",
                "When you left the school, your aptitude for strategy and tactics put you in a leadership position in the military. Officers draft their orders to avoid inadvertent (or advertent) changes that couriers might make to oral orders, especially if travelling for days to reach a military unit. While not a general by any means, you advised military officers or devised tactics for your own units to succeed. You may have even come up with a maneuver so impressive the military named it after you. What officer did you advise? Did you have a tactical move named after you? If so, what was it?",
                "Tactical-minded",
                6),
            new StoryModel(
                "Government Posting",
                "You had a plum assignment in the government. You may answer to a priest in charge of whatever you are doing, or you may answer to a higher-ranking scribe. You were accounting for all taxes collected in a region, or administering to public works, or keeping inventories of arms for the military. What is your role in government? What do you oversee?",
                "Trusted",
                10),
            new StoryModel(
                "Well-placed, But with Strings Attached",
                "Your assignment within a temple or with the government at a position was far above what your accomplishments probably deserved. Of course, the placement came with a price: you betrayed your supervisor to the patron who placed you. Perhaps you serve a high priest suspected of plotting against Thoth-amon, and another priest who wants Thoth-amon’s favor has placed you in a position to reveal the high priest’s treachery. Do you do it? Do you betray the man you now serve, or the man who got you the high placement? Who do you work for? Who placed you? Why?",
                "Traitor",
                14),
            new StoryModel(
                "Chosen as a Priest of Texts",
                "You served as a scribe for a temple, a position of some prestige. There are five main divisions to the various temples of Stygia: The House of the Black Ring, the Harem of the God, the Laborers of the Temple, the Craftsmen of the Temple, and the Administrators of the Temple. While higher ranking scribes write magical or sorcerous texts — especially those serving in the House of the Black Ring — you are still a low-ranking scribe, relegated to writing out decrees and generic books of the dead. Still it is a great honor to be a scribe. Do you serve in the temple of Set, or in one of the lesser temples? Which division do you serve in?",
                "Minor Title",
                17),
            new StoryModel(
                "Unconverted Incompetence",
                "You served as a scribe for a temple, as per the Priest of Texts previously described, but you uncovered the incompetence of another and were given a promotion. You’ve realized the power in stabbing others in the back to climb over them toward power. What did you uncover? How did you betray them? Was it your direct superior, or was it simply another priest or scribe?",
                "Back-stabbing Ambition",
                20),
        ],
        [Caste.StygianPriest]: [
            new StoryModel(
                "Additional Duties",
                "Not only are you a priest, you were also assigned the titles and duties of Priest of the Morning. In this capacity you perform the rituals to open the shrine, disrobing the statue and purifying it, burning incense to stimulate the god’s sense of smell, dressing up the god, and offering food and drink to the god to stimulate its sense of taste, while dancers stimulate the god’s sense of sight. You performed these extra duties with compliant care. Has this advanced you further in your career? Do you continually take on additional responsibilities, or only when they are pushed upon you?",
                "Dutiful",
                3),
            new StoryModel(
                "Kher-Heb",
                "The Kher-Heb is the Priest of Rituals. They are the officiating priest at any given ritual who holds the ritual papyrus. They are charged to recite from the papyrus scrolls exactly as written because a single mistake can anger Set and send doom upon all gathered. Any priest of any rank can be named Kher-Heb for a given ritual. Acolyte and novice priests are often named this for non-sorcerous rites to give them practice at reading scrolls later in their sorcerous training. Higher level priests are given this title for more sorcerous rites. You were named Kher-Heb for a public ritual which gave you public exposure. Who noted your performance and marked you as someone to watch? Is their interest to their benefit alone, or can you profit by this as well?",
                "Rising Star",
                6),
            new StoryModel(
                "Competence Noted",
                "Your competence was noted by another division of the temple and you were given training in a second division, giving you a second title. After you choose an archetype for your priest, choose (or randomly select) a second division to hold an acolyte rank in. What did you do to be noticed? What office is your second title in?",
                "Busy",
                10),
            new StoryModel(
                "Crossed the Line",
                "You crossed a line somewhere. You were where you should not have been, learned what you should not have learned, watched what you should not have seen. You may have done something blasphemous. You may have stolen a temple artifact. Now you are exiled and on the run. What did you do?",
                "Hunted",
                14),
            new StoryModel(
                "Ambition Rewarded",
                "You successfully managed some political move or series of political moves within the temple to further your career. What did you do? Did you make enemies or friends?",
                "Power-hungry",
                17),
            new StoryModel(
                "Ambition Squashed",
                "You attempted some political move to further your career, but a higher authority noted the action and nullified it. As a result, you were punished in some way. Perhaps you were put on a work crew for a while, perhaps you were given to the Black Ring as a training subject, or perhaps you were flogged before the other priests. What was your punishment? Did you redeem yourself afterwards or are you still marked as a troublemaker?",
                "Punished",
                20),
        ],
        [Caste.Axumite]: [
            new StoryModel(
                "Survived a Terrible Plague",
                "A grim and lethal disease swept through your region, felling thousands in but a handful of nights. You were sickened, delirious, sure you would be next. You survived. What might you have done during those lost hours?",
                "Hardy",
                3),
            new StoryModel(
                "Caught in an Uprising",
                "Whether due to corrupt nobility, a war, or simple rebellion, you found yourself swept up in events beyond your control. You couldn’t make your way home, and so joined the rioters as they stormed the halls of the high and mighty. What made you turn on your rulers?",
                "Rebellious",
                6),
            new StoryModel(
                "A Noble's Guest",
                "For reasons that remain mysterious, a local noble invited you into their home for a fortnight. You stayed and took advantage of lavish hospitality, but something occurred, and you still think of that period with mixed feelings. What happened, and why did they invite you? Were you given a secret or a gift?",
                "Chosen",
                10),
            new StoryModel(
                "A Distance Ancestor",
                "You had no idea of your lineage until a wandering griot told you of a long-lost relation. You spoke about them for days. Were they a great warrior? A Clever One? What deeds made their story worth preserving?",
                "Proud",
                14),
            new StoryModel(
                "Lost Everything",
                "Fire and blood. In a moment, everything you had in the world was consumed, never to return. Now you value what you have and make sure that your steps are measured. What happened? What did you lose?",
                "Cautious",
                17),
            new StoryModel(
                "A New Beginning",
                "Perhaps the orishas smiled upon you, or you had some other stroke of good fortune. Whatever the reason, you’ve found another purpose in life. What passed before, and where are you going now?",
                "Practical",
                20),
        ],
        [Caste.CleverOne]: [
            new StoryModel(
                "Blood Feud",
                "Someone wants your head, maybe literally. They have forgotten their ancestors or remember yours foully. Who are they, and what began this lifelong enmity?",
                "Feud",
                3),
            new StoryModel(
                "Spirit Patron",
                "One of the orishas has taken a liking to you. You cannot always understand what they say or the visions they give you, though. What do you see? Do you heed or ignore the spirit?",
                "Haunted",
                6),
            new StoryModel(
                "Made an Enemy of Bokor",
                "A powerful and evil sorcerer has laid their claim upon your soul. Though you are far from them, their icy presence is like the hand of the dead upon your neck. What do they want from you, and how did they come to be your foe?",
                "Cursed",
                10),
            new StoryModel(
                "Ridden by Orisha",
                "Once, during a ceremony, the spirits chose to inhabit your body. They spoke with your mouth, danced with your body, leaving you exhausted for days. Still they speak to you of things best left unsaid. What whispers do you hear?",
                "Whispered Secrets",
                14),
            new StoryModel(
                "Auspicious Lineage",
                "The members of your family believe that one of your ancestors lives on in you. Who were they, and how do you intend to live up to the reputation of one long dead?",
                "Chosen One",
                17),
            new StoryModel(
                "Touched by the Outer Dark",
                "Their foulness is upon you, their regard stains your soul. You have done nothing to gain the notice of demons… as far as you know. What terrible thing have you forgotten that has attracted their attention, and what nightmares haunt your sleep?",
                "Under the Eyes of Demons",
                20),
        ],
        [Caste.Exile]: [
            new StoryModel(
                "Desecrated a Grave",
                "You committed an act that no one can forgive, and you cannot expiate. You defiled the grave of your ancestors. It may have been an accident but most likely it was not. Red hot iron marked you as what you are and you no longer have a home. This is one brand that carries meaning throughout the South. It is difficult to escape notice. Your ancestors no longer watch over you. Truly, you are alone.",
                "Shamed",
                3),
            new StoryModel(
                "Dishonored an Ancestor",
                "You failed to live up to your forebears. Were you defeated in a battle over honor? Perhaps you cannot recite the history of your people because your mind wanders. The spirits of the dead considered you unfit and, eventually, you were sent on your way. Your heart is heavy. Community is no more, and you must make a new life, with new people outside the borders of everything you know. ",
                "Pariah",
                6),
            new StoryModel(
                "Stole Cattle or other Livestock",
                "Your spouse was hungry. Your children’s eyes wet with tears with bellies swollen. Anyone would have done the same. Yet it was not anyone, it was you. You fed your family but left them behind; they do not deserve the shame you brought upon your name. Better they join another family. At least they live. Now begins your next life.",
                "Criminal",
                10),
            new StoryModel(
                "Lay with Another's Spouse",
                "You wanted what you could not have. The other wanted it to. Perhaps it was lust or maybe even love but both of you committed a crime. Neither of you could stay. Perhaps your lover still travels with you. Perhaps they left you long ago. You are an outcast. Was it worth it? Would you do it again?  ",
                "Libidinous",
                14),
            new StoryModel(
                "Murdered Kin",
                "You have a violence in you. It was there as a child and, while the elders tried to temper it, only grew. You became known for your rage. Eventually, you killed one of your community. The sentence was likely death unless the circumstances were in your favor. In that case, you are an outcast. Either way, you fled. You had no choice. Your anger still seethes within",
                "Rageful",
                17),
            new StoryModel(
                "Betrayed the Tribe to Enemies",
                "The tribe never loved you like your sibling. They were always the better scion. Your parents made no attempt to hide it. No one around did. You felt an outcast in all but name and, when the opportunity presented itself, you left with valuables given to you by the enemy. All you had to trade was the slight regard of your tribe. You led them into a trap, and many died. They betrayed you first, regardless of what the sprits say to you in the night",
                "Self-serving",
                20),
        ],
        [Caste.Griot]: [
            new StoryModel(
                "Elevated a Noble",
                "A tale or song at the right time, performed for the right people, can make a noble a ruler in their time. Did you uphold the traditions of the griot or did you lie for some reason? Why?",
                "Patronage",
                3),
            new StoryModel(
                "Witness to Treachery",
                "You saw them, but they did not see you… perhaps. Someone is plotting against a family member, or a friend. Who are they, and just how deep does the threat against them go?",
                "Conspiracy",
                6),
            new StoryModel(
                "Bitter Rivals",
                "Not all griots agree on the tales or their telling. Sometimes, even the traditions of your people are a sore point of disagreement. Somehow, you’ve angered one or more of your fellows, and now they spread lies and mockery about you. What was the incident that triggered it all, and what are you going to do about it?",
                "Mocking Peers",
                10),
            new StoryModel(
                "Influential Patron",
                "You have a friend in very high places indeed, and they aid you in small ways from time to time. The voice is one that’s respected and heard. Who are they, and what is the story of your first meeting?",
                "Well-connected",
                14),
            new StoryModel(
                "Caused an Uprising",
                "The words of a griot can topple tribes and kingdoms entire. You know, because yours have. Were you siding with the righteous, or were you paid to incite rebellion? Who was the ruler that you called the mob against, and why?",
                "Rabble-rouser",
                17),
            new StoryModel(
                "Embittered Noble",
                "You’ve made a powerful enemy, one that seeks your utter ruination. You’re fine with that, because you know what they did. Who are they, and what foul deed did they perform to earn your wrath?",
                "Vengeful",
                20),
        ],
        [Caste.Tribesperson]: [
            new StoryModel(
                "Faced Starvation",
                "The weather does not always obey the will of the dead. What favor your ancestors curry with the four winds has limits. One season, the rain did not fall. The cattle died. The river flooded. There wasn’t enough food for all. Many died of starvation. You watched this horrible death and thought you would soon succumb as well, but you survived. Perhaps your ancestors saved you, or perhaps you simply refused to die. You’ve seen slow, creeping death. You have no wish to meet your end in such a way. Is that why you took to a life of adventuring?",
                "Hearty",
                3),
            new StoryModel(
                "Family Killed",
                "Enemies may have raided your town or village and killed your family. A fire may have swept the savannah and killed many. You know great loss. Afterward, home was no longer home. Your friends tried to lift your spirits, but nothing had meaning as before. You left. You hope to find a new life or, at least, a worthy resolution to this one.",
                "Dearly Remembered",
                6),
            new StoryModel(
                "Auspicious Marriage",
                "The wealthiest heir in your community is your betrothed. The marriage was welcome, for your status instantly increased. Perhaps you have had to leave your spouse and family behind at the behest of a witch-finder? Did your ancestors speak to you and compel you on some sort of quest? Regardless of the reason, you have your spouse, and possibly children. You must resolve the task ahead of you before you can return home. It is not an easy burden. ",
                "Love",
                10),
            new StoryModel(
                "Inherited Wealth",
                "Thanks to some discovery, savings, or shrewd trading arrangements, you are heir to a substantial amount of wealth. Whether you can keep that wealth depends on your actions, and such largesse is sure to attract the attention of thieves, con artists, and enemies who envy what you possess. Where did the wealth come from, and what form does it take? Not all people value the same things equally.",
                "Fortunate",
                14),
            new StoryModel(
                "Ransomed!",
                "Enemies captured you during a raid on your village or while part of a trading caravan. Your captors may have been cruel to the point of sadism, or merely treated the kidnapping as a matter of course. Regardless, they sent a messenger to your family or village elders demanding something for your return. Who were they, and why did they let you go? What did they demand from your kin? Did you escape before they paid the ransom?",
                "Humbled",
                17),
            new StoryModel(
                "Spoke with the Dead",
                "Spirits can rest uneasily, and sometimes they appear to the living. Whether it is to resolve some unfinished business in life, to offer advice to their descendants, or to bedevil a victim, encounters with the dead are terrifying. Still, you gained some wisdom from the encounter, retained sage advice, or discovered something about the past. Who was the spirit, and what knowledge did they impart to you?",
                "Wiser",
                20),
        ],
        [Caste.Aristocrat]: [
            new StoryModel(
                "Abandoned a Coup",
                "During your childhood, your family supported an attempted coup against the legitimate and still-sitting rulers. As the coup fell apart, your elders managed to distance themselves enough to not get caught up in the reprisals. Almost everybody who knew about your involvement is many years dead...almost. Who keeps the secret that could destroy your family?",
                "Dark Secret",
                3),
            new StoryModel(
                "Bastard Child",
                "You are the child of only one of your two parents, raised as their own out of love for you, or for your other parent. Though your family cared for you materially, you could feel the guilt of your parent, the rage of their spouse, and the deeper rivalry with your siblings. As an adult, how much do you claim your connection to the family? Are you in touch with your other kin?",
                "Brittle Pride",
                6),
            new StoryModel(
                "Falling Stock",
                "When your parents were young, your house was among the most favored in your kingdom, enjoying the largesse and the ear of your ruler at a moment’s notice. Recently, though, you have fallen out of favor...and continue to plummet. What caused this fall from grace? Were you responsible?",
                "Doors Open Once",
                10),
            new StoryModel(
                "Political Marriage",
                "Somewhere in this kingdom or another, your spouse lives comfortably on your family wealth. This loveless marriage was arranged before either of you reached 10 years of age and has cemented an alliance between two rival houses. Though it has little impact on your daily life, it prevents any kind of legitimate romance. When was the last time you saw your spouse? Are you in love with anybody else? ",
                "Lovelorn",
                14),
            new StoryModel(
                "Remote Appointment",
                "During your childhood, your parents were sent to live on an estate in a distant kingdom as ambassadors between the two realms. You loved your time there and enjoyed equally the cache your cosmopolitan experience brought you during your teen years at home. What friends and fondnesses still remain after your time abroad?",
                "Far-flung Friends",
                17),
            new StoryModel(
                "Rising Star",
                "Though your family has been a major house for generations, only recently has it begun to rise into the highest echelons of society. Some older clans resent your “upstart” presence, but more flock to you, recognizing new opportunities. How has this change of circumstances impacted you personally?",
                "Long Memory",
                20),
        ],
        [Caste.Conquered]: [
            new StoryModel(
                "Beaten Severely",
                "When a group of soldiers, bravos, or ruffians found out Syour heritage, they beat you within an inch of your life. You recovered, physically at least, and your status meant no legal repercussions for those who beat you. You did, ultimately, gain a modicum of vengeance. What did you do? Who close to you was hurt in the process?",
                "Vengeful",
                3),
            new StoryModel(
                "Ghetto Denizen",
                "You grew up in a packed, filthy, crumbling, crime-ridden district of your city, where your people were forced to dwell. Some among you took daily forays for work into the splendors of the outer city but returned every night. Life demanded hard choices, and you made them. Who did you have to hurt to get out?",
                "Trusted or Traitor",
                6),
            new StoryModel(
                "Sent into Exile",
                "To make room for some project or migration, your entire people were sent from their homeland to eke out a hardscrabble existence in some forsaken corner of empire. Life there was severe, and many died who would have lived had you been allowed to stay. What part of your original homeland still stirs you to anger, or despair?",
                "Lost Your Legacy",
                10),
            new StoryModel(
                "Slid into Addiction",
                "It might have been drink, gambling, or the pleasures of the flesh, or the sweet oblivion of lotus and other drugs, but some distraction from the squalor of life claimed you, body and soul, for some years. You are largely recovered now, but still sometimes feel its siren call. To what were you addicted? What happened at your lowest point? How did you get clean?",
                "Addicted",
                14),
            new StoryModel(
                "Starved in Lean Times",
                "When crop blights and war cut food supplies, your people were the first to suffer even as the more fortunate feasted unto gorging. As the weeks of hunger turned to months, starvation took the weak and desperation marred even the purest. What filth did you eat, and what atrocities did you commit, to fill your belly?",
                "Cannibal",
                17),
            new StoryModel(
                "Survived a Pogrom",
                "Forces from the occupying peoples came to slaughter your entire village. Your parents and siblings all died in the attack, but you managed to escape with your life, a handful of food, and one or two trinkets. What did you have to do to live through that day?",
                "Orphaned Young",
                20),
        ],
        [Caste.Courtier]: [
            new StoryModel(
                "Averted a Scandal",
                "Through luck or design, in your youth you were able to prevent a potential scandal. You took that opportunity, earning the thanks of a powerful individual, family, or group. It also earned you the enmity of those who stood to profit had the scandal occurred. Who is in your debt? Who still resents your intrusion?",
                "Owes a Debt",
                3),
            new StoryModel(
                "Forbidden Love",
                "You fell in love, or at least in lust, with somebody forbidden by class, or ethnicity, or to one already betrothed. The relationship is long over, or was never permitted to blossom, but one never forgets one’s first. Whom did you love? How did it end?",
                "Lovelorn",
                6),
            new StoryModel(
                "Grand Tour",
                "You accompanied a royal scion about your age on a year-long tour of neighboring lands, where you met courtiers, greeted royals, and debauched in many languages. Your travels and experiences built the beginnings of a back-channel network you’ve groomed since then, as has the handful of illicit favors you did for the upper class at opportune moments. What was the most memorable adventure of that journey?",
                "Well-travelled",
                10),
            new StoryModel(
                "Moment of Fame",
                "For a shining few weeks, you were a favorite of your ruler, owing to brilliant service, excellent work, or personal favor. During that time, you enjoyed wealth and renown you never had before...and have not since. What was responsible for your time in the sun?",
                "Regrets",
                14),
            new StoryModel(
                "Tutored by a Noble",
                "Whether as punishment or practice, a minor lord’s child was tasked with teaching you some points of your craft. This relationship blossomed into a heartfelt friendship, despite the gap in your relative social standing. How do you both honor that bond as adults?",
                "Patronage or Nemesis",
                17),
            new StoryModel(
                "Witnessed Atrocity",
                "Power is held by ruthlessly crushing those who dare dream of taking it away. In your early years, you stood by as your ruler made an example of an enemy. The horror of those hours haunts you to this day. What did you witness? ",
                "Scarred by Horror",
                20),
        ],
        [Caste.Feral]: [
            new StoryModel(
                "Defeated a Great Beast",
                "In your youth, a great hunter stalked your region of the wild. It might have been a particularly ferocious bear or cat, a monstrosity left over from forgotten times, or even a supernatural horror summoned and escaped. Despite being smaller and weaker, you outwitted your foe and emerged victorious. What did you kill and how did you trick it? What scars do you wear with obvious pride?",
                "Proud",
                3),
            new StoryModel(
                "Forest Fire",
                "Though they are part of the natural order of the world, there is nothing natural seeming about a wildfire to those animals caught in it. When flame took your home and sent your friends fleeing, you ran alongside them. No matter what happened to you afterward, fire remained your most terrible and ruinous enemy and you live with a healthy respect for its power. What did you witness as walls of flame surrounded you?",
                "Pyrophobic",
                6),
            new StoryModel(
                "Hunted by Man",
                "Hunters from a nearby village discovered your existence when you were still small, and you became a target for their sport. As you grew, your legend changed. What was once a coveted quarry became a respected opponent, and finally a feared ravager to those willing to brave your territory. What was the closest they ever came to defeating you? How did you survive?",
                "Vengeance",
                10),
            new StoryModel(
                "Mighty Patron",
                "A great beast in your part of the wild took you in, either when you first became one with the forest or some time thereafter. Their protection and patronage was the central fact of your upbringing, giving you pride and something to measure yourself against. It also made you a target when you weren’t in the shadow of your powerful friend. Your protector and parent is long dead now, but you do not forget their teachings. What manner of creature was it? How do you honor their memory today?",
                "Valorous",
                14),
            new StoryModel(
                "One of the Pack",
                "From your earliest memories, you ran with a group of wolves, deer, or other pack animals who raised you as their own. This upbringing was less lonely than it might have been, but as you became more aware of your own form and mind, the differences between you and your brothers and sisters wore hard on you. Eventually you left the pack to make your way as a human being. What were your first impressions of civilization?",
                "Animal Lover",
                17),
            new StoryModel(
                "Shadow of Civilization",
                "The wild places of the world are dotted with the remains of cities and temples long forgotten, generations before the foundations of existing metropolises were lain. You grew up among the vines and creepers of such a place, sleeping in ancient bowers and exploring the secret places of peoples whose very ghosts are ancient. What was the uncanniest thing you discovered in your ramblings? What token of them do you carry with you?",
                "Ancient Secrets",
                20),
        ],
        [Caste.Savage]: [
            new StoryModel(
                "Cast Out",
                "Not long after you reached an age to be responsible for your own deeds, you were accused of an act so heinous death was the traditional sentence. Due to your youth, some friends of your family moved the elders to sentence you instead to exile. You left your home with a week’s worth of food, the clothes on your back, and a single weapon. What act were you accused of? Were you actually guilty?",
                "Cast Aside",
                3),
            new StoryModel(
                "Displaced",
                "Whether from natural catastrophe, changes in herds or forage, invasion, or some other factor, your people were forced to leave their homeland and eke out their existence in unfamiliar territories. You witnessed the fear, deprivation, and changes firsthand. This might have been responsible for your striking out on your own, or you may have chosen not to leave with them in the first place. What moved your people from their ancestral range? How did it affect you personally?",
                "Vengeful",
                6),
            new StoryModel(
                "Participated in Raids",
                "Your people derived some of their sustenance from raiding the softer, more civilized farms and settlements at the edges of your range. You participated in such raids, killing and looting as enthusiastically as your kinsfolk. The lust for adventure and bloodshed never left you, though you are long separated from that life. What was the greatest raid you ever joined?",
                "Adventurous",
                10),
            new StoryModel(
                "Taken by Outsiders",
                "Raiders from other lands set upon your people and took some of you with them. This might have been a slave raid, an attempt to horrify and subdue your people, or even a well-intended attempt to civilize the children of an uncivilized clan. Whatever the reason, what came next was a swift education in brutality and assimilation. You never forgot your homeland, nor forgave those who took you. How did you survive your first year? What depths did you sink to?",
                "Divided Family",
                14),
            new StoryModel(
                "Wrath of Nature",
                "You survived a natural catastrophe of one kind or another: an earthquake, tornado, drought, flood, tidal wave, volcanic eruption, or similar event. Its impact on your people was profound, and not just in the immediate waves of death and destruction. It changed the land you lived on for decades, forcing your people to change along with it. How did your people change? Did you welcome or lead the shifts, or was it part of what drove you away?",
                "Survivor",
                17),
            new StoryModel(
                "Young Shaman",
                "As a small child, your tribe’s shaman identified you as touched by the spirits of your region. You were elevated to shamanic status and spent years schooled in the ways of your animistic religion. You learned to read the will of great spirits in the motions of the wind, and the changing of the seasons, and how to read omens in the spoor of dead animals found on game trails. When you left the tribe, did you take the traditions with you? Or did you spurn your smaller gods just as you spurned the people of your birth?",
                "Pious",
                20),
        ],
        //[Caste.]: [
        //    new StoryModel(
        //        "",
        //        "",
        //        "",
        //        3),
        //    new StoryModel(
        //        "",
        //        "",
        //        "",
        //        6),
        //    new StoryModel(
        //        "",
        //        "",
        //        "",
        //        10),
        //    new StoryModel(
        //        "",
        //        "",
        //        "",
        //        14),
        //    new StoryModel(
        //        "",
        //        "",
        //        "",
        //        17),
        //    new StoryModel(
        //        "",
        //        "",
        //        "",
        //        20),
        //],
    };

    private _cultStories: StoryModel[] = [
        new StoryModel(
            "Chosen at Birth",
            "Soon after your birth, even while swaddled in the shawl of your mother, the local holy man, priest or sage, pointed at you and announced that you were special to the god you have come to worship. Whether this story is true or not, you cannot remember, but your parents always maintained that you have been chosen by the god and will fulfill some great destiny. It might not feel much like it, but you are certain that, someday, you will achieve this great expectation.",
            "Chosen One",
            603),
        new StoryModel(
            "This Birthmark on My Skin",
            "It is nothing to look at, in truth. Nothing to display. A small patch of discolored skin. Perhaps it is on your thigh, beneath your arm or covered by the hair on your scalp. But you know it means something; in one of the holy texts or icons of your faith, you have seen its exact replica. A small mark, a sign of the god which both explains your belief and devotion to the god’s cult. What does it mean, this strange correspondence with your cult’s practices? Is this a blessing or a curse? And do others around you hold to the same belief, or must you keep your conviction silent to avoid accusations of heresy?",
            "Marked",
            606),
        new StoryModel(
            "A Vision in the Darkness",
            "At some point in your past, you were seized by paroxysms, fits, and agonizing headaches. As you struggled, prostrate and insensible, your mind was elsewhere. Granted a vision of or by your god, you were able to see things as they are yet to be or might one day become. Whether these were visions of a heaven or of hell, only you are aware. What these visions have given you is the truth of the world and of your place in it. As a result, you can fling yourself into battle without fear — either you will be saved, or you are already doomed. What you saw exactly is for you to decide but it was surely filled with other details which you have yet to begin to unravel.",
            "Reckless",
            610),
        new StoryModel(
            "Witnessed a Miracle",
            "The dead man lay, supine and broken, before you. Flies had already started to settle on him, probing at his cracked lips and irrevocably closed eyes. Until that woman pressed her hands to the side of his face, opened his mouth and with a flicker of hands and fingers, restored him to life. Since that day, you have been especially alert to the spoor of the unnatural, the aura which gods and spirits and demons leave behind. Has this led you into danger as you pursue secret knowledge? Do you hanker to possess the same powers yourself? Was the miracle you saw even sorcery, or merely the application of a science you do not yet understand?",
            "Witness",
            614),
        new StoryModel(
            "Persecution",
            "Were you a member of the cult then, or merely in unfortunate proximity when the persecutions began in earnest? It did not matter to the soldiers and priests who came to your village or township, their weapons gleaming and their torches burning brightly. Perhaps you lost friends and family in that raid, perhaps it was only a sense of grievance that such depredations could be carried out in the name of a god or against a people so innocuous as those who belong to the cult they attacked, but this fired your belief. Now you are a member of the persecuted. Do you seek vengeance and against whom? What will you do once you have it? And how far will you go to secure it?",
            "Paranoia",
            617),
        new StoryModel(
            "Vindication",
            "Mocked, vilified, and maybe even cast out. You were considered to have misunderstood a key element of your cult’s belief system or religious texts. Others whispered that you came close to blasphemy. But now, through fate or fortunate circumstance, you have been proved right! Whatever happens next, you have the satisfaction of knowing that you are greater in learning than your fellows, whatever they might have thought. What aspect of your belief has been so thoroughly vindicated? What does it mean for your relationship with other members of your faith? And what will you do, now that you have become a figure of note — attracting both followers and dangerous enemies?",
            "Pride",
            620),
    ];

    getStories(caste: Caste) {
        var stories: StoryViewModel[] = [];
        for (var i = 0; i < this._stories[caste].length; i++) {
            var st = this._stories[caste][i];

            if (st.name === "Ambition Rewarded") {
                stories.push(new StoryViewModel(st.roll, new StoryModel(st.name + " (Adept)", st.description, st.trait, st.roll)));
                stories.push(new StoryViewModel(st.roll, new StoryModel(st.name + " (Overseer)", st.description, st.trait, st.roll)));
                stories.push(new StoryViewModel(st.roll, new StoryModel(st.name + " (High Priest)", st.description, st.trait, st.roll)));
            }
            else {
                stories.push(new StoryViewModel(st.roll, st));
            }
        }

        return stories;
    }

    getCultStories() {
        var stories: StoryViewModel[] = [];
        for (var i = 0; i < this._cultStories.length; i++) {
            var st = this._cultStories[i];
            stories.push(new StoryViewModel(st.roll, st));
        }
        return stories;
    }

    getStory(id: number) {
        if (id >= 600 && id <= 620) {
            return this._cultStories.filter(s => s.roll === id)[0];
        }

        for (var i = 0; i < this._stories[character.caste].length; i++) {
            var story = this._stories[character.caste][i];
            if (story.roll === id) {
                return story;
            }
        }
    }

    getStoryForRoll(roll: number) {
        for (var i = 0; i < this._stories[character.caste].length; i++) {
            var story = this._stories[character.caste][i];
            if (story.roll >= roll) {
                return story;
            }
        }
    }

    generateStory() {
        var roll = Math.floor(Math.random() * 20) + 1;
        for (var i = 0; i < this._stories[character.caste].length; i++) {
            var story = this._stories[character.caste][i];
            if (story.roll >= roll) {
                if (story.name === "Ambition Rewarded") {
                    roll = Math.floor(Math.random() * 18) + 1;
                    if (roll <= 7) {
                        return new StoryViewModel(story.roll, new StoryModel(story.name + " (Adept)", story.description, story.trait, story.roll));
                    }
                    else if (roll <= 7) {
                        return new StoryViewModel(story.roll, new StoryModel(story.name + " (Overseer)", story.description, story.trait, story.roll));
                    }
                    else {
                        return new StoryViewModel(story.roll, new StoryModel(story.name + " (High Priest)", story.description, story.trait, story.roll));
                    }
                }
                else {
                    return story;
                }
            }
        }
    }

    generateCultStory() {
        var roll = (Math.floor(Math.random() * 20) + 1) + 600;
        for (var i = 0; i < this._cultStories.length; i++) {
            var story = this._cultStories[i];
            if (story.roll >= roll) {
                return story;
            }
        } 
    }

    applyStory(id: number) {
        var story = this.getStory(id);
        character.story = story.name;
        character.trait = story.trait;
    }
}

export const StoriesHelper = new Stories();