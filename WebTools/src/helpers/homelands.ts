import {TalentModel, TalentsHelper}  from './talents';
import {character, Gender} from '../common/character';
import {Source} from './sources';

export enum HomeLand {
    Aquilonia,
    BossonianMarches,
    Keshan,
    Kush,
    Khoraja,
    Cimmeria,
    Hyperborea,
    BorderKingdom,
    Nordheim,
    Ophir,
    Koth,
    Argos,
    Gunderland,
    Brythunia,
    Nemedia,
    Zamora,
    Shem,
    Zingara,
    Corinthia,
    Stygia,
    Khauran,
    Zembabwei,
    Punt,
    TheBlackKingdoms,
    Darfar,
    Turan,
    Hyrkania,
    Iranistan,
    Vendhya,
    Khitai,
    Yuetshi,
    Zamboula,
    Zuagir,
    BarachaIsles,
    BlackCoast,
    Westermarck,
    Ghulistan,
    Kosala,
    Kordafan,
    Tombalku,
    Xuchotl,

    // Kull
    Atlantis,
    IslesOfThePicts,
    Commoria,
    Thule,
    Kamelia,
    Valusia,
    Farsun,
    Verulia,
    Zarfhaana,
    Thurania,
    Grondar,
    Lemuria,
    ElderStygia,
}

class HomelandModel {
    name: string;
    talent: TalentModel;
    languageOptions: string[];
    roll: number;
    source: Source;

    constructor(name: string, talent: TalentModel, languages: string[], roll: number, source: Source) {
        this.name = name;
        this.talent = talent;
        this.languageOptions = languages;
        this.roll = roll;
        this.source = source;
    }
}

class HomelandViewModel extends HomelandModel {
    id: HomeLand;

    constructor(id: HomeLand, base: HomelandModel) {
        super(base.name, base.talent, base.languageOptions, base.roll, base.source);
        this.id = id;
    }
}

