function center(div)
{
	var top = ($(window).height() - div.height()) / 2+$(window).scrollTop() + "px";
	var left = ($(window).width() - div.width()) / 2+$(window).scrollLeft() + "px";
	div.css({"top" : top});
	div.css({"left" : left});
	return div;
}