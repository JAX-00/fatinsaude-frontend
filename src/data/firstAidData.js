import CPR from "../assets/firstAid/CPR.jpg";
import Blood from "../assets/firstAid/Blood.jpg";
import Choking from "../assets/firstAid/Choking.jpg";
import Burn from "../assets/firstAid/Burns.jpg";

const firstAidData = [
  {
    // referensia data foti iha website https://www.verywellhealth.com/basic-first-aid-procedures-1298578
    id: 1,
    title: "CPR (Cardiopulmonary Resuscitation)",
    desc: "Assaun primeiru atu halao waihira ajuda ema ne'ebe mak sofre kurasaun.",
    img: CPR,
    detail: [
      "Kontaktu ambulansia ",
      "Pompa fuan.",
      "Fo iss",
      "Uza AED, machine otomatika ne'ebe pompa fuan.",
    ],
  },
  {
    id: 2,
    title: "Ran Sai Barak (Bleeding)",
    desc: "Kanek ou Ra'an sai hela deit, tenke prevene ra'an sai ne'e hodi ran lalika sai barak liu tan.",
    img: Blood,
    detail: [
      "Hamos Ra'an.",
      "Taka Kanek.",
      "Hapara ra'an ho taka ba kedas kanek ne'e.",
      "Hi'it isin kanek ba leten.",
      "Uza kain ne'ebe mak mos.",
    ],
  },
  {
    id: 3,
    title: "Choking",
    desc: "Choking akontese bainhira hahán ka sasán taka dalan anin. Ida ne’e situasaun perigu",
    img: Choking,
    detail: [
      "Hamrik iha kotuk ema, halo ema inclina ba oin",
      "Halo liman rona iha pinggang.",
      "Kepal liman ida, tau iha klaran pusar no ruin kotuk.",
      "Liman seluk kaer kepal liman.",
      "Repete to’o sasán sai",
    ],
  },
  {
    id: 4,
    title: "Kanek Aihan (Burns)",
    desc: "Kanek sunu bele mai husi ahi, eletrisidade, kimika, ka manas loron. Tenke atende lalais.",
    img: Burn,
    detail: [
      "Fasi ho bee malirin (la’ós es)",
      "Taka ho kasa ka bandaje moos",
      "Bele uza aloe vera.",
      "Bele hemu remedíu moras (paracetamol).",
      "La bele buka bolha",
    ],
  },
];

export default firstAidData;