export class Homelands {
    private _homeLands: { [id: number]: HomelandModel } = {
        [HomeLand.Aquilonia]: new HomelandModel("Aquilonia", TalentsHelper.getTalent("Cosmopolitan"), ["Aquilonian"], 7, Source.Core),
        [HomeLand.BossonianMarches]: new HomelandModel("Bossonian Marches", TalentsHelper.getTalent("Hunter"), ["Aquilonian"], 9, Source.Core),
        [HomeLand.Keshan]: new HomelandModel("Keshan", TalentsHelper.getTalent("Savage Court"), ["Keshani"], 10, Source.Core),
        [HomeLand.Kush]: new HomelandModel("Kush", TalentsHelper.getTalent("Strife"), ["Kushite"], 11, Source.Core),
        [HomeLand.Khoraja]: new HomelandModel("Khoraja", TalentsHelper.getTalent("Cosmopolitan"), ["Shemitish", "Kothic"], 12, Source.Core),
        [HomeLand.Cimmeria]: new HomelandModel("Cimmeria", TalentsHelper.getTalent("Hunter"), ["Cimmerian"], 13, Source.Core),
        [HomeLand.Hyperborea]: new HomelandModel("Hyperborea", TalentsHelper.getTalent("Savage Court"), ["Hyperborean"], 14, Source.Core),
        [HomeLand.BorderKingdom]: new HomelandModel("Border Kingdom", TalentsHelper.getTalent("Strife"), ["Nemedian", "Hyperborean"], 15, Source.Core),
        [HomeLand.Nordheim]: new HomelandModel("Nordheim", TalentsHelper.getTalent("Winter-born"), ["Nordheimer"], 16, Source.Core),
        [HomeLand.Ophir]: new HomelandModel("Ophir", TalentsHelper.getTalent("Gilded"), ["Ophirean"], 17, Source.Core),
        [HomeLand.Koth]: new HomelandModel("Koth", TalentsHelper.getTalent("Strife"), ["Kothic"], 18, Source.Core),
        [HomeLand.Argos]: new HomelandModel("Argos", TalentsHelper.getTalent("Sea Raider"), ["Argossean"], 19, Source.Core),
        [HomeLand.Gunderland]: new HomelandModel("Gunderland", TalentsHelper.getTalent("Hunter"), ["Aquilonian"], 20, Source.Core),
        [HomeLand.Brythunia]: new HomelandModel("Brythunia", TalentsHelper.getTalent("Cosmopolitan"), ["Brythunian"], 21, Source.Core),
        [HomeLand.Nemedia]: new HomelandModel("Nemedia", TalentsHelper.getTalent("Cosmopolitan"), ["Nemedian"], 22, Source.Core),
        [HomeLand.Zamora]: new HomelandModel("Zamora", TalentsHelper.getTalent("Honest Corruption"), ["Zamorian"], 23, Source.Core),
        [HomeLand.Shem]: new HomelandModel("Shem", TalentsHelper.getTalent("Strife"), ["Shemitish"], 24, Source.Core),
        [HomeLand.Zingara]: new HomelandModel("Zingara", TalentsHelper.getTalent("Sea Raider"), ["Zingaran"], 25, Source.Core),
        [HomeLand.Corinthia]: new HomelandModel("Corinthia", TalentsHelper.getTalent("Strife"), ["Corinthian"], 26, Source.Core),
        [HomeLand.Stygia]: new HomelandModel("Stygia", TalentsHelper.getTalent("Desert-born"), ["Stygian"], 27, Source.Core),
        [HomeLand.Khauran]: new HomelandModel("Khauran", TalentsHelper.getTalent("Cosmopolitan"), ["Shemitish", "Kothic"], 28, Source.Core),
        [HomeLand.Zembabwei]: new HomelandModel("Zembabwei", TalentsHelper.getTalent("Desert-born"), ["Zembabwein"], 29, Source.Core),
        [HomeLand.Punt]: new HomelandModel("Punt", TalentsHelper.getTalent("Gilded"), ["Punt"], 30, Source.Core),
        [HomeLand.TheBlackKingdoms]: new HomelandModel("The Black Kingdoms", TalentsHelper.getTalent("Strife"), ["Kushite", "Darfari", "Keshani", "Punt"], 31, Source.Core),
        [HomeLand.Darfar]: new HomelandModel("Darfar", TalentsHelper.getTalent("Savage Court"), ["Darfari"], 32, Source.Core),
        [HomeLand.Turan]: new HomelandModel("Turan", TalentsHelper.getTalent("Gilded"), ["Turanian"], 34, Source.Core),
        [HomeLand.Hyrkania]: new HomelandModel("Hyrkania", TalentsHelper.getTalent("Of Saddle and Bow"), ["Hyrkanian"], 36, Source.Core),
        [HomeLand.Iranistan]: new HomelandModel("Iranistan", TalentsHelper.getTalent("Desert-born"), ["Iranistani"], 38, Source.Core),
        [HomeLand.Vendhya]: new HomelandModel("Vendhya", TalentsHelper.getTalent("Gilded"), ["Vendhyan"], 39, Source.Core),
        [HomeLand.Khitai]: new HomelandModel("Khitai", TalentsHelper.getTalent("Savage Court"), ["Khitan"], 40, Source.Core),
        [HomeLand.Yuetshi]: new HomelandModel("Yuetshi", TalentsHelper.getTalent("Sea Raider"), ["Yuetshi"], 99, Source.Brigand),
        [HomeLand.Zamboula]: new HomelandModel("Zamboula", TalentsHelper.getTalent("Cosmopolitan"), ["Turanian", "Shemitish"], 99, Source.Brigand),
        [HomeLand.Zuagir]: new HomelandModel("Zuagir", TalentsHelper.getTalent("Desert-born"), ["Zuagir"], 99, Source.Brigand),
        [HomeLand.BarachaIsles]: new HomelandModel("The Baracha Isles", TalentsHelper.getTalent("Sea Raider"), ["Argossean", "Zingaran"], 99, Source.Pirate),
        [HomeLand.BlackCoast]: new HomelandModel("The Black Coast", TalentsHelper.getTalent("Strife"), ["Kushite", "Keshan", "Punt", "Darfari"], 99, Source.Pirate),
        [HomeLand.Westermarck]: new HomelandModel("Westermarck", TalentsHelper.getTalent("Hunter"), ["Aquilonian"], 99, Source.Scout),
        [HomeLand.Ghulistan]: new HomelandModel("Ghulistan", TalentsHelper.getTalent("Desert-born"), ["Afghuli"], 99, Source.Wanderer),
        [HomeLand.Kosala]: new HomelandModel("Kosala", TalentsHelper.getTalent("Cosmopolitan"), ["Kosalan"], 99, Source.Wanderer),
        [HomeLand.Kordafan]: new HomelandModel("Kordafan", TalentsHelper.getTalent("Hunter"), ["Kordafani"], 99, Source.Adventurer),
        [HomeLand.Tombalku]: new HomelandModel("Tombalku", TalentsHelper.getTalent("Honest Corruption"), ["Tombalkan"], 99, Source.Adventurer),
        [HomeLand.Xuchotl]: new HomelandModel("Xuchotl", TalentsHelper.getTalent("Strife"), ["Xuchotli"], 99, Source.Adventurer),

        [HomeLand.Atlantis]: new HomelandModel("Atlantis", null, ["Atlantean"], 3, Source.Kull),
        [HomeLand.IslesOfThePicts]: new HomelandModel("Kaa-u, Isles of the Picts", TalentsHelper.getTalent("Savage Court"), ["Pictish"], 5, Source.Kull),
        [HomeLand.Commoria]: new HomelandModel("Commoria", TalentsHelper.getTalent("Faded Glory"), ["Commorian"], 8, Source.Kull),
        [HomeLand.Thule]: new HomelandModel("Thule", TalentsHelper.getTalent("Decadent"), ["Thulian"], 10, Source.Kull),
        [HomeLand.Kamelia]: new HomelandModel("Kamelia", TalentsHelper.getTalent("Decadent"), ["Kamelian"], 13, Source.Kull),
        [HomeLand.Valusia]: new HomelandModel("Valusia", TalentsHelper.getTalent("Cosmopolitan"), ["Valusian"], 21, Source.Kull),
        [HomeLand.Farsun]: new HomelandModel("Farsun", TalentsHelper.getTalent("Resplendent"), ["Old Tongue"], 24, Source.Kull),
        [HomeLand.Verulia]: new HomelandModel("Verulia", TalentsHelper.getTalent("Treacherous"), ["Verulian"], 27, Source.Kull),
        [HomeLand.Zarfhaana]: new HomelandModel("Zarfhaana", TalentsHelper.getTalent("Pastoral"), ["Lost Tongue"], 30, Source.Kull),
        [HomeLand.Thurania]: new HomelandModel("Thurania", TalentsHelper.getTalent("Savage Court"), ["Lost Tongue"], 33, Source.Kull),
        [HomeLand.Grondar]: new HomelandModel("Grondar", TalentsHelper.getTalent("Of Saddle and Bow"), ["Grond"], 36, Source.Kull),
        [HomeLand.Lemuria]: new HomelandModel("Lemuria", TalentsHelper.getTalent("Sea Raider"), ["Lemurian"], 38, Source.Kull),
        [HomeLand.ElderStygia]: new HomelandModel("Elder Stygia", TalentsHelper.getTalent("Desert Born"), ["Lost Tongue"], 40, Source.Kull),
    };

    private _regions: { [id: number]: string[] } = {
        [HomeLand.Nordheim]: ["Asgard", "Vanaheim"],
        [HomeLand.Iranistan]: ["Iranistan", "Afghulistan"]
    };

