<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>利用規約</title>
@include('components.gtag')
<style>
/* cspell:disable-file */
/* webkit printing magic: print all background colors */
html {
	-webkit-print-color-adjust: exact;
}
* {
	box-sizing: border-box;
	-webkit-print-color-adjust: exact;
}

html,
body {
	margin: 0;
	padding: 0;
}
@media only screen {
	body {
		margin: 2em auto;
		max-width: 900px;
		color: rgb(55, 53, 47);
	}
}

body {
	line-height: 1.5;
	white-space: pre-wrap;
}

a,
a.visited {
	color: inherit;
	text-decoration: underline;
}

.pdf-relative-link-path {
	font-size: 80%;
	color: #444;
}

h1,
h2,
h3 {
	letter-spacing: -0.01em;
	line-height: 1.2;
	font-weight: 600;
	margin-bottom: 0;
}

.page-title {
	font-size: 2.5rem;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 0.75em;
}

h1 {
	font-size: 1.875rem;
	margin-top: 1.875rem;
}

h2 {
	font-size: 1.5rem;
	margin-top: 1.5rem;
}

h3 {
	font-size: 1.25rem;
	margin-top: 1.25rem;
}

.source {
	border: 1px solid #ddd;
	border-radius: 3px;
	padding: 1.5em;
	word-break: break-all;
}

.callout {
	border-radius: 3px;
	padding: 1rem;
}

figure {
	margin: 1.25em 0;
	page-break-inside: avoid;
}

figcaption {
	opacity: 0.5;
	font-size: 85%;
	margin-top: 0.5em;
}

mark {
	background-color: transparent;
}

.indented {
	padding-left: 1.5em;
}

hr {
	background: transparent;
	display: block;
	width: 100%;
	height: 1px;
	visibility: visible;
	border: none;
	border-bottom: 1px solid rgba(55, 53, 47, 0.09);
}

img {
	max-width: 100%;
}

@media only print {
	img {
		max-height: 100vh;
		object-fit: contain;
	}
}

@page {
	margin: 1in;
}

.collection-content {
	font-size: 0.875rem;
}

.column-list {
	display: flex;
	justify-content: space-between;
}

.column {
	padding: 0 1em;
}

.column:first-child {
	padding-left: 0;
}

.column:last-child {
	padding-right: 0;
}

.table_of_contents-item {
	display: block;
	font-size: 0.875rem;
	line-height: 1.3;
	padding: 0.125rem;
}

.table_of_contents-indent-1 {
	margin-left: 1.5rem;
}

.table_of_contents-indent-2 {
	margin-left: 3rem;
}

.table_of_contents-indent-3 {
	margin-left: 4.5rem;
}

.table_of_contents-link {
	text-decoration: none;
	opacity: 0.7;
	border-bottom: 1px solid rgba(55, 53, 47, 0.18);
}

table,
th,
td {
	border: 1px solid rgba(55, 53, 47, 0.09);
	border-collapse: collapse;
}

table {
	border-left: none;
	border-right: none;
}

th,
td {
	font-weight: normal;
	padding: 0.25em 0.5em;
	line-height: 1.5;
	min-height: 1.5em;
	text-align: left;
}

th {
	color: rgba(55, 53, 47, 0.6);
}

ol,
ul {
	margin: 0;
	margin-block-start: 0.6em;
	margin-block-end: 0.6em;
}

li > ol:first-child,
li > ul:first-child {
	margin-block-start: 0.6em;
}

ul > li {
	list-style: disc;
}

ul.to-do-list {
	padding-inline-start: 0;
}

ul.to-do-list > li {
	list-style: none;
}

.to-do-children-checked {
	text-decoration: line-through;
	opacity: 0.375;
}

ul.toggle > li {
	list-style: none;
}

ul {
	padding-inline-start: 1.7em;
}

ul > li {
	padding-left: 0.1em;
}

ol {
	padding-inline-start: 1.6em;
}

ol > li {
	padding-left: 0.2em;
}

.mono ol {
	padding-inline-start: 2em;
}

.mono ol > li {
	text-indent: -0.4em;
}

.toggle {
	padding-inline-start: 0em;
	list-style-type: none;
}

/* Indent toggle children */
.toggle > li > details {
	padding-left: 1.7em;
}

