export default defineEventHandler((event) => {
  const baseFaqs = [
    {
      id: 685,
      category_id: 14,
      question: "【iOS】どんな端末・機種に対応していますか？",
      answer: "当アプリの対応機種は以下となっております。",
      display_order: 47,
      view_count: "10",
      reference_yes: "0",
      reference_no: "0",
      reference_sum: 0,
      edited_at: "2021-04-27 13:03:33",
      created_at: "2019-03-28 16:27:48",
      updated_at: "2021-04-27 13:03:33",
    },
    {
      id: 10,
      category_id: 1,
      question: "引き継ぎIDを発行せずにアンインストールしてしまった",
      answer: `引き継ぎIDを発行していなかった場合、お客さまの操作によるデータ引き継ぎはできません。`,
      display_order: 1,
      view_count: "100",
      reference_yes: "50",
      reference_no: "2",
      reference_sum: 52,
      edited_at: "2021-05-10 10:00:00",
      created_at: "2021-05-01 10:00:00",
      updated_at: "2021-05-10 10:00:00",
    },
    {
      id: 1,
      category_id: 2,
      question: "ゲームの推奨環境を教えてください。",
      answer:
        "iOS 11.0以降、Android 5.0以降の端末が推奨環境となります。RAM 3GB以上を推奨しています。なお、Android 14以上には対応していません。",
      display_order: 2,
      view_count: "200",
      reference_yes: "150",
      reference_no: "10",
      reference_sum: 160,
      edited_at: "2021-05-11 12:00:00",
      created_at: "2021-05-02 12:00:00",
      updated_at: "2021-05-11 12:00:00",
    },
    {
      id: 2,
      category_id: 3,
      question: "購入したアイテムが反映されません。",
      answer:
        "アプリの再起動をお試しください。解決しない場合は、購入履歴のスクリーンショットを添えてお問い合わせください。",
      display_order: 3,
      view_count: "50",
      reference_yes: "20",
      reference_no: "30",
      reference_sum: 50,
      edited_at: "2021-05-12 15:00:00",
      created_at: "2021-05-03 15:00:00",
      updated_at: "2021-05-12 15:00:00",
    },
    {
      id: 3,
      category_id: 4,
      question: "【Android】アプリが起動しません（USBデバッグ関連）",
      answer:
        "アプリが起動しない場合、以下の可能性がございます。\n\n◆『USBデバッグ』がONになっている。\n恐れ入りますが、USBデバッグをOFFにしてから、アプリを再起動してください。",
      display_order: 3,
      view_count: "50",
      reference_yes: "20",
      reference_no: "30",
      reference_sum: 50,
      edited_at: "2021-05-12 15:00:00",
      created_at: "2021-05-03 15:00:00",
      updated_at: "2021-05-12 15:00:00",
    },
  ];

  // Generate more dummy data for pagination
  const moreFaqs = Array.from({ length: 20 }, (_, i) => ({
    id: 100 + i,
    category_id: 99,
    question: `【サンプル】追加の質問データです (${i + 1})`,
    answer: "これはページネーションの動作確認用のダミーデータです。",
    display_order: 100 + i,
    view_count: "5",
    reference_yes: "2",
    reference_no: "1",
    reference_sum: 3,
    edited_at: "2021-06-01 00:00:00",
    created_at: "2021-06-01 00:00:00",
    updated_at: "2021-06-01 00:00:00",
  }));

  return {
    meta: {
      site_name: "Game",
      copyright: "© Example Co., Ltd. All Rights Reserved.",
      title: "よくあるご質問 | Game",
      keywords: "Game,FAQ,お問い合わせ,チャット,ゲーム",
      description:
        "「Game」のよくあるご質問（FAQ）ページです。お客様から多く寄せられるお問い合わせ内容をまとめています。",
    },
    faqs: [...baseFaqs, ...moreFaqs],
  };
});
