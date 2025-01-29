/***************************************************
		TIPTIP
***************************************************/
/*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 * Version 1.3   -   Updated: Mar. 23, 2010
*/
(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);
$(function(){
$(".link").tipTip({maxWidth: "auto", edgeOffset: 4, defaultPosition: "top" });
});
/***************************************************
		GALLERY HOVER EFFECT
***************************************************/
   $(function(){
      $('.gal2 img , .pic img').animate({"opacity": 1 }); 
      $('.gal img , .gallast img , .left img , .right img').hover(function() {
      $(this).stop().animate({ "opacity": .6 });
      },      
      function() {
      $(this).stop().animate({ "opacity": 1 });
      });
      });
    
/***************************************************
		PRETTYPHOTO
***************************************************/
	$(document).ready(function(){
	$("a[rel^='prettyPhoto']").prettyPhoto();
	jQuery("a[rel^='prettyPhoto'], a[rel^='lightbox']").prettyPhoto({
	overlay_gallery: false, social_tools: false,  deeplinking: false
	});
});	
	$('a[data-rel]').each(function() {
    $(this).attr('rel', $(this).data('rel'));
});

/********* Night And Dark ***********/


document.addEventListener('DOMContentLoaded', function () {
    const themeSwitchCheckbox = document.querySelector('#theme-switch-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitchCheckbox.checked = true;
        }
    }

    themeSwitchCheckbox.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });
});

/***********Time And Date****************
*****************************************/
document.addEventListener('DOMContentLoaded', function () {
    function updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';

        // Convert hours and minutes to 12-hour format
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        // Set time text
        document.getElementById('time').textContent = formattedHours + ':' + formattedMinutes;
        document.getElementById('period').textContent = period;

        // Setting the day and date text
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        document.getElementById('day').textContent = formattedDate;
    }

    // Update every second
    setInterval(updateTime, 1000);

    // Execute the function as soon as the page loads
    updateTime();

    // Your popup code should go here as well
    var popup = document.getElementById('popup');
    var openPopupLink = document.getElementById('openPopupLink');
    var closeBtn = document.getElementsByClassName('close-btn')[0];
    var categoryLinks = document.querySelectorAll('.category-link');
    var categoryContents = document.querySelectorAll('.category-content');

    openPopupLink.onclick = function (event) {
        event.preventDefault(); // Prevent default link behavior
        popup.style.display = 'block';
        document.body.classList.add('modal-open');
    };

    closeBtn.onclick = function () {
        popup.style.display = 'none';
        document.body.classList.remove('modal-open');
    };

    categoryLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Hide all category content
            categoryContents.forEach(function (content) {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            // Display the content of the selected category
            var category = this.getAttribute('data-category');
            var activeContent = document.getElementById(category);
            activeContent.style.display = 'block';
            activeContent.classList.add('active');

            // Remove active class from all category links
            categoryLinks.forEach(function (link) {
                link.classList.remove('active');
            });

            // Add the active class to the selected link
            this.classList.add('active');
        });
    });

    // Default settings for displaying the first category
    categoryLinks[0].classList.add('active');
    categoryContents[0].style.display = 'block';
    categoryContents[0].classList.add('active');
});

/************************************************************                      
                    Popup products
*************************************************************/					


document.addEventListener('DOMContentLoaded', function () {
	var popup = document.getElementById('popup');
	var openPopupLink = document.getElementById('openPopupLink');
	var closeBtn = document.getElementsByClassName('close-btn')[0];
	var categoryLinks = document.querySelectorAll('.category-link');
	var categoryContents = document.querySelectorAll('.category-content');

	// Open the popup
	openPopupLink.onclick = function (event) {
			event.preventDefault(); // Prevent default link behavior
			popup.style.display = 'block';
			document.body.classList.add('modal-open');
	};

	// Close the popup when clicking on the close button
	closeBtn.onclick = function () {
			popup.style.display = 'none';
			document.body.classList.remove('modal-open');
	};

	// Change category
	categoryLinks.forEach(function (link) {
			link.addEventListener('click', function (event) {
					event.preventDefault(); //Prevent default link behavior

					// Hide all category content
					categoryContents.forEach(function (content) {
							content.style.display = 'none';
							content.classList.remove('active');
					});

					// Display the content of the selected category
					var category = this.getAttribute('data-category');
					var activeContent = document.getElementById(category);
					activeContent.style.display = 'block';
					activeContent.classList.add('active');

					// Remove active class from all category links
					categoryLinks.forEach(function (link) {
							link.classList.remove('active');
					});

					// Add the active class to the selected link
					this.classList.add('active');
			});
	});

	// Default settings for displaying the first category
	categoryLinks[0].classList.add('active');
	categoryContents[0].style.display = 'block';
	categoryContents[0].classList.add('active');
});
   //  Apply price and discount and price with discount
