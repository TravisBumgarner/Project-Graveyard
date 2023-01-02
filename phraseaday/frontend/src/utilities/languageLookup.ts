const languageLookup = (langCode: string, userLang: 'english' = 'english'): string => {
    return {
        abk: {
            english: 'Abkhaz'
        },
        aar: {
            english: 'Afar'
        },
        afr: {
            english: 'Afrikaans'
        },
        aka: {
            english: 'Akan'
        },
        sqi: {
            english: 'Albanian'
        },
        amh: {
            english: 'Amharic'
        },
        ara: {
            english: 'Arabic'
        },
        arg: {
            english: 'Aragonese'
        },
        hye: {
            english: 'Armenian'
        },
        asm: {
            english: 'Assamese'
        },
        ava: {
            english: 'Avaric'
        },
        ave: {
            english: 'Avestan'
        },
        aym: {
            english: 'Aymara'
        },
        aze: {
            english: 'Azerbaijani'
        },
        bam: {
            english: 'Bambara'
        },
        bak: {
            english: 'Bashkir'
        },
        eus: {
            english: 'Basque'
        },
        bel: {
            english: 'Belarusian'
        },
        ben: {
            english: 'Bengali, Bangla'
        },
        bih: {
            english: 'Bihari'
        },
        bis: {
            english: 'Bislama'
        },
        bos: {
            english: 'Bosnian'
        },
        bre: {
            english: 'Breton'
        },
        bul: {
            english: 'Bulgarian'
        },
        mya: {
            english: 'Burmese'
        },
        cat: {
            english: 'Catalan'
        },
        cha: {
            english: 'Chamorro'
        },
        che: {
            english: 'Chechen'
        },
        nya: {
            english: 'Chichewa, Chewa, Nyanja'
        },
        zho: {
            english: 'Chinese'
        },
        chv: {
            english: 'Chuvash'
        },
        cor: {
            english: 'Cornish'
        },
        cos: {
            english: 'Corsican'
        },
        cre: {
            english: 'Cree'
        },
        hrv: {
            english: 'Croatian'
        },
        ces: {
            english: 'Czech'
        },
        dan: {
            english: 'Danish'
        },
        div: {
            english: 'Divehi, Dhivehi, Maldivian'
        },
        nld: {
            english: 'Dutch'
        },
        dzo: {
            english: 'Dzongkha'
        },
        eng: {
            english: 'English'
        },
        epo: {
            english: 'Esperanto'
        },
        est: {
            english: 'Estonian'
        },
        ewe: {
            english: 'Ewe'
        },
        fao: {
            english: 'Faroese'
        },
        fij: {
            english: 'Fijian'
        },
        fin: {
            english: 'Finnish'
        },
        fra: {
            english: 'French'
        },
        ful: {
            english: 'Fula, Fulah, Pulaar, Pular'
        },
        glg: {
            english: 'Galician'
        },
        kat: {
            english: 'Georgian'
        },
        deu: {
            english: 'German'
        },
        ell: {
            english: 'Greek (modern)'
        },
        grn: {
            english: 'Guaran\u00ed'
        },
        guj: {
            english: 'Gujarati'
        },
        hat: {
            english: 'Haitian, Haitian Creole'
        },
        hau: {
            english: 'Hausa'
        },
        heb: {
            english: 'Hebrew (modern)'
        },
        her: {
            english: 'Herero'
        },
        hin: {
            english: 'Hindi'
        },
        hmo: {
            english: 'Hiri Motu'
        },
        hun: {
            english: 'Hungarian'
        },
        ina: {
            english: 'Interlingua'
        },
        ind: {
            english: 'Indonesian'
        },
        ile: {
            english: 'Interlingue'
        },
        gle: {
            english: 'Irish'
        },
        ibo: {
            english: 'Igbo'
        },
        ipk: {
            english: 'Inupiaq'
        },
        ido: {
            english: 'Ido'
        },
        isl: {
            english: 'Icelandic'
        },
        ita: {
            english: 'Italian'
        },
        iku: {
            english: 'Inuktitut'
        },
        jpn: {
            english: 'Japanese'
        },
        jav: {
            english: 'Javanese'
        },
        kal: {
            english: 'Kalaallisut, Greenlandic'
        },
        kan: {
            english: 'Kannada'
        },
        kau: {
            english: 'Kanuri'
        },
        kas: {
            english: 'Kashmiri'
        },
        kaz: {
            english: 'Kazakh'
        },
        khm: {
            english: 'Khmer'
        },
        kik: {
            english: 'Kikuyu, Gikuyu'
        },
        kin: {
            english: 'Kinyarwanda'
        },
        kir: {
            english: 'Kyrgyz'
        },
        kom: {
            english: 'Komi'
        },
        kon: {
            english: 'Kongo'
        },
        kor: {
            english: 'Korean'
        },
        kur: {
            english: 'Kurdish'
        },
        kua: {
            english: 'Kwanyama, Kuanyama'
        },
        lat: {
            english: 'Latin'
        },
        ltz: {
            english: 'Luxembourgish, Letzeburgesch'
        },
        lug: {
            english: 'Ganda'
        },
        lim: {
            english: 'Limburgish, Limburgan, Limburger'
        },
        lin: {
            english: 'Lingala'
        },
        lao: {
            english: 'Lao'
        },
        lit: {
            english: 'Lithuanian'
        },
        lub: {
            english: 'Luba-Katanga'
        },
        lav: {
            english: 'Latvian'
        },
        glv: {
            english: 'Manx'
        },
        mkd: {
            english: 'Macedonian'
        },
        mlg: {
            english: 'Malagasy'
        },
        msa: {
            english: 'Malay'
        },
        mal: {
            english: 'Malayalam'
        },
        mlt: {
            english: 'Maltese'
        },
        mri: {
            english: 'M\u0101ori'
        },
        mar: {
            english: 'Marathi (Mar\u0101\u1e6dh\u012b)'
        },
        mah: {
            english: 'Marshallese'
        },
        mon: {
            english: 'Mongolian'
        },
        nau: {
            english: 'Nauruan'
        },
        nav: {
            english: 'Navajo, Navaho'
        },
        nde: {
            english: 'Northern Ndebele'
        },
        nep: {
            english: 'Nepali'
        },
        ndo: {
            english: 'Ndonga'
        },
        nob: {
            english: 'Norwegian Bokm\u00e5l'
        },
        nno: {
            english: 'Norwegian Nynorsk'
        },
        nor: {
            english: 'Norwegian'
        },
        iii: {
            english: 'Nuosu'
        },
        nbl: {
            english: 'Southern Ndebele'
        },
        oci: {
            english: 'Occitan'
        },
        oji: {
            english: 'Ojibwe, Ojibwa'
        },
        chu: {
            english: 'Old Church Slavonic, Church Slavonic, Old Bulgarian'
        },
        orm: {
            english: 'Oromo'
        },
        ori: {
            english: 'Oriya'
        },
        oss: {
            english: 'Ossetian, Ossetic'
        },
        pan: {
            english: '(Eastern) Punjabi'
        },
        pli: {
            english: 'P\u0101li'
        },
        fas: {
            english: 'Persian (Farsi)'
        },
        pol: {
            english: 'Polish'
        },
        pus: {
            english: 'Pashto, Pushto'
        },
        por: {
            english: 'Portuguese'
        },
        que: {
            english: 'Quechua'
        },
        roh: {
            english: 'Romansh'
        },
        run: {
            english: 'Kirundi'
        },
        ron: {
            english: 'Romanian'
        },
        rus: {
            english: 'Russian'
        },
        san: {
            english: 'Sanskrit (Sa\u1e41sk\u1e5bta)'
        },
        srd: {
            english: 'Sardinian'
        },
        snd: {
            english: 'Sindhi'
        },
        sme: {
            english: 'Northern Sami'
        },
        smo: {
            english: 'Samoan'
        },
        sag: {
            english: 'Sango'
        },
        srp: {
            english: 'Serbian'
        },
        gla: {
            english: 'Scottish Gaelic, Gaelic'
        },
        sna: {
            english: 'Shona'
        },
        sin: {
            english: 'Sinhalese, Sinhala'
        },
        slk: {
            english: 'Slovak'
        },
        slv: {
            english: 'Slovene'
        },
        som: {
            english: 'Somali'
        },
        sot: {
            english: 'Southern Sotho'
        },
        spa: {
            english: 'Spanish'
        },
        sun: {
            english: 'Sundanese'
        },
        swa: {
            english: 'Swahili'
        },
        ssw: {
            english: 'Swati'
        },
        swe: {
            english: 'Swedish'
        },
        tam: {
            english: 'Tamil'
        },
        tel: {
            english: 'Telugu'
        },
        tgk: {
            english: 'Tajik'
        },
        tha: {
            english: 'Thai'
        },
        tir: {
            english: 'Tigrinya'
        },
        bod: {
            english: 'Tibetan Standard, Tibetan, Central'
        },
        tuk: {
            english: 'Turkmen'
        },
        tgl: {
            english: 'Tagalog'
        },
        tsn: {
            english: 'Tswana'
        },
        ton: {
            english: 'Tonga (Tonga Islands)'
        },
        tur: {
            english: 'Turkish'
        },
        tso: {
            english: 'Tsonga'
        },
        tat: {
            english: 'Tatar'
        },
        twi: {
            english: 'Twi'
        },
        tah: {
            english: 'Tahitian'
        },
        uig: {
            english: 'Uyghur'
        },
        ukr: {
            english: 'Ukrainian'
        },
        urd: {
            english: 'Urdu'
        },
        uzb: {
            english: 'Uzbek'
        },
        ven: {
            english: 'Venda'
        },
        vie: {
            english: 'Vietenglishse'
        },
        vol: {
            english: 'Volap\u00fck'
        },
        wln: {
            english: 'Walloon'
        },
        cym: {
            english: 'Welsh'
        },
        wol: {
            english: 'Wolof'
        },
        fry: {
            english: 'Western Frisian'
        },
        xho: {
            english: 'Xhosa'
        },
        yid: {
            english: 'Yiddish'
        },
        yor: {
            english: 'Yoruba'
        },
        zha: {
            english: 'Zhuang, Chuang'
        },
        zul: {
            english: 'Zulu'
        }
    }[langCode][userLang]
}

export default languageLookup