    private _maleNames: { [id: number]: string[] } = {
        [HomeLand.Aquilonia]: ["Aelius", "Annaeus", "Casca", "Cassius", "Crassus", "Decius", "Gaius", "Galen", "Martius", "Octavian", "Otho", "Publius", "Quintas", "Severus", "Servius", "Sulla", "Tiberio", "Tullius", "Varro"],
        [HomeLand.Gunderland]: ["Aelius", "Casca", "Cassius", "Gaius", "Galen", "Octavian", "Quintas", "Severus", "Sulla", "Tiberio", "Varro", "Alpheus", "Augustus", "Claudius", "Cyphus", "Darius", "Eamon", "Edmund", "Erastus", "Milo", "Tobias", "Ulric", "Vitus"],
        [HomeLand.BossonianMarches]: ["Aelius", "Casca", "Cassius", "Gaius", "Galen", "Octavian", "Quintas", "Severus", "Sulla", "Tiberio", "Varro", "Alpheus", "Augustus", "Claudius", "Cyphus", "Darius", "Eamon", "Edmund", "Erastus", "Milo", "Tobias", "Ulric", "Vitus"],
        [HomeLand.Westermarck]: ["Aelius", "Casca", "Cassius", "Gaius", "Galen", "Octavian", "Quintas", "Severus", "Sulla", "Tiberio", "Varro", "Alpheus", "Augustus", "Claudius", "Cyphus", "Darius", "Eamon", "Edmund", "Erastus", "Milo", "Tobias", "Ulric", "Vitus"],
        [HomeLand.Argos]: ["Abas", "Actaeon", "Agenor", "Anaxos", "Bracus", "Cepheus", "Davos", "Eteokles", "Gordius", "Hyllos", "Kallias", "Latos", "Leontis", "Lysandro", "Maro", "Nisus", "Oresus", "Stolos", "Theoros", "Tychaeus", "Tydeus"],
        [HomeLand.TheBlackKingdoms]: ["Adebayo", "Adedji", "Adeoye", "Amaku", "Amente", "Ayele", "Bengu", "Bunda", "Enanga", "Endale", "Kagale", "Kahero", "Kamara", "Kenyatta", "K'Gari", "Makara", "Mganga", "Mubale", "Mwando", "Nastasen", "N'Komo", "Okang", "Okunnu", "Shanaka", "Talharqa"],
        [HomeLand.Darfar]: ["Adebayo", "Adedji", "Adeoye", "Amaku", "Amente", "Ayele", "Bengu", "Bunda", "Enanga", "Endale", "Kagale", "Kahero", "Kamara", "Kenyatta", "K'Gari", "Makara", "Mganga", "Mubale", "Mwando", "Nastasen", "N'Komo", "Okang", "Okunnu", "Shanaka", "Talharqa"],
        [HomeLand.Keshan]: ["Adebayo", "Adedji", "Adeoye", "Amaku", "Amente", "Ayele", "Bengu", "Bunda", "Enanga", "Endale", "Kagale", "Kahero", "Kamara", "Kenyatta", "K'Gari", "Makara", "Mganga", "Mubale", "Mwando", "Nastasen", "N'Komo", "Okang", "Okunnu", "Shanaka", "Talharqa"],
        [HomeLand.Kush]: ["Adagala", "Adebayo", "Adedji", "Adeoye", "Amaku", "Amente", "Ayele", "Bengu", "Bunda", "Enanga", "Endale", "Kagale", "Kahero", "Kamara", "Karanja", "Kashta", "Kassaye", "Kenyatta", "K'Gari", "Khama", "Makara", "Matano", "Mayanja", "Mganga", "Morake", "Mshila", "Mubale", "Mwando", "Mwangi", "Nastasen", "N'Komo", "Okang", "Okondo", "Okunnu", "Shanaka", "Talharqa", "Zenyami"],
        [HomeLand.Punt]: ["Adebayo", "Adedji", "Adeoye", "Amaku", "Amente", "Ayele", "Bengu", "Bunda", "Enanga", "Endale", "Kagale", "Kahero", "Kamara", "Kenyatta", "K'Gari", "Makara", "Mganga", "Mubale", "Mwando", "Nastasen", "N'Komo", "Okang", "Okunnu", "Shanaka", "Talharqa"],
        [HomeLand.Zembabwei]: ["Adebayo", "Adedji", "Adeoye", "Amaku", "Amente", "Ayele", "Bengu", "Bunda", "Enanga", "Endale", "Kagale", "Kahero", "Kamara", "Kenyatta", "K'Gari", "Makara", "Mganga", "Mubale", "Mwando", "Nastasen", "N'Komo", "Okang", "Okunnu", "Shanaka", "Talharqa"],
        [HomeLand.BorderKingdom]: ["Agron", "Edgard", "Gavril", "Guri", "Ilian", "Ivo", "Korvin", "Rikard", "Vidian", "Vulko", "Alexius", "Bartold", "Caius", "Cyril", "Danilo", "Demetrius", "Elerius", "Gaulus", "Jaromir", "Julian", "Ludwik", "Nikodemos", "Orrick", "Sidor", "Teodor"],
        [HomeLand.Brythunia]: ["Achila", "Alaric", "Braga", "Finnian", "Gaiseric", "Gilduin", "Golven", "Griffeth", "Hunulf", "Jagor", "Kervran", "Kireg", "Kormark", "Lennick", "Maddock", "Morvand", "Pierig", "Prothro", "Segalen", "Sigeric", "Sisbert", "Tadek", "Telor", "Theodoric", "Valamir", "Videric", "Watkin"],
        [HomeLand.Cimmeria]: ["Aidan", "Balor", "Caith", "Cormac", "Donal", "Ethain", "Ingol", "Liath", "Niall", "Roark", "Ronan", "Tuathal", "Amergin", "Ardagh", "Brachan", "Bran", "Brath", "Ciaran", "Conn", "Cruiadh", "Declan", "Dermod", "Eithriall", "Ethain", "Geraint", "Giallchadh", "Idenach", "Ingol", "Liam", "Mael", "Othna", "Partha", "Turlogh", "Vulmea"],
        [HomeLand.Corinthia]: ["Adelmo", "Ambrosius", "Ambrus", "Anatar", "Borus", "Casca", "Drusus", "Gaius", "Gorgar", "Hegerus", "Horvath", "Kordes", "Latka", "Lillus", "Lucan", "Mallus", "Makar", "Milonas", "Orban", "Petrus", "Servius", "Titus", "Vasmus", "Zalvatos"],
        [HomeLand.Hyperborea]: ["Arno", "Dobromil", "Durko", "Dusan", "Jarek", "Karel", "Marek", "Radek", "Velek", "Zoryn", "Alyosha", "Borna", "Boroda", "Drago", "Drazan", "Goran", "Gothric", "Henrik", "Miron", "Nazar", "Neven", "Rurik", "Taras", "Vasa", "Vasyl", "Vedran", "Vilad", "Vitomir", "Yarok", "Ziven"],
        [HomeLand.Hyrkania]: ["Altan", "Borogul", "Bourtai", "Chatagai", "Dashyin", "Galdan", "Gunsem", "Kassar", "Ketei", "Khaidu", "Khlaiun", "Magnai", "Nergul", "Ong", "Oqotur", "Qadan", "Tuqu", "Uliac", "Ulugan", "Yesukai", ],
        [HomeLand.Iranistan]: ["Ahmad", "Amir", "Arash", "Ashkan", "Babak", "Ervin", "Haroun", "Hasaan", "Ibrahim", "Izard", "Javad", "Khalid", "Khemais", "Mahmud", "Mazdak", "Ormazd", "Sabah", "Shahin", "Vahid", "Wakim", "Zand"],
        [HomeLand.Khitai]: ["Abahai", "Cheuk", "Cheung", "Duma", "Guan", "Guang", "Hsien", "Heshen", "Jian", "Khosho", "Khai", "Kogen", "Kuan", "Lizhu", "Quan", "Shan", "Tenji", "Tsang", "Vertai", "Wen", "Zhang", "Zhou"],
        [HomeLand.Koth]: ["Armenius", "Aris", "Florian", "Leontius", "Lothar", "Maurus", "Ovidio", "Palladius", "Tiberius", "Vetranis"],
        [HomeLand.Nemedia]: ["Alesso", "Aractus", "Armatius", "Attalus", "Bruccus", "Castus", "Cyril", "Dorian", "Fauthis", "Galarius", "Galenus", "Hektor", "Isidor", "Karthis", "Larellis", "Lucius", "Maximus", "Melitius", "Peddollus", "Quintus", "Septaius", "Sevarus", "Symeon", "Tiberias", "Tranicus"],
        [HomeLand.Ophir]: ["Alesso", "Aractus", "Armatius", "Attalus", "Bruccus", "Castus", "Cyril", "Dorian", "Fauthis", "Galarius", "Galenus", "Hektor", "Isidor", "Karthis", "Larellis", "Lucius", "Maximus", "Melitius", "Peddollus", "Quintus", "Septaius", "Sevarus", "Symeon", "Tiberias", "Tranicus"],
        [HomeLand.Nordheim]: ["Asgrim", "Brand", "Egil", "Einar", "Gunnar", "Haakon", "Hrolf", "Mord", "Niall", "Sigurd", "Starkad", "Edrik", "Grimm", "Hafdan", "Halvard", "Harek", "Hauk", "Hialmar", "Horsa", "Kalf", "Leif", "Mimir", "Niord", "Olaf", "Rane", "Ranulf", "Thorgrim", "Ulf", "Valgard", "Vidar", "Wulfhere"],
        [HomeLand.Shem]: ["Abibaal", "Agga", "Ahaz", "Aram", "Elam", "Hanud", "Ibni-Addu", "Megalaros", "Melech", "Musa", "Naram-Sin", "Ninsun", "Ninus", "Obares", "Sargon", "Shopak", "Turbaza", "Ur-Nammu", "Zabdas", "Zabium"],
        [HomeLand.Khoraja]: ["Aram", "Elam", "Hanud", "Melech", "Musa", "Ninsun", "Obares", "Sargon", "Zabium"],
        [HomeLand.Khauran]: ["Agenor", "Aram", "Asander", "Attalus", "Darius", "Elam", "Gorius", "Hanud", "Kossos", "Magos", "Melech", "Musa", "Ninsun", "Obares", "Pharnaces", "Phineus", "Sargon", "Tolmos", "Zabium"],
        [HomeLand.Stygia]: ["Amenakht", "Amen-Ophis", "Anen", "Apophis", "Hapu-Seneb", "Harkouf", "Harnakhte", "Hemaka", "Hetep-Sekhem", "Inarus", "Kenamun", "Khephren", "Khonsa", "Menmet-Ra", "Panas", "Penamun", "Ptah-Hotep", "Rahotep", "Sa-Nekht", "Semer-Teph", "Seostris"],
        [HomeLand.Turan]: ["Abdal", "Ahmet", "Alî", "Aslan", "Azim", "Bazarlu", "Burak", "Damad", "Davud", "Dogan", "Eyne", "Halil", "Hasan", "Irfan", "Ishak", "Ishan", "Karaka", "Kasîm", "Kemal", "Mahmut", "Murad", "Muta", "Nazim", "Osman", "Sadik", "Yegen", "Ömru",],
        [HomeLand.Vendhya]: ["Arun", "Asha", "Ashok", "Ashtikar", "Ayush", "Chandra", "Harnath", "Hashan", "Jatayu", "Kishan", "Madhava", "Murali", "Naresh", "Raghavan", "Ramesh", "Ruwan", "Santosh", "Sardar", "Suresh", "Vinay"],
        [HomeLand.Zamora]: ["Abdullah", "Ashari", "Darvish", "Dharsin", "Fatari", "Hamal", "Hamid", "Hoonam", "Hazir", "Ibrahim", "Kameen", "Malir", "Maraphis", "Pelagon", "Rubihir", "Razavi", "Sakara", "Salabus", "Sargis", "Sorna", "Tolmos", "Xanthes", "Zafar", "Zakosa", "Zamehr"],
        [HomeLand.Zingara]: ["Allande", "Amadeo", "Arano", "Arianod", "Alfonso", "Baltasar", "Belasco", "Dario", "Elazar", "Fausto", "Flavio", "Gergori", "Isidro", "Lazero", "Luciano", "Marcelo", "Nunio", "Rodrigo", "Rogellio", "Silvio", "Teodoro", "Valerio"],
        [HomeLand.Yuetshi]: ["Aru-Palaka", "Balaputra", "Daksa", "Hatta", "Kertajaya", "Kundugga", "Paku", "Sarwono", "Sinduk", "Tunku"],
        [HomeLand.Zamboula]: ["Ahmad", "Danush", "Esmaeel", "Ghaffar", "Hami", "Hassan", "Javad", "Milad", "Navid", "Yadullah"],
        [HomeLand.Zuagir]: ["Abbas", "Gula", "Irgen", "Issam", "Khaled", "Massin", "Salim", "Tariq", "Uzmir", "Yidir"],
        [HomeLand.BarachaIsles]: ["Abas", "Actaeon", "Agenor", "Anaxos", "Bracus", "Cepheus", "Davos", "Eteokles", "Gordius", "Hyllos", "Kallias", "Latos", "Leontis", "Lysandro", "Maro", "Nisus", "Oresus", "Stolos", "Theoros", "Tychaeus", "Tydeus", "Allande", "Amadeo", "Arano", "Arianod", "Alfonso", "Baltasar", "Belasco", "Dario", "Elazar", "Fausto", "Flavio", "Gergori", "Isidro", "Lazero", "Luciano", "Marcelo", "Nunio", "Rodrigo", "Rogellio", "Silvio", "Teodoro", "Valerio"],
        [HomeLand.BlackCoast]: ["Adebayo", "Adedji", "Adeoye", "Amaku", "Amente", "Ayele", "Bengu", "Bunda", "Enanga", "Endale", "Kagale", "Kahero", "Kamara", "Kenyatta", "K'Gari", "Makara", "Mganga", "Mubale", "Mwando", "Nastasen", "N'Komo", "Okang", "Okunnu", "Shanaka", "Talharqa", "Adagala", "Adebayo", "Adedji", "Adeoye", "Amaku", "Amente", "Ayele", "Bengu", "Bunda", "Enanga", "Endale", "Kagale", "Kahero", "Kamara", "Karanja", "Kashta", "Kassaye", "Kenyatta", "K'Gari", "Khama", "Makara", "Matano", "Mayanja", "Mganga", "Morake", "Mshila", "Mubale", "Mwando", "Mwangi", "Nastasen", "N'Komo", "Okang", "Okondo", "Okunnu", "Shanaka", "Talharqa", "Zenyami"],
        [HomeLand.Ghulistan]: ["Aarash", "Aazar", "Badeed", "Farjaad", "Gulrez", "Isaad", "Jaah", "Lodhi", "Mirwais", "Shahmeer", "Yar"],
        [HomeLand.Kosala]: ["Ahen", "Azarah", "Bota", "Canto", "Fendi", "Hanud", "Qalandar", "Rabaani", "Wase", "Zabdas"],
    };

