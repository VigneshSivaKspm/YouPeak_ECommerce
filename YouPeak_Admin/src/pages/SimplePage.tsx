interface Props { title: string; desc?: string }

export default function SimplePage({ title, desc }: Props) {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold text-[#10252E]">{title}</h1>
      <div className="bg-white rounded-lg border border-[#E5E9E8] flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-2xl mb-2">🚧</p>
          <p className="text-sm font-semibold text-[#10252E]">{title}</p>
          <p className="text-xs text-[#64748B] mt-1">{desc ?? "This section is ready for content."}</p>
        </div>
      </div>
    </div>
  );
}
