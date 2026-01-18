import type { PythonMethod } from './types';

export const pythonModules: Record<string, PythonMethod[]> = {
  functools: [
    { method: 'functools.partial(function, *args, **keywords)', group: 'functools', description: 'Returns a new partial object which when called will behave like func called with the positional arguments args and keyword arguments keywords.' },
    { method: 'functools.wraps(function)', group: 'functools', description: 'Decorator used to update the metadata (such as __name__, __doc__) of the wrapper function to look more like the wrapped function.' },
    { method: 'functools.reduce(function, iterable)', group: 'functools', description: 'Applies function of two arguments cumulatively to the items of iterable, from left to right, so as to reduce the iterable to a single value.' },
    { method: 'functools.lru_cache(maxsize=None, typed=False)', group: 'functools', description: 'Decorator to wrap a function with a memoizing callable that saves up to the maxsize most recent calls. It can save time when an expensive or I/O bound function is periodically called with the same arguments.' },
  ],
  iterables: [
    { method: 'zip(*iterables, strict=False)', group: 'iterables', description: 'Returns an iterator that aggregates elements from each of the iterables. It continues until the shortest iterable is exhausted, and if strict is True, raises a ValueError if the iterables are of unequal length.' },
    { method: 'any(iterable)', group: 'iterables', description: 'Returns True if at least one element in the iterable is True. Otherwise, returns False.' },
    { method: 'all(iterable)', group: 'iterables', description: 'Returns True if all elements in the iterable are True, or if the iterable is empty. Otherwise, returns False.' },
    { method: 'enumerate(iterable, start=0)', group: 'iterables', description: 'Returns an iterator that yields tuples containing an index and the value of each item in the iterable. The index starts at the specified start value (default is 0).' },
    { method: 'map(function, iterable, *iterables)', group: 'iterables', description: 'Returns an iterator that applies the specified function to each item in the iterable(s) and yields the result. If multiple iterables are passed, the function is called with corresponding items from each iterable.' },
  ],
  itertools: [
    { method: 'itertools.product(*iterables, repeat=1)', group: 'itertools', description: 'Returns the Cartesian product of the input iterables, yielding tuples containing elements from each iterable.' },
    { method: 'itertools.permutations(iterable, r=None)', group: 'itertools', description: 'Returns all possible r-length tuples of elements from the iterable.' },
    { method: 'itertools.combinations(iterable, r)', group: 'itertools', description: 'Returns all possible r-length combinations of elements from the iterable.' },
    { method: 'itertools.combinations_with_replacement(iterable, r)', group: 'itertools', description: 'Returns all possible r-length combinations of elements from the iterable, allowing individual elements to be repeated.' },
    { method: 'itertools.accumulate(iterable, func=operator.add)', group: 'itertools', description: 'Returns an iterator that produces accumulated sums (or other binary functions) of the elements.' },
    { method: 'itertools.groupby(iterable, key=None)', group: 'itertools', description: 'Returns an iterator that generates tuples of a key and an iterator of grouped items from the input iterable. The key function defaults to None for a simple grouping based on the identity of the items.' },
  ],
  collections: [
    { method: 'collections.Counter', group: 'collections', description: 'A dict subclass for counting hashable objects. It is a collection where elements are stored as dictionary keys and their counts are stored as dictionary values.' },
    { method: 'collections.OrderedDict', group: 'collections', description: 'A dict subclass that maintains the order of insertion of its keys.' },
    { method: 'collections.ChainMap', group: 'collections', description: 'A class for quickly combining several mappings into one single mapping.' },
    { method: 'collections.defaultdict', group: 'collections', description: 'A subclass of the built-in dict class that returns a default value when a non-existent key is accessed.' },
    { method: 'collections.namedtuple', group: 'collections', description: 'A factory function for creating tuple subclasses with named fields, which increases code readability and maintainability.' },
  ],
  random: [
    { method: 'random.random()', group: 'random', description: 'Returns a random floating point number in the range (0.0, 1.0).' },
    { method: 'random.randint(a, b)', group: 'random', description: 'Returns a random integer between a and b (inclusive).' },
    { method: 'random.choice(seq)', group: 'random', description: 'Returns a random element from the non-empty sequence.' },
    { method: 'random.shuffle(seq)', group: 'random', description: 'Randomly shuffles the elements of the sequence in place.' },
    { method: 'random.sample(seq, k)', group: 'random', description: 'Returns a list of k unique elements chosen randomly from the population sequence or set.' },
    { method: 'random.randrange(start, stop, step)', group: 'random', description: 'Returns a randomly selected element from the range(start, stop, step).' },
  ],
  numeric: [
    { method: 'abs(x)', group: 'numeric', description: 'Returns the absolute value of x.' },
    { method: 'min(iterable)', group: 'numeric', description: 'Returns the smallest item in the iterable.' },
    { method: 'max(iterable)', group: 'numeric', description: 'Returns the largest item in the iterable.' },
    { method: 'pow(x, y)', group: 'numeric', description: 'Returns x raised to the power of y.' },
    { method: 'divmod(x, y)', group: 'numeric', description: 'Returns the quotient and remainder of the division of x by y.' },
    { method: 'math.ceil(x)', group: 'numeric', description: 'Returns the smallest integer greater than or equal to x.' },
    { method: 'math.floor(x)', group: 'numeric', description: 'Returns the largest integer less than or equal to x.' },
    { method: 'math.sqrt(x)', group: 'numeric', description: 'Returns the square root of x.' },
    { method: 'math.sin(x)', group: 'numeric', description: 'Returns the sine of x (in radians).' },
    { method: 'math.cos(x)', group: 'numeric', description: 'Returns the cosine of x (in radians).' },
    { method: 'math.tan(x)', group: 'numeric', description: 'Returns the tangent of x (in radians).' },
    { method: 'statistics.mean(iterable)', group: 'numeric', description: 'Returns the arithmetic mean of the iterable.' },
    { method: 'statistics.median(iterable)', group: 'numeric', description: 'Returns the median (middle value) of the iterable.' },
  ],
};

// Flatten all methods into a single array for searching
export const allPythonMethods: PythonMethod[] = Object.values(pythonModules).flat();

// Get all unique groups
export const pythonModuleGroups = Object.keys(pythonModules);
