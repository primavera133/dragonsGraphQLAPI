export default async function FamilyPage({
  params,
}: {
  params: Promise<{ family: string }>
}) {
  const { family } = await params
  return (
    <div>
      <p className="muted">Family editor coming in Phase 3.</p>
      <p className="muted">Path: {family}/about.json</p>
    </div>
  )
}
