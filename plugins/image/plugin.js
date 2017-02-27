/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*global tinymce:true */

tinymce.PluginManager.add('image', function (editor) {
    function getImageSize(url, callback) {

        var img = document.createElement('img');

        function done(width, height) {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }

            callback({ width: width, height: height });
        }

        img.onload = function () {
            done(Math.max(img.width, img.clientWidth), Math.max(img.height, img.clientHeight));
        };

        img.onerror = function () {
            done();
        };

        var style = img.style;
        style.visibility = 'hidden';
        style.position = 'fixed';
        style.bottom = style.left = 0;
        style.width = style.height = 'auto';

        document.body.appendChild(img);
        img.src = url;
    }

    function buildListItems(inputList, itemCallback, startItems) {

        function appendItems(values, output) {
            output = output || [];

            tinymce.each(values, function (item) {
                var menuItem = { text: item.text || item.title };

                if (item.menu) {
                    menuItem.menu = appendItems(item.menu);
                } else {
                    menuItem.value = item.value;
                    itemCallback(menuItem);
                }

                output.push(menuItem);

            });

            return output;
        }

        return appendItems(inputList, startItems || []);

    }

    function createImageList(callback) {
        return function () {
            var imageList = editor.settings.image_list;

            if (typeof imageList == "string") {
                tinymce.util.XHR.send({
                    url: imageList,
                    success: function (text) {
                        callback(tinymce.util.JSON.parse(text));
                    }
                });
            } else if (typeof imageList == "function") {
                imageList(callback);
            } else {
                callback(imageList);
            }
        };
    }

    function showDialog(imageList) {
        var win, data = {}, dom = editor.dom, imgElm, figureElm;
        var width, height, imageListCtrl, classListCtrl, imageDimensions = editor.settings.image_dimensions !== false;

        function recalcSize() {
            var widthCtrl, heightCtrl, newWidth, newHeight;

            widthCtrl = win.find('#width')[0];
            heightCtrl = win.find('#height')[0];

            if (!widthCtrl || !heightCtrl) {
                return;
            }

            newWidth = widthCtrl.value();
            newHeight = heightCtrl.value();

            if (win.find('#constrain')[0].checked() && width && height && newWidth && newHeight) {
                if (width != newWidth) {
                    newHeight = Math.round((newWidth / width) * newHeight);

                    if (!isNaN(newHeight)) {
                        heightCtrl.value(newHeight);
                    }
                } else {
                    newWidth = Math.round((newHeight / height) * newWidth);

                    if (!isNaN(newWidth)) {
                        widthCtrl.value(newWidth);
                    }
                }
            }

            width = newWidth;
            height = newHeight;
        }

        function onSubmitForm() {
            var figureElm, oldImg;

            function waitLoad(imgElm) {
                function selectImage() {
                    imgElm.onload = imgElm.onerror = null;

                    if (editor.selection) {
                        editor.selection.select(imgElm);
                        editor.nodeChanged();
                    }
                }

                imgElm.onload = function () {
                    if (!data.width && !data.height && imageDimensions) {
                        dom.setAttribs(imgElm, {
                            width: imgElm.clientWidth,
                            height: imgElm.clientHeight
                        });
                    }

                    selectImage();
                };

                imgElm.onerror = selectImage;
            }

            updateStyle();
            recalcSize();

            data = tinymce.extend(data, win.toJSON());

            if (!data.alt) {
                data.alt = '';
            }

            if (!data.title) {
                data.title = '';
            }
            if (!data.longdesc) {
                data.longdesc = '';
            }

            if (data.width === '') {
                data.width = null;
            }

            if (data.height === '') {
                data.height = null;
            }

            if (!data.style) {
                data.style = null;
            }

            // Setup new data excluding style properties
            /*eslint dot-notation: 0*/
            data = {
                src: data.src,
                alt: data.alt,
                title: data.title,
                longdesc: data.longdesc,
                width: data.width,
                height: data.height,
                style: data.style,
                caption: data.caption,
                "class": data["class"]
            };

            editor.undoManager.transact(function () {
                if (!data.src) {
                    if (imgElm) {
                        dom.remove(imgElm);
                        editor.focus();
                        editor.nodeChanged();
                    }

                    return;
                }

                if (data.title === "") {
                    data.title = null;
                }

                if (data.longdesc === "") {
                    data.longdesc = null;
                }

                if (!imgElm) {
                    data.id = '__mcenew';
                    editor.focus();
                    editor.selection.setContent(dom.createHTML('img', data));
                    imgElm = dom.get('__mcenew');
                    dom.setAttrib(imgElm, 'id', null);
                } else {
                    dom.setAttribs(imgElm, data);
                }

                editor.editorUpload.uploadImagesAuto();

                if (data.caption === false) {
                    if (dom.is(imgElm.parentNode, 'figure.image')) {
                        figureElm = imgElm.parentNode;
                        dom.insertAfter(imgElm, figureElm);
                        dom.remove(figureElm);
                    }
                }

                function isTextBlock(node) {
                    return editor.schema.getTextBlockElements()[node.nodeName];
                }

                if (data.caption === true) {
                    if (!dom.is(imgElm.parentNode, 'figure.image')) {
                        oldImg = imgElm;
                        imgElm = imgElm.cloneNode(true);
                        figureElm = dom.create('figure', { 'class': 'image' });
                        figureElm.appendChild(imgElm);
                        figureElm.appendChild(dom.create('figcaption', { contentEditable: true }, 'Caption'));
                        figureElm.contentEditable = false;

                        var textBlock = dom.getParent(oldImg, isTextBlock);
                        if (textBlock) {
                            dom.split(textBlock, oldImg, figureElm);
                        } else {
                            dom.replace(figureElm, oldImg);
                        }

                        editor.selection.select(figureElm);
                    }

                    return;
                }

                waitLoad(imgElm);
            });
        }

        function removePixelSuffix(value) {
            if (value) {
                value = value.replace(/px$/, '');
            }

            return value;
        }

        function srcChange(e) {
            var srcURL, prependURL, absoluteURLPattern, meta = e.meta || {};
            var URL = $("#URL-inp").val();
            var regExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
            var format = /.(jpeg|png|gif|jpg)$/i;

            if (!regExp.test(URL)) {
                tinymce.activeEditor.windowManager.alert("The URL must be a valid URL without blank spaces.");
                $("#URL-inp").val("");
            }

            if (!format.test(URL)) {
                tinymce.activeEditor.windowManager.alert("The URL must be end in .jpg, .gif, .png, .jpeg");
                $("#URL-inp").val("");
            }

            if (imageListCtrl) {
                imageListCtrl.value(editor.convertURL(this.value(), 'src'));
            }

            tinymce.each(meta, function (value, key) {
                win.find('#' + key).value(value);
            });

            if (!meta.width && !meta.height) {
                srcURL = editor.convertURL(this.value(), 'src');

                // Pattern test the src url and make sure we haven't already prepended the url
                prependURL = editor.settings.image_prepend_url;
                absoluteURLPattern = new RegExp('^(?:[a-z]+:)?//', 'i');
                if (prependURL && !absoluteURLPattern.test(srcURL) && srcURL.substring(0, prependURL.length) !== prependURL) {
                    srcURL = prependURL + srcURL;
                }

                this.value(srcURL);

                getImageSize(editor.documentBaseURI.toAbsolute(this.value()), function (data) {
                    if (data.width && data.height && imageDimensions) {
                        width = data.width;
                        height = data.height;

                        win.find('#width').value(width);
                        win.find('#height').value(height);
                    }
                });
            }
        }

        imgElm = editor.selection.getNode();
        figureElm = dom.getParent(imgElm, 'figure.image');
        if (figureElm) {
            imgElm = dom.select('img', figureElm)[0];
        }

        if (imgElm && (imgElm.nodeName != 'IMG' || imgElm.getAttribute('data-mce-object') || imgElm.getAttribute('data-mce-placeholder'))) {
            imgElm = null;
        }

        if (imgElm) {
            width = dom.getAttrib(imgElm, 'width');
            height = dom.getAttrib(imgElm, 'height');

            data = {
                src: dom.getAttrib(imgElm, 'src'),
                alt: dom.getAttrib(imgElm, 'alt'),
                title: dom.getAttrib(imgElm, 'title'),
                //LONGDESC
                longdesc: dom.getAttrib(imgElm, 'longdesc'),
                "class": dom.getAttrib(imgElm, 'class'),
                width: width,
                height: height,
                caption: !!figureElm
            };
        }

        if (imageList) {
            imageListCtrl = {
                type: 'listbox',
                label: 'Image list',
                values: buildListItems(
					imageList,
					function (item) {
					    item.value = editor.convertURL(item.value || item.url, 'src');
					},
					[{ text: 'None', value: '' }]
				),
                value: data.src && editor.convertURL(data.src, 'src'),
                onselect: function (e) {
                    var altCtrl = win.find('#alt');

                    if (!altCtrl.value() || (e.lastControl && altCtrl.value() == e.lastControl.text())) {
                        altCtrl.value(e.control.text());
                    }

                    win.find('#src').value(e.control.value()).fire('change');
                },
                onPostRender: function () {
                    /*eslint consistent-this: 0*/
                    imageListCtrl = this;
                }
            };
        }

        if (editor.settings.image_class_list) {
            classListCtrl = {
                name: 'class',
                type: 'listbox',
                label: 'Class',

                values: buildListItems(
					editor.settings.image_class_list,
					function (item) {
					    if (item.value) {
					        item.textStyle = function () {
					            return editor.formatter.getCssText({ inline: 'img', classes: [item.value] });
					        };
					    }
					}
				)
            };
        }

        // General settings shared between simple and advanced dialogs

        var generalFormItems = [
			{
			    id: 'URL',
			    name: 'src',
			    type: 'filepicker',
			    filetype: 'image',
			    label: 'URL',
			    autofocus: true,
			    onchange: srcChange,
			    onfocusout: function URLOnFocusOut() {
			        var URL = $("#URL-inp").val();
			        if (URL.length == 0) {
			            tinymce.activeEditor.windowManager.alert("You must input an image source.");
			        }
			    }
			},
			imageListCtrl
        ];

        generalFormItems.push({
            id: 'cmbImage',
            type: 'listbox',
            label: 'Image type',
            'values': [
                { text: 'Select...', value: '0' },
                { text: 'Decorative', value: '1' },
                { text: 'Simple', value: '2' },
                { text: 'Complex', value: '3' },
                { text: 'Functional', value: '4' }
            ],
            tooltip: 'Select a type of image',
            onselect: combo
        });

        var typeImage;

        function buttonHide() {
            var buttonOK = document.getElementsByClassName("mce-primary")
            console.log(document.getElementsByClassName("mce-primary"));
            buttonOK[0].hidden = true;
            buttonOK[0].style.visibility = "hidden";
        }

        function buttonShow() {
            var buttonOK = document.getElementsByClassName("mce-primary")
            console.log(document.getElementsByClassName("mce-primary"));
            buttonOK[0].show = true;
            buttonOK[0].style.visibility = "visible";
        }

        function combo(e) {

            buttonHide();

            var comboImagen = [
                { text: 'Select...', value: '0' },
                { text: 'Decorative', value: '1' },
                { text: 'Simple', value: '2' },
                { text: 'Complex', value: '3' },
                { text: 'Functional', value: '4' }
            ];

            var elemento = document.getElementById('cmbImage-open').innerHTML;
            elemento = elemento.replace('<span class="mce-txt">', '')
            elemento = elemento.replace('</span> <i class="mce-caret"></i>', '')

            var i = 0, length = comboImagen.length;

            for (i; i < length; i++) {
                if (comboImagen[i].text == elemento) {
                    typeImage = comboImagen[i].value;
                }
            }

            typeImage = typeImage.toString();
            switch (typeImage) {
                case '0':
                    document.getElementById("alt").disabled = true;
                    document.getElementById("description").disabled = true;
                    document.getElementById("title").disabled = true;
                    document.getElementById("dimension").disabled = true;
                    document.getElementById("width").disabled = true;
                    document.getElementById("height").disabled = true;
                    document.all("alt-l").innerHTML = "Alternative text";
                    document.all("description-l").innerHTML = "Long description";
                    document.getElementById("alt").style.borderColor = "";
                    document.getElementById("description").style.borderColor = "";
                    $("#alt").val("");
                    $("#description").val("");
                    $("#URL-inp").val("");
                    $("#title").val("");
                    $("#width").val("");
                    $("#height").val("");
                    tinymce.activeEditor.windowManager.alert("You must select a type of image");
                    buttonHide();
                    break;

                case '1'://Decorative
                    document.getElementById("URL-inp").disabled = false;
                    document.getElementById("alt").disabled = false;
                    document.getElementById("description").disabled = false;
                    document.getElementById("title").disabled = false;
                    document.getElementById("dimension").disabled = false;
                    document.getElementById("width").disabled = false;
                    document.getElementById("height").disabled = false;
                    $("#alt").val("");
                    $("#description").val("");                    
                    $("#title").val("");                    
                    document.all("alt-l").innerHTML = "Alternative text *";
                    document.all("description-l").innerHTML = "Long description";
                    document.getElementById("alt").style.borderColor = "red";
                    document.getElementById("description").style.borderColor = "";
                    buttonHide();
                    break;

                case '2'://Simple
                    document.getElementById("URL-inp").disabled = false;
                    document.getElementById("alt").disabled = false;
                    document.getElementById("description").disabled = false;
                    document.getElementById("title").disabled = false;
                    document.getElementById("dimension").disabled = false;
                    document.getElementById("width").disabled = false;
                    document.getElementById("height").disabled = false;
                    $("#alt").val("");
                    $("#description").val("");
                    $("#title").val("");
                    document.all("alt-l").innerHTML = "Alternative text *";
                    document.all("description-l").innerHTML = "Long description";
                    document.getElementById("alt").style.borderColor = "red";
                    document.getElementById("description").style.borderColor = "";
                    tinymce.activeEditor.windowManager.alert("You must input an alternative text for a simple image. The alternative text should convey the same information as the image. If this image does not convey information, change the image type to Decorative.");
                    buttonHide();
                    break;

                case '3'://Complex
                    document.getElementById("URL-inp").disabled = false;
                    document.getElementById("alt").disabled = false;
                    document.getElementById("description").disabled = false;
                    document.getElementById("title").disabled = false;
                    document.getElementById("dimension").disabled = false;
                    document.getElementById("width").disabled = false;
                    document.getElementById("height").disabled = false;
                    $("#alt").val("");
                    $("#description").val("");
                    $("#title").val("");
                    document.all("alt-l").innerHTML = "Alternative text *";
                    document.all("description-l").innerHTML = "Long description *";
                    document.getElementById("alt").style.borderColor = "red";
                    document.getElementById("description").style.borderColor = "red";
                    tinymce.activeEditor.windowManager.alert("You must input an alternative text and a long description for a complex image.");
                    buttonHide();
                    break;

                case '4'://Functional
                    $("#alt").val("");
                    $("#description").val("");
                    $("#URL-inp").val("");
                    $("#title").val("");
                    $("#width").val("");
                    $("#height").val("");
                    document.getElementById("URL-inp").disabled = true;
                    document.getElementById("alt").disabled = true;
                    document.getElementById("description").disabled = true;
                    document.getElementById("title").disabled = true;
                    document.getElementById("dimension").disabled = true;
                    document.getElementById("URL-inp").disabled = true;
                    document.getElementById("width").disabled = true;
                    document.getElementById("height").disabled = true;
                    document.all("alt-l").innerHTML = "Alternative text";
                    document.all("description-l").innerHTML = "Long description";
                    document.getElementById("alt").style.borderColor = "";
                    document.getElementById("description").style.borderColor = "";
                    tinymce.activeEditor.windowManager.alert('You must use the specific toolbar button to add functionality to the image. If this image does not have functionality, change the image type.');
                    buttonHide();
                    break;
            }
        }

        generalFormItems.push({
            name: 'alt', id: 'alt', type: 'textbox', label: 'Alternative text', maxLength: 144 , spellcheck:'true',
            tooltip: 'The alternative text is a description of the image that aids people with visual disabilities perceive the image. The alternative text should be meaningful, short, simple and clear.',
            onclick: function altOnClick() {
                var comboV = document.getElementById('cmbImage-open').innerHTML;
                comboV = comboV.replace('<span class="mce-txt">', '')
                comboV = comboV.replace('</span> <i class="mce-caret"></i>', '')
                console.log('El valor del combo es', comboV);
                if (comboV == "Select...") {
                    tinymce.activeEditor.windowManager.alert("You must select a type of image");
                    document.getElementById("alt").disabled = true;
                    buttonHide();
                }
            },
            onchange: function altOnChange() {
                var alt = $("#alt").val();
                var URL = $("URL-inp").val();
                var format = /.(jpeg|png|gif|jpg)$/i;
                var error = "";
                var warning = "";

                if (format.test(alt)) {
                    error += "Alternative text can not ending .jpg, .gif, .jpeg, .png\n";
                }

                if (alt.length > 1 && alt.length < 6) {
                    error += "Short alternative text. Alternative text should be succinct, yet descriptive enough of the content of an image. The alternative text inserted is too short to be acceptable\n";
                }

                if (alt.length == 144) {
                    warning += "Long alternative text. Alternative text should be succinct, yet descriptive of the content of an image. Lengthy alternative text might imply a long description is needed.\n";
                }

                if (alt == URL) {
                    error += "Alternative text should be different the URL.\n";
                }

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        validateWord(this);
                    }
                };
                xhttp.open("GET", "tinymce/controls.xml", true);
                xhttp.send();

                function validateWord(xml) {
                    var x, i, attnode, xmlDoc, txt;
                    xmlDoc = xml.responseXML;
                    txt = "";
                    x = xmlDoc.getElementsByTagName('invalid_word');
                    for (i = 0; i < x.length; i++) {
                        txt = x[i].childNodes[0].nodeValue;
                        if (alt == txt) {
                            tinymce.activeEditor.windowManager.alert("Suspicious alternative text  '" + alt + "' contains generic words such as 'photo', 'image', or 'logo'");
                        }
                    }
                }

                if (error.length != 0) {
                    tinymce.activeEditor.windowManager.alert(error);
                    $("#alt").val("");
                    buttonHide();
                }
                if (warning.length != 0) {
                    tinymce.activeEditor.windowManager.alert(warning);
                }
                if ((typeImage == 1 || typeImage == 2) && error.length == 0) {
                    buttonShow();
                }
            },
            onfocusout: function altOnFocusOut() {
                var alt = $("#alt").val();
                if ((typeImage == 1 && alt.length == 0) || (typeImage == 2 && alt.length == 0) || (typeImage == 3 && alt.length == 0)) {
                    tinymce.activeEditor.windowManager.alert("Alternative text required");
                    buttonHide();
                }
            }
        });

        //Long-desc
        generalFormItems.push({
            name: 'longdesc', id: 'description', type: 'textbox', label: 'Long description' ,
            tooltip: 'The long description is used when the alternative text is not sufficient to provide all the necesary explanation for a complex image. In this field, you must input the Internet address of a webpage that contains the long description equivalent to the image.',
            onclick: function descriptionOnClick() {
                var comboV = document.getElementById('cmbImage-open').innerHTML;
                comboV = comboV.replace('<span class="mce-txt">', '')
                comboV = comboV.replace('</span> <i class="mce-caret"></i>', '')
                console.log('El valor del combo es', comboV);
                if (comboV == "Select...") {
                    tinymce.activeEditor.windowManager.alert("You must select a type of image");
                    document.getElementById("description").disabled = true;
                    buttonHide();
                }
            },
            onchange: function descriptionOnChange() {
                var description = $("#description").val();
                var regExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
                var format = /.(html|htm)$/i;
                var error = "";

                if (!regExp.test(description)) {
                    error += "The long description must be a valid URL without blank spaces.\n";
                }

                if (!format.test(description)) {
                    error += "The long description must be a valid URL ending in HTM or HTML.\n";
                }

                $.ajax({
                    type: 'GET',
                    url: $("#description").val(),
                    error: function () {
                        tinymce.activeEditor.windowManager.alert("The description must be a valid URL");
                        $("#description").val("");
                        buttonHide();
                    }
                });

                if (error.length != 0) {
                    tinymce.activeEditor.windowManager.alert(error);
                    $("#description").val("");
                    buttonHide();
                }

                if (typeImage == 3 && error.length == 0) {
                    buttonShow();
                }
            },
            onfocusout: function descriptionOnFocusOut() {
                var description = $("#description").val();
                if ((typeImage == 3 && description.length == 0)) {
                    tinymce.activeEditor.windowManager.alert("Description required");
                    buttonHide();
                }                
            }
        });

        generalFormItems.push({
            name: 'title', id: 'title', type: 'textbox', label: 'Title', spellcheck: 'true',
            tooltip: 'The title provides additional, yet not essential, information about the image, e.g. if it is a picture, it migth contain the autor, the date, the location.',
            onclick: function titleOnClick() {
                var comboV = document.getElementById('cmbImage-open').innerHTML;
                comboV = comboV.replace('<span class="mce-txt">', '')
                comboV = comboV.replace('</span> <i class="mce-caret"></i>', '')
                console.log('El valor del combo es', comboV);
                if (comboV == "Select...") {
                    tinymce.activeEditor.windowManager.alert("You must select a type of image");
                    document.getElementById("title").disabled = true;
                    buttonHide();
                }
            },
            onchange: function titleOnChange() {
                var alt = $("#alt").val();
                var title = $("#title").val();

                if (alt === title) {
                    tinymce.activeEditor.windowManager.alert("Title can't be the same as that alternative text");
                    $("#title").val("");
                }
            }
        });

        if (imageDimensions) {
            generalFormItems.push({
                type: 'container', id: 'dimension', label: 'Dimensions', layout: 'flex', direction: 'row', align: 'center', spacing: 5,
                items: [
                    {
                        name: 'width', id: 'width', type: 'textbox', maxLength: 5, size: 3,
                        onclick: function widthOnClick() {
                            var comboV = document.getElementById('cmbImage-open').innerHTML;
                            comboV = comboV.replace('<span class="mce-txt">', '')
                            comboV = comboV.replace('</span> <i class="mce-caret"></i>', '')
                            console.log('El valor del combo es', comboV);
                            if (comboV == "Select...") {
                                tinymce.activeEditor.windowManager.alert("You must select a type of image");
                                document.getElementById("width").disabled = true;
                                buttonHide();
                            }
                        },
                        onchange: recalcSize, ariaLabel: 'Width'
                    },
                    { type: 'label', text: 'x' },
                    {
                        name: 'height', id: 'height', type: 'textbox', maxLength: 5, size: 3,
                        onclick: function heightOnClick() {
                            var comboV = document.getElementById('cmbImage-open').innerHTML;
                            comboV = comboV.replace('<span class="mce-txt">', '')
                            comboV = comboV.replace('</span> <i class="mce-caret"></i>', '')
                            console.log('El valor del combo es', comboV);
                            if (comboV == "Select...") {
                                tinymce.activeEditor.windowManager.alert("You must select a type of image");
                                document.getElementById("height").disabled = true;
                                buttonHide();
                            }
                        }, onchange: recalcSize, ariaLabel: 'Height'
                    },
                    { name: 'constrain', type: 'checkbox', checked: true, text: 'Constrain proportions' }
                ]
            });
        }

        generalFormItems.push(classListCtrl);

        if (editor.settings.image_caption && tinymce.Env.ceFalse) {
            generalFormItems.push({ name: 'caption', type: 'checkbox', label: 'Caption' });
        }

        function mergeMargins(css) {
            if (css.margin) {

                var splitMargin = css.margin.split(" ");

                switch (splitMargin.length) {
                    case 1: //margin: toprightbottomleft;
                        css['margin-top'] = css['margin-top'] || splitMargin[0];
                        css['margin-right'] = css['margin-right'] || splitMargin[0];
                        css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
                        css['margin-left'] = css['margin-left'] || splitMargin[0];
                        break;
                    case 2: //margin: topbottom rightleft;
                        css['margin-top'] = css['margin-top'] || splitMargin[0];
                        css['margin-right'] = css['margin-right'] || splitMargin[1];
                        css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
                        css['margin-left'] = css['margin-left'] || splitMargin[1];
                        break;
                    case 3: //margin: top rightleft bottom;
                        css['margin-top'] = css['margin-top'] || splitMargin[0];
                        css['margin-right'] = css['margin-right'] || splitMargin[1];
                        css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
                        css['margin-left'] = css['margin-left'] || splitMargin[1];
                        break;
                    case 4: //margin: top right bottom left;
                        css['margin-top'] = css['margin-top'] || splitMargin[0];
                        css['margin-right'] = css['margin-right'] || splitMargin[1];
                        css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
                        css['margin-left'] = css['margin-left'] || splitMargin[3];
                }
                delete css.margin;
            }
            return css;
        }

        function updateStyle() {
            function addPixelSuffix(value) {
                if (value.length > 0 && /^[0-9]+$/.test(value)) {
                    value += 'px';
                }

                return value;
            }

            if (!editor.settings.image_advtab) {
                return;
            }

            var data = win.toJSON(),
                css = dom.parseStyle(data.style);

            css = mergeMargins(css);

            if (data.vspace) {
                css['margin-top'] = css['margin-bottom'] = addPixelSuffix(data.vspace);
            }
            if (data.hspace) {
                css['margin-left'] = css['margin-right'] = addPixelSuffix(data.hspace);
            }
            if (data.border) {
                css['border-width'] = addPixelSuffix(data.border);
            }

            win.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
        }

        function updateVSpaceHSpaceBorder() {
            if (!editor.settings.image_advtab) {
                return;
            }

            var data = win.toJSON(),
                css = dom.parseStyle(data.style);

            win.find('#vspace').value("");
            win.find('#hspace').value("");

            css = mergeMargins(css);

            //Move opposite equal margins to vspace/hspace field
            if ((css['margin-top'] && css['margin-bottom']) || (css['margin-right'] && css['margin-left'])) {
                if (css['margin-top'] === css['margin-bottom']) {
                    win.find('#vspace').value(removePixelSuffix(css['margin-top']));
                } else {
                    win.find('#vspace').value('');
                }
                if (css['margin-right'] === css['margin-left']) {
                    win.find('#hspace').value(removePixelSuffix(css['margin-right']));
                } else {
                    win.find('#hspace').value('');
                }
            }

            //Move border-width
            if (css['border-width']) {
                win.find('#border').value(removePixelSuffix(css['border-width']));
            }

            win.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));

        }

        if (editor.settings.image_advtab) {
            // Parse styles from img
            if (imgElm) {
                if (imgElm.style.marginLeft && imgElm.style.marginRight && imgElm.style.marginLeft === imgElm.style.marginRight) {
                    data.hspace = removePixelSuffix(imgElm.style.marginLeft);
                }
                if (imgElm.style.marginTop && imgElm.style.marginBottom && imgElm.style.marginTop === imgElm.style.marginBottom) {
                    data.vspace = removePixelSuffix(imgElm.style.marginTop);
                }
                if (imgElm.style.borderWidth) {
                    data.border = removePixelSuffix(imgElm.style.borderWidth);
                }

                data.style = editor.dom.serializeStyle(editor.dom.parseStyle(editor.dom.getAttrib(imgElm, 'style')));
            }

            // Advanced dialog shows general+advanced tabs
            win = editor.windowManager.open({
                title: 'Insert/edit image',
                data: data,
                bodyType: 'tabpanel',
                body: [
                    {
                        title: 'General',
                        type: 'form',
                        items: generalFormItems
                    },
                    /*
                    //{
                    //    title: 'Advanced',
                    //    type: 'form',
                    //    pack: 'start',
                    //    items: [
                    //        {
                    //            label: 'Estily',
                    //            name: 'style',
                    //            type: 'textbox',
                    //            onchange: updateVSpaceHSpaceBorder
                    //        },
                    //        {
                    //            type: 'form',
                    //            layout: 'grid',
                    //            packV: 'start',
                    //            columns: 2,
                    //            padding: 0,
                    //            alignH: ['left', 'right'],
                    //            defaults: {
                    //                type: 'textbox',
                    //                maxWidth: 50,
                    //                onchange: updateStyle
                    //            },
                    //            items: [
                    //                { label: 'Vertical space', name: 'vspace' },
                    //                { label: 'Horizontal space', name: 'hspace' },
                    //                { label: 'Border', name: 'border' }
                    //            ]
                    //        }
                    //    ]
                    //}*/
                ],
                onSubmit: onSubmitForm
            });
        } else {
            // Simple default dialog
            win = editor.windowManager.open({
                title: 'Insert/edit imagen',
                data: data,
                body: generalFormItems,
                onSubmit: onSubmitForm
            });
        }
    }

    editor.on('preInit', function () {
        function hasImageClass(node) {
            var className = node.attr('class');
            return className && /\bimage\b/.test(className);
        }

        function toggleContentEditableState(state) {
            return function (nodes) {
                var i = nodes.length, node;

                function toggleContentEditable(node) {
                    node.attr('contenteditable', state ? 'true' : null);
                }

                while (i--) {
                    node = nodes[i];

                    if (hasImageClass(node)) {
                        node.attr('contenteditable', state ? 'false' : null);
                        tinymce.each(node.getAll('figcaption'), toggleContentEditable);
                    }
                }
            };
        }

        editor.parser.addNodeFilter('figure', toggleContentEditableState(true));
        editor.serializer.addNodeFilter('figure', toggleContentEditableState(false));
    });

    editor.addButton('image', {
        icon: 'image',
        tooltip: 'Insert/edit imagen',
        onclick: createImageList(showDialog),
        stateSelector: 'img:not([data-mce-object],[data-mce-placeholder]),figure.image'
    });

    editor.addMenuItem('image', {
        icon: 'image',
        text: 'Image',
        onclick: createImageList(showDialog),
        context: 'insert',
        prependToContext: true
    });

    editor.addCommand('mceImage', createImageList(showDialog));
});