    private _femaleNames: { [id: number]: string[] } = {
        [HomeLand.Aquilonia]: ["Arria", "Aurelia", "Augusta", "Balbina", "Celaena", "Claudia", "Delia", "Domita", "Emilia", "Fulvia", "Hypatia", "Lavinia", "Livia", "Lucilla", "Magia", "Orbania", "Porcia", "Portia", "Vibia", "Vispania"],
        [HomeLand.Gunderland]: ["Arria", "Aurelia", "Claudia", "Delia", "Emilia", "Hypatia", "Lavinia", "Livia", "Portia", "Vibia", "Adria", "Allis", "Annis", "Camilla", "Delia", "Elida", "Genny", "Isanna", "Jennet", "Lydia", "Serenne", "Varina", "Weltha", "Wenefrid"],
        [HomeLand.BossonianMarches]: ["Arria", "Aurelia", "Claudia", "Delia", "Emilia", "Hypatia", "Lavinia", "Livia", "Portia", "Vibia", "Adria", "Allis", "Annis", "Camilla", "Delia", "Elida", "Genny", "Isanna", "Jennet", "Lydia", "Serenne", "Varina", "Weltha", "Wenefrid"],
        [HomeLand.Westermarck]: ["Arria", "Aurelia", "Claudia", "Delia", "Emilia", "Hypatia", "Lavinia", "Livia", "Portia", "Vibia", "Adria", "Allis", "Annis", "Camilla", "Delia", "Elida", "Genny", "Isanna", "Jennet", "Lydia", "Serenne", "Varina", "Weltha", "Wenefrid"],
        [HomeLand.Argos]: ["Aglia", "Althaia", "Anysia", "Arene", "Charis", "Cilissa", "Cythonia", "Danae", "Demetria", "Diomenia", "Helice", "Ianessa", "Ianthe", "Ismene", "Leda", "Melita", "Nyssa", "Roxanne", "Sophia", "Thetis", "Zita"],
        [HomeLand.TheBlackKingdoms]: ["Aluna", "Asminia", "Ayana", "Behare", "Chanya", "Dalila", "Erza", "Hamere", "Iras", "Kanika", "Katura", "Kenyetta", "Maiba", "Massassi", "Micere", "Mirembe", "Nagesa", "Nehanda", "Nmambi", "Ntara", "Ntuli", "Nyanath", "Qalhata", "Saba", "Sala", "Sudati", "Zensele"],
        [HomeLand.Darfar]: ["Aluna", "Asminia", "Ayana", "Behare", "Chanya", "Dalila", "Erza", "Hamere", "Iras", "Kanika", "Katura", "Kenyetta", "Maiba", "Massassi", "Micere", "Mirembe", "Nagesa", "Nehanda", "Nmambi", "Ntara", "Ntuli", "Nyanath", "Qalhata", "Saba", "Sala", "Sudati", "Zensele"],
        [HomeLand.Keshan]: ["Aluna", "Asminia", "Ayana", "Behare", "Chanya", "Dalila", "Erza", "Hamere", "Iras", "Kanika", "Katura", "Kenyetta", "Maiba", "Massassi", "Micere", "Mirembe", "Nagesa", "Nehanda", "Nmambi", "Ntara", "Ntuli", "Nyanath", "Qalhata", "Saba", "Sala", "Sudati", "Zensele"],
        [HomeLand.Kush]: ["Aluna", "Asminia", "Ayana", "Behare", "Chanya", "Dalila", "Erza", "Ghida", "Ghnima", "Hamere", "Hasna", "Hassiba", "Iras", "Kanika", "Karimala", "Katura", "Kenyetta", "Maiba", "Massassi", "Micere", "Mirembe", "Nagesa", "Najet", "Nehanda", "Nezha", "Nmambi", "Ntara", "Ntuli", "Nyanath", "Qalhata", "Saba", "Sala", "Sudati", "Tafat", "Tanest", "Tiziri", "Wrina", "Zensele", "Zergha"],
        [HomeLand.Punt]: ["Aluna", "Asminia", "Ayana", "Behare", "Chanya", "Dalila", "Erza", "Hamere", "Iras", "Kanika", "Katura", "Kenyetta", "Maiba", "Massassi", "Micere", "Mirembe", "Nagesa", "Nehanda", "Nmambi", "Ntara", "Ntuli", "Nyanath", "Qalhata", "Saba", "Sala", "Sudati", "Zensele"],
        [HomeLand.Zembabwei]: ["Aluna", "Asminia", "Ayana", "Behare", "Chanya", "Dalila", "Erza", "Hamere", "Iras", "Kanika", "Katura", "Kenyetta", "Maiba", "Massassi", "Micere", "Mirembe", "Nagesa", "Nehanda", "Nmambi", "Ntara", "Ntuli", "Nyanath", "Qalhata", "Saba", "Sala", "Sudati", "Zensele"],
        [HomeLand.BorderKingdom]: ["Anila", "Edita", "Eliza", "Lillia", "Mara", "Mersada", "Petya", "Vlora", "Zabela", "Zana", "Ada", "Alena", "Aniela", "Dulcila", "Ewelina", "Galina", "Henryka", "Ilona", "Janina", "Lera", "Liliana", "Natalia", "Stefania", "Ula", "Ulidia", "Vanda"],
        [HomeLand.Brythunia]: ["Aliss", "Amiere", "Anja", "Anwyn", "Brynir", "Catelinne", "Cati", "Elfrida", "Estir", "Glynnis", "Greta", "Gweneth", "Hildegard", "Lina", "Lonore", "Maegan", "Merial", "Natasa", "Rhiann", "Sabri", "Sibille", "Sigrun", "Siriol", "Sunilda", "Thea", "Tonwen", "Ulrike", "Zlata"],
        [HomeLand.Cimmeria]: ["Adara", "Breanne", "Dianan", "Eithna", "Iorwen", "Maeve", "Marella", "Nuala", "Urith", "Wenna", "Aine", "Almaith", "Brigid", "Deirdre", "Derinn", "Eamhua", "Eanbotha", "Echna", "Erin", "Finella", "Fionna", "Grainne", "Mhaire", "Moira", "Muirgen", "Murainn", "Nessa", "Onora", "Riona", "Rotheachta", "Saoirse", "Slaine", "Tanith"],
        [HomeLand.Corinthia]: ["Atia", "Camilla", "Cirsten", "Cordelia", "Divina", "Evelina", "Idania", "Idola", "Indara", "Jarmila", "Kotas", "Luciana", "Martina", "Narcissa", "Rea", "Sabina", "Saffeera", "Sica", "Tiberia", "Valetis", "Veres", "Vinicia", "Xandra", "Yalena", "Zofia"],
        [HomeLand.Hyperborea]: ["Dobrila", "Draza", "Dusana", "Milena", "Neda", "Rhada", "Velina", "Vera", "Veruska", "Zora", "Amalia", "Anya", "Asenka", "Bruna", "Devora", "Inna", "Lada", "Luda", "Lyuba", "Mirra", "Nadya", "Nadysha", "Nyura", "Orlenda", "Petra", "Sveta", "Uliana", "Velika", "Vilna", "Zhanna"],
        [HomeLand.Hyrkania]: ["Ajurin", "Altani", "Botokhui", "Budan", "Cheren", "Davasuren", "Ereden", "Jaliqai", "Khorijin", "Nergui", "Nyam", "Nyima", "Ogtbish", "Oyun", "Saran", "Shria", "Targhun", "Terbish", "Toragana", "Udbal"],
        [HomeLand.Iranistan]: ["Adila", "Asra", "Ayele", "Banah", "Daifa", "Elhem", "Fadia", "Ghilya", "Haviva", "Izidar", "Karida", "Monira", "Myisha", "Nadia", "Naesa", "Nalyssa", "Samiha", "Sana", "Sureia", "Zohra"],
        [HomeLand.Khitai]: ["Fei", "Feiyan", "Hseu", "Hua", "Hui", "Jin-hua", "Lai", "Lian", "Liling", "Liu", "Mei", "Min", "Shu", "Sung", "Tse", "Xi-lan", "Xiao", "Yuan", "Yueh", "Zhao", "Zhi"],
        [HomeLand.Koth]: ["Amina", "Aniella", "Etheria", "Ghita", "Gianna", "Meloria", "Saria", "Savia", "Talita", "Zaira"],
        [HomeLand.Nemedia]: ["Althea", "Archaria", "Augusta", "Basina", "Calva", "Camilia", "Cyra", "Eudocia", "Festinia", "Genesia", "Herena", "Ionna", "Ismene", "Lecintia", "Lutatia", "Munia", "Nereida", "Nyssa", "Octavia", "Pasara", "Ripana", "Saesta", "Tadia", "Vesnia"],
        [HomeLand.Ophir]: ["Althea", "Archaria", "Augusta", "Basina", "Calva", "Camilia", "Cyra", "Eudocia", "Festinia", "Genesia", "Herena", "Ionna", "Ismene", "Lecintia", "Lutatia", "Munia", "Nereida", "Nyssa", "Octavia", "Pasara", "Ripana", "Saesta", "Tadia", "Vesnia"],
        [HomeLand.Nordheim]: ["Aldis", "Astrid", "Gerda", "Gudrun", "Gunnhild", "Helga", "Ingrid", "Sigrid", "Thora", "Thordis", "Aesa", "Agnis", "Bera", "Disa", "Eyrún", "Freya", "Frida", "Haldis", "Halla", "Hildigun", "Idunn", "Inga", "Nanna", "Ragnild", "Runa", "Signy", "Sigrun", "Thyra", "Ulla", "Urs"],
        [HomeLand.Shem]: ["Aishah", "Asiria", "Aya", "Elisheba", "Inanna", "Izevel", "Lilah", "Mariamne", "Maesa", "Nahrin", "Ninki", "Nira", "Nisaba", "Rina", "Samiria", "Semiramis", "Shira", "Siduri", "Silili", "Sufia", "Tanit", "Urshana", "Zahibi"],
        [HomeLand.Khoraja]: ["Asiria", "Inanna", "Lilah", "Nahrin", "Nira", "Rina", "Samiria", "Shira", "Sufia", "Urshana", "Zahibi"],
        [HomeLand.Khauran]: ["Amestris", "Atossa", "Asiria", "Badia", "Cypria", "Damaspia", "Gnaea", "Idonea", "Inanna", "Lilah", "Nahrin", "Nira", "Parmys", "Rina", "Samiria", "Shira", "Sufia", "Tomyris", "Urshana", "Viatrix", "Zahibi"],
        [HomeLand.Stygia]: ["Ahwere", "Amendiris", "Asenath", "Henut", "Herit", "Hesepti", "Inuhue", "Itakare", "Khamaat", "Khnemi", "Maatkare", "Maharet", "Mereret", "Nefertari", "Nehkbet", "Sekhmet", "Senebtisi", "Senet", "Sitre", "Taheret", "Timat", "Weret"],
        [HomeLand.Turan]: ["Adalet", "Bedia", "Cemile", "Damla", "Demet", "Dilara", "Emine", "Enise", "Ferah", "Halide", "Hayat", "Kamelya", "Marula", "Nadire", "Nadiye", "Nazan", "Nesrin", "Nevra", "Oya", "Rana", "Sabûr", "Semra", "Tanyeli", "Verda", "Yasemin", "Zehra"],
        [HomeLand.Vendhya]: ["Adhira", "Asira", "Bhaina", "Challa", "Devya", "Dulari", "Esha", "Gana", "Hemanti", "Indali", "Jhala", "Kali", "Kheli", "Mahika", "Mana", "Mira", "Nadia", "Oviya", "Savita", "Vimala"],
        [HomeLand.Zamora]: ["Amestris", "Adula", "Banu", "Behram", "Cawasi", "Cyra", "Fakkia", "Farim", "Govadia", "Izdihar", "Javadi", "Kabellah", "Kadin", "Lissa", "Namerian", "Natara", "Nuriya", "Rahna", "Sadiya", "Shapurana", "Shendi", "Tanit", "Veena", "Yamina"],
        [HomeLand.Zingara]: ["Adelina", "Alegria", "Anabela", "Aurelia", "Belicia", "Celina", "Eliana", "Esmerelda", "Estella", "Isabella", "Ligia", "Lucia", "Marcela", "Marisa", "Nidia", "Rosalia", "Sabina", "Talita", "Valentia", "Yolanda", "Zabaleta", "Zelia"],
        [HomeLand.Yuetshi]: ["Athula", "Hinni", "Meniki", "Meuitha", "Nimali", "Rasuna", "Sharath", "Siliidi", "Ulfah", "Yuvani"],
        [HomeLand.Zamboula]: ["Anahita", "Aziveh", "Azita", "Bita", "Farideh", "Gita", "Habibeh", "Haideh", "Mehri", "Nasim"],
        [HomeLand.Zuagir]: ["Anya", "Fariza", "Ghida", "Ghnima", "Mellila", "Tafat", "Tati", "Tazirit", "Tiziri", "Zamra"],
        [HomeLand.BarachaIsles]: ["Adelina", "Alegria", "Anabela", "Aurelia", "Belicia", "Celina", "Eliana", "Esmerelda", "Estella", "Isabella", "Ligia", "Lucia", "Marcela", "Marisa", "Nidia", "Rosalia", "Sabina", "Talita", "Valentia", "Yolanda", "Zabaleta", "Zelia", "Aglia", "Althaia", "Anysia", "Arene", "Charis", "Cilissa", "Cythonia", "Danae", "Demetria", "Diomenia", "Helice", "Ianessa", "Ianthe", "Ismene", "Leda", "Melita", "Nyssa", "Roxanne", "Sophia", "Thetis", "Zita"],
        [HomeLand.BlackCoast]: ["Aluna", "Asminia", "Ayana", "Behare", "Chanya", "Dalila", "Erza", "Hamere", "Iras", "Kanika", "Katura", "Kenyetta", "Maiba", "Massassi", "Micere", "Mirembe", "Nagesa", "Nehanda", "Nmambi", "Ntara", "Ntuli", "Nyanath", "Qalhata", "Saba", "Sala", "Sudati", "Zensele", "Aluna", "Asminia", "Ayana", "Behare", "Chanya", "Dalila", "Erza", "Ghida", "Ghnima", "Hamere", "Hasna", "Hassiba", "Iras", "Kanika", "Karimala", "Katura", "Kenyetta", "Maiba", "Massassi", "Micere", "Mirembe", "Nagesa", "Najet", "Nehanda", "Nezha", "Nmambi", "Ntara", "Ntuli", "Nyanath", "Qalhata", "Saba", "Sala", "Sudati", "Tafat", "Tanest", "Tiziri", "Wrina", "Zensele", "Zergha"],
        [HomeLand.Ghulistan]: ["Abrisham", "Afri", "Benesh", "Damsa", "Gulnoor", "Kaamsiha", "Moska", "Nageenga", "Permaz", "Shadleen", "Yasmoon"],
        [HomeLand.Kosala]: ["Ahna", "Bailya", "Llao", "Losana", "Maesa", "Samsi", "Tanit", "Tuvé", "Wutu", "Zainab"],
    };

