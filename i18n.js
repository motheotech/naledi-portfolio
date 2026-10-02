/* Naledi Motheo portfolio — translations.
 *
 * English lives in the HTML itself, so the site reads properly with JavaScript off
 * and search engines index it. This file holds Sesotho (st) and isiZulu (zu) for
 * every element marked data-i18n="key", plus the interface strings the
 * simulations build at runtime (they ask for them with NM.t('key')).
 *
 * Editing: find the key, change the text. {n}, {i}, {p} and {t} are filled in at
 * runtime, so keep them. Technical names (Microsoft 365, Entra ID, SLA, tenant,
 * PoE) stay in English on purpose: that is how they appear on screen at work.
 */

var I18N = {
  en: {
    'q.live': 'Live', 'q.paused': 'Paused', 'q.resolved': 'Resolved', 'q.tight': 'SLA tight',
    'q.pause': 'Pause', 'q.resume': 'Resume',
    'copy': 'Copy ID', 'copied': 'Copied', 'filter.count': '{n} matching items',

    'tr.count': 'Ticket {i} of {n}', 'tr.pri': '1. Set the priority', 'tr.act': '2. Choose your first action',
    'tr.commit': 'Commit triage', 'tr.next': 'Next ticket', 'tr.results': 'See results',
    'tr.right': 'Right call', 'tr.pick': 'Your pick',
    'tr.pri.ok': 'Priority: correct', 'tr.pri.no': 'Priority: {p} was the call',
    'tr.act.ok': 'First action: correct', 'tr.act.no': 'First action: not the strongest move',
    'tr.done': 'Shift complete', 'tr.score': 'Correct calls', 'tr.median': 'Median time per ticket',
    'tr.again': 'Run the shift again', 'tr.priority': 'Priority', 'tr.action': 'Action',
    'tr.v4': 'Clean sweep. That is how a mature service desk triages.',
    'tr.v3': 'Solid. Re-read the calls you missed below.',
    'tr.v2': 'Good instincts, uneven method. Scope first, workaround second.',
    'tr.v1': 'Worth another run. Nearly every answer follows from one rule: confirm impact before you touch anything.',
    'p1': 'P1 Critical', 'p1.h': 'Business stopped, no workaround',
    'p2': 'P2 High', 'p2.h': 'Blocked user or degraded service',
    'p3': 'P3 Medium', 'p3.h': 'A workaround exists',
    'p4': 'P4 Low', 'p4.h': 'Nuisance, schedule it',

    'con.ph': 'type help',

    'lc.join': 'New starter', 'lc.leave': 'Leaver', 'lc.next': 'Choose the next step',
    'lc.done': 'Done so far', 'lc.empty': 'Nothing done yet. Pick the first step.',
    'lc.no': 'Not yet', 'lc.ok': 'Good', 'lc.fin': 'Finished', 'lc.restart': 'Start again',
    'lc.result': 'Done in {n} steps with {m} out-of-order attempts.',
    'lc.clean': 'Every step in a defensible order. That record would survive an audit.',
    'lc.messy': 'Finished, but read back the warnings. In a real tenant each one is a gap someone else has to find.',

    'net.elapsed': 'Elapsed', 'net.tests': 'Run a test', 'net.fixes': 'Apply a fix',
    'net.new': 'New fault', 'net.fixed': 'Fixed in {t}. {n} tests run.',
    'net.wrong': 'That did not fix it. {t} added to the clock.',
    'net.start': 'Ticket opened. Users report no internet. Start with a test.'
  },

  st: {
    'skip': 'Tlolela dikahare',
    'nav.home': 'Lehae', 'nav.work': 'Nalane ya mosebetsi', 'nav.lab': 'Leka', 'nav.creds': 'Mangolo', 'nav.contact': 'Ikopanye le nna',
    'lang': 'Puo', 'brand.sub': 'Ofisiri ya IT, Johannesburg',

    'foot.about': 'Ofisiri ya IT ho Afrika Tikkun. Ke laola Microsoft 365, Entra ID le Active Directory bakeng sa basebetsi ba fetang 600 disenthareng tse tsheletseng. Ke ithutela Higher Certificate ho IT, mme ke ikemiseditse ho sebetsa ho cloud le boenjiniere ba disistimi.',
    'foot.pages': 'Maqephe', 'foot.else': 'Dibakeng tse ding',
    'foot.note': 'Diteko di sebedisa dintlha tse iqapetsweng. Ha ho tenant ya nnete e fihlellwang ho tswa sebakeng sena.',
    'next': 'O ka ya kae ka mora moo',
    'next.work': 'Ho tloha khaontareng ya internet cafe ho ya tenant, mosebetsi ka mosebetsi.',
    'next.lab': 'Diteko tse nne tse thehilweng mosebetsing wa nnete wa service desk.',
    'next.creds': 'Mangolo a Microsoft, Google le Oracle a nang le dihokelo tsa netefatso.',
    'next.contact': 'Imeile kapa WhatsApp. CV le ditshupiso ka kopo.',
    'next.home': 'Kakaretso, mola o sebetsang le kamoo ke sebetsang ka teng.',

    'home.kicker': 'Ofisiri ya IT ho Afrika Tikkun, Johannesburg',
    'home.h1': 'Ke etsa hore disenthara tse tsheletseng di lule di kene, di hokahane, mme di sebetsa.',
    'home.lead': 'Ke laola tenant ya Microsoft 365, Active Directory le Entra ID bakeng sa basebetsi ba fetang 600 Johannesburg, Kapa le Durban. Ke qadile ke sebetsa khaontareng ya internet cafe, ke lokisa dikgatisi bareki ba ntse ba emetse. Mekgwa eo ke ithutileng yona moo e ntse e tsamaisa mosebetsi wa ka: fumana hore na ke eng e senyehileng ka nnete, etsa hore motho a kgutlele mosebetsing, ebe o ngola se etsahetseng.',
    'home.cta1': 'Hlopha mola wa ditekete', 'home.cta2': 'Ikopanye le nna',
    'home.where': 'Ke bulehetse mesebetsi ya junior systems, cloud le Microsoft 365. Ke ikemiseditse ho falla.',
    'q.title': 'Mola o sebetsang', 'q.hint': 'Kgetha tekete ho bona hore na nka e sebetsa jwang.',
    'q.foot': 'Boto ya mohlala. Dintlha tsa ditekete di iqapetswe.',
    'q.live': 'E phela', 'q.paused': 'E emisitswe', 'q.resolved': 'E rarollotswe', 'q.tight': 'SLA e haufi',
    'q.pause': 'Emisa', 'q.resume': 'Tswela pele',
    'scope': 'Bophara ba mosebetsi',
    'scope.1': 'basebetsi ho tenant ya Microsoft 365', 'scope.2': 'disebediswa rejisetareng ya diasete',
    'scope.3': 'ditekete ka kgwedi, ka hare ho SLA', 'scope.4': 'dilaptop tseo ke di kentseng ka bonna',
    'pr.title': 'Kamoo ke sebetsang ka teng',
    'pr.lead': 'Boholo ba ditaba tse ntlhang ho nna e ne e se mathata a thata. Ha ho motho ya netefaditseng bophara ba bothata, mme ha ho ya boleletseng mosebedisi letho ka matsatsi a mabedi.',
    'pr.1': 'Qala ka ho tseba bophara', 'pr.1b': 'Mosebedisi a le mong kapa ba mashome a mane? Service Health pele ho disetting. Karabo e etsa qeto ya hore na ena ke tokiso kapa tsebiso.',
    'pr.2': 'Kgutlisa tshebetso, ebe o rarolla', 'pr.2b': 'Tharollo ya nakwana e kenyang motho kopanong ya hae e bohlokwa. Sesosa sa motheo se ka ema ho fihlela mosebetsi o boela o tsamaya.',
    'pr.3': 'Siya rekoto', 'pr.3b': 'Ketso e nngwe le e nngwe e ngolwa teketeng ka puo e bonolo. Le direkoto tsa diasete: haeba rejisetara le shelefo di sa dumellane, ho ngolwa fatshe.',
    'try.title': 'Dintho tse nne tseo o ka di lekang',
    'try.lead': 'Ka nngwe e thehilwe hodima mosebetsi oo ke o etsang beke le beke. Di sebetsa sebading sa hao ka dintlha tse iqapetsweng.',
    'try.1': 'Ho hlopha ditekete', 'try.1b': 'Ditekete tse tsheletseng. Bea boemo ba bohlokwa, kgetha mohato wa pele, bona hore na hobaneng.', 'try.1t': 'Metsotso e ka bang 5',
    'try.2': 'Khonsole ya admin', 'try.2b': 'Khonsole e iqapetsweng ho tenant e seng ya nnete. Ngola help.', 'try.2t': 'Ha e na moedi',
    'try.3': 'Mohiruwa e motjha le ya tlohang', 'try.3b': 'Tsamaisa mohiruwa e motjha kapa ya tlohang ka tatelano e tla ema hantle nakong ya odite.', 'try.3t': 'Metsotso e ka bang 4',
    'try.4': 'Ho batla phoso ya marangrang', 'try.4b': 'Laborathori ya dikhomphutha ha e kopane. Etsa diteko, fumana phoso, e lokise.', 'try.4t': 'Metsotso e ka bang 3',
    'cafe.body': 'Kantle ho mosebetsi wa ka wa letsatsi le letsatsi, ke tsamaisa khaontara ya dijithale ya setjhaba Drieziek, Orange Farm: internet, ho hatisa, ditokiso, diwebosaete le dithupelo, ka ditheko tse phatlaladitsweng. Khonsole ya yona ya mahala ya ho rarolla mathata e sebedisa mokgwa o tshwanang wa ho hlahloba pele, jwalo ka diteko tsa mona.',
    'cafe.btn': 'Etela websaete ya cafe',

    'exp.title': 'Nalane ya mosebetsi',
    'exp.lead': 'Mesebetsi e tsheletseng ka dilemo tse hlano, o mong le o mong o le hole hanyane le khaontara mme o le haufi le tenant. Kgetha sebaka ho bona moo bokgoni bo bong le bo bong bo hodisitsweng teng.',
    'exp.note': 'Dintlha tsa mesebetsi di dula ka Senyesemane ho tsamaisana le CV ya ka.',
    'f.all': 'Tsohle', 'f.id': 'Boitsebiso le phihlello', 'f.m365': 'Microsoft 365', 'f.dev': 'Disebediswa le diasete',
    'f.sd': 'Service desk', 'f.tel': 'Mehala', 'f.code': 'Khoutu', 'f.ppl': 'Thupelo le batho',
    'filter.count': 'Ho fumanehile tse {n}',
    'exp.skills': 'Bokgoni', 'exp.lang': 'Dipuo: Sesotho (puo ya lapeng), isiZulu (ho bua feela), Senyesemane. Laesense ya ho kganna Code C1.',

    'cr.title': 'Mangolo',
    'cr.lead': 'Lengolo le leng le le leng mona le ka hlahlojwa inthaneteng. Di-ID tsa mangolo di thathamisitswe hore o se ke wa tlameha ho botsa.',
    'cr.h1': 'Lengolo', 'cr.h2': 'Le fanwe ke', 'cr.h3': 'Le fumanwe', 'cr.h4': 'Netefatsa',
    'cr.verify': 'Netefatsa', 'cr.req': 'E fumaneha ka kopo', 'copy': 'Kopisa ID', 'copied': 'E kopisitswe',
    'road': 'Tsela ya mangolo', 'road.lead': 'Metheo pele, ebe tlhahlobo ya associate e tshwanang le mosebetsi.',
    's.earned': 'E fumanwe', 's.prog': 'E ntse e tswela pele', 's.plan': 'E reretswe',
    'edu': 'Thuto',
    'gap': 'Sekgeo seo ke se kwalang',
    'gap.b': 'Mangolo a ka a barekisi a matla mosebetsing wa Microsoft 365. Diposo tse ngata tsa mmuso le tse ding tsa dikhamphani di batla le lengolo la NQF ho IT. Setifikeiti sa UNISA ke NQF 5 empa ke sa dithuto tsa moruo le tsamaiso, ka hona Higher Certificate ya IT ya Richfield, e lebelletsweng ka Phupjane 2027, ke yona e kwalang sekgeo sena.',

    'lab.title': 'Leka',
    'lab.lead': 'Diteko tse nne tse thehilweng mosebetsing oo ke o etsang beke le beke. Di sebetsa ka botlalo sebading sa hao ka dintlha tse iqapetsweng, mme ha ho e fihlellang sistimi ya nnete.',
    'lab.note': 'Mongolo wa maemo o ka Senyesemane, e leng puo ya mosebetsi ya service desk. Dikonopo le diphetho di latela puo eo o e kgethileng.',
    'lab.1i': 'Bea boemo ba bohlokwa, kgetha ketso ya pele. Nako e ntse e tsamaya ha o etsa qeto. Ha ho dintlha tsa lebelo: taba ke hore na qeto e ne e nepahetse.',
    'lab.2i': 'Khonsole e iqapetsweng ho tenant e seng ya nnete. Ngola help ho qala. Dikonopo tsa motsu di o kgutlisetsa ditaelong tsa pele, Tab e phethela taelo.',
    'lab.3i': 'Kgetha mohato o latelang ho tswa lenaneng. Ho na le ditatelano tse fetang e le nngwe tse nepahetseng, empa mehato e meng e itshetlehile ho e meng.',
    'lab.4i': 'Laborathori ya dikhomphutha ha e na internet. Teko e nngwe le e nngwe e ja nako. Fumana phoso ka diteko tse fokolang kamoo ho ka kgonehang, ebe o sebedisa tokiso e nepahetseng.',
    'lab.how': 'Kamoo e sebetsang',

    'tr.count': 'Tekete {i} ho {n}', 'tr.pri': '1. Bea boemo ba bohlokwa', 'tr.act': '2. Kgetha ketso ya hao ya pele',
    'tr.commit': 'Netefatsa qeto', 'tr.next': 'Tekete e latelang', 'tr.results': 'Bona diphetho',
    'tr.right': 'Qeto e nepahetseng', 'tr.pick': 'Kgetho ya hao',
    'tr.pri.ok': 'Boemo: ho nepahetse', 'tr.pri.no': 'Boemo: e ne e lokela ho ba {p}',
    'tr.act.ok': 'Ketso ya pele: ho nepahetse', 'tr.act.no': 'Ketso ya pele: hase mohato o matla ka ho fetisisa',
    'tr.done': 'Shifi e phethilwe', 'tr.score': 'Diqeto tse nepahetseng', 'tr.median': 'Nako e bohareng ka tekete',
    'tr.again': 'Etsa shifi hape', 'tr.priority': 'Boemo', 'tr.action': 'Ketso',
    'tr.v4': 'O nepile tsohle. Ke kamoo service desk e hodileng e hlophang ka teng.',
    'tr.v3': 'Ho tiile. Bala hape diqeto tseo o di fositseng ka tlase.',
    'tr.v2': 'Kutlwisiso e ntle, mokgwa o sa tsitsang. Bophara pele, tharollo ya nakwana kamora moo.',
    'tr.v1': 'Ho bohlokwa ho leka hape. Hoo e batlang e le karabo e nngwe le e nngwe e latela molao o le mong: netefatsa tshusumetso pele o ama letho.',
    'p1': 'P1 Ya bohlokwa haholo', 'p1.h': 'Mosebetsi o emile, ha ho tharollo ya nakwana',
    'p2': 'P2 E phahameng', 'p2.h': 'Mosebedisi o thibetswe kapa tshebeletso e fokotsehile',
    'p3': 'P3 E mahareng', 'p3.h': 'Ho na le tharollo ya nakwana',
    'p4': 'P4 E tlase', 'p4.h': 'Ho a tena, e behele nako',
    'con.ph': 'ngola help',
    'lc.join': 'Mohiruwa e motjha', 'lc.leave': 'Ya tlohang', 'lc.next': 'Kgetha mohato o latelang',
    'lc.done': 'Tse entsweng ho fihla jwale', 'lc.empty': 'Ha ho se ho entswe letho. Kgetha mohato wa pele.',
    'lc.no': 'E seng hajwale', 'lc.ok': 'Ho lokile', 'lc.fin': 'E phethilwe', 'lc.restart': 'Qala bocha',
    'lc.result': 'E phethilwe ka mehato e {n}, ka diteko tse {m} tse sa latelang tatelano.',
    'lc.clean': 'Mohato o mong le o mong o ka tatelano e ka sireletswang. Rekoto eo e ka feta odite.',
    'lc.messy': 'E phethilwe, empa bala ditemoso hape. Ho tenant ya nnete, e nngwe le e nngwe ke sekgeo seo motho e mong a tla tlameha ho se fumana.',
    'net.elapsed': 'Nako e fetileng', 'net.tests': 'Etsa teko', 'net.fixes': 'Sebedisa tokiso',
    'net.new': 'Phoso e ntjha', 'net.fixed': 'E lokisitswe ka {t}. Ho entswe diteko tse {n}.',
    'net.wrong': 'Seo ha se a e lokisa. Ho ekeditswe {t} nakong.',
    'net.start': 'Tekete e butswe. Basebedisi ba re ha ho internet. Qala ka teko.',

    'ct.title': 'Ikopanye le nna',
    'ct.lead': 'Ke bulehetse mesebetsi ya junior systems administrator, cloud support le Microsoft 365. Ofising, hybrid kapa hole, mme ke ikemiseditse ho falla. Imeile e fumana karabo kapele.',
    'ct.email': 'Imeile', 'ct.phone': 'Mohala le WhatsApp', 'ct.based': 'Ke dula', 'ct.cv': 'CV le ditshupiso ka kopo.',
    'ct.form': 'Romela molaetsa', 'ct.name': 'Lebitso la hao', 'ct.org': 'Khamphani', 'ct.about': 'Ke ka eng',
    'ct.o1': 'Mosebetsi oo ke o hirang', 'ct.o2': 'Konteraka kapa projeke', 'ct.o3': 'Ntho e nngwe',
    'ct.msg': 'Molaetsa', 'ct.send': 'Romela ka imeile', 'ct.wa': 'Romela ka WhatsApp',
    'ct.hint': 'Ka bobedi di bula app ya hao molaetsa o se o ngotswe. Ha ho letho le bolokwang sebakeng sena.',

    'nf.title': 'Leqephe lena ha le eo', 'nf.lead': 'Mohlomong sehokelo se fetohile. Leka e nngwe ya tsena:'
  },

  zu: {
    'skip': 'Yeqela kokuqukethwe',
    'nav.home': 'Ekhaya', 'nav.work': 'Umlando womsebenzi', 'nav.lab': 'Zama', 'nav.creds': 'Iziqu', 'nav.contact': 'Xhumana nami',
    'lang': 'Ulimi', 'brand.sub': 'Isikhulu se-IT, eGoli',

    'foot.about': 'Isikhulu se-IT e-Afrika Tikkun. Ngiphatha i-Microsoft 365, i-Entra ID ne-Active Directory yabasebenzi abangaphezu kuka-600 ezikhungweni eziyisithupha. Ngifundela iHigher Certificate ku-IT, futhi ngizimisele ukusebenza kwi-cloud nobunjiniyela bezinhlelo.',
    'foot.pages': 'Amakhasi', 'foot.else': 'Kwenye indawo',
    'foot.note': 'Izifaniso zisebenzisa imininingwane eqanjiwe. Ayikho i-tenant yangempela efinyelelekayo kule sayithi.',
    'next': 'Ungaya kuphi ngokulandelayo',
    'next.work': 'Kusukela ekhawunteni ye-internet cafe kuya ku-tenant, umsebenzi ngomsebenzi.',
    'next.lab': 'Izifaniso ezine ezakhelwe emsebenzini wangempela we-service desk.',
    'next.creds': 'Izitifiketi ze-Microsoft, Google ne-Oracle ezinezixhumanisi zokuqinisekisa.',
    'next.contact': 'I-imeyili noma i-WhatsApp. I-CV nabaqinisekisi uma ucela.',
    'next.home': 'Isifinyezo, uhlu olusebenzayo nendlela engisebenza ngayo.',

    'home.kicker': 'Isikhulu se-IT e-Afrika Tikkun, eGoli',
    'home.h1': 'Ngenza ukuthi izikhungo eziyisithupha zihlale zingenile, zixhumekile, futhi zisebenza.',
    'home.lead': 'Ngiphatha i-tenant ye-Microsoft 365, i-Active Directory ne-Entra ID yabasebenzi abangaphezu kuka-600 eGoli, eKapa naseThekwini. Ngaqala ngisebenza ekhawunteni ye-internet cafe, ngilungisa amaphrinta amakhasimende esalindile. Imikhuba engayifunda khona isaqhuba umsebenzi wami: thola ukuthi yini ngempela ephukile, buyisela umuntu emsebenzini, bese ubhala phansi okwenzekile.',
    'home.cta1': 'Hlela uhlu lwamathikithi', 'home.cta2': 'Xhumana nami',
    'home.where': 'Ngivulekele imisebenzi ye-junior systems, i-cloud ne-Microsoft 365. Ngizimisele ukuthuthela kwenye indawo.',
    'q.title': 'Uhlu olusebenzayo', 'q.hint': 'Khetha ithikithi ukuze ubone ukuthi ngingalisebenza kanjani.',
    'q.foot': 'Ibhodi eyisibonelo. Imininingwane yamathikithi iqanjiwe.',
    'q.live': 'Bukhoma', 'q.paused': 'Kumisiwe', 'q.resolved': 'Kuxazululiwe', 'q.tight': 'I-SLA isiseduze',
    'q.pause': 'Misa', 'q.resume': 'Qhubeka',
    'scope': 'Ububanzi bomsebenzi',
    'scope.1': 'abasebenzi ku-tenant ye-Microsoft 365', 'scope.2': 'amadivayisi kurejista yama-asethi',
    'scope.3': 'amathikithi ngenyanga, ngaphakathi kwe-SLA', 'scope.4': 'amalaptop engiwafake mina uqobo',
    'pr.title': 'Indlela engisebenza ngayo',
    'pr.lead': 'Iningi lezinkinga ezidluliselwa kimi bezingezona ezinzima. Akekho owaqinisekisa ububanzi bazo, futhi akekho owatshela umsebenzisi lutho izinsuku ezimbili.',
    'pr.1': 'Qala ngokuthola ububanzi', 'pr.1b': 'Umsebenzisi oyedwa noma abangamashumi amane? I-Service Health ngaphambi kwezilungiselelo. Impendulo inquma ukuthi lokhu kuwukulungisa noma kuyisaziso.',
    'pr.2': 'Buyisela, bese uxazulula', 'pr.2b': 'Isixazululo sesikhashana esingenisa umuntu emhlanganweni wakhe siyabaluleka. Imbangela yangempela ingalinda kuze kube yilapho umsebenzi usuqhubeka futhi.',
    'pr.3': 'Shiya irekhodi', 'pr.3b': 'Sonke isenzo sibhalwa ethikithini ngolimi olulula. Namarekhodi ama-asethi: uma irejista neshalofu kungavumelani, kubhalwa phansi.',
    'try.title': 'Izinto ezine ongazizama',
    'try.lead': 'Ngayinye yakhelwe phezu komsebenzi engiwenza njalo ngesonto. Zisebenza kusiphequluli sakho ngemininingwane eqanjiwe.',
    'try.1': 'Ukuhlela amathikithi', 'try.1b': 'Amathikithi ayisithupha. Beka izinga lokubaluleka, khetha isinyathelo sokuqala, ubone ukuthi kungani.', 'try.1t': 'Cishe imizuzu emi-5',
    'try.2': 'Ikhonsoli ye-admin', 'try.2b': 'Ikhonsoli eqanjiwe ku-tenant engeyona eyangempela. Bhala u-help.', 'try.2t': 'Ayinamkhawulo',
    'try.3': 'Isisebenzi esisha nesishiyayo', 'try.3b': 'Hambisa isisebenzi esisha noma esishiyayo ngokulandelana okuzoma kahle ekuhlolweni kwamabhuku.', 'try.3t': 'Cishe imizuzu emi-4',
    'try.4': 'Ukuthola iphutha lenethiwekhi', 'try.4b': 'Ilebhu yamakhompyutha ayixhunyiwe. Yenza izivivinyo, uthole iphutha, ulilungise.', 'try.4t': 'Cishe imizuzu emi-3',
    'cafe.body': 'Ngaphandle komsebenzi wami wansuku zonke, ngiphatha ikhawunta yedijithali yomphakathi eDrieziek, e-Orange Farm: i-inthanethi, ukuphrinta, ukulungisa, amawebhusayithi nokuqeqesha, ngamanani ashicilelwe. Ikhonsoli yayo yamahhala yokuxazulula izinkinga isebenzisa indlela efanayo yokuhlola kuqala njengezifaniso ezilapha.',
    'cafe.btn': 'Vakashela iwebhusayithi ye-cafe',

    'exp.title': 'Umlando womsebenzi',
    'exp.lead': 'Imisebenzi eyisithupha eminyakeni emihlanu, ngayinye iqhele kancane ekhawunteni futhi isondela ku-tenant. Hlunga ngomkhakha ukuze ubone ukuthi ikhono ngalinye lakhiwe kuphi.',
    'exp.note': 'Imininingwane yemisebenzi ihlala isesiNgisini ukuze ifane ne-CV yami.',
    'f.all': 'Konke', 'f.id': 'Ubunikazi nokufinyelela', 'f.m365': 'Microsoft 365', 'f.dev': 'Amadivayisi nama-asethi',
    'f.sd': 'Service desk', 'f.tel': 'Ucingo', 'f.code': 'Ikhodi', 'f.ppl': 'Ukuqeqesha nabantu',
    'filter.count': 'Kutholakale okungu-{n}',
    'exp.skills': 'Amakhono', 'exp.lang': 'Izilimi: isiSuthu (ulimi lwebele), isiZulu (ukukhuluma kuphela), isiNgisi. Ilayisensi yokushayela ye-Code C1.',

    'cr.title': 'Iziqu',
    'cr.lead': 'Zonke izitifiketi ezilapha zingahlolwa ku-inthanethi. Ama-ID ezitifiketi abhalwe ukuze ungadingi ukubuza.',
    'cr.h1': 'Isitifiketi', 'cr.h2': 'Sikhishwe ngu', 'cr.h3': 'Sitholwe', 'cr.h4': 'Qinisekisa',
    'cr.verify': 'Qinisekisa', 'cr.req': 'Iyatholakala uma uyicela', 'copy': 'Kopisha i-ID', 'copied': 'Kukopishiwe',
    'road': 'Indlela yezitifiketi', 'road.lead': 'Izisekelo kuqala, bese kuba wuhlolo lwe-associate oluhambisana nomsebenzi.',
    's.earned': 'Sitholiwe', 's.prog': 'Kuyaqhubeka', 's.plan': 'Kuhleliwe',
    'edu': 'Imfundo',
    'gap': 'Igebe engilivalayo',
    'gap.b': 'Izitifiketi zami zabahlinzeki zinamandla emsebenzini we-Microsoft 365. Izikhundla eziningi zikahulumeni nezinye zezinkampani zicela neziqu ze-NQF ku-IT. Isitifiketi se-UNISA siyi-NQF 5 kodwa sise-economic and management sciences, ngakho iHigher Certificate ye-IT yaseRichfield, ezophothulwa ngoJuni 2027, iyona evala leli gebe.',

    'lab.title': 'Zama',
    'lab.lead': 'Izifaniso ezine ezakhiwe emsebenzini engiwenza njalo ngesonto. Zisebenza ngokuphelele kusiphequluli sakho ngemininingwane eqanjiwe, futhi azikho ezifinyelela uhlelo lwangempela.',
    'lab.note': 'Umbhalo wezimo usesiNgisini, okuwulimi lokusebenza lwe-service desk. Izinkinobho nemiphumela kulandela ulimi olukhethile.',
    'lab.1i': 'Beka izinga lokubaluleka, khetha isenzo sokuqala. Iwashi liyahamba ngesikhathi unquma. Awekho amaphuzu okushesha: okubalulekile ukuthi isinqumo besilungile yini.',
    'lab.2i': 'Ikhonsoli eqanjiwe ku-tenant engeyona eyangempela. Bhala u-help ukuze uqale. Izinkinobho zemicibisholo zibuyisela imiyalo yangaphambili, i-Tab iqedela umyalo.',
    'lab.3i': 'Khetha isinyathelo esilandelayo ohlwini. Kunezindlela ezingaphezu kweyodwa ezilungile, kodwa ezinye izinyathelo zincike kwezinye.',
    'lab.4i': 'Ilebhu yamakhompyutha ayinayo i-inthanethi. Isivivinyo ngasinye sidla isikhathi. Thola iphutha ngezivivinyo ezimbalwa ngangokunokwenzeka, bese usebenzisa ukulungisa okufanele.',
    'lab.how': 'Isebenza kanjani',

    'tr.count': 'Ithikithi {i} kwangu-{n}', 'tr.pri': '1. Beka izinga lokubaluleka', 'tr.act': '2. Khetha isenzo sakho sokuqala',
    'tr.commit': 'Qinisekisa isinqumo', 'tr.next': 'Ithikithi elilandelayo', 'tr.results': 'Bona imiphumela',
    'tr.right': 'Isinqumo esilungile', 'tr.pick': 'Ukukhetha kwakho',
    'tr.pri.ok': 'Izinga: kulungile', 'tr.pri.no': 'Izinga: bekufanele kube ngu-{p}',
    'tr.act.ok': 'Isenzo sokuqala: kulungile', 'tr.act.no': 'Isenzo sokuqala: akusona isinyathelo esinamandla kakhulu',
    'tr.done': 'Ishifu iphelile', 'tr.score': 'Izinqumo ezilungile', 'tr.median': 'Isikhathi esiphakathi ngethikithi',
    'tr.again': 'Phinda ishifu', 'tr.priority': 'Izinga', 'tr.action': 'Isenzo',
    'tr.v4': 'Ulungise konke. Yileyo indlela i-service desk evuthiwe ehlela ngayo.',
    'tr.v3': 'Kuqinile. Phinda ufunde izinqumo ozigejile ngezansi.',
    'tr.v2': 'Imizwa emihle, indlela engaqinile. Ububanzi kuqala, isixazululo sesikhashana ngemuva.',
    'tr.v1': 'Kufanele uphinde uzame. Cishe yonke impendulo ilandela umthetho owodwa: qinisekisa umthelela ngaphambi kokuthinta noma yini.',
    'p1': 'P1 Kubucayi', 'p1.h': 'Umsebenzi umile, asikho isixazululo sesikhashana',
    'p2': 'P2 Kuphezulu', 'p2.h': 'Umsebenzisi uvinjiwe noma isevisi incipha',
    'p3': 'P3 Kuphakathi', 'p3.h': 'Sikhona isixazululo sesikhashana',
    'p4': 'P4 Kuphansi', 'p4.h': 'Kuyacasula, kuhlelele isikhathi',
    'con.ph': 'bhala help',
    'lc.join': 'Isisebenzi esisha', 'lc.leave': 'Esishiyayo', 'lc.next': 'Khetha isinyathelo esilandelayo',
    'lc.done': 'Okwenziwe kuze kube manje', 'lc.empty': 'Akukakwenziwa lutho. Khetha isinyathelo sokuqala.',
    'lc.no': 'Hhayi okwamanje', 'lc.ok': 'Kuhle', 'lc.fin': 'Kuqediwe', 'lc.restart': 'Qala kabusha',
    'lc.result': 'Kuqediwe ngezinyathelo ezingu-{n}, nemizamo engu-{m} engalandeli uhlelo.',
    'lc.clean': 'Sonke isinyathelo silandelana ngendlela evikelekayo. Lelo rekhodi lingaphumelela ekuhlolweni.',
    'lc.messy': 'Kuqediwe, kodwa phinda ufunde izixwayiso. Ku-tenant yangempela, ngasinye siyigebe okuzodingeka omunye umuntu alithole.',
    'net.elapsed': 'Isikhathi esedlule', 'net.tests': 'Yenza isivivinyo', 'net.fixes': 'Sebenzisa ukulungisa',
    'net.new': 'Iphutha elisha', 'net.fixed': 'Kulungiswe ngo-{t}. Kwenziwe izivivinyo ezingu-{n}.',
    'net.wrong': 'Lokho akukulungisanga. Kwengezwe u-{t} esikhathini.',
    'net.start': 'Ithikithi livuliwe. Abasebenzisi bathi ayikho i-inthanethi. Qala ngesivivinyo.',

    'ct.title': 'Xhumana nami',
    'ct.lead': 'Ngivulekele imisebenzi ye-junior systems administrator, i-cloud support ne-Microsoft 365. Ehhovisi, i-hybrid noma ukude, futhi ngizimisele ukuthutha. I-imeyili ithola impendulo ngokushesha.',
    'ct.email': 'I-imeyili', 'ct.phone': 'Ucingo ne-WhatsApp', 'ct.based': 'Ngihlala', 'ct.cv': 'I-CV nabaqinisekisi uma ucela.',
    'ct.form': 'Thumela umlayezo', 'ct.name': 'Igama lakho', 'ct.org': 'Inkampani', 'ct.about': 'Kumayelana nani',
    'ct.o1': 'Isikhundla engiqasha kuso', 'ct.o2': 'Inkontileka noma iphrojekthi', 'ct.o3': 'Okunye',
    'ct.msg': 'Umlayezo', 'ct.send': 'Thumela nge-imeyili', 'ct.wa': 'Thumela nge-WhatsApp',
    'ct.hint': 'Kokubili kuvula uhlelo lwakho umlayezo usugcwalisiwe. Akukho okugcinwa kule sayithi.',

    'nf.title': 'Leli khasi alikho', 'nf.lead': 'Mhlawumbe isixhumanisi sishintshile. Zama okukodwa kwalokhu:'
  }
};

