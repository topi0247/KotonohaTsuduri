import Link from "next/link";

import { Routes } from "@/config";

export default function PrivacyPolicy() {
  return (
    <article className="container m-auto">
      <h1 className="my-4 text-center text-xl">プライバシーポリシー</h1>
      <p>本サービスは以下のプライバシーポリシーを制定します。</p>
      <section className="my-4">
        <h2 className="underline">ユーザーから取得する情報</h2>
        <p>言の葉つづり運営（以下、運営）、ユーザーから以下の情報を取得します。</p>
        <ul className="my-2 ml-8">
          <li className="list-disc">氏名(ニックネームやペンネームも含む)</li>
          <li className="list-disc">メールアドレス</li>
          <li className="list-disc">
            外部サービスでユーザーが利用するID、その他外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報
          </li>
          <li className="list-disc">Cookie(クッキー)を用いて生成された識別情報</li>
        </ul>
      </section>

      <section className="my-4">
        <h2 className="underline">ユーザーの情報を利用する目的</h2>
        <p>運営は、ユーザーから取得した情報を、以下の目的のために利用します。</p>
        <ul className="my-2 ml-8">
          <li className="list-disc">
            本サービスに関する登録の受付、ユーザーの本人確認、認証のため
          </li>
          <li className="list-disc">ユーザーの本サービスの利用履歴を管理するため</li>
          <li className="list-disc">
            本サービスにおけるユーザーの行動履歴を分析し、本サービスの維持改善に役立てるため
          </li>
          <li className="list-disc">運営のサービスに関するご案内をするため</li>
          <li className="list-disc">ユーザーからのお問い合わせに対応するため</li>
          <li className="list-disc">運営の規約や法令に違反する行為に対応するため</li>
          <li className="list-disc">本サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
          <li className="list-disc">運営規約の変更等を通知するため</li>
          <li className="list-disc">以上の他、本サービスの提供、維持、保護及び改善のため</li>
        </ul>
      </section>

      <section className="my-4">
        <h2 className="underline">安全管理のために講じた措置</h2>
        <p>
          運営が、ユーザーから取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
        </p>
      </section>

      <section className="my-4">
        <h2 className="underline">第三者提供</h2>
        <p>
          運営は、ユーザーから取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめユーザーの同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
          <br />
          但し、次の場合は除きます。
        </p>
        <ul className="my-2 ml-8">
          <li className="list-disc">個人データの取扱いを外部に委託する場合</li>
          <li className="list-disc">運営や本サービスが買収された場合</li>
          <li className="list-disc">
            事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
          </li>
          <li className="list-disc">その他、法律によって合法的に第三者提供が許されている場合</li>
        </ul>
      </section>

      <section className="my-4">
        <h2 className="underline">アクセス解析ツール</h2>
        <p>
          運営は、ユーザーのアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
        </p>
        <p>
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Googleアナリティクス利用規約
          </a>
        </p>
      </section>

      <section className="my-4">
        <h2 className="underline">プライバシーポリシーの変更</h2>
        <p>
          運営は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
        </p>
      </section>

      <section className="my-4">
        <h2 className="underline">お問い合わせ</h2>
        <p>
          ユーザーの情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のお問合せフォームにご連絡ください。
        </p>
        <p className="my-2">
          <Link href={Routes.contact} className="text-sky-500 underline">
            お問合せフォーム
          </Link>
        </p>
      </section>
    </article>
  );
}