    getHomelands() {
        var homelands: HomelandViewModel[] = [];
        var n = 0;
        for (var homeland in this._homeLands) {
            var home = this._homeLands[homeland];
            if (character.hasSource(home.source)) {
                homelands.push(new HomelandViewModel(n, home));
            }
            n++;
        }

        return homelands.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    getHomeland(homeland: HomeLand) {
        return this._homeLands[homeland];
    }

    getHomelandForRoll(roll: number) {
        var n = 0;
        for (var homeland in this._homeLands) {
            var h = this._homeLands[homeland];
            if (roll <= h.roll) {
                return n;
            }

            n++;
        }
    }

    generateHomeland() {
        var roll = Math.floor(Math.random() * 39) + 2;
        var n = 0;
        for (var homeland in this._homeLands) {
            var h = this._homeLands[homeland];
            if (roll <= h.roll) {
                return n;
            }

            n++;
        }
    }

    generateBrigandHomeland() {
        var homeland = HomeLand.Turan;

        switch (Math.floor(Math.random() * 20) + 1) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7: homeland = HomeLand.Turan; break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12: homeland = HomeLand.Khauran; break;
            case 13: homeland = HomeLand.Yuetshi; break;
            case 14:
            case 15:
            case 16:
            case 17: homeland = HomeLand.Zamboula; break;
            case 18:
            case 19:
            case 20: homeland = HomeLand.Zuagir; break;
        }

        return homeland;
    }

