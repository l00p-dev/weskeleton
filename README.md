#  Welcome to Weskeleton

Weskeleton is a lightweight library that provides your initial needs to develop the front-end of an awesome website! Some pre-written components, libraries, and tools are included in this library you can read about them below.

Do not forget to star this project 😇☘️
[l00p Studio](http://l00p.dev/ "l00p Studio")

<img src="https://raw.githubusercontent.com/l00p-dev/weskeleton/main/assets/img/weskeleton-logo.svg" alt="Weskeleton Front End Freamwork Logo" width="70%">

# Components

# Tab Component
# Html Code
```html
<div class="cm_tab">
   <nav class="cm_tab__nav">
      <button class="cm_tab__nav__item active">Tab One</button>
      <button class="cm_tab__nav__item">Tab Two</button>
      <button class="cm_tab__nav__item">Tab Three</button>
   </nav>
   <div class="cm_tab__content">
      <div class="cm_tab__content__item active">
         1) Lorem ipsum dolor sit amet
      </div>
      <div class="cm_tab__content__item">
         2) Lorem ipsum dolor sit amet
      </div>
      <div class="cm_tab__content__item">
         3) Lorem ipsum dolor sit amet
      </div>
   </div>
</div>
```

# Popup Component
# Html Code

You can change ``mw-250`` class to your prefered ``max-width``
```html
<div class="cm_popup d-none" id="popup-test">
   <div class="cm_popup__overlay" onclick="togglePoup('popup-test')"></div>
   <div class="cm_popup__content mw-250">
      <button onclick="togglePoup('popup-test')">Close</button>
   </div>
</div>
```
# JavaScript Code
Only function you need to open or close your popup
```js
togglePoup('popup-test')
```
# Menu Component
# Html Code
You can change ``mw-250`` class to your prefered ``max-width``

Change position to left or right by ``position--start`` or ``position--end`` class (end or start phrases are based on direction of page)

```html
<div class="cm_menu" id="menu-test">
   <div class="cm_menu__overlay d-none" onclick="toggleMenu('menu-test')"></div>
   <div class="cm_menu__content position--end mw-300">Content Here</div>
</div>
```

# JavaScript Code
Only function you need to open or close your menu
```js
toggleMenu('menu-test')
```


# Combobox Component
This component is alternative for ``<select>`` tag in HTML. Instead of ``<select>`` tag, we use an hidden input and handle the behavior of ``<select>`` with JavaScript.

# Html Code
The data-value attribute act's as value for ``<option>``.

Style of combobox components are like input components. If you want to define new style or change defult one, go to ``assets/scss/components/_input.scss`` and edit ``$input-styles variable``.
```html
<div id="combo-test" class="cm_combo">
    <input type="hidden">
    <button class="cm_combo__input style--normal" onclick="toggleComboDropdown('combo-test')" onblur="comboHide('combo-test')">
        <span class="cm_combo__text">Choose One</span>
        <div class="cm_combo__dropdown d-none">
            <span class="cm_combo__dropdown__item" onclick="comboSelect('combo-test', 'Set 1', 1)">Set 1</span>
            <span class="cm_combo__dropdown__item" onclick="comboSelect('combo-test', 'Set 2', 2)">Set 2</span>
            <span class="cm_combo__dropdown__item" onclick="comboSelect('combo-test', 'Set 3', 3)">Set 3</span>
        </div>
    </button>
</div>
```

# FAQ Component
If you need an accordion in your page, Don't forgety, we name it faq in l00p :)

# Html Code
If ``.cm_faq`` has ``king`` class, then all accordion in same group will connect each other and if you hit one, others will be expanded.

The ``data-group`` attribute is optional but if you put ``king`` class you should set this data too.

If you want one of your accordions be open, put ``open`` class new ``.cm_faq then remove style="height: 0;"``.

```html
<div class="cm_faq style--plus king mb-3" data-group="faq-group">
    <div class="cm_faq__title">First Question?</div>
    <div class="cm_faq__content" style="height: 0;">
        <p>First answer</p>
    </div>
</div>

<div class="cm_faq style--plus king mb-3" data-group="faq-group">
    <div class="cm_faq__title">Second Question?</div>
    <div class="cm_faq__content" style="height: 0;">
        <p>Second answer</p>
    </div>
</div>

<div class="cm_faq style--plus king open" data-group="faq-group">
    <div class="cm_faq__title">Third Question?</div>
    <div class="cm_faq__content">
        <p>Third answer</p>
    </div>
</div>
```

# Article Component
This component is wrote to hold your article in it. You can put your single pos'ts content inside this component to automaticly put proper styles for multiple purposes:

- Text will be easier for reader
- Tables will style perfectly
- Styles for heading texts, lists, links, ``<figure>`` and ``<blockquote>``
# Html Code
```html
<article class="cm_content">
  Your html here...
</article>
```

# Checkbox Component
# Html Code
```html
<label class="cm_checkbox">
    <input type="checkbox" />
    <span class="cm_checkbox__input"></span>
    <span class="cm_checkbox__text">Checkbox</span>
</label>
```
# Radio Button Component
# Html Code
```html
<label class="cm_radio">
    <input type="radio" />
    <span class="cm_radio__input"></span>
    <span class="cm_radio__text">Radio Button</span>
</label>
```

# Toggle Button Component
# Html Code
```html
<label class="cm_toggle">
    <input type="checkbox" />
    <span class="cm_toggle__input"></span>
    <span class="cm_toggle__text">Toggle Button</span>
</label>
```

# Button Component
# Html Code
To set a new style for buttons, you can edit ``$btn-styles`` variable from ``assets/scss/components/_btn.scss``.

You can set button components styles to ``<a>`` or ``<button>`` tags.

Use ``size--small`` class is for smaller button size.

Use ``capsule`` class to round the edges.

Use ``circle`` class to have a circle button.

Use ``square`` class to have a square button.
```html
<button class="cm_btn color--accent">Accent</button>
<button class="cm_btn color--secondary">Secondary</button>
<button class="cm_btn color--foreground">Foreground</button>

<button class="cm_btn outline--accent">Accent</button>
<button class="cm_btn outline--secondary">Secondary</button>
<button class="cm_btn outline--foreground">Foreground</button>

<button class="cm_btn size--small outline--accent">Small</button>
<button class="cm_btn size--small outline--secondary">Small</button>
<button class="cm_btn size--small outline--foreground">Small</button>

<button class="cm_btn outline--foreground capsule">Capsule</button>
<button class="cm_btn outline--foreground circle">R</button>
<button class="cm_btn outline--foreground square">S</button>
```

# Input Component
# Html Code
To set a new style for inputs, you can edit ``$input-styles`` variable from ``assets/scss/components/_input.scss``.

Use ``validate--error`` to show error state.

Use ``validate--success`` class to show success state.
```html
<label class="mb-3">
    <small class="mb-1 d-block cl-10">Username</small>
    <input type="text" placeholder="Username" class="cm_input style--normal" />
</label>

<label class="mb-3">
    <small class="mb-1 d-block cl-success">Email Address</small>
    <input type="text" placeholder="Email Address" class="cm_input style--normal validate--success" />
</label>

<label class="mb-3">
    <small class="mb-1 d-block cl-error">Subject</small>
    <input type="text" placeholder="Subject" class="cm_input style--normal validate--error" />
</label>

<label>
    <small class="mb-1 d-block cl-10">Message</small>
    <textarea placeholder="Message" class="cm_input style--normal" rows="5"></textarea>
</label>
```
# Password Input Html Code
```html
<div class="cm_input__password">
    <input type="password" placeholder="Password" class="cm_input style--normal" autocomplete="new-password" />
    <button class="cm_btn color--transparent square">
        <svg class="icon-20 invis">
            <use href="assets/sprites.svg#password-invisible"></use>
        </svg>
        <svg class="icon-20 vis">
            <use href="assets/sprites.svg#password-visible"></use>
        </svg>
    </button>
</div>
```
# Floating Inputs Html Code
If you want to show a message under the input, use ``span`` inside ``.cm_input__floating__status``.
```html
<label class="cm_input__floating mb-4">
    <input type="text" />
    <span class="cm_input__floating__text">First Name</span>
    <span class="cm_input__floating__status"></span>
</label>

<label class="cm_input__floating mb-4">
    <input type="text" />
    <span class="cm_input__floating__text">Last Name</span>
    <span class="cm_input__floating__status"></span>
</label>

<label class="cm_input__floating validate--error">
    <input type="text" />
    <span class="cm_input__floating__text">University</span>
    <span class="cm_input__floating__status">
        <span>This field is required!</span>
    </span>
</label>
```

# LIBRARIES
In this freamwork we use [aos](https://michalsnik.github.io/aos/http:// "aos"), [bootstrap grid](https://github.com/twbs/bootstrap/blob/main/scss/bootstrap-grid.scss "bootstrap grid"), [bootstrap utilities](https://github.com/twbs/bootstrap/blob/main/scss/bootstrap-utilities.scss "bootstrap utilities"), [iziToast](https://izitoast.marcelodolza.com/ "iziToast"), [plyr](https://plyr.io/ "plyr"), and [Swiper](https://swiperjs.com/ "Swiper") libraries.

# Swiper.JS
# Html Code
```html
<div class="swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <div class="swiper-pagination"></div>

    <div class="swiper-scrollbar"></div>

    <button class="swiper-button-prev">Prev</button>
    <button class="swiper-button-next">Next</button>
</div>
```

# JavaScript Code
```js
const swiper = new Swiper(".swiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
    },

    breakpoints: {
        576: {},
        768: {},
        992: {},
        1200: {},
        1400: {},
    },
});
```

# Social Network Sharing Button
```html
<nav class="d-flex flex-wrap gap-2">
   <button onclick="socialNetwordShare('whatsapp')">
   <img src="assets/img/social-network/whatsapp.svg" alt="share to whatsapp" width="32" />
   </button>
   <button onclick="socialNetwordShare('facebook')">
   <img src="assets/img/social-network/facebook.svg" alt="share to facebook" width="32" />
   </button>
   <button onclick="socialNetwordShare('twitter')">
   <img src="assets/img/social-network/twitter.svg" alt="share to twitter" width="32" />
   </button>
   <button onclick="socialNetwordShare('reddit')">
   <img src="assets/img/social-network/reddit.svg" alt="share to reddit" width="32" />
   </button>
   <button onclick="socialNetwordShare('telegram')">
   <img src="assets/img/social-network/telegram.svg" alt="share to telegram" width="32" />
   </button>
   <button onclick="socialNetwordShare('linkedin')">
   <img src="assets/img/social-network/linkedin.svg" alt="share to linkedin" width="32" />
   </button>
</nav>
```

# Using Icons
if you want to use an icon, change svg tag to symbol, put the svg code inside svg tag in assets/sprites.svg, then add an id to symbol tag. To use this icons inside of your codes, use code below:

```html
<svg>
<use href="sprites.svg#ID-OF-YOUR-SYMBOL"></use>
</svg>
```
