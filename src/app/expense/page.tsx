export default function ExpensePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">経費精算フォーム</h1>

      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-6">
          経費精算の申請を行います。必要な情報を入力してください。
        </p>

        {/* フォーム実装は後で追加 */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            フォームコンポーネントをここに配置予定
          </p>
        </div>
      </div>
    </div>
  );
}