    generatePirateHomeland() {
        var homeland = HomeLand.Argos;

        switch (Math.floor(Math.random() * 20) + 1) {
            case 1:
            case 2:
            case 3:
            case 4: homeland = HomeLand.Argos; break;
            case 5:
            case 6:
            case 7: 
            case 8: homeland = HomeLand.BarachaIsles; break;
            case 9:
            case 10:
            case 11: homeland = HomeLand.BlackCoast; break;
            case 12:
            case 13: homeland = HomeLand.Kush; break;
            case 14: homeland = HomeLand.Shem; break;
            case 15: homeland = HomeLand.Stygia; break;
            case 16: homeland = HomeLand.Nordheim; break;
            case 17: 
            case 18:
            case 19:
            case 20: homeland = HomeLand.Zingara; break;
        }

        if (homeland === HomeLand.Nordheim) {
            character.region = "Vanaheim";
        }

        return homeland;
    }

    generateScoutHomeland() {
        var homeland = HomeLand.Aquilonia;

        switch (Math.floor(Math.random() * 20) + 1) {
            case 1:
            case 2:
            case 3:
            case 4: 
            case 5:
            case 6:
            case 7: homeland = HomeLand.Aquilonia; break;
            case 8: 
            case 9: homeland = HomeLand.BorderKingdom; break;
            case 10: homeland = HomeLand.BossonianMarches; break;
            case 11: 
            case 12:
            case 13: homeland = HomeLand.Brythunia; break;
            case 14: homeland = HomeLand.Gunderland; break;
            case 15: homeland = HomeLand.Nemedia; break;
            case 16:
            case 17:
            case 18:
            case 19:
            case 20: homeland = HomeLand.Westermarck; break;
        }

        return homeland;
    }