.toggle > li > details > summary {
	margin-left: -1.1em;
}

.selected-value {
	display: inline-block;
	padding: 0 0.5em;
	background: rgba(206, 205, 202, 0.5);
	border-radius: 3px;
	margin-right: 0.5em;
	margin-top: 0.3em;
	margin-bottom: 0.3em;
	white-space: nowrap;
}

.collection-title {
	display: inline-block;
	margin-right: 1em;
}

.simple-table {
	margin-top: 1em;
	font-size: 0.875rem;
	empty-cells: show;
}
.simple-table td {
	height: 29px;
	min-width: 120px;
}

.simple-table th {
	height: 29px;
	min-width: 120px;
}

.simple-table-header-color {
	background: rgb(247, 246, 243);
	color: black;
}
.simple-table-header {
	font-weight: 500;
}

time {
	opacity: 0.5;
}

.icon {
	display: inline-block;
	max-width: 1.2em;
	max-height: 1.2em;
	text-decoration: none;
	vertical-align: text-bottom;
	margin-right: 0.5em;
}

img.icon {
	border-radius: 3px;
}

.user-icon {
	width: 1.5em;
	height: 1.5em;
	border-radius: 100%;
	margin-right: 0.5rem;
}

.user-icon-inner {
	font-size: 0.8em;
}

.text-icon {
	border: 1px solid #000;
	text-align: center;
}

.page-cover-image {
	display: block;
	object-fit: cover;
	width: 100%;
	max-height: 30vh;
}

.page-header-icon {
	font-size: 3rem;
	margin-bottom: 1rem;
}

.page-header-icon-with-cover {
	margin-top: -0.72em;
	margin-left: 0.07em;
}

.page-header-icon img {
	border-radius: 3px;
}

.link-to-page {
	margin: 1em 0;
	padding: 0;
	border: none;
	font-weight: 500;
}

p > .user {
	opacity: 0.5;
}

td > .user,
td > time {
	white-space: nowrap;
}

input[type="checkbox"] {
	transform: scale(1.5);
	margin-right: 0.6em;
	vertical-align: middle;
}

p {
	margin-top: 0.5em;
	margin-bottom: 0.5em;
}

.image {
	border: none;
	margin: 1.5em 0;
	padding: 0;
	border-radius: 0;
	text-align: center;
}

.code,
code {
	background: rgba(135, 131, 120, 0.15);
	border-radius: 3px;
	padding: 0.2em 0.4em;
	border-radius: 3px;
	font-size: 85%;
	tab-size: 2;
}

code {
	color: #eb5757;
}

.code {
	padding: 1.5em 1em;
}

.code-wrap {
	white-space: pre-wrap;
	word-break: break-all;
}

.code > code {
	background: none;
	padding: 0;
	font-size: 100%;
	color: inherit;
}

blockquote {
	font-size: 1.25em;
	margin: 1em 0;
	padding-left: 1em;
	border-left: 3px solid rgb(55, 53, 47);
}

.bookmark {
	text-decoration: none;
	max-height: 8em;
	padding: 0;
	display: flex;
	width: 100%;
	align-items: stretch;
}

.bookmark-title {
	font-size: 0.85em;
	overflow: hidden;
	text-overflow: ellipsis;
	height: 1.75em;
	white-space: nowrap;
}

.bookmark-text {
	display: flex;
	flex-direction: column;
}

