import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ match, location, history }) {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  //console.log("CartItems: ", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Cart is empty <Link to='/'>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((it) => (
              <ListGroup.Item key={it.id}>
                <Row>
                  <Col md={2}>
                    <Image src={it.image} alt={it.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${it.id}`}>{it.name}</Link>
                  </Col>

                  <Col md='2'>{it.price}</Col>

                  <Col md='3'>
                    <Form.Control
                      as='select'
                      value={it.qty}
                      onChange={(e) =>
                        dispatch(addToCart(it.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(it.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col ms='1'>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(it.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            {/* <ListGroup.Item>
                    <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length===0}
                    onClick={checkoutHandler()}>
                        Proceed To Checkout
                    </Button>
                </ListGroup.Item> */}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
