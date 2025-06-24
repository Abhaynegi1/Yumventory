// Get Tailwind color class for nutrition grade
export function getGradeColor(grade) {
  const colors = {
    'a': 'bg-green-500',
    'b': 'bg-lime-500',
    'c': 'bg-yellow-500',
    'd': 'bg-orange-500',
    'e': 'bg-red-500'
  };
  return colors[grade?.toLowerCase()] || 'bg-gray-400';
}