/* ---------------------------------------------------------------- engine */
(function () {
  'use strict';
  var KEY = 'nm-lang', HTML_LANG = { en: 'en-ZA', st: 'st', zu: 'zu' };
  var current = 'en';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(l) {
    try { localStorage.setItem(KEY, l); } catch (e) { /* private mode: language just won't persist */ }
  }

  function t(key, vars) {
    var s = (I18N[current] && I18N[current][key]) || I18N.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }

  function apply(lang) {
    if (!I18N[lang]) lang = 'en';
    current = lang;
    document.documentElement.lang = HTML_LANG[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      var k = el.getAttribute('data-i18n');
      var s = lang === 'en' ? null : I18N[lang][k];
      el.innerHTML = s || el.dataset.en;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute('placeholder') || '';
      var s = lang === 'en' ? null : I18N[lang][el.getAttribute('data-i18n-ph')];
      el.setAttribute('placeholder', s || el.dataset.enPh);
    });
    document.querySelectorAll('.lang-note').forEach(function (n) { n.hidden = lang === 'en'; });
    document.querySelectorAll('select.lang-pick').forEach(function (s) { s.value = lang; });
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  function set(lang) { save(lang); apply(lang); }

  window.NM = window.NM || {};
  NM.t = t;
  NM.lang = function () { return current; };
  NM.setLang = set;

  var fromUrl = new URLSearchParams(location.search).get('lang');
  var start = (fromUrl && I18N[fromUrl]) ? fromUrl : (stored() || 'en');

  function init() {
    document.querySelectorAll('select.lang-pick').forEach(function (s) {
      s.addEventListener('change', function () { set(s.value); });
    });
    apply(start);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