    generateEasternHomeland() {
        var homeland = HomeLand.Hyrkania;

        switch (Math.floor(Math.random() * 20) + 1) {
            case 1: homeland = HomeLand.Ghulistan; break;
            case 2:
            case 3:
            case 4:
            case 5: homeland = HomeLand.Iranistan; break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11: homeland = HomeLand.Hyrkania; break;
            case 12:
            case 13:
            case 14:
            case 15:
            case 16: homeland = HomeLand.Khitai; break;
            case 17:
            case 18: homeland = HomeLand.Kosala; break;
            case 19:
            case 20: homeland = HomeLand.Vendhya; break;
        }

        return homeland;
    }

    generateSouthernHomeland() {
        var homeland = HomeLand.Darfar;

        switch (Math.floor(Math.random() * 20) + 1) {
            case 1:
            case 2: homeland = HomeLand.Darfar; break;
            case 3:
            case 4: homeland = HomeLand.Keshan; break;
            case 5:
            case 6: homeland = HomeLand.Kordafan; break;
            case 7:
            case 8: homeland = HomeLand.Kush; break;
            case 9:
            case 10: homeland = HomeLand.Punt; break;
            case 11:
            case 12: homeland = HomeLand.Tombalku; break;
            case 13:
            case 14: homeland = HomeLand.Zembabwei; break;
            case 15:
            case 16: homeland = HomeLand.TheBlackKingdoms; break;
            case 17:
            case 18:
            case 19: homeland = HomeLand.Stygia; break;
            case 20: homeland = HomeLand.Xuchotl; break;
        }

        return homeland;
    }

    getRegions(homeland: HomeLand) {
        return this._regions[homeland];
    }

    getNameSuggestions(gender: Gender) {
        return gender === Gender.Male
            ? this._maleNames
            : this._femaleNames;
    }

    applyHomeland(homeland: HomeLand) {
        var home = this.getHomeland(homeland);
        character.addTalent(home.talent.name);

        if (home.languageOptions.length === 1) {
            character.addLanguage(home.languageOptions[0]);
        }
    }
}

export const HomelandsHelper = new Homelands();