import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const [destinationSource, generatedSource] = await Promise.all([
  readFile(path.join(root, "app", "data", "destinations.ts"), "utf8"),
  readFile(path.join(root, "app", "data", "courses.generated.json"), "utf8"),
]);

const listedInstitutions = [...destinationSource.matchAll(/"name":\s*"([^"]+)"\s*,\s*"location":/g)]
  .map((match) => match[1]);
const courses = JSON.parse(generatedSource);
const coveredInstitutions = new Set(courses.map((course) => course.institution));
const missing = listedInstitutions.filter((institution) => !coveredInstitutions.has(institution));
const duplicateKeys = courses
  .map((course) => `${course.institution}::${course.title}`.toLocaleLowerCase("en-GB"))
  .filter((key, index, keys) => keys.indexOf(key) !== index);
const invalid = courses.filter((course) =>
  !course.title ||
  !course.institution ||
  !course.subject ||
  !["Foundation", "Undergraduate", "Postgraduate"].includes(course.level) ||
  !course.sourceUrl?.startsWith("https://")
);

const failures = [];
if (courses.length < 500) failures.push(`Expected at least 500 generated courses; found ${courses.length}.`);
if (missing.length) failures.push(`Missing listed providers: ${missing.join(", ")}.`);
if (duplicateKeys.length) failures.push(`Found ${duplicateKeys.length} duplicate institution/title pairs.`);
if (invalid.length) failures.push(`Found ${invalid.length} records with invalid or non-HTTPS fields.`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified ${courses.length} official-source courses across all ${listedInstitutions.length} listed providers.`);
}