.bookmark-info {
	flex: 4 1 180px;
	padding: 12px 14px 14px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.bookmark-image {
	width: 33%;
	flex: 1 1 180px;
	display: block;
	position: relative;
	object-fit: cover;
	border-radius: 1px;
}

.bookmark-description {
	color: rgba(55, 53, 47, 0.6);
	font-size: 0.75em;
	overflow: hidden;
	max-height: 4.5em;
	word-break: break-word;
}

.bookmark-href {
	font-size: 0.75em;
	margin-top: 0.25em;
}

.sans { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"; }
.code { font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace; }
.serif { font-family: Lyon-Text, Georgia, ui-serif, serif; }
.mono { font-family: iawriter-mono, Nitti, Menlo, Courier, monospace; }
.pdf .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK JP'; }
.pdf:lang(zh-CN) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK SC'; }
.pdf:lang(zh-TW) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK TC'; }
.pdf:lang(ko-KR) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK KR'; }
.pdf .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }
.pdf:lang(zh-CN) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }
.pdf:lang(zh-TW) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }
.pdf:lang(ko-KR) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }
.pdf .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK JP'; }
.pdf:lang(zh-CN) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK SC'; }
.pdf:lang(zh-TW) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK TC'; }
.pdf:lang(ko-KR) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK KR'; }
.pdf .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }
.pdf:lang(zh-CN) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }
.pdf:lang(zh-TW) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }
.pdf:lang(ko-KR) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }
.highlight-default {
	color: rgba(55, 53, 47, 1);
}
.highlight-gray {
	color: rgba(120, 119, 116, 1);
	fill: rgba(120, 119, 116, 1);
}
.highlight-brown {
	color: rgba(159, 107, 83, 1);
	fill: rgba(159, 107, 83, 1);
}
.highlight-orange {
	color: rgba(217, 115, 13, 1);
	fill: rgba(217, 115, 13, 1);
}
.highlight-yellow {
	color: rgba(203, 145, 47, 1);
	fill: rgba(203, 145, 47, 1);
}
.highlight-teal {
	color: rgba(68, 131, 97, 1);
	fill: rgba(68, 131, 97, 1);
}
.highlight-blue {
	color: rgba(51, 126, 169, 1);
	fill: rgba(51, 126, 169, 1);
}
.highlight-purple {
	color: rgba(144, 101, 176, 1);
	fill: rgba(144, 101, 176, 1);
}
.highlight-pink {
	color: rgba(193, 76, 138, 1);
	fill: rgba(193, 76, 138, 1);
}
.highlight-red {
	color: rgba(212, 76, 71, 1);
	fill: rgba(212, 76, 71, 1);
}
.highlight-gray_background {
	background: rgba(241, 241, 239, 1);
}
.highlight-brown_background {
	background: rgba(244, 238, 238, 1);
}
.highlight-orange_background {
	background: rgba(251, 236, 221, 1);
}
.highlight-yellow_background {
	background: rgba(251, 243, 219, 1);
}
.highlight-teal_background {
	background: rgba(237, 243, 236, 1);
}
.highlight-blue_background {
	background: rgba(231, 243, 248, 1);
}
.highlight-purple_background {
	background: rgba(244, 240, 247, 0.8);
}
.highlight-pink_background {
	background: rgba(249, 238, 243, 0.8);
}
.highlight-red_background {
	background: rgba(253, 235, 236, 1);
}
.block-color-default {
	color: inherit;
	fill: inherit;
}
.block-color-gray {
	color: rgba(120, 119, 116, 1);
	fill: rgba(120, 119, 116, 1);
}
.block-color-brown {
	color: rgba(159, 107, 83, 1);
	fill: rgba(159, 107, 83, 1);
}
.block-color-orange {
	color: rgba(217, 115, 13, 1);
	fill: rgba(217, 115, 13, 1);
}
.block-color-yellow {
	color: rgba(203, 145, 47, 1);
	fill: rgba(203, 145, 47, 1);
}
.block-color-teal {
	color: rgba(68, 131, 97, 1);
	fill: rgba(68, 131, 97, 1);
}
.block-color-blue {
	color: rgba(51, 126, 169, 1);
	fill: rgba(51, 126, 169, 1);
}
.block-color-purple {
	color: rgba(144, 101, 176, 1);
	fill: rgba(144, 101, 176, 1);
}
.block-color-pink {
	color: rgba(193, 76, 138, 1);
	fill: rgba(193, 76, 138, 1);
}
.block-color-red {
	color: rgba(212, 76, 71, 1);
	fill: rgba(212, 76, 71, 1);
}
.block-color-gray_background {
	background: rgba(241, 241, 239, 1);
}
.block-color-brown_background {
	background: rgba(244, 238, 238, 1);
}
.block-color-orange_background {
	background: rgba(251, 236, 221, 1);
}
.block-color-yellow_background {
	background: rgba(251, 243, 219, 1);
}
.block-color-teal_background {
	background: rgba(237, 243, 236, 1);
}
.block-color-blue_background {
	background: rgba(231, 243, 248, 1);
}
.block-color-purple_background {
	background: rgba(244, 240, 247, 0.8);
}
.block-color-pink_background {
	background: rgba(249, 238, 243, 0.8);
}
.block-color-red_background {
	background: rgba(253, 235, 236, 1);
}
.select-value-color-pink { background-color: rgba(245, 224, 233, 1); }
.select-value-color-purple { background-color: rgba(232, 222, 238, 1); }
.select-value-color-green { background-color: rgba(219, 237, 219, 1); }
.select-value-color-gray { background-color: rgba(227, 226, 224, 1); }
.select-value-color-translucentGray { background-color: rgba(255, 255, 255, 0.0375); }
.select-value-color-orange { background-color: rgba(250, 222, 201, 1); }
.select-value-color-brown { background-color: rgba(238, 224, 218, 1); }
.select-value-color-red { background-color: rgba(255, 226, 221, 1); }
.select-value-color-yellow { background-color: rgba(253, 236, 200, 1); }
.select-value-color-blue { background-color: rgba(211, 229, 239, 1); }

