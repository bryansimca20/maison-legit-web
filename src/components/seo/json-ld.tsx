/**
 * Renders a JSON-LD <script> for structured data.
 * `data` is serialized server-side; never pass user input here.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
