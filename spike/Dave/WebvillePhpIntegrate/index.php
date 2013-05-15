<html>
  <head>
    <link rel="stylesheet" href="css/itunes.css">
    <script src="jscript/supply.js"></script>
    <script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
  </head>
  <body>
    <form>
      <input type="text" id="supplyTextInput" size="40" placeholder="Supply Name">
      <input type="text" id="quantityTextInput" size="10" placeholder="Quantity">
      <input type="button" id="addButton" value="Add Supply">
    </form>
    <table id="supplyTable">
      <?php
      //connect to the db
/*
        $connection = mysqli_connect('localhost','root','rich176ax','testInvControl');
        //display contents
        $query = "SELECT * FROM Supply";
        $result = mysqli_query($connection, $query) or die('cannot show tables');
        $rowNum = 1;
        while($row = mysqli_fetch_array($result))
        {
          if($rowNum % 2 != 0)
        {
          echo '<tr><td>';
        }
        else
        {
          echo '<tr class="odd"><td>';
        }
        echo $row['supplyid'],'</td><td>',$row['description'],'</td><td>',$row['qty'],'</td></tr>';
        $rowNum++;
        }
        mysqli_close($connection);
 */
      ?>
    </table>
  </body>
</html>
