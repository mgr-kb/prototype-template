import { ExpenseForm } from './_components/ExpenseForm';

export default async function ExpensePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">経費精算フォーム</h1>

      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-8 text-center">
          経費精算の申請を行います。必要な情報を入力してください。
        </p>

        {params.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center">
              経費精算の申請が完了しました。
            </p>
          </div>
        )}

        <ExpenseForm />
      </div>
    </div>
  );
}
