interface SchemaLDProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export default function SchemaLD({ schema }: SchemaLDProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
