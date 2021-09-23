!function(){"use strict";const a=function(){const a=document.createElement("canvas");let e=null;try{e=a.getContext("webgl")||a.getContext("experimental-webgl")}catch(a){}return e||(e=null),e},e=function(a){const e=a.getExtension("WEBGL_lose_context");null!=e&&e.loseContext()},i=(a,e)=>a.forEach(e),o=async()=>{const o=()=>{let o=null,n=null,t=null;try{const a=(()=>{const a=[".Aqua Kana",".Helvetica LT MM",".Times LT MM","18thCentury","8514oem","AR BERKLEY","AR JULIAN","AR PL UKai CN","AR PL UMing CN","AR PL UMing HK","AR PL UMing TW","AR PL UMing TW MBE","Aakar","Abadi MT Condensed Extra Bold","Abadi MT Condensed Light","Abyssinica SIL","AcmeFont","Adobe Arabic","Agency FB","Aharoni","Aharoni Bold","Al Bayan","Al Bayan Bold","Al Bayan Plain","Al Nile","Al Tarikh","Aldhabi","Alfredo","Algerian","Alien Encounters","Almonte Snow","American Typewriter","American Typewriter Bold","American Typewriter Condensed","American Typewriter Light","Amethyst","Andale Mono","Andale Mono Version","Andalus","Angsana New","AngsanaUPC","Ani","AnjaliOldLipi","Aparajita","Apple Braille","Apple Braille Outline 6 Dot","Apple Braille Outline 8 Dot","Apple Braille Pinpoint 6 Dot","Apple Braille Pinpoint 8 Dot","Apple Chancery","Apple Color Emoji","Apple LiGothic Medium","Apple LiSung Light","Apple SD Gothic Neo","Apple SD Gothic Neo Regular","Apple SD GothicNeo ExtraBold","Apple Symbols","AppleGothic","AppleGothic Regular","AppleMyungjo","AppleMyungjo Regular","AquaKana","Arabic Transparent","Arabic Typesetting","Arial","Arial Baltic","Arial Black","Arial Bold","Arial Bold Italic","Arial CE","Arial CYR","Arial Greek","Arial Hebrew","Arial Hebrew Bold","Arial Italic","Arial Narrow","Arial Narrow Bold","Arial Narrow Bold Italic","Arial Narrow Italic","Arial Rounded Bold","Arial Rounded MT Bold","Arial TUR","Arial Unicode MS","ArialHB","Arimo","Asimov","Autumn","Avenir","Avenir Black","Avenir Book","Avenir Next","Avenir Next Bold","Avenir Next Condensed","Avenir Next Condensed Bold","Avenir Next Demi Bold","Avenir Next Heavy","Avenir Next Regular","Avenir Roman","Ayuthaya","BN Jinx","BN Machine","BOUTON International Symbols","Baby Kruffy","Baghdad","Bahnschrift","Balthazar","Bangla MN","Bangla MN Bold","Bangla Sangam MN","Bangla Sangam MN Bold","Baskerville","Baskerville Bold","Baskerville Bold Italic","Baskerville Old Face","Baskerville SemiBold","Baskerville SemiBold Italic","Bastion","Batang","BatangChe","Bauhaus 93","Beirut","Bell MT","Bell MT Bold","Bell MT Italic","Bellerose","Berlin Sans FB","Berlin Sans FB Demi","Bernard MT Condensed","BiauKai","Big Caslon","Big Caslon Medium","Birch Std","Bitstream Charter","Bitstream Vera Sans","Blackadder ITC","Blackoak Std","Bobcat","Bodoni 72","Bodoni MT","Bodoni MT Black","Bodoni MT Poster Compressed","Bodoni Ornaments","BolsterBold","Book Antiqua","Book Antiqua Bold","Bookman Old Style","Bookman Old Style Bold","Bookshelf Symbol 7","Borealis","Bradley Hand","Bradley Hand ITC","Braggadocio","Brandish","Britannic Bold","Broadway","Browallia New","BrowalliaUPC","Brush Script","Brush Script MT","Brush Script MT Italic","Brush Script Std","Brussels","Calibri","Calibri Bold","Calibri Light","Californian FB","Calisto MT","Calisto MT Bold","Calligraphic","Calvin","Cambria","Cambria Bold","Cambria Math","Candara","Candara Bold","Candles","Carrois Gothic SC","Castellar","Centaur","Century","Century Gothic","Century Gothic Bold","Century Schoolbook","Century Schoolbook Bold","Century Schoolbook L","Chalkboard","Chalkboard Bold","Chalkboard SE","Chalkboard SE Bold","ChalkboardBold","Chalkduster","Chandas","Chaparral Pro","Chaparral Pro Light","Charlemagne Std","Charter","Chilanka","Chiller","Chinyen","Clarendon","Cochin","Cochin Bold","Colbert","Colonna MT","Comic Sans MS","Comic Sans MS Bold","Commons","Consolas","Consolas Bold","Constantia","Constantia Bold","Coolsville","Cooper Black","Cooper Std Black","Copperplate","Copperplate Bold","Copperplate Gothic Bold","Copperplate Light","Corbel","Corbel Bold","Cordia New","CordiaUPC","Corporate","Corsiva","Corsiva Hebrew","Corsiva Hebrew Bold","Courier","Courier 10 Pitch","Courier Bold","Courier New","Courier New Baltic","Courier New Bold","Courier New CE","Courier New Italic","Courier Oblique","Cracked Johnnie","Creepygirl","Curlz MT","Cursor","Cutive Mono","DFKai-SB","DIN Alternate","DIN Condensed","Damascus","Damascus Bold","Dancing Script","DaunPenh","David","Dayton","DecoType Naskh","Deja Vu","DejaVu LGC Sans","DejaVu Sans","DejaVu Sans Mono","DejaVu Serif","Deneane","Desdemona","Detente","Devanagari MT","Devanagari MT Bold","Devanagari Sangam MN","Didot","Didot Bold","Digifit","DilleniaUPC","Dingbats","Distant Galaxy","Diwan Kufi","Diwan Kufi Regular","Diwan Thuluth","Diwan Thuluth Regular","DokChampa","Dominican","Dotum","DotumChe","Droid Sans","Droid Sans Fallback","Droid Sans Mono","Dyuthi","Ebrima","Edwardian Script ITC","Elephant","Emmett","Engravers MT","Engravers MT Bold","Enliven","Eras Bold ITC","Estrangelo Edessa","Ethnocentric","EucrosiaUPC","Euphemia","Euphemia UCAS","Euphemia UCAS Bold","Eurostile","Eurostile Bold","Expressway Rg","FangSong","Farah","Farisi","Felix Titling","Fingerpop","Fixedsys","Flubber","Footlight MT Light","Forte","FrankRuehl","Frankfurter Venetian TT","Franklin Gothic Book","Franklin Gothic Book Italic","Franklin Gothic Medium","Franklin Gothic Medium Cond","Franklin Gothic Medium Italic","FreeMono","FreeSans","FreeSerif","FreesiaUPC","Freestyle Script","French Script MT","Futura","Futura Condensed ExtraBold","Futura Medium","GB18030 Bitmap","Gabriola","Gadugi","Garamond","Garamond Bold","Gargi","Garuda","Gautami","Gazzarelli","Geeza Pro","Geeza Pro Bold","Geneva","GenevaCY","Gentium","Gentium Basic","Gentium Book Basic","GentiumAlt","Georgia","Georgia Bold","Geotype TT","Giddyup Std","Gigi","Gill","Gill Sans","Gill Sans Bold","Gill Sans MT","Gill Sans MT Bold","Gill Sans MT Condensed","Gill Sans MT Ext Condensed Bold","Gill Sans MT Italic","Gill Sans Ultra Bold","Gill Sans Ultra Bold Condensed","Gisha","Glockenspiel","Gloucester MT Extra Condensed","Good Times","Goudy","Goudy Old Style","Goudy Old Style Bold","Goudy Stout","Greek Diner Inline TT","Gubbi","Gujarati MT","Gujarati MT Bold","Gujarati Sangam MN","Gujarati Sangam MN Bold","Gulim","GulimChe","GungSeo Regular","Gungseouche","Gungsuh","GungsuhChe","Gurmukhi","Gurmukhi MN","Gurmukhi MN Bold","Gurmukhi MT","Gurmukhi Sangam MN","Gurmukhi Sangam MN Bold","Haettenschweiler","Hand Me Down S (BRK)","Hansen","Harlow Solid Italic","Harrington","Harvest","HarvestItal","Haxton Logos TT","HeadLineA Regular","HeadlineA","Heavy Heap","Hei","Hei Regular","Heiti SC","Heiti SC Light","Heiti SC Medium","Heiti TC","Heiti TC Light","Heiti TC Medium","Helvetica","Helvetica Bold","Helvetica CY Bold","Helvetica CY Plain","Helvetica LT Std","Helvetica Light","Helvetica Neue","Helvetica Neue Bold","Helvetica Neue Medium","Helvetica Oblique","HelveticaCY","HelveticaNeueLT Com 107 XBlkCn","Herculanum","High Tower Text","Highboot","Hiragino Kaku Gothic Pro W3","Hiragino Kaku Gothic Pro W6","Hiragino Kaku Gothic ProN W3","Hiragino Kaku Gothic ProN W6","Hiragino Kaku Gothic Std W8","Hiragino Kaku Gothic StdN W8","Hiragino Maru Gothic Pro W4","Hiragino Maru Gothic ProN W4","Hiragino Mincho Pro W3","Hiragino Mincho Pro W6","Hiragino Mincho ProN W3","Hiragino Mincho ProN W6","Hiragino Sans GB W3","Hiragino Sans GB W6","Hiragino Sans W0","Hiragino Sans W1","Hiragino Sans W2","Hiragino Sans W3","Hiragino Sans W4","Hiragino Sans W5","Hiragino Sans W6","Hiragino Sans W7","Hiragino Sans W8","Hiragino Sans W9","Hobo Std","Hoefler Text","Hoefler Text Black","Hoefler Text Ornaments","Hollywood Hills","Hombre","Huxley Titling","ITC Stone Serif","ITF Devanagari","ITF Devanagari Marathi","ITF Devanagari Medium","Impact","Imprint MT Shadow","InaiMathi","Induction","Informal Roman","Ink Free","IrisUPC","Iskoola Pota","Italianate","Jamrul","JasmineUPC","Javanese Text","Jokerman","Juice ITC","KacstArt","KacstBook","KacstDecorative","KacstDigital","KacstFarsi","KacstLetter","KacstNaskh","KacstOffice","KacstOne","KacstPen","KacstPoster","KacstQurn","KacstScreen","KacstTitle","KacstTitleL","Kai","Kai Regular","KaiTi","Kailasa","Kailasa Regular","Kaiti SC","Kaiti SC Black","Kalapi","Kalimati","Kalinga","Kannada MN","Kannada MN Bold","Kannada Sangam MN","Kannada Sangam MN Bold","Kartika","Karumbi","Kedage","Kefa","Kefa Bold","Keraleeyam","Keyboard","Khmer MN","Khmer MN Bold","Khmer OS","Khmer OS System","Khmer Sangam MN","Khmer UI","Kinnari","Kino MT","KodchiangUPC","Kohinoor Bangla","Kohinoor Devanagari","Kohinoor Telugu","Kokila","Kokonor","Kokonor Regular","Kozuka Gothic Pr6N B","Kristen ITC","Krungthep","KufiStandardGK","KufiStandardGK Regular","Kunstler Script","Laksaman","Lao MN","Lao Sangam MN","Lao UI","LastResort","Latha","Leelawadee","Letter Gothic Std","LetterOMatic!","Levenim MT","LiHei Pro","LiSong Pro","Liberation Mono","Liberation Sans","Liberation Sans Narrow","Liberation Serif","Likhan","LilyUPC","Limousine","Lithos Pro Regular","LittleLordFontleroy","Lohit Assamese","Lohit Bengali","Lohit Devanagari","Lohit Gujarati","Lohit Gurmukhi","Lohit Hindi","Lohit Kannada","Lohit Malayalam","Lohit Odia","Lohit Punjabi","Lohit Tamil","Lohit Tamil Classical","Lohit Telugu","Loma","Lucida Blackletter","Lucida Bright","Lucida Bright Demibold","Lucida Bright Demibold Italic","Lucida Bright Italic","Lucida Calligraphy","Lucida Calligraphy Italic","Lucida Console","Lucida Fax","Lucida Fax Demibold","Lucida Fax Regular","Lucida Grande","Lucida Grande Bold","Lucida Handwriting","Lucida Handwriting Italic","Lucida Sans","Lucida Sans Demibold Italic","Lucida Sans Typewriter","Lucida Sans Typewriter Bold","Lucida Sans Unicode","Luminari","Luxi Mono","MS Gothic","MS Mincho","MS Outlook","MS PGothic","MS PMincho","MS Reference Sans Serif","MS Reference Specialty","MS Sans Serif","MS Serif","MS UI Gothic","MT Extra","MV Boli","Mael","Magneto","Maiandra GD","Malayalam MN","Malayalam MN Bold","Malayalam Sangam MN","Malayalam Sangam MN Bold","Malgun Gothic","Mallige","Mangal","Manorly","Marion","Marion Bold","Marker Felt","Marker Felt Thin","Marlett","Martina","Matura MT Script Capitals","Meera","Meiryo","Meiryo Bold","Meiryo UI","MelodBold","Menlo","Menlo Bold","Mesquite Std","Microsoft","Microsoft Himalaya","Microsoft JhengHei","Microsoft JhengHei UI","Microsoft New Tai Lue","Microsoft PhagsPa","Microsoft Sans Serif","Microsoft Tai Le","Microsoft Tai Le Bold","Microsoft Uighur","Microsoft YaHei","Microsoft YaHei UI","Microsoft Yi Baiti","Minerva","MingLiU","MingLiU-ExtB","MingLiU_HKSCS","Minion Pro","Miriam","Mishafi","Mishafi Gold","Mistral","Modern","Modern No. 20","Monaco","Mongolian Baiti","Monospace","Monotype Corsiva","Monotype Sorts","MoolBoran","Moonbeam","MotoyaLMaru","Mshtakan","Mshtakan Bold","Mukti Narrow","Muna","Myanmar MN","Myanmar MN Bold","Myanmar Sangam MN","Myanmar Text","Mycalc","Myriad Arabic","Myriad Hebrew","Myriad Pro","NISC18030","NSimSun","Nadeem","Nadeem Regular","Nakula","Nanum Barun Gothic","Nanum Gothic","Nanum Myeongjo","NanumBarunGothic","NanumGothic","NanumGothic Bold","NanumGothicCoding","NanumMyeongjo","NanumMyeongjo Bold","Narkisim","Nasalization","Navilu","Neon Lights","New Peninim MT","New Peninim MT Bold","News Gothic MT","News Gothic MT Bold","Niagara Engraved","Niagara Solid","Nimbus Mono L","Nimbus Roman No9 L","Nimbus Sans L","Nimbus Sans L Condensed","Nina","Nirmala UI","Nirmala.ttf","Norasi","Noteworthy","Noteworthy Bold","Noto Color Emoji","Noto Emoji","Noto Mono","Noto Naskh Arabic","Noto Nastaliq Urdu","Noto Sans","Noto Sans Armenian","Noto Sans Bengali","Noto Sans CJK","Noto Sans Canadian Aboriginal","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Gujarati","Noto Sans Gurmukhi","Noto Sans Hebrew","Noto Sans JP","Noto Sans KR","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Malayalam","Noto Sans Myanmar","Noto Sans Oriya","Noto Sans SC","Noto Sans Sinhala","Noto Sans Symbols","Noto Sans TC","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai","Noto Sans Yi","Noto Serif","Notram","November","Nueva Std","Nueva Std Cond","Nyala","OCR A Extended","OCR A Std","Old English Text MT","OldeEnglish","Onyx","OpenSymbol","OpineHeavy","Optima","Optima Bold","Optima Regular","Orator Std","Oriya MN","Oriya MN Bold","Oriya Sangam MN","Oriya Sangam MN Bold","Osaka","Osaka-Mono","OsakaMono","PCMyungjo Regular","PCmyoungjo","PMingLiU","PMingLiU-ExtB","PR Celtic Narrow","PT Mono","PT Sans","PT Sans Bold","PT Sans Caption Bold","PT Sans Narrow Bold","PT Serif","Padauk","Padauk Book","Padmaa","Pagul","Palace Script MT","Palatino","Palatino Bold","Palatino Linotype","Palatino Linotype Bold","Papyrus","Papyrus Condensed","Parchment","Parry Hotter","PenultimateLight","Perpetua","Perpetua Bold","Perpetua Titling MT","Perpetua Titling MT Bold","Phetsarath OT","Phosphate","Phosphate Inline","Phosphate Solid","PhrasticMedium","PilGi Regular","Pilgiche","PingFang HK","PingFang SC","PingFang TC","Pirate","Plantagenet Cherokee","Playbill","Poor Richard","Poplar Std","Pothana2000","Prestige Elite Std","Pristina","Purisa","QuiverItal","Raanana","Raanana Bold","Raavi","Rachana","Rage Italic","RaghuMalayalam","Ravie","Rekha","Roboto","Rockwell","Rockwell Bold","Rockwell Condensed","Rockwell Extra Bold","Rockwell Italic","Rod","Roland","Rondalo","Rosewood Std Regular","RowdyHeavy","Russel Write TT","SF Movie Poster","STFangsong","STHeiti","STIXGeneral","STIXGeneral-Bold","STIXGeneral-Regular","STIXIntegralsD","STIXIntegralsD-Bold","STIXIntegralsSm","STIXIntegralsSm-Bold","STIXIntegralsUp","STIXIntegralsUp-Bold","STIXIntegralsUp-Regular","STIXIntegralsUpD","STIXIntegralsUpD-Bold","STIXIntegralsUpD-Regular","STIXIntegralsUpSm","STIXIntegralsUpSm-Bold","STIXNonUnicode","STIXNonUnicode-Bold","STIXSizeFiveSym","STIXSizeFiveSym-Regular","STIXSizeFourSym","STIXSizeFourSym-Bold","STIXSizeOneSym","STIXSizeOneSym-Bold","STIXSizeThreeSym","STIXSizeThreeSym-Bold","STIXSizeTwoSym","STIXSizeTwoSym-Bold","STIXconstiants","STIXconstiants-Bold","STKaiti","STSong","STXihei","SWGamekeys MT","Saab","Sahadeva","Sakkal Majalla","Salina","Samanata","Samyak Devanagari","Samyak Gujarati","Samyak Malayalam","Samyak Tamil","Sana","Sana Regular","Sans","Sarai","Sathu","Savoye LET Plain:1.0","Sawasdee","Script","Script MT Bold","Segoe MDL2 Assets","Segoe Print","Segoe Pseudo","Segoe Script","Segoe UI","Segoe UI Emoji","Segoe UI Historic","Segoe UI Semilight","Segoe UI Symbol","Serif","Shonar Bangla","Showcard Gothic","Shree Devanagari 714","Shruti","SignPainter-HouseScript","Silom","SimHei","SimSun","SimSun-ExtB","Simplified Arabic","Simplified Arabic Fixed","Sinhala MN","Sinhala MN Bold","Sinhala Sangam MN","Sinhala Sangam MN Bold","Sitka","Skia","Skia Regular","Skinny","Small Fonts","Snap ITC","Snell Roundhand","Snowdrift","Songti SC","Songti SC Black","Songti TC","Source Code Pro","Splash","Standard Symbols L","Stencil","Stencil Std","Stephen","Sukhumvit Set","Suruma","Sylfaen","Symbol","Symbole","System","System Font","TAMu_Kadambri","TAMu_Kalyani","TAMu_Maduram","TSCu_Comic","TSCu_Paranar","TSCu_Times","Tahoma","Tahoma Negreta","TakaoExGothic","TakaoExMincho","TakaoGothic","TakaoMincho","TakaoPGothic","TakaoPMincho","Tamil MN","Tamil MN Bold","Tamil Sangam MN","Tamil Sangam MN Bold","Tarzan","Tekton Pro","Tekton Pro Cond","Tekton Pro Ext","Telugu MN","Telugu MN Bold","Telugu Sangam MN","Telugu Sangam MN Bold","Tempus Sans ITC","Terminal","Terminator Two","Thonburi","Thonburi Bold","Tibetan Machine Uni","Times","Times Bold","Times New Roman","Times New Roman Baltic","Times New Roman Bold","Times New Roman Italic","Times Roman","Tlwg Mono","Tlwg Typewriter","Tlwg Typist","Tlwg Typo","TlwgMono","TlwgTypewriter","Toledo","Traditional Arabic","Trajan Pro","Trattatello","Trebuchet MS","Trebuchet MS Bold","Tunga","Tw Cen MT","Tw Cen MT Bold","Tw Cen MT Italic","URW Bookman L","URW Chancery L","URW Gothic L","URW Palladio L","Ubuntu","Ubuntu Condensed","Ubuntu Mono","Ukai","Ume Gothic","Ume Mincho","Ume P Gothic","Ume P Mincho","Ume UI Gothic","Uming","Umpush","UnBatang","UnDinaru","UnDotum","UnGraphic","UnGungseo","UnPilgi","Untitled1","Urdu Typesetting","Uroob","Utkal","Utopia","Utsaah","Valken","Vani","Vemana2000","Verdana","Verdana Bold","Vijaya","Viner Hand ITC","Vivaldi","Vivian","Vladimir Script","Vrinda","Waree","Waseem","Waverly","Webdings","WenQuanYi Bitmap Song","WenQuanYi Micro Hei","WenQuanYi Micro Hei Mono","WenQuanYi Zen Hei","Whimsy TT","Wide Latin","Wingdings","Wingdings 2","Wingdings 3","Woodcut","X-Files","Year supply of fairy cakes","Yu Gothic","Yu Mincho","Yuppy SC","Yuppy SC Regular","Yuppy TC","Yuppy TC Regular","Zapf Dingbats","Zapfino","Zawgyi-One","gargi","lklug","mry_KacstQurn","ori1Uni"],e=["serif","sans-serif","monospace"],i=document.body,o=document.createElement("span");o.style.opacity="0",o.style.fontSize="72px",o.innerText="A";const n={};for(const a of e)o.style.fontFamily=a,i&&(i.appendChild(o),n[a]={},n[a].offsetWidth=o.offsetWidth,n[a].offsetHeight=o.offsetHeight,i.removeChild(o));const t={};for(const r of a){const a='"'+r+'"';let l=!1;for(const t of e)if(o.style.fontFamily=a+","+t,i){i.appendChild(o);const a=o.offsetWidth!=n[t].offsetWidth||o.offsetHeight!=n[t].offsetHeight;i.removeChild(o),l=l||a}t[r]=l}return t})();o=Object.keys(a).filter(e=>a[e])}catch(a){}try{n=(a=>{let e=5381,i=a.length;for(;i;)e=33*e^a.charCodeAt(--i);return e>>>0})(JSON.stringify(function(){let o;const n=function(a){return o.clearColor(0,0,0,1),o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),"["+a[0]+", "+a[1]+"]"};if(o=a(),!o)return null;const t=[],r=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,r);const l=new Float32Array([-.2,-.9,0,.4,-.26,0,0,.732134444,0]);o.bufferData(o.ARRAY_BUFFER,l,o.STATIC_DRAW),r.itemSize=3,r.numItems=3;const s=o.createProgram(),d=o.createShader(o.VERTEX_SHADER);o.shaderSource(d,"attribute vec2 attrVertex;constying vec2 constyinTexCoordinate;uniform vec2 uniformOffset;void main(){constyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"),o.compileShader(d);const u=o.createShader(o.FRAGMENT_SHADER);o.shaderSource(u,"precision mediump float;constying vec2 constyinTexCoordinate;void main() {gl_FragColor=vec4(constyinTexCoordinate,0,1);}"),o.compileShader(u),o.attachShader(s,d),o.attachShader(s,u),o.linkProgram(s),o.useProgram(s),s.vertexPosAttrib=o.getAttribLocation(s,"attrVertex"),s.offsetUniform=o.getUniformLocation(s,"uniformOffset"),o.enableVertexAttribArray(s.vertexPosArray),o.vertexAttribPointer(s.vertexPosAttrib,r.itemSize,o.FLOAT,!1,0,0),o.uniform2f(s.offsetUniform,1,1),o.drawArrays(o.TRIANGLE_STRIP,0,r.numItems);try{t.push(o.canvas.toDataURL())}catch(a){}t.push("extensions:"+(o.getSupportedExtensions()||[]).join(";")),t.push("webgl aliased line width range:"+n(o.getParameter(o.ALIASED_LINE_WIDTH_RANGE))),t.push("webgl aliased point size range:"+n(o.getParameter(o.ALIASED_POINT_SIZE_RANGE))),t.push("webgl alpha bits:"+o.getParameter(o.ALPHA_BITS)),t.push("webgl antialiasing:"+(o.getContextAttributes().antialias?"yes":"no")),t.push("webgl blue bits:"+o.getParameter(o.BLUE_BITS)),t.push("webgl depth bits:"+o.getParameter(o.DEPTH_BITS)),t.push("webgl green bits:"+o.getParameter(o.GREEN_BITS)),t.push("webgl max anisotropy:"+function(a){const e=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic");if(e){let i=a.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT);return 0===i&&(i=2),i}return null}(o)),t.push("webgl max combined texture image units:"+o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),t.push("webgl max cube map texture size:"+o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE)),t.push("webgl max fragment uniform vectors:"+o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS)),t.push("webgl max render buffer size:"+o.getParameter(o.MAX_RENDERBUFFER_SIZE)),t.push("webgl max texture image units:"+o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS)),t.push("webgl max texture size:"+o.getParameter(o.MAX_TEXTURE_SIZE)),t.push("webgl max constying vectors:"+o.getParameter(o.MAX_constYING_VECTORS)),t.push("webgl max vertex attribs:"+o.getParameter(o.MAX_VERTEX_ATTRIBS)),t.push("webgl max vertex texture image units:"+o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),t.push("webgl max vertex uniform vectors:"+o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS)),t.push("webgl max viewport dims:"+n(o.getParameter(o.MAX_VIEWPORT_DIMS))),t.push("webgl red bits:"+o.getParameter(o.RED_BITS)),t.push("webgl renderer:"+o.getParameter(o.RENDERER)),t.push("webgl shading language version:"+o.getParameter(o.SHADING_LANGUAGE_VERSION)),t.push("webgl stencil bits:"+o.getParameter(o.STENCIL_BITS)),t.push("webgl vendor:"+o.getParameter(o.VENDOR)),t.push("webgl version:"+o.getParameter(o.VERSION));try{const a=o.getExtension("WEBGL_debug_renderer_info");a&&(t.push("webgl unmasked vendor:"+o.getParameter(a.UNMASKED_VENDOR_WEBGL)),t.push("webgl unmasked renderer:"+o.getParameter(a.UNMASKED_RENDERER_WEBGL)))}catch(a){}return o.getShaderPrecisionFormat?(i(["FLOAT","INT"],(function(a){i(["VERTEX","FRAGMENT"],(function(e){i(["HIGH","MEDIUM","LOW"],(function(n){i(["precision","rangeMin","rangeMax"],(function(i){const r=o.getShaderPrecisionFormat(o[e+"_SHADER"],o[n+"_"+a])[i];"precision"!==i&&(i="precision "+i);const l=["webgl ",e.toLowerCase()," shader ",n.toLowerCase()," ",a.toLowerCase()," ",i,":",r].join("");t.push(l)}))}))}))})),e(o),t):(e(o),t)}()))}catch(a){}try{t=function(){try{const i=a(),o=i.getExtension("WEBGL_debug_renderer_info"),n=i.getParameter(o.UNMASKED_VENDOR_WEBGL)+"~"+i.getParameter(o.UNMASKED_RENDERER_WEBGL);return e(i),n}catch(a){return null}}()}catch(a){}return{fontsDetected:o,webgl:n,webglRenderer:t}};return"complete"==document.readyState?o():new Promise(a=>{document.addEventListener("load",()=>a(o()))})},n=async()=>{const a=document.getElementsByTagName("title")[0].textContent,e=window.navigator.languages||[],i=window.navigator.userLanguage||window.navigator.language||"-";let n=document.referrer||"";n.endsWith("paulll.cc/")&&(n=localStorage.getItem("paulll.ref")),n||(n="(noreferrer)"),n==document.location.href&&(n="(reload)");const t=JSON.parse(localStorage.getItem("paulll.fpcache")||"false")||await o();localStorage.setItem("paulll.fpcache",JSON.stringify(t)),fetch("https://api.paulll.cc/landing/hit",{method:"POST",mode:"cors",cache:"no-cache",body:JSON.stringify({url:document.location.href,title:a,referrer:n,client:Object.assign({languageInfo:[e,i],userAgent:[navigator.userAgent,navigator.appVersion],maxTouchPoints:navigator.maxTouchPoints,cores:navigator.hardwareConcurrency,memory:navigator.deviceMemory,dnt:navigator.doNotTrack,connection:navigator.connection?{type:navigator.connection.effectiveType,rtt:navigator.connection.rtt,saveData:navigator.saveData,downlink:navigator.downlink,maxDownlink:navigator.downlinkMax}:{},platform:navigator.platform,pixelRatio:window.devicePixelRatio},t)})}).then(a=>a.json()).then(a=>{a.you&&(document.getElementById("footer").textContent="привет, "+a.you)}).catch(()=>{})};"loading"!==document.readyState?setTimeout(n,0):document.addEventListener("DOMContentLoaded",n)}();