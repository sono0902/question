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
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 3000,
    // !矢印が出てこない
    arrows: true,
  });

  $("#submit").on('click', function (event) {
    // フォームの送信をキャンセルするメソッド
    // !クリックイベントに関する情報（入力された情報）にアクセス。thisだと要素にアクセス　
    event.preventDefault();

    let result = inputCheck();

    // エラー判定とメッセージを取得
    let error = result.error;
    let message = result.message;

    // エラーが無かったらフォームを送信する
    if (error == false) {
      // Ajaxでformを送信する
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result) {
          alert('お問い合わせを送信しました。')
        },
        error: function (xhr, resp, text) {
          alert('お問い合わせを送信できませんでした。')
        }
      })
    } else {
      // エラーメッセージを表示する
      alert(message);
    }
  });
  $("#name").blur(function () {
    inputCheck();
  });
  $("#furigana").blur(function () {
    inputCheck();
  });
  $("#email").blur(function () {
    inputCheck();
  });
  $("#tel").blur(function () {
    inputCheck();
  });
  $("#message").blur(function () {
    inputCheck();
  });

  // セレクトボックスがフォーカスを失ったときの処理
  $('#prefecture').blur(function () {
    inputCheck();
  });

  $("#agree").click(function () {
    inputCheck();
  });

  // 問い合わせフォームのチェック
  function inputCheck() {
    // エラーのチェック結果
    let result;

    // エラーメッセージのテキスト
    let message = '';

    // エラーがなければfalse、エラーがあればtrue
    let error = false;
    //!プルから選択すると違う色になる 
    if ($("#name").val() == "") {
      // エラーあり
      $('#name').css('background-color', '#f79999');
      error = true;
      message += "お名前を有力してください"
    } else {
      // エラーなし
      $('#name').css('background-color', '#0aa');
    }
    // フリガナのチェック
    if ($('#furigana').val() == '') {
      // エラーあり
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。\n';
    } else {
      // エラーなし
      $('#furigana').css('background-color', '#fafafa');
    }
    // メールアドレスのチェック
    if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
      // エラーあり
      $('#email').css('background-color', '#f79999');
      error = true;
      message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
    } else {
      // エラーなし
      $('#email').css('background-color', '#fafafa');
    }
    // お問い合わせのチェック
    if ($('#message').val() == '') {
      // エラーあり
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    } else {
      // エラーなし
      $('#message').css('background-color', '#fafafa');
    }
    if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
      // エラーあり
      $('#tel').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      // エラーなし
      $('#tel').css('background-color', '#fafafa');
    }
    // !都道府県チェック
    if ($('#prefecture').val() === '') {
      // エラーあり
      error = true;
      message += '都道府県が選択されていません。\n';
      $('#prefecture').css('background-color', '#f79999');
    } else {
      // エラーなし
      $('#prefecture').css('background-color', '#fafafa');
    }


    if ($('#agree').prop('checked') == false) {
      error = true;
      message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
    }
    console.log(error);
    // エラーの有無で送信ボタンを切り替え
    if (error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    result = {
      error: error,
      message: message
    }

    // !戻り値としてエラーがあるかどうかを返す
    return result;
  }
});