.checkbox {
	display: inline-flex;
	vertical-align: text-bottom;
	width: 16;
	height: 16;
	background-size: 16px;
	margin-left: 2px;
	margin-right: 5px;
}

.checkbox-on {
	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E");
}

.checkbox-off {
	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E");
}
	
</style></head><body><article id="6a3f5ea2-735a-4e75-8da9-01e82c52513d" class="page sans"><header><h1 class="page-title">利用規約</h1></header><div class="page-body"><p id="439afb25-1f21-48cf-aa57-c415d8e8fc89" class="">
</p><p id="7f7c415c-09df-4f02-a829-7789fd60ed4d" class="">本利用規約（以下「本規約」といいます。）は、運営者が本ウェブサイト（関連するアプリケーションを作成した場合にはこれらのアプリケーションを含みます。）上で提供するサービス「RunCheck」（名称を変更する場合には名称変更後のサービスを含め、以下「本サービス」といいます。）の利用条件を定めるものです。本サービスのユーザ（以下「利用者」といいます。）は、本規約に同意したうえで、本サービスをご利用いただきます。</p><h2 id="02dc37c2-2011-466c-ba7d-b6dd3e31be94" class=""><strong>第1条（規約の適用）</strong></h2><p id="68504f9e-6df8-42e3-ae2f-d1516629e473" class="">本規約は、本サービスの提供条件及び運営者と利用者との間の権利義務関係を定めることを目的とし、利用者と運営者との間のサービスの利用に関わる一切の関係に適用されるものとします。</p><h2 id="587a45fe-029f-43d0-a0f3-4b1eb3fab30c" class=""><strong>第2条（利用資格）</strong></h2><ol type="1" id="ff96439f-7b56-427d-ad35-899bc4c47799" class="numbered-list" start="1"><li>本サービスは以下の条件をすべて満たす方に限り、ご利用いただくことができます。<ol type="a" id="4c9393f3-bd22-45a1-b716-e1bbeddf1156" class="numbered-list" start="1"><li>ご自身でインターネットの利用環境、端末、ソフトウェアなどを用意することができる方</li></ol><ol type="a" id="335b7e6e-78e3-4e76-a273-26ec6dad50de" class="numbered-list" start="2"><li>本規約に同意かつ遵守できる方</li></ol><ol type="a" id="39a62647-226d-4845-b3b5-61fab45a2c46" class="numbered-list" start="3"><li>過去に本規約に違反したことのない方</li></ol></li></ol><ol type="1" id="d0786c9b-4b0c-4a0c-bd5b-f48a72c710ed" class="numbered-list" start="2"><li>本サービスの利用を希望する者は、所定の方法により、運営者が定める一定の情報を運営者に提供することにより、本サービスのアカウント登録をすることができるものとします。ただし、登録希望者が以下の各号のいずれかに該当するものと運営者が判断した場合、運営者はアカウント登録を拒否することがあります。この場合、運営者はその理由について登録希望者に開示する義務を負いません。<ol type="a" id="da4dbe30-7998-41ed-a5f3-b36571cef858" class="numbered-list" start="1"><li>運営者に提供した情報に虚偽や誤記もしくは記載漏れがあった場合</li></ol><ol type="a" id="b7f3eb4c-0293-4b54-9e8b-8d82ee2e9869" class="numbered-list" start="2"><li>登録希望者が本サービスを受ける目的以外の目的でアカウント登録を申し込むものであると運営者が判断した場合</li></ol><ol type="a" id="39a3bd85-8f76-4595-bf46-0a110d8b91b9" class="numbered-list" start="3"><li>登録希望者が反社会的勢力等に該当する者またはこれに関与する者であるおそれがある場合</li></ol><ol type="a" id="887be79e-db21-4714-8f4e-ec1057798296" class="numbered-list" start="4"><li>登録希望者が過去に本規約を含む運営者との契約に違反した者またはその関係者である場合</li></ol><ol type="a" id="2864c156-9452-4faf-864e-d7a3fffce849" class="numbered-list" start="5"><li>第4条第1項各号に掲げる行為を行ったことがあるか、または行う恐れがある場合</li></ol><ol type="a" id="8635e3df-cf97-45eb-aec5-c544add3a14a" class="numbered-list" start="6"><li>その他、運営者においてアカウント登録を適切ではないと判断した場合</li></ol></li></ol><ol type="1" id="99dca6e7-22dc-4d04-af9a-8e46639dbde1" class="numbered-list" start="3"><li>登録利用者は、アカウント登録した事項に変更がある場合には、その変更事項を速やかに運営者の定める方法により通知するものとします。本項の通知を怠ったことにより利用者が被った損害その他の不利益について、運営者はその責任を負いません。</li></ol><h2 id="383b90e5-206b-48a2-b484-4d6835f55f04" class=""><strong>第3条（認証情報の管理）</strong></h2><ol type="1" id="06ccc9b1-2caf-4786-9a8c-cf6031b70040" class="numbered-list" start="1"><li>利用者は、本サービスのアカウント登録にあたって登録するログインID、パスワードその他の認証情報（以下「認証情報」といい、本サービスと連携する運営者以外の者が運営するサービスの認証情報を含みます。）を、自己の責任において適切に管理および保管するものとします。利用者は、いかなる場合にも、認証情報の使用権限を第三者に譲渡または貸与することはできません。</li></ol><ol type="1" id="341ba561-d65e-4e3e-b439-1e5084599e72" class="numbered-list" start="2"><li>利用者が本サービスのアカウント登録にあたって認証情報として利用する、運営者以外の者が運営するサービス（以下「外部サービス」といいます。）の登録、利用については、当該外部サービスが規定する各規約の定めに従い利用者自身の責任で行うものとします。</li></ol><ol type="1" id="04ad7839-0e26-4011-b43f-688fc434078e" class="numbered-list" start="3"><li>認証情報の管理不十分、第三者の使用等によって生じた損害または不利益に関する責任は利用者が負うものとし、運営者は一切の責任を負いません。</li></ol><h2 id="92a6d7a8-e137-45d5-950d-ace82196235d" class=""><strong>第4条（禁止事項）</strong></h2><ol type="1" id="2f7f6a20-1b97-4f34-ab57-d5e739f59038" class="numbered-list" start="1"><li>利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。<ol type="a" id="863d2612-8324-401d-bbf2-d0b4a99d4aa6" class="numbered-list" start="1"><li>法令または公序良俗に違反する行為</li></ol><ol type="a" id="ce4a6d11-b18a-4627-aadb-971e8a241401" class="numbered-list" start="2"><li>犯罪行為に関連する行為</li></ol><ol type="a" id="deab4958-fcce-4b3c-96d1-ec6fa90f0317" class="numbered-list" start="3"><li>運営者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li></ol><ol type="a" id="8da72c47-71d6-4f0b-8ddc-ca943d75ea07" class="numbered-list" start="4"><li>本サービスの運営を妨害する行為、または妨害するおそれのある行為</li></ol><ol type="a" id="91fac2b0-ca0f-4727-92f4-8f9c50c8af9d" class="numbered-list" start="5"><li>他者の個人情報等を収集または蓄積する行為</li></ol><ol type="a" id="4402126e-cbdb-44e6-8b18-1660c2f307af" class="numbered-list" start="6"><li>他者に成りすます行為</li></ol><ol type="a" id="8376dd42-0bfb-4b19-a422-b51c95bf8ecc" class="numbered-list" start="7"><li>反社会的勢力に対して直接的または間接的に利益を供与する行為</li></ol><ol type="a" id="3e47e52e-5c7e-46b2-88be-76a66aec10d5" class="numbered-list" start="8"><li>本サービスの利用者および運営者、第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li></ol><ol type="a" id="a558f566-6ab7-4edc-8afa-2e2813fcc8a2" class="numbered-list" start="9"><li>何らかの手段により、本サービス上の有料コンテンツに支払いなくアクセスする行為</li></ol><ol type="a" id="943095fa-f2f0-43ea-875d-7a7baa6a9342" class="numbered-list" start="10"><li>他の利用者および第三者を欺く虚偽の内容を記載する行為</li></ol><ol type="a" id="d270fab3-5476-4be0-9618-770d59190726" class="numbered-list" start="11"><li>スパムとみなされる行為（機械により自動生成された文章の投稿や同一内容の文章を繰り返し投稿する行為など）</li></ol><ol type="a" id="e99d5d34-3650-4133-9adb-676c1edcc717" class="numbered-list" start="12"><li>その他、運営者が不適切と判断する行為</li></ol></li></ol><ol type="1" id="e58275c4-9bc0-46cc-bb9b-cff35698cab5" class="numbered-list" start="2"><li>前項のいずれかの行為が発覚した場合、当該コンテンツの削除、あるいはその利用者のアカウントを停止・削除する場合があります。</li></ol><h2 id="300c65a8-a614-4749-954d-ab668c2f03be" class=""><strong>第5条（本サービスの提供の停止等）</strong></h2><ol type="1" id="17917925-a59b-4af7-ad41-f5c9c8743375" class="numbered-list" start="1"><li>運営者は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。<ol type="a" id="4b373209-052d-46cf-b62f-da71e2194135" class="numbered-list" start="1"><li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li></ol><ol type="a" id="965043b1-cb8a-46b9-aae6-ee24a5d0731e" class="numbered-list" start="2"><li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li></ol><ol type="a" id="1dcd0807-9b38-4be3-a1cc-98a2b6a5dc94" class="numbered-list" start="3"><li>コンピュータまたは通信回線等が事故により停止した場合</li></ol><ol type="a" id="7e3e80a3-c5b3-4757-9119-48dcc7565e89" class="numbered-list" start="4"><li>本サービスが利用しているクラウドサービスが停止した場合</li></ol><ol type="a" id="969e5f37-74b2-4db9-a90a-048e672b1bde" class="numbered-list" start="5"><li>その他、運営者が本サービスの提供が困難と判断した場合</li></ol></li></ol><ol type="1" id="719eb5c7-8aea-45e9-8839-3cae78535be9" class="numbered-list" start="2"><li>運営者は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる損害または不利益について、理由を問わず一切の責任を負わないものとします。</li></ol><h2 id="a672d3e9-c794-4c4a-ae07-66fe3eb70756" class=""><strong>第6条（著作権等）</strong></h2><ol type="1" id="95d6326e-cd40-4675-9279-abe3af0ae100" class="numbered-list" start="1"><li>利用者は、自ら著作権等の必要な知的財産権を有するか、または権利者から必要な許諾を受けた動画等の著作物のみ、本サービスを利用できるものとします。</li></ol><h2 id="e6f3612f-86ab-465d-a127-4e6b71b03ed3" class=""><strong>第7条（広告の掲載）</strong></h2><p id="b2c01db9-4bc7-4831-9001-eb779b4942ca" class="">運営者は、第三者の広告を本サービス上に掲載することができるものとします。</p><h2 id="9c75f53c-de0b-46fd-b290-b7ecf24e6e54" class=""><strong>第8条（登録抹消）</strong></h2><ol type="1" id="99b813cf-4594-4ef3-8e43-33c016b115e5" class="numbered-list" start="1"><li>利用者は所定の方法に従い登録アカウントを削除することにより、いつでもアカウント登録を抹消することができます。</li></ol><ol type="1" id="30863129-7a72-4935-b9e0-18364b4078d7" class="numbered-list" start="2"><li>利用者が以下の各号のいずれかに該当する場合、運営者は事前の催告を要することなく、本サービスの利用の一時的な停止、登録アカウントに関わるデータの削除、または登録抹消をすることができるものとします。<ol type="a" id="9593a077-83c6-4e3c-b7e2-b5fe10d437f4" class="numbered-list" start="1"><li>第２条第2項各号に該当する事由が存在すると運営者が判断した場合</li></ol><ol type="a" id="4ffcd0a8-8e4e-4833-989d-c318362134be" class="numbered-list" start="2"><li>第４条第1項各号に規定する行為を利用者が行った場合</li></ol><ol type="a" id="7dc252e5-1da9-499e-8464-bb33de1332b8" class="numbered-list" start="3"><li>前二号のほか、利用者が本規約に違反した場合</li></ol><ol type="a" id="c6f98cae-0d0f-4b16-853d-6da83f981683" class="numbered-list" start="4"><li>その他、前各号に準じる事由が生じたとき</li></ol></li></ol><h2 id="66a71aa4-9a32-4d2a-a815-4d88babe880a" class=""><strong>第9条（保証の否認および免責事項）</strong></h2><ol type="1" id="0e2f92dd-96b4-45ef-9a06-fcd0fe548c2f" class="numbered-list" start="1"><li>運営者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</li></ol><ol type="1" id="7319c812-2796-48bc-9fd5-02de77ba92f7" class="numbered-list" start="2"><li>利用者は、本サービスを運用するシステムに登録されたデータについて、運営者に保存責任・義務がないことを理解し、必要に応じて利用者自身でバックアップを取るものとします。運営者は、登録されたデータの消去、喪失等に関連して利用者が被った損害について、一切の責任を負いません。</li></ol><ol type="1" id="74850e53-08d8-49f4-9d16-a128fe7a6599" class="numbered-list" start="3"><li>運営者は、本サービスの利用不能もしくは本サービスの利用による機器の故障もしくは損傷によって生じた損害、または利用者が本サービスによりアクセス可能な情報を不法に開示もしくは漏えいしたことにより発生した損害、その他の第三者の行為に起因して生じた損害について、一切の責任を負いません。</li></ol><h2 id="14e425d6-d2ee-4cff-8523-c87195d09f8b" class=""><strong>第10条（サービス内容の変更・停止）</strong></h2><ol type="1" id="d087c21b-0b23-4b3e-904b-e62c9fb153f0" class="numbered-list" start="1"><li>運営者は、利用者に通知することなく、本サービスの内容の変更および一部機能の停止をすることができるものとし、これによって利用者に生じた損害または不利益について一切の責任を負いません。</li></ol><ol type="1" id="ffe1984c-6b44-4df1-b475-1e048889b645" class="numbered-list" start="2"><li>運営者は、本サービスの終了に伴い利用者に生じる損害または不利益について責任を負いません。</li></ol><h2 id="0308f239-80d2-48d7-bf16-4b11c387ea9d" class=""><strong>第11条（利用規約の変更）</strong></h2><p id="3ecd99c9-8df1-48bb-ac16-9abef1fb2dfe" class="">１． 運営者は、利用者に通知または本ウェブサイト上に告知することにより、本サービスの内容又はシステムを変更することができます。なお、その変更が利用者にとって大きな影響があると運営者が判断した場合、可能な限り事前に通知または告知しますが、本サービスの運営上早急に対応が必要であると運営者が判断した場合には、この限りではありません。</p><p id="8099df42-7d65-40dc-8a51-51e9bd0dc15e" class="">２． 前項のほか、運営者は、1ヶ月後をめどに発効日を定めて変更後の規約の内容を利用者に通知または本ウェブサイト上に告知することにより、発効日をもって本規約を変更することができるものとします。変更後の規約に同意できない利用者は、本規約の定めに従い、発効日前にアカウント登録を抹消することができます。発効日後に本サービスの利用を継続した場合には、変更内容につき承諾があったものとして取り扱われます。</p><p id="7544fceb-0cad-424c-8cc2-5496f5c49ca4" class="">３. 運営者は、前二項に従った本サービスの内容もしくはシステムの変更、または本規約の変更により生じたいかなる損害等についても責任を負いません。</p><h2 id="dd9cfba7-c4a4-44b0-ae46-ab29e044e9ad" class=""><strong>第12条（通知または連絡）</strong></h2><p id="988e70b0-4084-4cb9-a291-7b924fcf81f6" class="">利用者と運営者との間の通知または連絡は、運営者の定める方法によって行うものとします。</p></div></article></body></html>