$(function () {
  //?ドキュメントがロードされたときの処理　動かない
  // $(document).on('load', function(){
  //   console.log('ドキュメントがロードされました');
  // });

  //? .box がスクロールされたときの処理　動かない
  // $('.box').on('scroll', function(){
  //   console.log('.box がスクロールされました');
  // });


  // ?なぜ.boxじゃなくてdocument?なぜfunction()でも()でも行けるのはなぜ??
  $(document).on('scroll',function()  {
    console.log('scrollイベントが発生しました2');
  });

});
// ?なぜdocumentじゃなくてwindows?function()じゃなくて()??
$(window).on('load', () => {
  console.log('loadイベントが発生しましたa');
});
// ?なぜここのfunction()はあってもできるのか
$(window).on('load', function() {
  console.log('loadイベントが発生しましたb');
});

