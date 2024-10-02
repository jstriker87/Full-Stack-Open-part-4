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

    const values = Object.entries(result);
    let maxValue = null
    values.map((el,_) => {
        maxValue = Math.max(maxValue,el[1]);
    });
    const indexval = values.findIndex(([_, value]) => value === maxValue);
    const finalResult = values[indexval]
    return finalResult[0]
}

module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlogs
}