document.addEventListener('DOMContentLoaded', function() {
	const products = document.querySelectorAll('.product');

	products.forEach(product => {
			const price = parseFloat(product.getAttribute('data-price'));
			const discount = parseFloat(product.getAttribute('data-discount'));

			if (!isNaN(price) && !isNaN(discount)) {
					const discountedPrice = price - (price * (discount / 100));

					product.querySelector('.original-price').innerText = `Price : $${price.toFixed(2)}`;
					product.querySelector('.discounted-price').innerText = `Sale : $${discountedPrice.toFixed(2)}`;
					product.querySelector('.discount').innerText = `Discount : ${discount}%`;
			} else {
					console.error('Invalid price or discount value for product:', product);
			}
	});
});

                    /*						scrollable-content						*/
										
										document.addEventListener('DOMContentLoaded', function() {
											const scrollableContent = document.querySelector('.scrollable-content');
					
											// تابع برای اسکرول کردن به بالا
											window.scrollUp = function() {
													scrollableContent.scrollBy(0, -100); // اسکرول به بالا به میزان 100 پیکسل
											};
					
											// تابع برای اسکرول کردن به پایین
											window.scrollDown = function() {
													scrollableContent.scrollBy(0, 100); // اسکرول به پایین به میزان 100 پیکسل
											};
					
											// باز کردن پاپاپ
											document.querySelector('.category-link').addEventListener('click', function(event) {
													event.preventDefault();
													document.getElementById('popup').style.display = 'block';
											});
					
											// بستن پاپاپ
											document.querySelector('.close-btn').addEventListener('click', function() {
													document.getElementById('popup').style.display = 'none';
											});
					
											// تغییر دسته‌بندی محصولات
											document.querySelectorAll('.category-link').forEach(link => {
													link.addEventListener('click', function(event) {
															event.preventDefault();
															document.querySelectorAll('.category-content').forEach(content => {
																	content.style.display = 'none';
															});
															document.getElementById(this.dataset.category).style.display = 'block';
													});
											});
									});
/***************************************************************** 
			Button Like And Add To Card For Products  
******************************************************************/
//  Button Like

document.addEventListener("DOMContentLoaded", function() {
    const likeButtons = document.querySelectorAll('.card4 .circle4');
    const initialSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M17.5 1c-2.31 0-4.35 1.31-5.5 3.27C10.85 2.31 8.81 1 6.5 1 2.92 1 0 4.14 0 8c0 4.61 4.73 9.51 8.7 12.81.96.79 2.13 1.19 3.3 1.19s2.34-.4 3.3-1.19C19.27 17.51 24 12.6 24 8c0-3.86-2.92-7-6.5-7Zm-3.48 18.28c-1.17.97-2.87.97-4.04 0C7 16.8 2 12.04 2 8c0-2.71 2.06-5 4.5-5s4.29 2.07 4.49 4.6L9.68 8.91c-.9.9-.9 2.36 0 3.26l2.34 2.4-1.72 1.72a.996.996 0 1 0 1.41 1.41l1.72-1.72c.8-.8.8-2.1 0-2.9l-2.34-2.34c-.07-.07-.09-.16-.09-.22s.02-.14.09-.22l1.62-1.62.02-.02c.17-.18.27-.42.27-.68 0-2.71 2.06-5 4.5-5s4.5 2.29 4.5 5c0 4.03-5 8.8-7.98 11.28Z" fill="#D07684" opacity="1" data-original="#000000" class=""></path></g></svg>
    `;
    const likedSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M17.5 1.917a6.4 6.4 0 0 0-5.5 3.3 6.4 6.4 0 0 0-5.5-3.3A6.8 6.8 0 0 0 0 8.967c0 4.547 4.786 9.513 8.8 12.88a4.974 4.974 0 0 0 6.4 0c4.014-3.367 8.8-8.333 8.8-12.88a6.8 6.8 0 0 0-6.5-7.05Zm-3.585 18.4a2.973 2.973 0 0 1-3.83 0C4.947 16.006 2 11.87 2 8.967a4.8 4.8 0 0 1 4.5-5.05 4.8 4.8 0 0 1 4.5 5.05 1 1 0 0 0 2 0 4.8 4.8 0 0 1 4.5-5.05 4.8 4.8 0 0 1 4.5 5.05c0 2.903-2.947 7.039-8.085 11.346Z" fill="#CB212D" opacity="1" data-original="#000000"></path></g></svg>
    `;

    likeButtons.forEach(button => {
        let isLiked = false;
        button.addEventListener('click', function() {
            button.innerHTML = isLiked ? initialSVG : likedSVG;
            isLiked = !isLiked;
        });
    });
});

