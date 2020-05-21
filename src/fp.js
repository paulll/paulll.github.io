const getWebglCanvas = function() {
	const canvas = document.createElement('canvas')
	let gl = null
	try {
		gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
	} catch (e) {
		/* squelch */ }
	if (!gl) {
		gl = null
	}
	return gl
}
const loseWebglContext = function(context) {
	const loseContextExtension = context.getExtension('WEBGL_lose_context')
	if (loseContextExtension != null) {
		loseContextExtension.loseContext()
	}
}

const each = (v, cb) => v.forEach(cb);

const getWebglFp = function() {
	let gl;
	const fa2s = function(fa) {
		gl.clearColor(0.0, 0.0, 0.0, 1.0)
		gl.enable(gl.DEPTH_TEST)
		gl.depthFunc(gl.LEQUAL)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
		return '[' + fa[0] + ', ' + fa[1] + ']'
	}
	const maxAnisotropy = function(gl) {
		const ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic')
		if (ext) {
			let anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
			if (anisotropy === 0) {
				anisotropy = 2
			}
			return anisotropy
		} else {
			return null
		}
	}

	gl = getWebglCanvas()
	if (!gl) {
		return null
	}
	// WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
	// First it draws a gradient object with shaders and convers the image to the Base64 string.
	// Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
	// Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
	const result = []
	const vShaderTemplate = 'attribute vec2 attrVertex;constying vec2 constyinTexCoordinate;uniform vec2 uniformOffset;void main(){constyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
	const fShaderTemplate = 'precision mediump float;constying vec2 constyinTexCoordinate;void main() {gl_FragColor=vec4(constyinTexCoordinate,0,1);}'
	const vertexPosBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
	const vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0])
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
	vertexPosBuffer.itemSize = 3
	vertexPosBuffer.numItems = 3
	const program = gl.createProgram()
	const vshader = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vshader, vShaderTemplate)
	gl.compileShader(vshader)
	const fshader = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fshader, fShaderTemplate)
	gl.compileShader(fshader)
	gl.attachShader(program, vshader)
	gl.attachShader(program, fshader)
	gl.linkProgram(program)
	gl.useProgram(program)
	program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex')
	program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset')
	gl.enableVertexAttribArray(program.vertexPosArray)
	gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0)
	gl.uniform2f(program.offsetUniform, 1, 1)
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)
	try {
		result.push(gl.canvas.toDataURL())
	} catch (e) {
		/* .toDataURL may be absent or broken (blocked by extension) */
	}
	result.push('extensions:' + (gl.getSupportedExtensions() || []).join(';'))
	result.push('webgl aliased line width range:' + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)))
	result.push('webgl aliased point size range:' + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)))
	result.push('webgl alpha bits:' + gl.getParameter(gl.ALPHA_BITS))
	result.push('webgl antialiasing:' + (gl.getContextAttributes().antialias ? 'yes' : 'no'))
	result.push('webgl blue bits:' + gl.getParameter(gl.BLUE_BITS))
	result.push('webgl depth bits:' + gl.getParameter(gl.DEPTH_BITS))
	result.push('webgl green bits:' + gl.getParameter(gl.GREEN_BITS))
	result.push('webgl max anisotropy:' + maxAnisotropy(gl))
	result.push('webgl max combined texture image units:' + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS))
	result.push('webgl max cube map texture size:' + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE))
	result.push('webgl max fragment uniform vectors:' + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS))
	result.push('webgl max render buffer size:' + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE))
	result.push('webgl max texture image units:' + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS))
	result.push('webgl max texture size:' + gl.getParameter(gl.MAX_TEXTURE_SIZE))
	result.push('webgl max constying vectors:' + gl.getParameter(gl.MAX_constYING_VECTORS))
	result.push('webgl max vertex attribs:' + gl.getParameter(gl.MAX_VERTEX_ATTRIBS))
	result.push('webgl max vertex texture image units:' + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS))
	result.push('webgl max vertex uniform vectors:' + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS))
	result.push('webgl max viewport dims:' + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)))
	result.push('webgl red bits:' + gl.getParameter(gl.RED_BITS))
	result.push('webgl renderer:' + gl.getParameter(gl.RENDERER))
	result.push('webgl shading language version:' + gl.getParameter(gl.SHADING_LANGUAGE_VERSION))
	result.push('webgl stencil bits:' + gl.getParameter(gl.STENCIL_BITS))
	result.push('webgl vendor:' + gl.getParameter(gl.VENDOR))
	result.push('webgl version:' + gl.getParameter(gl.VERSION))

	try {
		// Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
		const extensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info')
		if (extensionDebugRendererInfo) {
			result.push('webgl unmasked vendor:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL))
			result.push('webgl unmasked renderer:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL))
		}
	} catch (e) {
		/* squelch */ }

	if (!gl.getShaderPrecisionFormat) {
		loseWebglContext(gl)
		return result
	}

	each(['FLOAT', 'INT'], function(numType) {
		each(['VERTEX', 'FRAGMENT'], function(shader) {
			each(['HIGH', 'MEDIUM', 'LOW'], function(numSize) {
				each(['precision', 'rangeMin', 'rangeMax'], function(key) {
					const format = gl.getShaderPrecisionFormat(gl[shader + '_SHADER'], gl[numSize + '_' + numType])[key]
					if (key !== 'precision') {
						key = 'precision ' + key
					}
					const line = ['webgl ', shader.toLowerCase(), ' shader ', numSize.toLowerCase(), ' ', numType.toLowerCase(), ' ', key, ':', format].join('')
					result.push(line)
				})
			})
		})
	})
	loseWebglContext(gl)
	return result
}
const getWebglVendorAndRenderer = function() {
	/* This a subset of the WebGL fingerprint with a lot of entropy, while being reasonably browser-independent */
	try {
		const glContext = getWebglCanvas()
		const extensionDebugRendererInfo = glContext.getExtension('WEBGL_debug_renderer_info')
		const params = glContext.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) + '~' + glContext.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL)
		loseWebglContext(glContext)
		return params
	} catch (e) {
		return null
	}
}

