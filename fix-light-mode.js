import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src/components');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Basic color replacements to ensure light mode is clean and legible
  
  // Update glass panels to ensure white bg in light mode
  content = content.replace(/glass-12d-panel(?!-)/g, 'glass-pill');
  
  // Fix text colors for Light Mode
  content = content.replace(/(?<!dark:)text-white/g, 'text-zinc-900 dark:text-white transition-colors');
  content = content.replace(/(?<!dark:)text-zinc-400/g, 'text-zinc-600 dark:text-zinc-400 transition-colors');
  content = content.replace(/(?<!dark:)text-zinc-300/g, 'text-zinc-700 dark:text-zinc-300 transition-colors');
  
  // Fix border colors
  content = content.replace(/(?<!dark:)border-white\/10/g, 'border-zinc-200 dark:border-white/10 transition-colors');
  content = content.replace(/(?<!dark:)border-white\/20/g, 'border-zinc-200 dark:border-white/20 transition-colors');

  // Fix backgrounds
  content = content.replace(/(?<!dark:)bg-black\/40/g, 'bg-white dark:bg-black/40 transition-colors');
  content = content.replace(/(?<!dark:)bg-black\/50/g, 'bg-slate-50 dark:bg-black/50 transition-colors');
  content = content.replace(/(?<!dark:)bg-black\/60/g, 'bg-white/90 dark:bg-black/60 transition-colors');
  content = content.replace(/(?<!dark:)bg-black\/80/g, 'bg-white/95 dark:bg-black/80 transition-colors');
  
  // Make backgrounds of components solid white where appropriate in light mode
  // bg-[#030014] -> dark:bg-[#030014]
  content = content.replace(/(?<!dark:)bg-\[\#030014\]/g, 'bg-slate-50 dark:bg-[#030014] transition-colors');
  content = content.replace(/(?<!dark:)bg-\[\#010008\]/g, 'bg-white dark:bg-[#010008] transition-colors');

  // Cyan and Purple accents to Blue and Indigo for light mode text
  content = content.replace(/(?<!dark:)text-cyan-400/g, 'text-blue-600 dark:text-cyan-400 transition-colors');
  content = content.replace(/(?<!dark:)text-cyan-300/g, 'text-blue-700 dark:text-cyan-300 transition-colors');
  content = content.replace(/(?<!dark:)text-purple-400/g, 'text-indigo-600 dark:text-purple-400 transition-colors');
  content = content.replace(/(?<!dark:)text-purple-300/g, 'text-indigo-700 dark:text-purple-300 transition-colors');

  // Cleanup potential duplicate `transition-colors`
  content = content.replace(/transition-colors transition-colors/g, 'transition-colors');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
