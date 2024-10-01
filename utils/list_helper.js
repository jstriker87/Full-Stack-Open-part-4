const dummy = (blogs) => {

    return 1 
}

const totalLikes = (blogs) => {
     
const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  
  return blogs.reduce(reducer, 0)
}


const mostLikes = (blogs) => {
    return blogs.reduce(
        (prev, current) => {
            return prev.likes > current.likes ? prev : current;
        }
    );
}

const mostBlogs = (blogs) => {
    result = blogs.reduce((accumulator,current) => {
        accumulator[current.author] = accumulator[current.author]
        ? (accumulator[current.author] += 1)
        : (accumulator[current.author] = 1)
    return accumulator
    },{})

    const values = Object.values(result);
    let maxValue = null
    values.map((el) => {
        console.log(el)
        const valueFromObject = el.value;
        maxValue = Math.max(maxValue, valueFromObject);
        console.log(maxValue)
    });
    return maxValue
    return Math.max(...result.values())
}

module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlogs
}
