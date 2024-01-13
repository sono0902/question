$(function () {
  // ボタンアニメーション
  $('.button-more').on('mouseover', function () {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });
  $('.button-more').on('mouseout', function () {
    $(this).animate({
      opacity: 1,
      marginLeft: 0,
    }, 100);
  });

  $('.carousel').slick({
    autoplay:true,
    dots:true,
    infinite:true,
    autoplaySpeed:3000,
    // !矢印が出てこない
    arrows:true,
  });

  

  
});