const getFonts = () => {
	const fonts = ['.Aqua Kana', '.Helvetica LT MM', '.Times LT MM', '18thCentury', '8514oem', 'AR BERKLEY', 'AR JULIAN', 'AR PL UKai CN', 'AR PL UMing CN', 'AR PL UMing HK', 'AR PL UMing TW', 'AR PL UMing TW MBE', 'Aakar', 'Abadi MT Condensed Extra Bold', 'Abadi MT Condensed Light', 'Abyssinica SIL', 'AcmeFont', 'Adobe Arabic', 'Agency FB', 'Aharoni', 'Aharoni Bold', 'Al Bayan', 'Al Bayan Bold', 'Al Bayan Plain', 'Al Nile', 'Al Tarikh', 'Aldhabi', 'Alfredo', 'Algerian', 'Alien Encounters', 'Almonte Snow', 'American Typewriter', 'American Typewriter Bold', 'American Typewriter Condensed', 'American Typewriter Light', 'Amethyst', 'Andale Mono', 'Andale Mono Version', 'Andalus', 'Angsana New', 'AngsanaUPC', 'Ani', 'AnjaliOldLipi', 'Aparajita', 'Apple Braille', 'Apple Braille Outline 6 Dot', 'Apple Braille Outline 8 Dot', 'Apple Braille Pinpoint 6 Dot', 'Apple Braille Pinpoint 8 Dot', 'Apple Chancery', 'Apple Color Emoji', 'Apple LiGothic Medium', 'Apple LiSung Light', 'Apple SD Gothic Neo', 'Apple SD Gothic Neo Regular', 'Apple SD GothicNeo ExtraBold', 'Apple Symbols', 'AppleGothic', 'AppleGothic Regular', 'AppleMyungjo', 'AppleMyungjo Regular', 'AquaKana', 'Arabic Transparent', 'Arabic Typesetting', 'Arial', 'Arial Baltic', 'Arial Black', 'Arial Bold', 'Arial Bold Italic', 'Arial CE', 'Arial CYR', 'Arial Greek', 'Arial Hebrew', 'Arial Hebrew Bold', 'Arial Italic', 'Arial Narrow', 'Arial Narrow Bold', 'Arial Narrow Bold Italic', 'Arial Narrow Italic', 'Arial Rounded Bold', 'Arial Rounded MT Bold', 'Arial TUR', 'Arial Unicode MS', 'ArialHB', 'Arimo', 'Asimov', 'Autumn', 'Avenir', 'Avenir Black', 'Avenir Book', 'Avenir Next', 'Avenir Next Bold', 'Avenir Next Condensed', 'Avenir Next Condensed Bold', 'Avenir Next Demi Bold', 'Avenir Next Heavy', 'Avenir Next Regular', 'Avenir Roman', 'Ayuthaya', 'BN Jinx', 'BN Machine', 'BOUTON International Symbols', 'Baby Kruffy', 'Baghdad', 'Bahnschrift', 'Balthazar', 'Bangla MN', 'Bangla MN Bold', 'Bangla Sangam MN', 'Bangla Sangam MN Bold', 'Baskerville', 'Baskerville Bold', 'Baskerville Bold Italic', 'Baskerville Old Face', 'Baskerville SemiBold', 'Baskerville SemiBold Italic', 'Bastion', 'Batang', 'BatangChe', 'Bauhaus 93', 'Beirut', 'Bell MT', 'Bell MT Bold', 'Bell MT Italic', 'Bellerose', 'Berlin Sans FB', 'Berlin Sans FB Demi', 'Bernard MT Condensed', 'BiauKai', 'Big Caslon', 'Big Caslon Medium', 'Birch Std', 'Bitstream Charter', 'Bitstream Vera Sans', 'Blackadder ITC', 'Blackoak Std', 'Bobcat', 'Bodoni 72', 'Bodoni MT', 'Bodoni MT Black', 'Bodoni MT Poster Compressed', 'Bodoni Ornaments', 'BolsterBold', 'Book Antiqua', 'Book Antiqua Bold', 'Bookman Old Style', 'Bookman Old Style Bold', 'Bookshelf Symbol 7', 'Borealis', 'Bradley Hand', 'Bradley Hand ITC', 'Braggadocio', 'Brandish', 'Britannic Bold', 'Broadway', 'Browallia New', 'BrowalliaUPC', 'Brush Script', 'Brush Script MT', 'Brush Script MT Italic', 'Brush Script Std', 'Brussels', 'Calibri', 'Calibri Bold', 'Calibri Light', 'Californian FB', 'Calisto MT', 'Calisto MT Bold', 'Calligraphic', 'Calvin', 'Cambria', 'Cambria Bold', 'Cambria Math', 'Candara', 'Candara Bold', 'Candles', 'Carrois Gothic SC', 'Castellar', 'Centaur', 'Century', 'Century Gothic', 'Century Gothic Bold', 'Century Schoolbook', 'Century Schoolbook Bold', 'Century Schoolbook L', 'Chalkboard', 'Chalkboard Bold', 'Chalkboard SE', 'Chalkboard SE Bold', 'ChalkboardBold', 'Chalkduster', 'Chandas', 'Chaparral Pro', 'Chaparral Pro Light', 'Charlemagne Std', 'Charter', 'Chilanka', 'Chiller', 'Chinyen', 'Clarendon', 'Cochin', 'Cochin Bold', 'Colbert', 'Colonna MT', 'Comic Sans MS', 'Comic Sans MS Bold', 'Commons', 'Consolas', 'Consolas Bold', 'Constantia', 'Constantia Bold', 'Coolsville', 'Cooper Black', 'Cooper Std Black', 'Copperplate', 'Copperplate Bold', 'Copperplate Gothic Bold', 'Copperplate Light', 'Corbel', 'Corbel Bold', 'Cordia New', 'CordiaUPC', 'Corporate', 'Corsiva', 'Corsiva Hebrew', 'Corsiva Hebrew Bold', 'Courier', 'Courier 10 Pitch', 'Courier Bold', 'Courier New', 'Courier New Baltic', 'Courier New Bold', 'Courier New CE', 'Courier New Italic', 'Courier Oblique', 'Cracked Johnnie', 'Creepygirl', 'Curlz MT', 'Cursor', 'Cutive Mono', 'DFKai-SB', 'DIN Alternate', 'DIN Condensed', 'Damascus', 'Damascus Bold', 'Dancing Script', 'DaunPenh', 'David', 'Dayton', 'DecoType Naskh', 'Deja Vu', 'DejaVu LGC Sans', 'DejaVu Sans', 'DejaVu Sans Mono', 'DejaVu Serif', 'Deneane', 'Desdemona', 'Detente', 'Devanagari MT', 'Devanagari MT Bold', 'Devanagari Sangam MN', 'Didot', 'Didot Bold', 'Digifit', 'DilleniaUPC', 'Dingbats', 'Distant Galaxy', 'Diwan Kufi', 'Diwan Kufi Regular', 'Diwan Thuluth', 'Diwan Thuluth Regular', 'DokChampa', 'Dominican', 'Dotum', 'DotumChe', 'Droid Sans', 'Droid Sans Fallback', 'Droid Sans Mono', 'Dyuthi', 'Ebrima', 'Edwardian Script ITC', 'Elephant', 'Emmett', 'Engravers MT', 'Engravers MT Bold', 'Enliven', 'Eras Bold ITC', 'Estrangelo Edessa', 'Ethnocentric', 'EucrosiaUPC', 'Euphemia', 'Euphemia UCAS', 'Euphemia UCAS Bold', 'Eurostile', 'Eurostile Bold', 'Expressway Rg', 'FangSong', 'Farah', 'Farisi', 'Felix Titling', 'Fingerpop', 'Fixedsys', 'Flubber', 'Footlight MT Light', 'Forte', 'FrankRuehl', 'Frankfurter Venetian TT', 'Franklin Gothic Book', 'Franklin Gothic Book Italic', 'Franklin Gothic Medium', 'Franklin Gothic Medium Cond', 'Franklin Gothic Medium Italic', 'FreeMono', 'FreeSans', 'FreeSerif', 'FreesiaUPC', 'Freestyle Script', 'French Script MT', 'Futura', 'Futura Condensed ExtraBold', 'Futura Medium', 'GB18030 Bitmap', 'Gabriola', 'Gadugi', 'Garamond', 'Garamond Bold', 'Gargi', 'Garuda', 'Gautami', 'Gazzarelli', 'Geeza Pro', 'Geeza Pro Bold', 'Geneva', 'GenevaCY', 'Gentium', 'Gentium Basic', 'Gentium Book Basic', 'GentiumAlt', 'Georgia', 'Georgia Bold', 'Geotype TT', 'Giddyup Std', 'Gigi', 'Gill', 'Gill Sans', 'Gill Sans Bold', 'Gill Sans MT', 'Gill Sans MT Bold', 'Gill Sans MT Condensed', 'Gill Sans MT Ext Condensed Bold', 'Gill Sans MT Italic', 'Gill Sans Ultra Bold', 'Gill Sans Ultra Bold Condensed', 'Gisha', 'Glockenspiel', 'Gloucester MT Extra Condensed', 'Good Times', 'Goudy', 'Goudy Old Style', 'Goudy Old Style Bold', 'Goudy Stout', 'Greek Diner Inline TT', 'Gubbi', 'Gujarati MT', 'Gujarati MT Bold', 'Gujarati Sangam MN', 'Gujarati Sangam MN Bold', 'Gulim', 'GulimChe', 'GungSeo Regular', 'Gungseouche', 'Gungsuh', 'GungsuhChe', 'Gurmukhi', 'Gurmukhi MN', 'Gurmukhi MN Bold', 'Gurmukhi MT', 'Gurmukhi Sangam MN', 'Gurmukhi Sangam MN Bold', 'Haettenschweiler', 'Hand Me Down S (BRK)', 'Hansen', 'Harlow Solid Italic', 'Harrington', 'Harvest', 'HarvestItal', 'Haxton Logos TT', 'HeadLineA Regular', 'HeadlineA', 'Heavy Heap', 'Hei', 'Hei Regular', 'Heiti SC', 'Heiti SC Light', 'Heiti SC Medium', 'Heiti TC', 'Heiti TC Light', 'Heiti TC Medium', 'Helvetica', 'Helvetica Bold', 'Helvetica CY Bold', 'Helvetica CY Plain', 'Helvetica LT Std', 'Helvetica Light', 'Helvetica Neue', 'Helvetica Neue Bold', 'Helvetica Neue Medium', 'Helvetica Oblique', 'HelveticaCY', 'HelveticaNeueLT Com 107 XBlkCn', 'Herculanum', 'High Tower Text', 'Highboot', 'Hiragino Kaku Gothic Pro W3', 'Hiragino Kaku Gothic Pro W6', 'Hiragino Kaku Gothic ProN W3', 'Hiragino Kaku Gothic ProN W6', 'Hiragino Kaku Gothic Std W8', 'Hiragino Kaku Gothic StdN W8', 'Hiragino Maru Gothic Pro W4', 'Hiragino Maru Gothic ProN W4', 'Hiragino Mincho Pro W3', 'Hiragino Mincho Pro W6', 'Hiragino Mincho ProN W3', 'Hiragino Mincho ProN W6', 'Hiragino Sans GB W3', 'Hiragino Sans GB W6', 'Hiragino Sans W0', 'Hiragino Sans W1', 'Hiragino Sans W2', 'Hiragino Sans W3', 'Hiragino Sans W4', 'Hiragino Sans W5', 'Hiragino Sans W6', 'Hiragino Sans W7', 'Hiragino Sans W8', 'Hiragino Sans W9', 'Hobo Std', 'Hoefler Text', 'Hoefler Text Black', 'Hoefler Text Ornaments', 'Hollywood Hills', 'Hombre', 'Huxley Titling', 'ITC Stone Serif', 'ITF Devanagari', 'ITF Devanagari Marathi', 'ITF Devanagari Medium', 'Impact', 'Imprint MT Shadow', 'InaiMathi', 'Induction', 'Informal Roman', 'Ink Free', 'IrisUPC', 'Iskoola Pota', 'Italianate', 'Jamrul', 'JasmineUPC', 'Javanese Text', 'Jokerman', 'Juice ITC', 'KacstArt', 'KacstBook', 'KacstDecorative', 'KacstDigital', 'KacstFarsi', 'KacstLetter', 'KacstNaskh', 'KacstOffice', 'KacstOne', 'KacstPen', 'KacstPoster', 'KacstQurn', 'KacstScreen', 'KacstTitle', 'KacstTitleL', 'Kai', 'Kai Regular', 'KaiTi', 'Kailasa', 'Kailasa Regular', 'Kaiti SC', 'Kaiti SC Black', 'Kalapi', 'Kalimati', 'Kalinga', 'Kannada MN', 'Kannada MN Bold', 'Kannada Sangam MN', 'Kannada Sangam MN Bold', 'Kartika', 'Karumbi', 'Kedage', 'Kefa', 'Kefa Bold', 'Keraleeyam', 'Keyboard', 'Khmer MN', 'Khmer MN Bold', 'Khmer OS', 'Khmer OS System', 'Khmer Sangam MN', 'Khmer UI', 'Kinnari', 'Kino MT', 'KodchiangUPC', 'Kohinoor Bangla', 'Kohinoor Devanagari', 'Kohinoor Telugu', 'Kokila', 'Kokonor', 'Kokonor Regular', 'Kozuka Gothic Pr6N B', 'Kristen ITC', 'Krungthep', 'KufiStandardGK', 'KufiStandardGK Regular', 'Kunstler Script', 'Laksaman', 'Lao MN', 'Lao Sangam MN', 'Lao UI', 'LastResort', 'Latha', 'Leelawadee', 'Letter Gothic Std', 'LetterOMatic!', 'Levenim MT', 'LiHei Pro', 'LiSong Pro', 'Liberation Mono', 'Liberation Sans', 'Liberation Sans Narrow', 'Liberation Serif', 'Likhan', 'LilyUPC', 'Limousine', 'Lithos Pro Regular', 'LittleLordFontleroy', 'Lohit Assamese', 'Lohit Bengali', 'Lohit Devanagari', 'Lohit Gujarati', 'Lohit Gurmukhi', 'Lohit Hindi', 'Lohit Kannada', 'Lohit Malayalam', 'Lohit Odia', 'Lohit Punjabi', 'Lohit Tamil', 'Lohit Tamil Classical', 'Lohit Telugu', 'Loma', 'Lucida Blackletter', 'Lucida Bright', 'Lucida Bright Demibold', 'Lucida Bright Demibold Italic', 'Lucida Bright Italic', 'Lucida Calligraphy', 'Lucida Calligraphy Italic', 'Lucida Console', 'Lucida Fax', 'Lucida Fax Demibold', 'Lucida Fax Regular', 'Lucida Grande', 'Lucida Grande Bold', 'Lucida Handwriting', 'Lucida Handwriting Italic', 'Lucida Sans', 'Lucida Sans Demibold Italic', 'Lucida Sans Typewriter', 'Lucida Sans Typewriter Bold', 'Lucida Sans Unicode', 'Luminari', 'Luxi Mono', 'MS Gothic', 'MS Mincho', 'MS Outlook', 'MS PGothic', 'MS PMincho', 'MS Reference Sans Serif', 'MS Reference Specialty', 'MS Sans Serif', 'MS Serif', 'MS UI Gothic', 'MT Extra', 'MV Boli', 'Mael', 'Magneto', 'Maiandra GD', 'Malayalam MN', 'Malayalam MN Bold', 'Malayalam Sangam MN', 'Malayalam Sangam MN Bold', 'Malgun Gothic', 'Mallige', 'Mangal', 'Manorly', 'Marion', 'Marion Bold', 'Marker Felt', 'Marker Felt Thin', 'Marlett', 'Martina', 'Matura MT Script Capitals', 'Meera', 'Meiryo', 'Meiryo Bold', 'Meiryo UI', 'MelodBold', 'Menlo', 'Menlo Bold', 'Mesquite Std', 'Microsoft', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft JhengHei UI', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft Tai Le Bold', 'Microsoft Uighur', 'Microsoft YaHei', 'Microsoft YaHei UI', 'Microsoft Yi Baiti', 'Minerva', 'MingLiU', 'MingLiU-ExtB', 'MingLiU_HKSCS', 'Minion Pro', 'Miriam', 'Mishafi', 'Mishafi Gold', 'Mistral', 'Modern', 'Modern No. 20', 'Monaco', 'Mongolian Baiti', 'Monospace', 'Monotype Corsiva', 'Monotype Sorts', 'MoolBoran', 'Moonbeam', 'MotoyaLMaru', 'Mshtakan', 'Mshtakan Bold', 'Mukti Narrow', 'Muna', 'Myanmar MN', 'Myanmar MN Bold', 'Myanmar Sangam MN', 'Myanmar Text', 'Mycalc', 'Myriad Arabic', 'Myriad Hebrew', 'Myriad Pro', 'NISC18030', 'NSimSun', 'Nadeem', 'Nadeem Regular', 'Nakula', 'Nanum Barun Gothic', 'Nanum Gothic', 'Nanum Myeongjo', 'NanumBarunGothic', 'NanumGothic', 'NanumGothic Bold', 'NanumGothicCoding', 'NanumMyeongjo', 'NanumMyeongjo Bold', 'Narkisim', 'Nasalization', 'Navilu', 'Neon Lights', 'New Peninim MT', 'New Peninim MT Bold', 'News Gothic MT', 'News Gothic MT Bold', 'Niagara Engraved', 'Niagara Solid', 'Nimbus Mono L', 'Nimbus Roman No9 L', 'Nimbus Sans L', 'Nimbus Sans L Condensed', 'Nina', 'Nirmala UI', 'Nirmala.ttf', 'Norasi', 'Noteworthy', 'Noteworthy Bold', 'Noto Color Emoji', 'Noto Emoji', 'Noto Mono', 'Noto Naskh Arabic', 'Noto Nastaliq Urdu', 'Noto Sans', 'Noto Sans Armenian', 'Noto Sans Bengali', 'Noto Sans CJK', 'Noto Sans Canadian Aboriginal', 'Noto Sans Cherokee', 'Noto Sans Devanagari', 'Noto Sans Ethiopic', 'Noto Sans Georgian', 'Noto Sans Gujarati', 'Noto Sans Gurmukhi', 'Noto Sans Hebrew', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans Kannada', 'Noto Sans Khmer', 'Noto Sans Lao', 'Noto Sans Malayalam', 'Noto Sans Myanmar', 'Noto Sans Oriya', 'Noto Sans SC', 'Noto Sans Sinhala', 'Noto Sans Symbols', 'Noto Sans TC', 'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Sans Thai', 'Noto Sans Yi', 'Noto Serif', 'Notram', 'November', 'Nueva Std', 'Nueva Std Cond', 'Nyala', 'OCR A Extended', 'OCR A Std', 'Old English Text MT', 'OldeEnglish', 'Onyx', 'OpenSymbol', 'OpineHeavy', 'Optima', 'Optima Bold', 'Optima Regular', 'Orator Std', 'Oriya MN', 'Oriya MN Bold', 'Oriya Sangam MN', 'Oriya Sangam MN Bold', 'Osaka', 'Osaka-Mono', 'OsakaMono', 'PCMyungjo Regular', 'PCmyoungjo', 'PMingLiU', 'PMingLiU-ExtB', 'PR Celtic Narrow', 'PT Mono', 'PT Sans', 'PT Sans Bold', 'PT Sans Caption Bold', 'PT Sans Narrow Bold', 'PT Serif', 'Padauk', 'Padauk Book', 'Padmaa', 'Pagul', 'Palace Script MT', 'Palatino', 'Palatino Bold', 'Palatino Linotype', 'Palatino Linotype Bold', 'Papyrus', 'Papyrus Condensed', 'Parchment', 'Parry Hotter', 'PenultimateLight', 'Perpetua', 'Perpetua Bold', 'Perpetua Titling MT', 'Perpetua Titling MT Bold', 'Phetsarath OT', 'Phosphate', 'Phosphate Inline', 'Phosphate Solid', 'PhrasticMedium', 'PilGi Regular', 'Pilgiche', 'PingFang HK', 'PingFang SC', 'PingFang TC', 'Pirate', 'Plantagenet Cherokee', 'Playbill', 'Poor Richard', 'Poplar Std', 'Pothana2000', 'Prestige Elite Std', 'Pristina', 'Purisa', 'QuiverItal', 'Raanana', 'Raanana Bold', 'Raavi', 'Rachana', 'Rage Italic', 'RaghuMalayalam', 'Ravie', 'Rekha', 'Roboto', 'Rockwell', 'Rockwell Bold', 'Rockwell Condensed', 'Rockwell Extra Bold', 'Rockwell Italic', 'Rod', 'Roland', 'Rondalo', 'Rosewood Std Regular', 'RowdyHeavy', 'Russel Write TT', 'SF Movie Poster', 'STFangsong', 'STHeiti', 'STIXGeneral', 'STIXGeneral-Bold', 'STIXGeneral-Regular', 'STIXIntegralsD', 'STIXIntegralsD-Bold', 'STIXIntegralsSm', 'STIXIntegralsSm-Bold', 'STIXIntegralsUp', 'STIXIntegralsUp-Bold', 'STIXIntegralsUp-Regular', 'STIXIntegralsUpD', 'STIXIntegralsUpD-Bold', 'STIXIntegralsUpD-Regular', 'STIXIntegralsUpSm', 'STIXIntegralsUpSm-Bold', 'STIXNonUnicode', 'STIXNonUnicode-Bold', 'STIXSizeFiveSym', 'STIXSizeFiveSym-Regular', 'STIXSizeFourSym', 'STIXSizeFourSym-Bold', 'STIXSizeOneSym', 'STIXSizeOneSym-Bold', 'STIXSizeThreeSym', 'STIXSizeThreeSym-Bold', 'STIXSizeTwoSym', 'STIXSizeTwoSym-Bold', 'STIXconstiants', 'STIXconstiants-Bold', 'STKaiti', 'STSong', 'STXihei', 'SWGamekeys MT', 'Saab', 'Sahadeva', 'Sakkal Majalla', 'Salina', 'Samanata', 'Samyak Devanagari', 'Samyak Gujarati', 'Samyak Malayalam', 'Samyak Tamil', 'Sana', 'Sana Regular', 'Sans', 'Sarai', 'Sathu', 'Savoye LET Plain:1.0', 'Sawasdee', 'Script', 'Script MT Bold', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Pseudo', 'Segoe Script', 'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Historic', 'Segoe UI Semilight', 'Segoe UI Symbol', 'Serif', 'Shonar Bangla', 'Showcard Gothic', 'Shree Devanagari 714', 'Shruti', 'SignPainter-HouseScript', 'Silom', 'SimHei', 'SimSun', 'SimSun-ExtB', 'Simplified Arabic', 'Simplified Arabic Fixed', 'Sinhala MN', 'Sinhala MN Bold', 'Sinhala Sangam MN', 'Sinhala Sangam MN Bold', 'Sitka', 'Skia', 'Skia Regular', 'Skinny', 'Small Fonts', 'Snap ITC', 'Snell Roundhand', 'Snowdrift', 'Songti SC', 'Songti SC Black', 'Songti TC', 'Source Code Pro', 'Splash', 'Standard Symbols L', 'Stencil', 'Stencil Std', 'Stephen', 'Sukhumvit Set', 'Suruma', 'Sylfaen', 'Symbol', 'Symbole', 'System', 'System Font', 'TAMu_Kadambri', 'TAMu_Kalyani', 'TAMu_Maduram', 'TSCu_Comic', 'TSCu_Paranar', 'TSCu_Times', 'Tahoma', 'Tahoma Negreta', 'TakaoExGothic', 'TakaoExMincho', 'TakaoGothic', 'TakaoMincho', 'TakaoPGothic', 'TakaoPMincho', 'Tamil MN', 'Tamil MN Bold', 'Tamil Sangam MN', 'Tamil Sangam MN Bold', 'Tarzan', 'Tekton Pro', 'Tekton Pro Cond', 'Tekton Pro Ext', 'Telugu MN', 'Telugu MN Bold', 'Telugu Sangam MN', 'Telugu Sangam MN Bold', 'Tempus Sans ITC', 'Terminal', 'Terminator Two', 'Thonburi', 'Thonburi Bold', 'Tibetan Machine Uni', 'Times', 'Times Bold', 'Times New Roman', 'Times New Roman Baltic', 'Times New Roman Bold', 'Times New Roman Italic', 'Times Roman', 'Tlwg Mono', 'Tlwg Typewriter', 'Tlwg Typist', 'Tlwg Typo', 'TlwgMono', 'TlwgTypewriter', 'Toledo', 'Traditional Arabic', 'Trajan Pro', 'Trattatello', 'Trebuchet MS', 'Trebuchet MS Bold', 'Tunga', 'Tw Cen MT', 'Tw Cen MT Bold', 'Tw Cen MT Italic', 'URW Bookman L', 'URW Chancery L', 'URW Gothic L', 'URW Palladio L', 'Ubuntu', 'Ubuntu Condensed', 'Ubuntu Mono', 'Ukai', 'Ume Gothic', 'Ume Mincho', 'Ume P Gothic', 'Ume P Mincho', 'Ume UI Gothic', 'Uming', 'Umpush', 'UnBatang', 'UnDinaru', 'UnDotum', 'UnGraphic', 'UnGungseo', 'UnPilgi', 'Untitled1', 'Urdu Typesetting', 'Uroob', 'Utkal', 'Utopia', 'Utsaah', 'Valken', 'Vani', 'Vemana2000', 'Verdana', 'Verdana Bold', 'Vijaya', 'Viner Hand ITC', 'Vivaldi', 'Vivian', 'Vladimir Script', 'Vrinda', 'Waree', 'Waseem', 'Waverly', 'Webdings', 'WenQuanYi Bitmap Song', 'WenQuanYi Micro Hei', 'WenQuanYi Micro Hei Mono', 'WenQuanYi Zen Hei', 'Whimsy TT', 'Wide Latin', 'Wingdings', 'Wingdings 2', 'Wingdings 3', 'Woodcut', 'X-Files', 'Year supply of fairy cakes', 'Yu Gothic', 'Yu Mincho', 'Yuppy SC', 'Yuppy SC Regular', 'Yuppy TC', 'Yuppy TC Regular', 'Zapf Dingbats', 'Zapfino', 'Zawgyi-One', 'gargi', 'lklug', 'mry_KacstQurn', 'ori1Uni'];
	const baseFonts = ['serif', 'sans-serif', 'monospace'];
	const testSize = '72px';
	const testChar = 'A';
	const h = document.body;
	// create a SPAN in the document to get the width of the text we use to test

	const s = document.createElement('span');
	s.style.opacity = '0';
	s.style.fontSize = testSize;
	s.innerText = testChar;
	const defaultFonts = {};

	for (const baseFont of baseFonts) {
		s.style.fontFamily = baseFont;

		if (h) {
			h.appendChild(s);
			defaultFonts[baseFont] = {};
			defaultFonts[baseFont]['offsetWidth'] = s.offsetWidth;
			defaultFonts[baseFont]['offsetHeight'] = s.offsetHeight;
			h.removeChild(s);
		}
	}

	const fontsDetected = {};

	for (const font of fonts) {
		const fontStyle = '"' + font + '"';
		let detected = false;

		for (const baseFont of baseFonts) {
		s.style.fontFamily = fontStyle + ',' + baseFont; // name of the font along with the base font for fallback.

		if (h) {
			h.appendChild(s);
			const match = s.offsetWidth != defaultFonts[baseFont]['offsetWidth'] || s.offsetHeight != defaultFonts[baseFont]['offsetHeight'];
			h.removeChild(s);
			detected = detected || match;
			}
		}

		fontsDetected[font] = detected;
	}

	return fontsDetected;
}

export {getWebglFp, getWebglVendorAndRenderer, getFonts}