/*****************************************************
		Add to cart and total products
 ****************************************************/
		document.addEventListener('DOMContentLoaded', () => {
			const cartModal = document.getElementById("cartModal");
			const closeBtn = document.querySelector(".close");
			const cartItemsContainer = document.getElementById("cartItems");
			const cartTotal = document.getElementById("cartTotal");
			const goToCartBtn = document.getElementById("goToCartBtn");
			let cart = [];
		
			document.querySelectorAll('.CartBtn').forEach(btn => {
				btn.addEventListener('click', function() {
					const product = this.closest('.product');
					const price = parseFloat(product.dataset.price);
					const discount = parseFloat(product.dataset.discount);
					const discountedPrice = price - (price * (discount / 100));
					const productName = product.querySelector('.Content-Product-Name').innerText;
					const productImage = product.querySelector('.product-image').src;
		
					const cartItem = {
						name: productName,
						price: discountedPrice,
						image: productImage,
						quantity: 1
					};
		
					addToCart(cartItem);
					updateCart();
					showModal();
				});
			});
		
			closeBtn.addEventListener('click', () => {
				cartModal.style.display = "none";
			});
		
			goToCartBtn.addEventListener('click', () => {
				window.location.href = 'cart.html';
			});
		
			function addToCart(item) {
				const existingItem = cart.find(cartItem => cartItem.name === item.name);
				if (existingItem) {
					existingItem.quantity += 1;
				} else {
					cart.push(item);
				}
			}
		
			function removeFromCart(name) {
				cart = cart.filter(cartItem => cartItem.name !== name);
				updateCart();
			}
		
			function updateCart() {
				cartItemsContainer.innerHTML = "";
				let total = 0;
		
				cart.forEach(item => {
					const itemTotal = item.price * item.quantity;
					total += itemTotal;
		
					const cartItemElement = document.createElement('div');
					cartItemElement.classList.add('cart-item');
					cartItemElement.innerHTML = `
						<img src="${item.image}" alt="${item.name}" class="cart-item-image">
						<div class="cart-item-details">
							<p class="cart-item-name">${item.name}</p>
							<div class="cart-item-quantity">
								Quantity: 
								<input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" data-name="${item.name}">
								<button class="remove-btn" data-name="${item.name}">Remove</button>
							</div>
							<p class="cart-item-price">$${itemTotal.toFixed(2)}</p>
						</div>
					`;
		
					cartItemsContainer.appendChild(cartItemElement);
				});
		
				cartTotal.innerText = total.toFixed(2);
		
				// Add event listeners to quantity inputs
				document.querySelectorAll('.quantity-input').forEach(input => {
					input.addEventListener('change', (e) => {
						const newQuantity = parseInt(e.target.value);
						const itemName = e.target.dataset.name;
						updateItemQuantity(itemName, newQuantity);
					});
				});
		
				// Add event listeners to remove buttons
				document.querySelectorAll('.remove-btn').forEach(button => {
					button.addEventListener('click', (e) => {
						const itemName = e.target.dataset.name;
						removeFromCart(itemName);
					});
				});
			}
		
			function updateItemQuantity(name, quantity) {
				const item = cart.find(cartItem => cartItem.name === name);
				if (item && quantity >= 1 && quantity <= 10) {
					item.quantity = quantity;
					updateCart();
				}
			}
		
			function showModal() {
				cartModal.style.display = "block";
			}
		});
		


									
/***************************************************
		EASING
***************************************************/
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
*/
// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});
(jQuery);
